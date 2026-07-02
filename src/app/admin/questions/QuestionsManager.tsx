"use client";

import { useMemo, useState, useTransition } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Plus, Pencil, Trash2, X, Upload } from "lucide-react";
import { createQuestion, updateQuestion, deleteQuestion, type QuestionInput } from "./actions";
import { BulkAddDialog } from "./BulkAddDialog";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

export interface QuestionRow extends QuestionInput {
  id: string;
}

const EXAMS = ["JEE Main", "JEE Advanced", "NEET", "CUET"];
const SUBJECTS = ["Physics", "Chemistry", "Mathematics", "Biology"];
const DIFFICULTIES = ["Easy", "Medium", "Hard"] as const;
const OPTIONS = ["A", "B", "C", "D"] as const;

const EMPTY: QuestionInput = {
  bank: "pyq", exam: "JEE Main", subject: "Physics", topic: "", year: null,
  question: "", option_a: "", option_b: "", option_c: "", option_d: "",
  correct_option: "A", explanation: "", difficulty: "Medium",
};

const inputClass = "w-full rounded-lg px-3 py-2 text-sm outline-none";
const inputStyle = { backgroundColor: "rgba(var(--fg-rgb),0.05)", border: "1px solid rgba(var(--fg-rgb),0.08)", color: "rgba(var(--fg-rgb),0.9)" };

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ color: "rgba(var(--fg-rgb),0.4)" }}>{children}</label>;
}

export function QuestionsManager({ rows }: { rows: QuestionRow[] }) {
  const [bankFilter, setBankFilter] = useState<"all" | "pyq" | "practice">("all");
  const [open, setOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [editing, setEditing] = useState<QuestionRow | null>(null);
  const [form, setForm] = useState<QuestionInput>(EMPTY);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filtered = useMemo(
    () => bankFilter === "all" ? rows : rows.filter(r => r.bank === bankFilter),
    [rows, bankFilter]
  );

  function openCreate() {
    setEditing(null);
    setForm(EMPTY);
    setError("");
    setOpen(true);
  }

  function openEdit(row: QuestionRow) {
    setEditing(row);
    setForm({ ...row });
    setError("");
    setOpen(true);
  }

  function submit() {
    if (!form.question.trim() || !form.option_a.trim() || !form.option_b.trim() || !form.option_c.trim() || !form.option_d.trim()) {
      setError("Question and all four options are required.");
      return;
    }
    setError("");
    startTransition(async () => {
      try {
        if (editing) await updateQuestion(editing.id, form);
        else await createQuestion(form);
        setOpen(false);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong.");
      }
    });
  }

  function remove(id: string) {
    setError("");
    startTransition(async () => {
      try {
        await deleteQuestion(id);
        setConfirmDeleteId(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong.");
      }
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {(["all", "pyq", "practice"] as const).map(b => (
            <button
              key={b}
              onClick={() => setBankFilter(b)}
              className="px-3 py-1.5 rounded-lg text-sm font-semibold cursor-pointer transition-colors"
              style={{
                backgroundColor: bankFilter === b ? "#2563eb" : "rgba(var(--fg-rgb),0.05)",
                color: bankFilter === b ? "#fff" : "rgba(var(--fg-rgb),0.6)",
              }}
            >
              {b === "all" ? "All" : b === "pyq" ? "PYQ" : "Practice"}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setBulkOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold cursor-pointer"
            style={{ backgroundColor: "rgba(var(--fg-rgb),0.06)", color: "rgba(var(--fg-rgb),0.8)" }}
          >
            <Upload className="h-4 w-4" /> Bulk add
          </button>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white cursor-pointer"
            style={{ backgroundColor: "#2563eb" }}
          >
            <Plus className="h-4 w-4" /> Add question
          </button>
        </div>
      </div>

      <BulkAddDialog open={bulkOpen} onOpenChange={setBulkOpen} />

      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--surface-card)", border: "1px solid rgba(var(--fg-rgb),0.13)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ color: "rgba(var(--fg-rgb),0.4)" }}>
                {["Question", "Bank", "Exam", "Subject", "Difficulty", ""].map(h => (
                  <th key={h} className="text-left font-semibold px-4 py-3 text-xs uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(row => (
                <tr key={row.id} className="border-t" style={{ borderColor: "rgba(var(--fg-rgb),0.06)" }}>
                  <td className="px-4 py-3 max-w-sm truncate font-medium" style={{ color: "rgba(var(--fg-rgb),0.9)" }}>{row.question}</td>
                  <td className="px-4 py-3" style={{ color: "rgba(var(--fg-rgb),0.6)" }}>{row.bank === "pyq" ? "PYQ" : "Practice"}</td>
                  <td className="px-4 py-3" style={{ color: "rgba(var(--fg-rgb),0.6)" }}>{row.exam}{row.year ? ` · ${row.year}` : ""}</td>
                  <td className="px-4 py-3" style={{ color: "rgba(var(--fg-rgb),0.6)" }}>{row.subject}</td>
                  <td className="px-4 py-3" style={{ color: "rgba(var(--fg-rgb),0.6)" }}>{row.difficulty}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 justify-end">
                      <button onClick={() => openEdit(row)} className="p-1.5 rounded-lg cursor-pointer" style={{ color: "rgba(var(--fg-rgb),0.5)" }}>
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => { setError(""); setConfirmDeleteId(row.id); }} className="p-1.5 rounded-lg cursor-pointer" style={{ color: "#f87171" }}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="text-center py-10 text-sm" style={{ color: "rgba(var(--fg-rgb),0.3)" }}>No questions here yet.</p>
          )}
        </div>
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50" style={{ backgroundColor: "var(--overlay)" }} />
          <Dialog.Popup
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6 max-h-[85vh] overflow-y-auto"
            style={{ backgroundColor: "var(--surface-content)", border: "1px solid rgba(var(--fg-rgb),0.1)" }}
          >
            <div className="flex items-center justify-between mb-5">
              <Dialog.Title className="text-lg font-black" style={{ color: "rgba(var(--fg-rgb),0.95)" }}>
                {editing ? "Edit question" : "Add question"}
              </Dialog.Title>
              <Dialog.Close className="p-1 rounded-lg cursor-pointer" style={{ color: "rgba(var(--fg-rgb),0.5)" }}>
                <X className="h-4 w-4" />
              </Dialog.Close>
            </div>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <Label>Bank</Label>
                  <select className={inputClass} style={inputStyle} value={form.bank} onChange={e => setForm({ ...form, bank: e.target.value as "pyq" | "practice" })}>
                    <option value="pyq" style={{ backgroundColor: "var(--surface-content)" }}>PYQ</option>
                    <option value="practice" style={{ backgroundColor: "var(--surface-content)" }}>Practice</option>
                  </select>
                </div>
                <div>
                  <Label>Exam</Label>
                  <select className={inputClass} style={inputStyle} value={form.exam} onChange={e => setForm({ ...form, exam: e.target.value })}>
                    {EXAMS.map(x => <option key={x} value={x} style={{ backgroundColor: "var(--surface-content)" }}>{x}</option>)}
                  </select>
                </div>
                <div>
                  <Label>Subject</Label>
                  <select className={inputClass} style={inputStyle} value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
                    {SUBJECTS.map(s => <option key={s} value={s} style={{ backgroundColor: "var(--surface-content)" }}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <Label>Year</Label>
                  <input type="number" className={inputClass} style={inputStyle} value={form.year ?? ""} onChange={e => setForm({ ...form, year: e.target.value ? Number(e.target.value) : null })} />
                </div>
              </div>

              <div>
                <Label>Topic</Label>
                <input className={inputClass} style={inputStyle} value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })} placeholder="e.g. Kinematics" />
              </div>

              <div>
                <Label>Question</Label>
                <textarea rows={3} className={inputClass} style={inputStyle} value={form.question} onChange={e => setForm({ ...form, question: e.target.value })} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {(["option_a", "option_b", "option_c", "option_d"] as const).map((key, i) => (
                  <div key={key}>
                    <Label>Option {OPTIONS[i]}</Label>
                    <input className={inputClass} style={inputStyle} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Correct option</Label>
                  <select className={inputClass} style={inputStyle} value={form.correct_option} onChange={e => setForm({ ...form, correct_option: e.target.value as "A" | "B" | "C" | "D" })}>
                    {OPTIONS.map(o => <option key={o} value={o} style={{ backgroundColor: "var(--surface-content)" }}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <Label>Difficulty</Label>
                  <select className={inputClass} style={inputStyle} value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value as typeof DIFFICULTIES[number] })}>
                    {DIFFICULTIES.map(d => <option key={d} value={d} style={{ backgroundColor: "var(--surface-content)" }}>{d}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <Label>Explanation</Label>
                <textarea rows={2} className={inputClass} style={inputStyle} value={form.explanation} onChange={e => setForm({ ...form, explanation: e.target.value })} />
              </div>

              {error && <p className="text-sm font-semibold text-red-400">{error}</p>}

              <button
                onClick={submit}
                disabled={pending}
                className="mt-1 rounded-xl px-5 py-2.5 text-sm font-bold text-white cursor-pointer disabled:opacity-50"
                style={{ backgroundColor: "#2563eb" }}
              >
                {pending ? "Saving..." : editing ? "Save changes" : "Add question"}
              </button>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>

      <ConfirmDialog
        open={confirmDeleteId !== null}
        onOpenChange={o => { if (!o) { setConfirmDeleteId(null); setError(""); } }}
        title="Delete question"
        description="Delete this question? This can't be undone."
        onConfirm={() => { if (confirmDeleteId) remove(confirmDeleteId); }}
        pending={pending}
        error={error}
      />
    </div>
  );
}
