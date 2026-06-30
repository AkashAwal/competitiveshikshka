/**
 * NCERT Solutions Scraper + AI Extractor
 *
 * Usage:
 *   node scripts/scrape-ncert.mjs <url> <output.json> [--examples]
 *
 * Examples:
 *   node scripts/scrape-ncert.mjs "https://byjus.com/ncert-solutions/class-11-chemistry-chapter-3/" scripts/data/ch11-chemistry-ch3.json
 *   node scripts/scrape-ncert.mjs "https://byjus.com/ncert-solutions/class-11-chemistry-chapter-3/" scripts/data/ch11-chemistry-ch3-examples.json --examples
 *
 * After scraping, import with:
 *   node scripts/import-ncert.mjs 11 Chemistry 3 "Classification of Elements and Periodicity in Properties" scripts/data/ch11-chemistry-ch3.json
 */

import Anthropic from "@anthropic-ai/sdk";
import { writeFile } from "fs/promises";
import { config } from "dotenv";
import { resolve } from "path";
import { fileURLToPath } from "url";

// Load .env.local from project root
const root = resolve(fileURLToPath(import.meta.url), "../../");
config({ path: resolve(root, ".env.local") });

const url = process.argv[2];
const outputPath = process.argv[3];
const mode = process.argv[4] === "--examples" ? "examples" : "questions";

if (!url || !outputPath) {
  console.error("Usage: node scripts/scrape-ncert.mjs <url> <output.json> [--examples]");
  process.exit(1);
}

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  console.error("Set ANTHROPIC_API_KEY in environment");
  process.exit(1);
}

const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

// ─── 1. Fetch the page ────────────────────────────────────────────────────────
console.log(`Fetching: ${url}`);
const response = await fetch(url, {
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml",
    "Accept-Language": "en-US,en;q=0.9",
  },
});

if (!response.ok) {
  console.error(`HTTP ${response.status}: ${response.statusText}`);
  process.exit(1);
}

const html = await response.text();
console.log(`Fetched ${(html.length / 1024).toFixed(0)} KB of HTML`);

// ─── 2. Strip to readable text (remove scripts/styles, collapse whitespace) ──
const text = html
  .replace(/<script[\s\S]*?<\/script>/gi, "")
  .replace(/<style[\s\S]*?<\/style>/gi, "")
  .replace(/<[^>]+>/g, " ")
  .replace(/&nbsp;/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">")
  .replace(/&times;/g, "×")
  .replace(/&minus;/g, "−")
  .replace(/&#8211;/g, "–")
  .replace(/&#8212;/g, "—")
  .replace(/\s{3,}/g, "\n\n")
  .trim();

// Claude has a 200k context window — but let's cap at ~120k chars to be safe
const truncated = text.slice(0, 120000);
console.log(`Extracted ${(truncated.length / 1024).toFixed(0)} KB of text`);

// ─── 3. Build prompt ──────────────────────────────────────────────────────────
const questionsPrompt = `You are extracting NCERT textbook exercise questions and their answers from scraped web page text.

Extract ALL numbered exercises (e.g. "2.1", "3.1", "Q1", "Exercise 1", etc.) from the text below.

Return a JSON array where each element has:
- "questionNumber": string (e.g. "2.1", "3.5", "1")
- "questionText": string (the full question text, preserve sub-parts like (i)(ii)(a)(b))
- "answer": string (the full answer/solution, preserve all calculation steps and sub-parts)
- "explanation": string (optional — include ONLY if there is a separate conceptual explanation beyond the answer steps)

Rules:
- Preserve superscripts/subscripts as Unicode (e.g. CO₂, H₂O, 10⁻¹⁹, Fe³⁺)
- Use newlines (\\n) to separate distinct steps or sub-parts within questionText and answer
- Do NOT include chapter introductions, summary text, or headers — only Q&A pairs
- If the same question appears multiple times, take the most complete version
- Return ONLY valid JSON array, no markdown fences, no preamble

Page text:
${truncated}`;

const examplesPrompt = `You are extracting NCERT textbook in-text worked examples/problems and their solutions from scraped web page text.

Extract ALL in-text worked examples (e.g. "Example 2.1", "Problem 3.1", "Illustration 1", etc.) from the text below.

Return a JSON array where each element has:
- "questionNumber": string (e.g. "Ex2.1", "P3.5") — prefix with "Ex" for Example, "P" for Problem
- "questionText": string (the full example problem statement)
- "answer": string (the complete worked solution with all steps)
- "explanation": string (optional — key conceptual insight or common mistake to avoid)
- "steps": array of {"stepTitle": string, "content": string} objects breaking down the solution

Rules:
- Preserve superscripts/subscripts as Unicode (e.g. CO₂, H₂O, 10⁻¹⁹)
- Use newlines (\\n) within strings to separate lines
- Return ONLY valid JSON array, no markdown fences, no preamble

Page text:
${truncated}`;

// ─── 4. Call Claude (haiku for speed + cost) ──────────────────────────────────
console.log(`Sending to Claude (${mode} mode)...`);

const message = await client.messages.create({
  model: "claude-haiku-4-5-20251001",
  max_tokens: 8192,
  messages: [
    {
      role: "user",
      content: mode === "examples" ? examplesPrompt : questionsPrompt,
    },
  ],
});

const rawJson = message.content[0].text.trim();

// ─── 5. Parse and validate ───────────────────────────────────────────────────
let parsed;
try {
  // Strip markdown fences if Claude added them despite instructions
  const cleaned = rawJson.replace(/^```json\n?/, "").replace(/\n?```$/, "").trim();
  parsed = JSON.parse(cleaned);
} catch (e) {
  console.error("Claude returned invalid JSON. Raw output saved to scrape-raw.txt");
  await writeFile("scrape-raw.txt", rawJson, "utf-8");
  process.exit(1);
}

if (!Array.isArray(parsed)) {
  console.error("Expected a JSON array, got:", typeof parsed);
  process.exit(1);
}

// ─── 6. Save output ──────────────────────────────────────────────────────────
await writeFile(outputPath, JSON.stringify(parsed, null, 2), "utf-8");
console.log(`\n✓ Extracted ${parsed.length} ${mode}`);
console.log(`✓ Saved to ${outputPath}`);
console.log("\nInput token usage:", message.usage.input_tokens);
console.log("Output token usage:", message.usage.output_tokens);

if (mode === "questions") {
  console.log("\nNext step:");
  console.log(`  node scripts/import-ncert.mjs <class> <Subject> <chapterNum> "<Title>" ${outputPath}`);
} else {
  console.log("\nNext step: patch the examples into the existing Sanity document");
}
