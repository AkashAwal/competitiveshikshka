// Converts plain-text "/"-fraction lines in an existing ncertSolution chapter
// document to properly typeset LaTeX (equation blocks), leaving anything the
// parser can't cleanly and unambiguously handle as untouched plain text.
//
// Usage:
//   node scripts/latexify-chapter.mjs <chapter> --dry     (print a report, no writes)
//   node scripts/latexify-chapter.mjs <chapter> --commit  (patch the Sanity document)
import { createClient } from "@sanity/client";
import { randomUUID } from "crypto";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";
import { convertLine } from "./_latexify-lib.mjs";

const root = resolve(fileURLToPath(import.meta.url), "../../");
config({ path: resolve(root, ".env.local") });

const chapter = Number(process.argv[2]);
const commit = process.argv.includes("--commit");
if (!chapter) {
  console.error("Usage: node scripts/latexify-chapter.mjs <chapter> [--dry|--commit]");
  process.exit(1);
}

const client = createClient({
  projectId: "cekjuoyu",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Exact original line texts to never convert — found by manual review of a
// chapter's dry-run report (e.g. "Group 1/2" meaning "Group 1 or 2", not a
// fraction — an ambiguity the parser can't resolve on its own).
const SKIP_EXACT = new Set([
  "Down Group 1/2: oxides remain basic but basicity increases (CsOH is stronger base than LiOH).",
  "CO2 = 12.01 amu + 2 x 16.00 amu = 44.01 amu", // "x" here is a multiplication typo, not a variable — parser can't tell
  "P = 1034 g/cm² × 9.8 m/s² = 1034 × 10⁻³ kg × 9.8 / 10⁻⁴ m²", // denominator "10⁻⁴ m²" has no parens in the source — parser can't tell it's one unit
  "Number of photons per second = P/E = 100 / (3.374 × 10⁻¹⁹) = 2.96 × 10²⁰ photons/s", // trailing "photons/s" wrongly stacks into a fraction
  "N = Power/Energy per photon = 100 W / 3.374×10⁻¹⁹ J = 2.96×10²⁰ photons/s", // "J" left dangling outside its fraction denominator, plus "photons/s" issue above
  "C=O double bond = 121 pm; C≡O triple bond = 110 pm; observed CO2 bond length = 115 pm — between the two.", // "C=O" is bond notation, not an equation — parser can't tell it apart from the real "= 121 pm" that follows
  "Arrange the following: (i) CaH2, BeH2 and TiH2 in order of increasing electrical conductance. (ii) LiH, NaH and CsH in order of increasing ionic character. (iii) H–H, D–D and F–F in order of increasing bond dissociation enthalpy. (iv) NaH, MgH2 and H2O in order of increasing reducing properties.", // aggressive comma-split only cleanly parses the first formula in the list, fragmenting the rest of this sentence — better left to subscript-formulas.mjs, which inlines formulas without breaking prose flow
]);

let converted = 0, unchanged = 0;
const report = [];

// Group a flat pieces list (which may contain {type:'break'} markers for
// genuine embedded-newline paragraph breaks) into arrays-of-pieces, one per
// resulting block.
function groupPieces(pieces) {
  const groups = [[]];
  for (const p of pieces) {
    if (p.type === "break") groups.push([]);
    else groups[groups.length - 1].push(p);
  }
  return groups.filter((g) => g.length > 0);
}

// Convert one portable-text array (questionText / answer / explanation / step content).
// Non-"block" items (images, existing equations) pass through untouched.
//
// A group of pieces that came from one original line is packaged as ONE
// paragraph block, with any equations embedded as inline children alongside
// the surrounding text spans — this keeps a sentence like "the molar mass of
// H2O is..." flowing as one paragraph instead of exploding into a stack of
// disconnected text/equation blocks. The one exception: a group that is
// *exactly* one bare equation piece (no marker, no surrounding prose) is a
// genuine standalone derivation line, and renders as a centered display
// equation instead.
function convertArray(arr, label, aggressive) {
  const out = [];
  for (const item of arr || []) {
    if (item._type !== "block") { out.push(item); continue; }
    const text = (item.children || []).map((c) => c.text).join("");
    const pieces = SKIP_EXACT.has(text) ? [{ type: "text", text }] : convertLine(text, { aggressive });
    const hasEquation = pieces.some((p) => p.type === "eq");
    if (!hasEquation) {
      out.push(item);
      unchanged++;
      continue;
    }
    converted++;
    report.push({ label, before: text, after: pieces });
    for (const group of groupPieces(pieces)) {
      if (group.length === 1 && group[0].type === "eq") {
        out.push({ _type: "equation", _key: randomUUID(), latex: group[0].latex });
        continue;
      }
      const children = group.map((p) =>
        p.type === "eq"
          ? { _type: "inlineEquation", _key: randomUUID(), latex: p.latex }
          : { _type: "span", _key: randomUUID(), text: p.text, marks: [] }
      );
      out.push({ _type: "block", _key: randomUUID(), style: "normal", markDefs: [], children });
    }
  }
  return out;
}

function convertEntry(entry, label) {
  const next = { ...entry };
  // Only questionText gets the "aggressive" formula/comma trigger — genuine
  // formula lists ("H2S, SiCl4, BeF2") are common there. Answers/explanations/
  // steps stay on the conservative operator-only trigger, since broadening it
  // there just fragments ordinary prose that happens to mention a formula.
  if (entry.questionText) next.questionText = convertArray(entry.questionText, `${label}.questionText`, true);
  if (entry.answer) next.answer = convertArray(entry.answer, `${label}.answer`, false);
  if (entry.explanation) next.explanation = convertArray(entry.explanation, `${label}.explanation`, false);
  if (entry.steps) {
    next.steps = entry.steps.map((s, i) => ({ ...s, content: convertArray(s.content, `${label}.step[${i}]`, false) }));
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

console.log(`\nConverted ${converted} lines, left ${unchanged} unchanged.\n`);
console.log("=== Conversions ===");
for (const r of report) {
  console.log(`[${r.label}]`);
  console.log(`  BEFORE: ${r.before}`);
  for (const p of r.after) {
    if (p.type === "break") { console.log("  AFTER (break): --- new paragraph ---"); continue; }
    console.log(`  AFTER (${p.type}): ${p.type === "eq" ? p.latex : p.text}`);
  }
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
