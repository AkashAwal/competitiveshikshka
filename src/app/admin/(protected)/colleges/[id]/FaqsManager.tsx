"use client";

import { useState, useTransition } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { createFaq, updateFaq, deleteFaq, type FaqInput } from "../actions";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

export interface FaqRow extends FaqInput {
  id: string;
}

const EMPTY: FaqInput = { question: "", answer: "", sort_order: 0 };

const inputClass = "w-full rounded-lg px-3 py-2 text-sm outline-none";
const inputStyle = { backgroundColor: "rgba(var(--fg-rgb),0.05)", border: "1px solid rgba(var(--fg-rgb),0.08)", color: "rgba(var(--fg-rgb),0.9)" };

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ color: "rgba(var(--fg-rgb),0.4)" }}>{children}</label>;
}

export function FaqsManager({ collegeId, rows }: { collegeId: string; rows: FaqRow[] }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<FaqRow | null>(null);
  const [form, setForm] = useState<FaqInput>(EMPTY);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const sorted = [...rows].sort((a, b) => a.sort_order - b.sort_order);

  function openCreate() {
    setEditing(null);
    setForm({ ...EMPTY, sort_order: rows.length });
    setError("");
    setOpen(true);
  }

  function openEdit(row: FaqRow) {
    setEditing(row);
    setForm({ ...row });
    setError("");
    setOpen(true);
  }

  function submit() {
    if (!form.question.trim() || !form.answer.trim()) {
      setError("Question and answer are required.");
      return;
    }
    setError("");
    startTransition(async () => {
      try {
        if (editing) await updateFaq(editing.id, collegeId, form);
        else await createFaq(collegeId, form);
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
        await deleteFaq(id, collegeId);
        setConfirmDeleteId(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong.");
      }
    });
  }

  return (
    <div className="rounded-2xl p-6 flex flex-col gap-4" style={{ background: "var(--surface-card)", border: "1px solid rgba(var(--fg-rgb),0.13)" }}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold" style={{ color: "rgba(var(--fg-rgb),0.9)" }}>FAQs</p>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white cursor-pointer"
          style={{ backgroundColor: "#1c67f6" }}
        >
          <Plus className="h-3.5 w-3.5" /> Add FAQ
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {sorted.map(row => (
          <div key={row.id} className="rounded-xl p-3 flex items-start justify-between gap-3" style={{ border: "1px solid rgba(var(--fg-rgb),0.06)" }}>
            <div className="min-w-0">
              <p className="text-sm font-semibold" style={{ color: "rgba(var(--fg-rgb),0.85)" }}>{row.question}</p>
              <p className="text-sm mt-1 line-clamp-2" style={{ color: "rgba(var(--fg-rgb),0.5)" }}>{row.answer}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => openEdit(row)} className="p-1 rounded-full cursor-pointer" style={{ color: "rgba(var(--fg-rgb),0.5)" }}>
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => { setError(""); setConfirmDeleteId(row.id); }} className="p-1 rounded-full cursor-pointer" style={{ color: "#f87171" }}>
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
        {rows.length === 0 && (
          <p className="text-center py-8 text-sm" style={{ color: "rgba(var(--fg-rgb),0.3)" }}>No FAQs added yet.</p>
        )}
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50" style={{ backgroundColor: "var(--overlay)" }} />
          <Dialog.Popup
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6 max-h-[85vh] overflow-y-auto"
            style={{ backgroundColor: "var(--surface-content)", border: "1px solid rgba(var(--fg-rgb),0.1)" }}
          >
            <div className="flex items-center justify-between mb-5">
              <Dialog.Title className="text-lg font-black" style={{ color: "rgba(var(--fg-rgb),0.95)" }}>
                {editing ? "Edit FAQ" : "Add FAQ"}
              </Dialog.Title>
              <Dialog.Close className="p-1 rounded-full cursor-pointer" style={{ color: "rgba(var(--fg-rgb),0.5)" }}>
                <X className="h-4 w-4" />
              </Dialog.Close>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <Label>Question</Label>
                <input className={inputClass} style={inputStyle} value={form.question} onChange={e => setForm({ ...form, question: e.target.value })} placeholder="e.g. Is hostel accommodation guaranteed?" />
              </div>
              <div>
                <Label>Answer</Label>
                <textarea rows={4} className={inputClass} style={inputStyle} value={form.answer} onChange={e => setForm({ ...form, answer: e.target.value })} />
              </div>
              <div>
                <Label>Order</Label>
                <input type="number" className={inputClass} style={inputStyle} value={form.sort_order} onChange={e => setForm({ ...form, sort_order: Number(e.target.value) })} />
              </div>

              {error && <p className="text-sm font-semibold text-red-400">{error}</p>}

              <button
                onClick={submit}
                disabled={pending}
                className="mt-1 rounded-full px-5 py-2.5 text-sm font-bold text-white cursor-pointer disabled:opacity-50"
                style={{ backgroundColor: "#1c67f6" }}
              >
                {pending ? "Saving..." : editing ? "Save changes" : "Add FAQ"}
              </button>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>

      <ConfirmDialog
        open={confirmDeleteId !== null}
        onOpenChange={o => { if (!o) { setConfirmDeleteId(null); setError(""); } }}
        title="Delete FAQ"
        description="Delete this FAQ? This can't be undone."
        onConfirm={() => { if (confirmDeleteId) remove(confirmDeleteId); }}
        pending={pending}
        error={error}
      />
    </div>
  );
}
