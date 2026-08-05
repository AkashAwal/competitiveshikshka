"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

const classes = ["9th", "10th", "11th", "12th", "Dropper"] as const;
const streams = ["Science (PCM)", "Science (PCB)", "Commerce", "Arts"] as const;

const inputClass =
  "w-full rounded-2xl border border-border bg-white px-5 py-4 text-base text-foreground outline-none transition-colors placeholder:text-zinc-400 focus:border-[#1c67f6]";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold uppercase tracking-wide text-zinc-500">{label}</label>
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
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-white p-12 text-center shadow-xl shadow-black/5">
        <span className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-3xl bg-green-50">
          <CheckCircle2 className="h-9 w-9 text-green-600" />
        </span>
        <p className="text-2xl font-black text-foreground">Thanks, {name.split(" ")[0]}!</p>
        <p className="text-base text-muted-foreground">We&apos;ll reach out to you shortly.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <Image
        src="/form hero_1.webp"
        alt=""
        width={288}
        height={288}
        className="absolute -top-24 left-1/2 z-10 h-48 w-48 -translate-x-1/2 object-contain animate-float"
        priority
      />

      <form
        onSubmit={handleSubmit}
        className="relative flex w-full flex-col gap-6 rounded-3xl border border-border bg-white px-8 pb-10 pt-28 sm:px-10 shadow-xl shadow-black/5"
      >
        <p className="text-center text-2xl font-black text-foreground">Tell us about you</p>

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

        <div className="grid grid-cols-2 gap-6">
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
          className="group relative mt-3 flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#1c67f6] to-[#3b82f6] px-8 py-5 text-base font-bold text-white shadow-lg shadow-[#1c67f6]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#1c67f6]/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 cursor-pointer"
        >
          <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
          {submitting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              Submit
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
