"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

const classes = ["9th", "10th", "11th", "12th", "Dropper"] as const;
const streams = ["Science (PCM)", "Science (PCB)", "Commerce", "Arts"] as const;

const inputClass =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-zinc-400 focus:border-[#1c67f6]";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{label}</label>
      {children}
    </div>
  );
}

export function LeadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studentClass, setStudentClass] = useState<typeof classes[number] | "">("");
  const [stream, setStream] = useState<typeof streams[number] | "">("");
  const [phone, setPhone] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isValid =
    name.trim().length > 1 &&
    /^\S+@\S+\.\S+$/.test(email.trim()) &&
    studentClass !== "" &&
    stream !== "" &&
    /^[0-9+\-\s]{7,15}$/.test(phone.trim());

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || submitting) return;

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-8 text-center shadow-xl shadow-black/5">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50">
          <CheckCircle2 className="h-6 w-6 text-green-600" />
        </span>
        <p className="text-lg font-black text-foreground">Thanks, {name.split(" ")[0]}!</p>
        <p className="text-sm text-muted-foreground">We&apos;ll reach out to you shortly.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-4 rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-xl shadow-black/5"
    >
      <div>
        <p className="text-lg font-black text-foreground">Get started for free</p>
        <p className="text-sm text-muted-foreground">Tell us a bit about yourself.</p>
      </div>

      <Field label="Name">
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          className={inputClass}
        />
      </Field>

      <Field label="Email">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={inputClass}
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Class">
          <select
            required
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value as typeof classes[number])}
            className={inputClass}
          >
            <option value="" disabled>
              Select
            </option>
            {classes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Stream">
          <select
            required
            value={stream}
            onChange={(e) => setStream(e.target.value as typeof streams[number])}
            className={inputClass}
          >
            <option value="" disabled>
              Select
            </option>
            {streams.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Phone number">
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+91 98765 43210"
          className={inputClass}
        />
      </Field>

      <button
        type="submit"
        disabled={!isValid || submitting}
        className="group relative mt-2 flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#1c67f6] to-[#3b82f6] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#1c67f6]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#1c67f6]/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 cursor-pointer"
      >
        <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
        {submitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Submit
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}
