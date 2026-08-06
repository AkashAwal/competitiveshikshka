"use client";

import { useState, useTransition } from "react";
import { Check } from "lucide-react";
import { updatePostDetails, type PostDetailsInput } from "../actions";

const inputClass = "w-full rounded-lg px-3 py-2 text-sm outline-none";
const inputStyle = { backgroundColor: "rgba(var(--fg-rgb),0.05)", border: "1px solid rgba(var(--fg-rgb),0.08)", color: "rgba(var(--fg-rgb),0.9)" };
const card = { background: "var(--surface-card)", border: "1px solid rgba(var(--fg-rgb),0.13)" };

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ color: "rgba(var(--fg-rgb),0.4)" }}>{children}</label>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-6 flex flex-col gap-4" style={card}>
      <p className="text-sm font-bold" style={{ color: "rgba(var(--fg-rgb),0.9)" }}>{title}</p>
      {children}
    </div>
  );
}

export interface PostDetails extends PostDetailsInput {
  id: string;
}

export function PostEditForm({ post }: { post: PostDetails }) {
  const [form, setForm] = useState<PostDetailsInput>({
    title: post.title ?? "",
    category: post.category ?? "",
    author_name: post.author_name ?? "",
    excerpt: post.excerpt ?? "",
    cover_image_url: post.cover_image_url ?? "",
    content: post.content ?? "",
    published: post.published ?? false,
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function save() {
    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }
    setError("");
    setSaved(false);
    startTransition(async () => {
      try {
        await updatePostDetails(post.id, form);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong.");
      }
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <Section title="Basics">
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
        <div>
          <Label>Cover image URL</Label>
          <input className={inputClass} style={inputStyle} value={form.cover_image_url} onChange={e => setForm({ ...form, cover_image_url: e.target.value })} placeholder="https://..." />
        </div>
      </Section>

      <Section title="Excerpt">
        <textarea rows={2} className={inputClass} style={inputStyle} value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} placeholder="One or two sentences shown on the blog listing and homepage." />
      </Section>

      <Section title="Content">
        <textarea rows={16} className={inputClass} style={inputStyle} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="Write the full post. Leave a blank line between paragraphs." />
      </Section>

      <Section title="Publishing">
        <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer" style={{ color: "rgba(var(--fg-rgb),0.9)" }}>
          <input type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} className="h-4 w-4 cursor-pointer" />
          Published — visible on the public blog and homepage
        </label>
      </Section>

      {error && <p className="text-sm font-semibold text-red-400">{error}</p>}

      <button
        onClick={save}
        disabled={pending}
        className="self-start flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white cursor-pointer disabled:opacity-50"
        style={{ backgroundColor: saved ? "#16a34a" : "#1c67f6" }}
      >
        {saved && <Check className="h-4 w-4" />}
        {pending ? "Saving..." : saved ? "Saved" : "Save changes"}
      </button>
    </div>
  );
}
