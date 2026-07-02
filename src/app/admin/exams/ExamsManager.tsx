"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Dialog } from "@base-ui/react/dialog";
import { Plus, Trash2, X, ArrowRight } from "lucide-react";
import { createExam, deleteExam, type ExamCoreInput } from "./actions";

export interface ExamRow {
  id: string;
  name: string;
  category: string;
  conducting_body: string | null;
}

const CATEGORIES = ["Engineering", "Medical", "Other"];

const EMPTY: ExamCoreInput = { name: "", category: "Engineering", conducting_body: "" };

const inputClass = "w-full rounded-lg px-3 py-2 text-sm outline-none";
const inputStyle = { backgroundColor: "rgba(var(--fg-rgb),0.05)", border: "1px solid rgba(var(--fg-rgb),0.08)", color: "rgba(var(--fg-rgb),0.9)" };

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ color: "rgba(var(--fg-rgb),0.4)" }}>{children}</label>;
}

export function ExamsManager({ rows }: { rows: ExamRow[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<ExamCoreInput>(EMPTY);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function openCreate() {
    setForm(EMPTY);
    setError("");
    setOpen(true);
  }

  function submit() {
    if (!form.name.trim()) {
      setError("Exam name is required.");
      return;
    }
    setError("");
    startTransition(async () => {
      try {
        const id = await createExam(form);
        setOpen(false);
        router.push(`/admin/exams/${id}`);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong.");
      }
    });
  }

  function remove(row: ExamRow) {
    if (!confirm(`Delete ${row.name}? This can't be undone.`)) return;
    startTransition(async () => {
      await deleteExam(row.id);
    });
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white cursor-pointer"
          style={{ backgroundColor: "#2563eb" }}
        >
          <Plus className="h-4 w-4" /> Add exam
        </button>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--surface-card)", border: "1px solid rgba(var(--fg-rgb),0.13)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ color: "rgba(var(--fg-rgb),0.4)" }}>
                {["Name", "Category", "Conducting body", ""].map(h => (
                  <th key={h} className="text-left font-semibold px-4 py-3 text-xs uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.id} className="border-t" style={{ borderColor: "rgba(var(--fg-rgb),0.06)" }}>
                  <td className="px-4 py-3">
                    <Link href={`/admin/exams/${row.id}`} className="flex items-center gap-1.5 font-semibold hover:underline" style={{ color: "rgba(var(--fg-rgb),0.9)" }}>
                      {row.name} <ArrowRight className="h-3.5 w-3.5" style={{ color: "rgba(var(--fg-rgb),0.3)" }} />
                    </Link>
                  </td>
                  <td className="px-4 py-3" style={{ color: "rgba(var(--fg-rgb),0.6)" }}>{row.category}</td>
                  <td className="px-4 py-3" style={{ color: "rgba(var(--fg-rgb),0.6)" }}>{row.conducting_body || "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end">
                      <button onClick={() => remove(row)} className="p-1.5 rounded-lg cursor-pointer" style={{ color: "#f87171" }}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && (
            <p className="text-center py-10 text-sm" style={{ color: "rgba(var(--fg-rgb),0.3)" }}>No exams added yet.</p>
          )}
        </div>
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50" style={{ backgroundColor: "var(--overlay)" }} />
          <Dialog.Popup
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6"
            style={{ backgroundColor: "var(--surface-content)", border: "1px solid rgba(var(--fg-rgb),0.1)" }}
          >
            <div className="flex items-center justify-between mb-5">
              <Dialog.Title className="text-lg font-black" style={{ color: "rgba(var(--fg-rgb),0.95)" }}>Add exam</Dialog.Title>
              <Dialog.Close className="p-1 rounded-lg cursor-pointer" style={{ color: "rgba(var(--fg-rgb),0.5)" }}>
                <X className="h-4 w-4" />
              </Dialog.Close>
            </div>

            <p className="text-xs mb-4" style={{ color: "rgba(var(--fg-rgb),0.35)" }}>
              Add the basics now — about, syllabus, cutoffs and tips can be filled in on the next screen.
            </p>

            <div className="flex flex-col gap-4">
              <div>
                <Label>Name</Label>
                <input className={inputClass} style={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. JEE Main" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <select className={inputClass} style={inputStyle} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    {CATEGORIES.map(c => <option key={c} value={c} style={{ backgroundColor: "var(--surface-content)" }}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <Label>Conducting body</Label>
                  <input className={inputClass} style={inputStyle} value={form.conducting_body} onChange={e => setForm({ ...form, conducting_body: e.target.value })} placeholder="e.g. NTA" />
                </div>
              </div>

              {error && <p className="text-sm font-semibold text-red-400">{error}</p>}

              <button
                onClick={submit}
                disabled={pending}
                className="mt-1 rounded-xl px-5 py-2.5 text-sm font-bold text-white cursor-pointer disabled:opacity-50"
                style={{ backgroundColor: "#2563eb" }}
              >
                {pending ? "Creating..." : "Create & continue"}
              </button>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
