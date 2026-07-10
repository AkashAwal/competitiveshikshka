// Every questionText array was always authored as exactly ONE original
// sentence (a single block() call in every import script). When the old
// latexify converter split that sentence around embedded formulas, it
// exploded it into several disconnected top-level blocks/equations — this
// migration merges them back into one paragraph per contiguous run, with any
// equations embedded as inline children instead of centered display blocks.
// It never re-parses or re-derives any math (the latex is already correct),
// so it carries no risk of introducing wrong math — it only repackages.
//
// Usage:
//   node scripts/migrate-questiontext-inline.mjs <chapter> --dry
//   node scripts/migrate-questiontext-inline.mjs <chapter> --commit
import { createClient } from "@sanity/client";
import { randomUUID } from "crypto";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

const root = resolve(fileURLToPath(import.meta.url), "../../");
config({ path: resolve(root, ".env.local") });

const chapter = Number(process.argv[2]);
const commit = process.argv.includes("--commit");
if (!chapter) {
  console.error("Usage: node scripts/migrate-questiontext-inline.mjs <chapter> [--dry|--commit]");
  process.exit(1);
}

const client = createClient({
  projectId: "cekjuoyu",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

let touched = 0;

// Merge a contiguous run of block/equation items into one paragraph block,
// converting any `equation` items to inline children. Images (or anything
// else) split the array into separate runs — never merged across.
function mergeRun(run) {
  if (run.length === 0) return [];
  if (run.length === 1 && run[0]._type === "equation") return run; // already a single standalone equation — nothing to merge
  const children = run.flatMap((item) => {
    if (item._type === "block") return item.children;
    if (item._type === "equation") {
      return [{ _type: "inlineEquation", _key: randomUUID(), latex: item.latex }];
    }
    return [];
  });
  return [{ _type: "block", _key: randomUUID(), style: "normal", markDefs: [], children }];
}

function migrateQuestionText(arr, label) {
  if (!arr || arr.length <= 1) return arr;
  const runs = [[]];
  for (const item of arr) {
    if (item._type === "block" || item._type === "equation") {
      runs[runs.length - 1].push(item);
    } else {
      runs.push(item); // image or other non-mergeable item, kept as its own entry
      runs.push([]);
    }
  }
  const out = runs.flatMap((r) => (Array.isArray(r) ? mergeRun(r) : [r]));
  const changed = JSON.stringify(out.map((o) => (o._type === "block" ? o.children.length : o._type))) !==
    JSON.stringify(arr.map((o) => (o._type === "block" ? o.children.length : o._type)));
  if (out.length !== arr.length || changed) {
    touched++;
    console.log(`[${label}] ${arr.length} items -> ${out.length} item(s)`);
  }
  return out;
}

const doc = await client.fetch(
  `*[_type == "ncertSolution" && class == 11 && subject == "Chemistry" && chapter == ${chapter}][0]`
);
if (!doc) { console.error(`Chapter ${chapter} not found`); process.exit(1); }
console.log(`Found ${doc._id} — chapter ${chapter}: ${doc.chapterTitle}\n`);

const newQuestions = (doc.questions || []).map((q) => ({
  ...q,
  questionText: migrateQuestionText(q.questionText, `Q${q.questionNumber}`),
}));
const newExamples = (doc.examples || []).map((ex) => ({
  ...ex,
  questionText: migrateQuestionText(ex.questionText, `Ex${ex.questionNumber}`),
}));

console.log(`\n${touched} questionText field(s) need repackaging.`);

if (commit) {
  const setPatch = {};
  if (doc.questions) setPatch.questions = newQuestions;
  if (doc.examples) setPatch.examples = newExamples;
  await client.patch(doc._id).set(setPatch).commit();
  console.log(`✓ Committed changes to ${doc._id}`);
} else {
  console.log("(dry run — pass --commit to write these changes)");
}
