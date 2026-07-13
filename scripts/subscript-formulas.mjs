// Walks an existing ncertSolution chapter document and converts chemical
// formulas embedded in prose spans (e.g. "NaH2PO4" inside a sentence) into
// real subscripted/superscripted inline LaTeX, leaving the rest of each
// sentence as plain text. Complements latexify-chapter.mjs, which only
// handles whole-line arithmetic; this handles formula mentions *inside*
// otherwise-plain sentences anywhere in the document.
//
// Usage:
//   node scripts/subscript-formulas.mjs <chapter> --dry     (report only)
//   node scripts/subscript-formulas.mjs <chapter> --commit  (patch Sanity)
import { createClient } from "@sanity/client";
import { randomUUID } from "crypto";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";
import { convertFormulasInText } from "./_formula-lib.mjs";

const root = resolve(fileURLToPath(import.meta.url), "../../");
config({ path: resolve(root, ".env.local") });

const chapter = Number(process.argv[2]);
const commit = process.argv.includes("--commit");
if (!chapter) {
  console.error("Usage: node scripts/subscript-formulas.mjs <chapter> [--dry|--commit]");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

let converted = 0, unchanged = 0;
const report = [];

// Convert one portable-text array (questionText / answer / explanation /
// step content). Only "block" items with plain "span" children are touched;
// images and existing equation/inlineEquation items pass through untouched.
function convertArray(arr, label) {
  const out = [];
  for (const item of arr || []) {
    if (item._type !== "block") { out.push(item); continue; }
    const newChildren = [];
    let blockChanged = false;
    for (const child of item.children || []) {
      if (child._type !== "span" || !child.text) { newChildren.push(child); continue; }
      const pieces = convertFormulasInText(child.text);
      const hasEq = pieces.some((p) => p.type === "eq");
      if (!hasEq) { newChildren.push(child); continue; }
      blockChanged = true;
      report.push({ label, before: child.text, after: pieces });
      for (const p of pieces) {
        if (p.type === "eq") {
          newChildren.push({ _type: "inlineEquation", _key: randomUUID(), latex: p.latex });
        } else if (p.text) {
          newChildren.push({ _type: "span", _key: randomUUID(), text: p.text, marks: child.marks ?? [] });
        }
      }
    }
    if (blockChanged) {
      converted++;
      out.push({ ...item, children: newChildren });
    } else {
      unchanged++;
      out.push(item);
    }
  }
  return out;
}

function convertEntry(entry, label) {
  const next = { ...entry };
  if (entry.questionText) next.questionText = convertArray(entry.questionText, `${label}.questionText`);
  if (entry.answer) next.answer = convertArray(entry.answer, `${label}.answer`);
  if (entry.explanation) next.explanation = convertArray(entry.explanation, `${label}.explanation`);
  if (entry.steps) {
    next.steps = entry.steps.map((s, i) => ({ ...s, content: convertArray(s.content, `${label}.step[${i}]`) }));
  }
  return next;
}

const doc = await client.fetch(
  `*[_type == "ncertSolution" && class == 11 && subject == "Chemistry" && chapter == ${chapter}][0]`
);
if (!doc) { console.error(`Chapter ${chapter} not found`); process.exit(1); }
console.log(`Found ${doc._id} — chapter ${chapter}: ${doc.chapterTitle}`);

const newQuestions = (doc.questions || []).map((q) => convertEntry(q, `Q${q.questionNumber}`));
const newExamples = (doc.examples || []).map((ex) => convertEntry(ex, `Ex${ex.questionNumber}`));

console.log(`\nConverted ${converted} blocks, left ${unchanged} unchanged.\n`);
console.log("=== Conversions ===");
for (const r of report) {
  console.log(`[${r.label}]`);
  console.log(`  BEFORE: ${r.before}`);
  const afterStr = r.after.map((p) => (p.type === "eq" ? `⟦${p.latex}⟧` : p.text)).join("");
  console.log(`  AFTER:  ${afterStr}`);
}

if (commit) {
  const setPatch = {};
  if (doc.questions) setPatch.questions = newQuestions;
  if (doc.examples) setPatch.examples = newExamples;
  await client.patch(doc._id).set(setPatch).commit();
  console.log(`\n✓ Committed changes to ${doc._id}`);
} else {
  console.log("\n(dry run — pass --commit to write these changes)");
}
