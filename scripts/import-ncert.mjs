import { createClient } from "@sanity/client";
import { randomUUID } from "crypto";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

function toBlocks(text) {
  return text.split("\n").filter(Boolean).map((line) => ({
    _type: "block",
    _key: randomUUID(),
    style: "normal",
    children: [{ _type: "span", _key: randomUUID(), text: line, marks: [] }],
    markDefs: [],
  }));
}

const classNum = parseInt(process.argv[2], 10);
const subject = process.argv[3];
const chapterNum = parseInt(process.argv[4], 10);
const chapterTitle = process.argv[5];
const jsonPath = process.argv[6];

if (!classNum || !subject || !chapterNum || !chapterTitle || !jsonPath) {
  console.error(
    "Usage: node scripts/import-ncert.mjs <class> <subject> <chapter> <chapterTitle> <json-file>"
  );
  process.exit(1);
}

const { readFile } = await import("fs/promises");
const raw = JSON.parse(await readFile(jsonPath, "utf-8"));

function toSteps(steps) {
  if (!steps?.length) return undefined;
  return steps.map((s) => ({
    _type: "step",
    _key: randomUUID(),
    stepTitle: s.stepTitle,
    content: toBlocks(s.content),
  }));
}

const questions = raw.map((q) => ({
  _type: "questionAnswer",
  _key: randomUUID(),
  questionNumber: String(q.questionNumber),
  questionText: toBlocks(q.questionText),
  answer: toBlocks(q.answer),
  ...(q.explanation ? { explanation: toBlocks(q.explanation) } : {}),
  ...(q.steps ? { steps: toSteps(q.steps) } : {}),
}));

const doc = {
  _type: "ncertSolution",
  class: classNum,
  subject,
  chapter: chapterNum,
  chapterTitle,
  questions,
};

console.log(`Importing Class ${classNum} ${subject} Chapter ${chapterNum}: ${chapterTitle}`);
console.log(`Questions: ${questions.length}`);

const result = await client.create(doc);
console.log(`Created document: ${result._id}`);
