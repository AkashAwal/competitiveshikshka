"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Dialog } from "@base-ui/react/dialog";
import { Plus, Trash2, X, ArrowRight } from "lucide-react";
import { createCollege, deleteCollege, type CollegeCoreInput } from "./actions";

export interface CollegeRow {
  id: string;
  name: string;
  type: string;
  city: string | null;
  state: string | null;
  nirf_rank: number | null;
  avg_fees_lpa: number | null;
}

const COLLEGE_TYPES = ["IIT", "NIT", "IIIT", "GFTI", "State", "Private", "Medical", "Other"];

const EMPTY: CollegeCoreInput = { name: "", type: "IIT", city: "", state: "", website: "" };

const inputClass = "w-full rounded-lg px-3 py-2 text-sm outline-none";
const inputStyle = { backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.9)" };

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ color: "rgba(255,255,255,0.4)" }}>{children}</label>;
}

export function CollegesManager({ rows }: { rows: CollegeRow[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<CollegeCoreInput>(EMPTY);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function openCreate() {
    setForm(EMPTY);
    setError("");
    setOpen(true);
  }

  function submit() {
    if (!form.name.trim() || !form.city.trim() || !form.state.trim()) {
      setError("Name, city and state are required.");
      return;
    }
    setError("");
    startTransition(async () => {
      try {
        const id = await createCollege(form);
        setOpen(false);
        router.push(`/admin/colleges/${id}`);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong.");
      }
    });
  }

  function remove(row: CollegeRow) {
    if (!confirm(`Delete ${row.name}? This can't be undone.`)) return;
    startTransition(async () => {
      await deleteCollege(row.id);
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
          <Plus className="h-4 w-4" /> Add college
        </button>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: "#171b20", border: "1px solid rgba(255,255,255,0.13)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ color: "rgba(255,255,255,0.4)" }}>
                {["Name", "Type", "Location", "NIRF", "Fees (LPA)", ""].map(h => (
                  <th key={h} className="text-left font-semibold px-4 py-3 text-xs uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.id} className="border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <td className="px-4 py-3">
                    <Link href={`/admin/colleges/${row.id}`} className="flex items-center gap-1.5 font-semibold hover:underline" style={{ color: "rgba(255,255,255,0.9)" }}>
                      {row.name} <ArrowRight className="h-3.5 w-3.5" style={{ color: "rgba(255,255,255,0.3)" }} />
                    </Link>
                  </td>
                  <td className="px-4 py-3" style={{ color: "rgba(255,255,255,0.6)" }}>{row.type}</td>
                  <td className="px-4 py-3" style={{ color: "rgba(255,255,255,0.6)" }}>{row.city}, {row.state}</td>
                  <td className="px-4 py-3" style={{ color: "rgba(255,255,255,0.6)" }}>{row.nirf_rank ?? "—"}</td>
                  <td className="px-4 py-3" style={{ color: "rgba(255,255,255,0.6)" }}>{row.avg_fees_lpa ?? "—"}</td>
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
            <p className="text-center py-10 text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>No colleges added yet.</p>
          )}
        </div>
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50" style={{ backgroundColor: "rgba(0,0,0,0.6)" }} />
          <Dialog.Popup
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6"
            style={{ backgroundColor: "#1b2027", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div className="flex items-center justify-between mb-5">
              <Dialog.Title className="text-lg font-black" style={{ color: "rgba(255,255,255,0.95)" }}>Add college</Dialog.Title>
              <Dialog.Close className="p-1 rounded-lg cursor-pointer" style={{ color: "rgba(255,255,255,0.5)" }}>
                <X className="h-4 w-4" />
              </Dialog.Close>
            </div>

            <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
              Add the basics now — address, overview, courses, cutoffs and placements can be filled in on the next screen.
            </p>

            <div className="flex flex-col gap-4">
              <div>
                <Label>Name</Label>
                <input className={inputClass} style={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. IIT Bombay" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Type</Label>
                  <select className={inputClass} style={inputStyle} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                    {COLLEGE_TYPES.map(t => <option key={t} value={t} style={{ backgroundColor: "#1b2027" }}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <Label>Website</Label>
                  <input className={inputClass} style={inputStyle} value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} placeholder="https://..." />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>City</Label>
                  <input className={inputClass} style={inputStyle} value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} placeholder="e.g. Mumbai" />
                </div>
                <div>
                  <Label>State</Label>
                  <input className={inputClass} style={inputStyle} value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} placeholder="e.g. Maharashtra" />
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
