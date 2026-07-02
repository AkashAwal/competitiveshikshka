"use client";

import { useState, useTransition } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { X, Upload, CheckCircle2, XCircle } from "lucide-react";
import { createQuestionsBulk, type QuestionInput, type BulkRowResult } from "./actions";

const COLUMNS = [
  "bank", "exam", "subject", "topic", "year", "question",
  "option_a", "option_b", "option_c", "option_d",
  "correct_option", "explanation", "difficulty",
] as const;

interface ParsedRow {
  line: number;
  input: QuestionInput | null;
  parseError: string | null;
}

function parseTsv(text: string): ParsedRow[] {
  const lines = text.split("\n").map(l => l.trimEnd()).filter(l => l.trim().length > 0);
  if (lines.length === 0) return [];

  // First non-empty line is treated as a header row and skipped.
  const dataLines = lines.slice(1);

  return dataLines.map((line, i) => {
    const cells = line.split("\t").map(c => c.trim());
    if (cells.length !== COLUMNS.length) {
      return { line: i + 2, input: null, parseError: `Expected ${COLUMNS.length} tab-separated columns, found ${cells.length}.` };
    }
    const [bankRaw, exam, subject, topic, yearRaw, question, option_a, option_b, option_c, option_d, correctRaw, explanation, difficultyRaw] = cells;

    const bank = bankRaw.toLowerCase();
    if (bank !== "pyq" && bank !== "practice") {
      return { line: i + 2, input: null, parseError: `"bank" must be "pyq" or "practice", got "${bankRaw}".` };
    }
    const correct_option = correctRaw.toUpperCase();
    if (!["A", "B", "C", "D"].includes(correct_option)) {
      return { line: i + 2, input: null, parseError: `"correct_option" must be A, B, C or D, got "${correctRaw}".` };
    }
    const difficultyMatch = ["Easy", "Medium", "Hard"].find(d => d.toLowerCase() === difficultyRaw.toLowerCase());
    if (!difficultyMatch) {
      return { line: i + 2, input: null, parseError: `"difficulty" must be Easy, Medium or Hard, got "${difficultyRaw}".` };
    }
    if (!question || !option_a || !option_b || !option_c || !option_d) {
      return { line: i + 2, input: null, parseError: "Question and all four options are required." };
    }
    const year = yearRaw ? Number(yearRaw) : null;
    if (yearRaw && Number.isNaN(year)) {
      return { line: i + 2, input: null, parseError: `"year" must be a number, got "${yearRaw}".` };
    }

    return {
      line: i + 2,
      parseError: null,
      input: {
        bank: bank as "pyq" | "practice",
        exam, subject, topic, year, question,
        option_a, option_b, option_c, option_d,
        correct_option: correct_option as "A" | "B" | "C" | "D",
        explanation,
        difficulty: difficultyMatch as "Easy" | "Medium" | "Hard",
      },
    };
  });
}

export function BulkAddDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [text, setText] = useState("");
  const [pending, startTransition] = useTransition();
  const [parseErrors, setParseErrors] = useState<{ line: number; error: string }[]>([]);
  const [results, setResults] = useState<{ total: number; ok: number; failed: { line: number; error: string }[] } | null>(null);

  function reset() {
    setText("");
    setParseErrors([]);
    setResults(null);
  }

  function submit() {
    const parsed = parseTsv(text);
    const errors = parsed.filter(r => r.parseError).map(r => ({ line: r.line, error: r.parseError! }));
    const valid = parsed.filter((r): r is ParsedRow & { input: QuestionInput } => r.input !== null);

    setParseErrors(errors);
    setResults(null);

    if (valid.length === 0) return;

    startTransition(async () => {
      const rowResults: BulkRowResult[] = await createQuestionsBulk(valid.map(r => r.input));
      const failed = rowResults
        .filter(r => !r.ok)
        .map(r => ({ line: valid[r.row].line, error: r.error ?? "Unknown error" }));
      setResults({ total: valid.length, ok: rowResults.filter(r => r.ok).length, failed });
    });
  }

  return (
    <Dialog.Root open={open} onOpenChange={v => { onOpenChange(v); if (!v) reset(); }}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50" style={{ backgroundColor: "var(--overlay)" }} />
        <Dialog.Popup
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6 max-h-[85vh] overflow-y-auto"
          style={{ backgroundColor: "var(--surface-content)", border: "1px solid rgba(var(--fg-rgb),0.1)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-lg font-black" style={{ color: "rgba(var(--fg-rgb),0.95)" }}>
              Bulk add questions
            </Dialog.Title>
            <Dialog.Close className="p-1 rounded-lg cursor-pointer" style={{ color: "rgba(var(--fg-rgb),0.5)" }}>
              <X className="h-4 w-4" />
            </Dialog.Close>
          </div>

          <div className="flex flex-col gap-3">
            <div
              className="rounded-lg p-3 text-xs leading-relaxed"
              style={{ backgroundColor: "rgba(var(--fg-rgb),0.04)", color: "rgba(var(--fg-rgb),0.55)" }}
            >
              Paste tab-separated rows — the kind you get copying cells straight out of Excel or Google Sheets.
              First row is treated as a header and skipped. Columns, in order:
              <br />
              <code className="font-mono" style={{ color: "rgba(var(--fg-rgb),0.75)" }}>
                {COLUMNS.join("  ·  ")}
              </code>
              <br />
              <code className="font-mono" style={{ color: "rgba(var(--fg-rgb),0.4)" }}>
                bank = pyq or practice · correct_option = A/B/C/D · difficulty = Easy/Medium/Hard · year can be blank
              </code>
            </div>

            <textarea
              rows={10}
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Paste rows here…"
              className="w-full rounded-lg px-3 py-2 text-xs font-mono outline-none"
              style={{ backgroundColor: "rgba(var(--fg-rgb),0.05)", border: "1px solid rgba(var(--fg-rgb),0.08)", color: "rgba(var(--fg-rgb),0.9)" }}
            />

            {parseErrors.length > 0 && (
              <div className="rounded-lg p-3 flex flex-col gap-1" style={{ backgroundColor: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}>
                <p className="text-xs font-bold" style={{ color: "#f87171" }}>{parseErrors.length} row(s) couldn't be parsed and were skipped:</p>
                {parseErrors.map(e => (
                  <p key={e.line} className="text-xs" style={{ color: "rgba(248,113,113,0.85)" }}>Line {e.line}: {e.error}</p>
                ))}
              </div>
            )}

            {results && (
              <div className="rounded-lg p-3 flex flex-col gap-1" style={{ backgroundColor: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.2)" }}>
                <p className="text-xs font-bold flex items-center gap-1.5" style={{ color: "#34d399" }}>
                  <CheckCircle2 className="h-3.5 w-3.5" /> {results.ok} of {results.total} rows added successfully.
                </p>
                {results.failed.map(f => (
                  <p key={f.line} className="text-xs flex items-center gap-1.5" style={{ color: "#f87171" }}>
                    <XCircle className="h-3 w-3 shrink-0" /> Line {f.line}: {f.error}
                  </p>
                ))}
              </div>
            )}

            <button
              onClick={submit}
              disabled={pending || !text.trim()}
              className="mt-1 self-start flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white cursor-pointer disabled:opacity-50"
              style={{ backgroundColor: "#2563eb" }}
            >
              <Upload className="h-4 w-4" />
              {pending ? "Importing…" : "Import questions"}
            </button>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
