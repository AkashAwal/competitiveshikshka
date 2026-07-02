"use client";

import { useState, useTransition } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { createCourse, updateCourse, deleteCourse, type CourseInput } from "../actions";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

export interface CourseRow extends CourseInput {
  id: string;
}

const EMPTY: CourseInput = {
  name: "", duration: "", eligibility: "", seats: null,
  fees_total_lpa: null, fees_details: "", cutoff_general: "", cutoff_details: "",
};

const inputClass = "w-full rounded-lg px-3 py-2 text-sm outline-none";
const inputStyle = { backgroundColor: "rgba(var(--fg-rgb),0.05)", border: "1px solid rgba(var(--fg-rgb),0.08)", color: "rgba(var(--fg-rgb),0.9)" };

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ color: "rgba(var(--fg-rgb),0.4)" }}>{children}</label>;
}

export function CoursesManager({ collegeId, rows }: { collegeId: string; rows: CourseRow[] }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<CourseRow | null>(null);
  const [form, setForm] = useState<CourseInput>(EMPTY);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  function openCreate() {
    setEditing(null);
    setForm(EMPTY);
    setError("");
    setOpen(true);
  }

  function openEdit(row: CourseRow) {
    setEditing(row);
    setForm({ ...row });
    setError("");
    setOpen(true);
  }

  function submit() {
    if (!form.name.trim()) {
      setError("Course name is required.");
      return;
    }
    setError("");
    startTransition(async () => {
      try {
        if (editing) await updateCourse(editing.id, collegeId, form);
        else await createCourse(collegeId, form);
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
        await deleteCourse(id, collegeId);
        setConfirmDeleteId(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong.");
      }
    });
  }

  return (
    <div className="rounded-2xl p-6 flex flex-col gap-4" style={{ background: "var(--surface-card)", border: "1px solid rgba(var(--fg-rgb),0.13)" }}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold" style={{ color: "rgba(var(--fg-rgb),0.9)" }}>Courses & seats</p>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white cursor-pointer"
          style={{ backgroundColor: "#2563eb" }}
        >
          <Plus className="h-3.5 w-3.5" /> Add course
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid rgba(var(--fg-rgb),0.06)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ color: "rgba(var(--fg-rgb),0.4)" }}>
              {["Course", "Duration", "Seats", "Cutoff", "Fees (LPA)", ""].map(h => (
                <th key={h} className="text-left font-semibold px-3 py-2.5 text-xs uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.id} className="border-t" style={{ borderColor: "rgba(var(--fg-rgb),0.06)" }}>
                <td className="px-3 py-2.5 font-medium" style={{ color: "rgba(var(--fg-rgb),0.85)" }}>{row.name}</td>
                <td className="px-3 py-2.5" style={{ color: "rgba(var(--fg-rgb),0.55)" }}>{row.duration || "—"}</td>
                <td className="px-3 py-2.5" style={{ color: "rgba(var(--fg-rgb),0.55)" }}>{row.seats ?? "—"}</td>
                <td className="px-3 py-2.5" style={{ color: "rgba(var(--fg-rgb),0.55)" }}>{row.cutoff_general || "—"}</td>
                <td className="px-3 py-2.5" style={{ color: "rgba(var(--fg-rgb),0.55)" }}>{row.fees_total_lpa ?? "—"}</td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-1 justify-end">
                    <button onClick={() => openEdit(row)} className="p-1 rounded-lg cursor-pointer" style={{ color: "rgba(var(--fg-rgb),0.5)" }}>
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => { setError(""); setConfirmDeleteId(row.id); }} className="p-1 rounded-lg cursor-pointer" style={{ color: "#f87171" }}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && (
          <p className="text-center py-8 text-sm" style={{ color: "rgba(var(--fg-rgb),0.3)" }}>No courses added yet.</p>
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
                {editing ? "Edit course" : "Add course"}
              </Dialog.Title>
              <Dialog.Close className="p-1 rounded-lg cursor-pointer" style={{ color: "rgba(var(--fg-rgb),0.5)" }}>
                <X className="h-4 w-4" />
              </Dialog.Close>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <Label>Course name</Label>
                <input className={inputClass} style={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. B.Tech Computer Science and Engineering" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Duration</Label>
                  <input className={inputClass} style={inputStyle} value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} placeholder="4 years" />
                </div>
                <div>
                  <Label>Seats</Label>
                  <input type="number" className={inputClass} style={inputStyle} value={form.seats ?? ""} onChange={e => setForm({ ...form, seats: e.target.value ? Number(e.target.value) : null })} />
                </div>
              </div>

              <div>
                <Label>Eligibility</Label>
                <input className={inputClass} style={inputStyle} value={form.eligibility} onChange={e => setForm({ ...form, eligibility: e.target.value })} placeholder="10+2 with PCM, JEE Advanced" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Cutoff (headline)</Label>
                  <input className={inputClass} style={inputStyle} value={form.cutoff_general} onChange={e => setForm({ ...form, cutoff_general: e.target.value })} placeholder="e.g. AIR 1200 or 98.5%ile" />
                </div>
                <div>
                  <Label>Fees total (LPA)</Label>
                  <input type="number" step="0.1" className={inputClass} style={inputStyle} value={form.fees_total_lpa ?? ""} onChange={e => setForm({ ...form, fees_total_lpa: e.target.value ? Number(e.target.value) : null })} />
                </div>
              </div>

              <div>
                <Label>Cutoff details</Label>
                <textarea rows={2} className={inputClass} style={inputStyle} value={form.cutoff_details} onChange={e => setForm({ ...form, cutoff_details: e.target.value })} placeholder="Category-wise breakdown — OBC: ..., SC: ..., ST: ..., EWS: ..." />
              </div>

              <div>
                <Label>Fees details</Label>
                <textarea rows={2} className={inputClass} style={inputStyle} value={form.fees_details} onChange={e => setForm({ ...form, fees_details: e.target.value })} placeholder="Tuition, hostel, mess breakdown..." />
              </div>

              {error && <p className="text-sm font-semibold text-red-400">{error}</p>}

              <button
                onClick={submit}
                disabled={pending}
                className="mt-1 rounded-xl px-5 py-2.5 text-sm font-bold text-white cursor-pointer disabled:opacity-50"
                style={{ backgroundColor: "#2563eb" }}
              >
                {pending ? "Saving..." : editing ? "Save changes" : "Add course"}
              </button>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>

      <ConfirmDialog
        open={confirmDeleteId !== null}
        onOpenChange={o => { if (!o) { setConfirmDeleteId(null); setError(""); } }}
        title="Delete course"
        description="Delete this course? This can't be undone."
        onConfirm={() => { if (confirmDeleteId) remove(confirmDeleteId); }}
        pending={pending}
        error={error}
      />
    </div>
  );
}
