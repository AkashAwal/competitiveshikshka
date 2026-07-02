"use client";

import { useState, useTransition } from "react";
import { Check } from "lucide-react";
import { updateExamDetails, type ExamDetailsInput } from "../actions";

const inputClass = "w-full rounded-lg px-3 py-2 text-sm outline-none";
const inputStyle = { backgroundColor: "rgba(var(--fg-rgb),0.05)", border: "1px solid rgba(var(--fg-rgb),0.08)", color: "rgba(var(--fg-rgb),0.9)" };
const card = { background: "var(--surface-card)", border: "1px solid rgba(var(--fg-rgb),0.13)" };

const CATEGORIES = ["Engineering", "Medical", "Other"];

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

export interface ExamDetails extends ExamDetailsInput {
  id: string;
}

export function ExamEditForm({ exam }: { exam: ExamDetails }) {
  const [form, setForm] = useState<ExamDetailsInput>({
    full_name: exam.full_name ?? "",
    category: exam.category ?? "Engineering",
    conducting_body: exam.conducting_body ?? "",
    about: exam.about ?? "",
    marking_scheme: exam.marking_scheme ?? "",
    application_window: exam.application_window ?? "",
    exam_dates: exam.exam_dates ?? "",
    official_link: exam.official_link ?? "",
    eligible_institutes: exam.eligible_institutes ?? "",
    recent_cutoffs: exam.recent_cutoffs ?? "",
    syllabus: exam.syllabus ?? "",
    tips_and_tricks: exam.tips_and_tricks ?? "",
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function save() {
    setError("");
    setSaved(false);
    startTransition(async () => {
      try {
        await updateExamDetails(exam.id, form);
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Full name</Label>
            <input className={inputClass} style={inputStyle} value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} placeholder="e.g. Joint Entrance Examination Main" />
          </div>
          <div>
            <Label>Category</Label>
            <select className={inputClass} style={inputStyle} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              {CATEGORIES.map(c => <option key={c} value={c} style={{ backgroundColor: "var(--surface-content)" }}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Conducting body</Label>
            <input className={inputClass} style={inputStyle} value={form.conducting_body} onChange={e => setForm({ ...form, conducting_body: e.target.value })} placeholder="e.g. National Testing Agency (NTA)" />
          </div>
          <div>
            <Label>Official link</Label>
            <input className={inputClass} style={inputStyle} value={form.official_link} onChange={e => setForm({ ...form, official_link: e.target.value })} placeholder="https://..." />
          </div>
        </div>
      </Section>

      <Section title="About">
        <textarea rows={4} className={inputClass} style={inputStyle} value={form.about} onChange={e => setForm({ ...form, about: e.target.value })} placeholder="What this exam is, who takes it, why it matters..." />
      </Section>

      <Section title="Dates">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>When to apply</Label>
            <textarea rows={2} className={inputClass} style={inputStyle} value={form.application_window} onChange={e => setForm({ ...form, application_window: e.target.value })} placeholder="e.g. Session 1: Nov–Dec, Session 2: Feb–Mar" />
          </div>
          <div>
            <Label>Expected exam dates</Label>
            <textarea rows={2} className={inputClass} style={inputStyle} value={form.exam_dates} onChange={e => setForm({ ...form, exam_dates: e.target.value })} placeholder="e.g. Session 1: Jan, Session 2: Apr" />
          </div>
        </div>
      </Section>

      <Section title="Marking scheme">
        <textarea rows={2} className={inputClass} style={inputStyle} value={form.marking_scheme} onChange={e => setForm({ ...form, marking_scheme: e.target.value })} placeholder="e.g. +4 for correct, -1 for incorrect, 0 unattempted" />
      </Section>

      <Section title="Eligible institutes">
        <textarea rows={3} className={inputClass} style={inputStyle} value={form.eligible_institutes} onChange={e => setForm({ ...form, eligible_institutes: e.target.value })} placeholder="Institutes a student can get into using this score" />
      </Section>

      <Section title="Recent cutoffs">
        <textarea rows={3} className={inputClass} style={inputStyle} value={form.recent_cutoffs} onChange={e => setForm({ ...form, recent_cutoffs: e.target.value })} />
      </Section>

      <Section title="Syllabus">
        <textarea rows={4} className={inputClass} style={inputStyle} value={form.syllabus} onChange={e => setForm({ ...form, syllabus: e.target.value })} />
      </Section>

      <Section title="Tips & tricks">
        <textarea rows={4} className={inputClass} style={inputStyle} value={form.tips_and_tricks} onChange={e => setForm({ ...form, tips_and_tricks: e.target.value })} />
      </Section>

      {error && <p className="text-sm font-semibold text-red-400">{error}</p>}

      <button
        onClick={save}
        disabled={pending}
        className="self-start flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white cursor-pointer disabled:opacity-50"
        style={{ backgroundColor: saved ? "#16a34a" : "#2563eb" }}
      >
        {saved && <Check className="h-4 w-4" />}
        {pending ? "Saving..." : saved ? "Saved" : "Save changes"}
      </button>
    </div>
  );
}
