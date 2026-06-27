/**
 * NCERT Solution Generator
 * Usage: node scripts/generate-ncert.mjs <questions-json-file>
 * Example: node scripts/generate-ncert.mjs scripts/questions/class12-physics-ch1.json
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { randomBytes } from "crypto";
import { config } from "dotenv";

config({ path: ".env.local" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const key = () => randomBytes(4).toString("hex");

function textToPortableText(text) {
  return text
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean)
    .map((para) => ({
      _type: "block",
      _key: key(),
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: key(), text: para, marks: [] }],
    }));
}

function questionToPortableText(text) {
  return [
    {
      _type: "block",
      _key: key(),
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: key(), text: text.trim(), marks: [] }],
    },
  ];
}

async function generateSolution(cls, subject, chapter, chapterTitle, question) {
  const prompt = `You are an expert NCERT teacher for Indian students (Class ${cls}, ${subject}).

Chapter ${chapter}: ${chapterTitle}

Question ${question.number}: ${question.text}

Write a clear, step-by-step solution suitable for a Class ${cls} student.
- For numerical problems: show all steps with formulas and units
- For theory questions: be concise but complete
- Use simple language
- Do not use markdown formatting like ** or ## — write plain text only
- Separate logical steps with blank lines`;

  const message = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  return message.content[0].text;
}

async function main() {
  const inputFile = process.argv[2];
  if (!inputFile) {
    console.error("Usage: node scripts/generate-ncert.mjs <questions-json-file>");
    process.exit(1);
  }

  const input = JSON.parse(readFileSync(inputFile, "utf-8"));
  const { class: cls, subject, chapter, chapterTitle, questions } = input;

  console.log(`\nGenerating solutions for: Class ${cls} ${subject} Chapter ${chapter} — ${chapterTitle}`);
  console.log(`Total questions: ${questions.length}\n`);

  const processedQuestions = [];

  for (const q of questions) {
    process.stdout.write(`  Q${q.number}... `);
    try {
      const answerText = await generateSolution(cls, subject, chapter, chapterTitle, q);
      processedQuestions.push({
        _key: key(),
        questionNumber: String(q.number),
        questionText: questionToPortableText(q.text),
        answer: textToPortableText(answerText),
      });
      console.log("done");
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
    }
    // small delay to avoid rate limits
    await new Promise((r) => setTimeout(r, 500));
  }

  const docId = `ncert-${cls}-${subject.toLowerCase().replace(/\s+/g, "-")}-ch${chapter}`;

  console.log(`\nPushing to Sanity (id: ${docId})...`);

  await sanity.createOrReplace({
    _id: docId,
    _type: "ncertSolution",
    class: cls,
    subject,
    chapter,
    chapterTitle,
    questions: processedQuestions,
  });

  console.log(`Done! ${processedQuestions.length}/${questions.length} questions uploaded.\n`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
