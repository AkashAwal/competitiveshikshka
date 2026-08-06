"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Dialog } from "@base-ui/react/dialog";
import { Plus, Search, Trash2, X, ArrowRight } from "lucide-react";
import { createPost, deletePost, type PostCoreInput } from "./actions";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

export interface PostRow {
  id: string;
  title: string;
  category: string | null;
  author_name: string | null;
  published: boolean;
}

const EMPTY: PostCoreInput = { title: "", category: "", author_name: "" };

const inputClass = "w-full rounded-lg px-3 py-2 text-sm outline-none";
const inputStyle = { backgroundColor: "rgba(var(--fg-rgb),0.05)", border: "1px solid rgba(var(--fg-rgb),0.08)", color: "rgba(var(--fg-rgb),0.9)" };

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ color: "rgba(var(--fg-rgb),0.4)" }}>{children}</label>;
}

export function BlogManager({ rows }: { rows: PostRow[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<PostCoreInput>(EMPTY);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(r =>
      r.title.toLowerCase().includes(q) ||
      (r.category ?? "").toLowerCase().includes(q)
    );
  }, [rows, query]);

  function openCreate() {
    setForm(EMPTY);
    setError("");
    setOpen(true);
  }

  function submit() {
    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }
    setError("");
    startTransition(async () => {
      try {
        const id = await createPost(form);
        setOpen(false);
        router.push(`/admin/blog/${id}`);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong.");
      }
    });
  }

  function remove(id: string) {
    setError("");
    startTransition(async () => {
      try {
        await deletePost(id);
        setConfirmDeleteId(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong.");
      }
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "rgba(var(--fg-rgb),0.3)" }} />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search title, category..."
            className="w-full rounded-lg pl-9 pr-3 py-2 text-sm outline-none"
            style={{ backgroundColor: "rgba(var(--fg-rgb),0.05)", border: "1px solid rgba(var(--fg-rgb),0.08)", color: "rgba(var(--fg-rgb),0.9)" }}
          />
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white cursor-pointer shrink-0"
          style={{ backgroundColor: "#1c67f6" }}
        >
          <Plus className="h-4 w-4" /> Add post
        </button>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--surface-card)", border: "1px solid rgba(var(--fg-rgb),0.13)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ color: "rgba(var(--fg-rgb),0.4)" }}>
                {["Title", "Category", "Author", "Status", ""].map(h => (
                  <th key={h} className="text-left font-semibold px-4 py-3 text-xs uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(row => (
                <tr key={row.id} className="border-t" style={{ borderColor: "rgba(var(--fg-rgb),0.06)" }}>
                  <td className="px-4 py-3">
                    <Link href={`/admin/blog/${row.id}`} className="flex items-center gap-1.5 font-semibold hover:underline" style={{ color: "rgba(var(--fg-rgb),0.9)" }}>
                      {row.title} <ArrowRight className="h-3.5 w-3.5" style={{ color: "rgba(var(--fg-rgb),0.3)" }} />
                    </Link>
                  </td>
                  <td className="px-4 py-3" style={{ color: "rgba(var(--fg-rgb),0.6)" }}>{row.category || "—"}</td>
                  <td className="px-4 py-3" style={{ color: "rgba(var(--fg-rgb),0.6)" }}>{row.author_name || "—"}</td>
                  <td className="px-4 py-3">
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: row.published ? "rgba(22,163,74,0.1)" : "rgba(var(--fg-rgb),0.06)",
                        color: row.published ? "#16a34a" : "rgba(var(--fg-rgb),0.5)",
                      }}
                    >
                      {row.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end">
                      <button onClick={() => { setError(""); setConfirmDeleteId(row.id); }} className="p-1.5 rounded-full cursor-pointer" style={{ color: "#f87171" }}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="text-center py-10 text-sm" style={{ color: "rgba(var(--fg-rgb),0.3)" }}>
              {rows.length === 0 ? "No posts added yet." : "No posts match your search."}
            </p>
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
              <Dialog.Title className="text-lg font-black" style={{ color: "rgba(var(--fg-rgb),0.95)" }}>Add post</Dialog.Title>
              <Dialog.Close className="p-1 rounded-full cursor-pointer" style={{ color: "rgba(var(--fg-rgb),0.5)" }}>
                <X className="h-4 w-4" />
              </Dialog.Close>
            </div>

            <p className="text-xs mb-4" style={{ color: "rgba(var(--fg-rgb),0.35)" }}>
              Add the basics now — excerpt, cover image and content can be filled in on the next screen.
            </p>

            <div className="flex flex-col gap-4">
              <div>
                <Label>Title</Label>
                <input className={inputClass} style={inputStyle} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. How to read JEE cutoff trends" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <input className={inputClass} style={inputStyle} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="e.g. Exam Tips" />
                </div>
                <div>
                  <Label>Author</Label>
                  <input className={inputClass} style={inputStyle} value={form.author_name} onChange={e => setForm({ ...form, author_name: e.target.value })} placeholder="e.g. Team CompetitiveShiksha" />
                </div>
              </div>

              {error && <p className="text-sm font-semibold text-red-400">{error}</p>}

              <button
                onClick={submit}
                disabled={pending}
                className="mt-1 rounded-full px-5 py-2.5 text-sm font-bold text-white cursor-pointer disabled:opacity-50"
                style={{ backgroundColor: "#1c67f6" }}
              >
                {pending ? "Creating..." : "Create & continue"}
              </button>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>

      <ConfirmDialog
        open={confirmDeleteId !== null}
        onOpenChange={o => { if (!o) { setConfirmDeleteId(null); setError(""); } }}
        title="Delete post"
        description="Delete this post? This can't be undone."
        onConfirm={() => { if (confirmDeleteId) remove(confirmDeleteId); }}
        pending={pending}
        error={error}
      />
    </div>
  );
}
