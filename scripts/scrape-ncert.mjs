/**
 * NCERT Solutions Scraper + AI Extractor (uses Gemini Flash — free tier)
 *
 * Setup: Add GEMINI_API_KEY to .env.local
 * Get free key at: https://aistudio.google.com/apikey
 *
 * Usage:
 *   node scripts/scrape-ncert.mjs <url> <output.json> [--examples]
 *
 * Examples:
 *   node scripts/scrape-ncert.mjs "https://byjus.com/ncert-solutions/class-11-chemistry-chapter-3/" scripts/data/ch11-chemistry-ch3-questions.json
 *   node scripts/scrape-ncert.mjs "https://byjus.com/ncert-solutions/class-11-chemistry-chapter-3/" scripts/data/ch11-chemistry-ch3-examples.json --examples
 *
 * After scraping, import with:
 *   node scripts/import-ncert.mjs 11 Chemistry 3 "Classification of Elements and Periodicity in Properties" scripts/data/ch11-chemistry-ch3-questions.json
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
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

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("Missing GEMINI_API_KEY in .env.local");
  console.error("Get a free key at: https://aistudio.google.com/apikey");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
// gemini-2.0-flash: free tier, 1M token context, 1500 req/day
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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

// ─── 2. Strip to readable text ────────────────────────────────────────────────
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

// Gemini 2.0 Flash has a 1M token context — 200k chars is comfortably within limits
const truncated = text.slice(0, 200000);
console.log(`Extracted ${(truncated.length / 1024).toFixed(0)} KB of text`);

// ─── 3. Build prompt ──────────────────────────────────────────────────────────
const questionsPrompt = `You are extracting NCERT textbook exercise questions and their answers from scraped web page text.

Extract ALL numbered exercises (e.g. "3.1", "Q1", "Exercise 1") from the text below.

Return a JSON array where each element has:
- "questionNumber": string (e.g. "3.1", "3.5")
- "questionText": string (full question, preserve sub-parts like (i)(ii)(a)(b))
- "answer": string (full solution with all calculation steps and sub-parts)
- "explanation": string (optional — only if there is a separate conceptual explanation)

Rules:
- Preserve superscripts/subscripts as Unicode (e.g. CO₂, H₂O, 10⁻¹⁹, Fe³⁺, Na⁺)
- Use \\n to separate distinct steps or sub-parts within strings
- Skip chapter intros, summaries, headers — only Q&A pairs
- Return ONLY a valid JSON array, no markdown fences, no extra text

Page text:
${truncated}`;

const examplesPrompt = `You are extracting NCERT textbook in-text worked examples and their solutions from scraped web page text.

Extract ALL worked examples (e.g. "Example 3.1", "Problem 3.1") from the text below.

Return a JSON array where each element has:
- "questionNumber": string — prefix "Ex" for examples, "P" for problems (e.g. "Ex3.1", "P3.2")
- "questionText": string (full problem statement)
- "answer": string (complete worked solution)
- "explanation": string (optional — key insight or common mistake)
- "steps": array of {"stepTitle": string, "content": string} objects

Rules:
- Preserve superscripts/subscripts as Unicode (e.g. CO₂, 10⁻¹⁹)
- Use \\n within strings to separate lines
- Return ONLY a valid JSON array, no markdown fences, no extra text

Page text:
${truncated}`;

// ─── 4. Call Gemini Flash (with auto-retry on rate limit) ────────────────────
console.log(`Sending to Gemini Flash (${mode} mode)...`);

async function callGeminiWithRetry(prompt, maxAttempts = 5) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 8192, temperature: 0.1, responseMimeType: "application/json" },
      });
      return result.response.text().trim();
    } catch (err) {
      const is429 = err.status === 429 || (err.message && err.message.includes("429"));
      if (is429 && attempt < maxAttempts) {
        // Parse retry delay from error, default to 65s
        const match = err.message?.match(/retryDelay.*?(\d+)s/);
        const wait = match ? (parseInt(match[1]) + 5) : 65;
        console.log(`Rate limited. Waiting ${wait}s before retry ${attempt + 1}/${maxAttempts}...`);
        await new Promise(r => setTimeout(r, wait * 1000));
      } else {
        throw err;
      }
    }
  }
}

const rawJson = await callGeminiWithRetry(mode === "examples" ? examplesPrompt : questionsPrompt);

// ─── 5. Parse and validate ────────────────────────────────────────────────────
let parsed;
try {
  const cleaned = rawJson.replace(/^```json\n?/, "").replace(/\n?```$/, "").trim();
  parsed = JSON.parse(cleaned);
} catch (e) {
  console.error("Gemini returned invalid JSON. Raw output saved to scrape-raw.txt");
  await writeFile("scrape-raw.txt", rawJson, "utf-8");
  process.exit(1);
}

if (!Array.isArray(parsed)) {
  console.error("Expected a JSON array, got:", typeof parsed);
  process.exit(1);
}

// ─── 6. Save output ───────────────────────────────────────────────────────────
await writeFile(outputPath, JSON.stringify(parsed, null, 2), "utf-8");
console.log(`\n✓ Extracted ${parsed.length} ${mode}`);
console.log(`✓ Saved to: ${outputPath}`);

if (mode === "questions") {
  console.log("\nNext step:");
  console.log(`  node scripts/import-ncert.mjs <class> <Subject> <chapterNum> "<Title>" ${outputPath}`);
} else {
  console.log("\nNext step: patch examples into the existing Sanity document");
}
