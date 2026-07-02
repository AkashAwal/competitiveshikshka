"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, GraduationCap, Crown, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const classes = ["11th", "12th", "Dropper"] as const;

const plans = [
  {
    id: "mentorship" as const,
    icon: GraduationCap,
    title: "Mentorship only",
    desc: "Standalone weekly mentor guidance, no other add-ons.",
  },
  {
    id: "premium" as const,
    icon: Crown,
    title: "Premium",
    desc: "Mentorship bundled with the full CompetitiveShiksha platform.",
  },
];

interface Props {
  userId: string | null;
  initialName: string;
  initialEmail: string;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-[#2563eb]";

export function ApplyForm({ userId, initialName, initialEmail }: Props) {
  const [fullName, setFullName] = useState(initialName);
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState(initialEmail);
  const [city, setCity] = useState("");
  const [studentClass, setStudentClass] = useState<typeof classes[number] | "">("");
  const [plan, setPlan] = useState<typeof plans[number]["id"] | "">("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const isValid =
    fullName.trim().length > 1 &&
    /^[0-9+\-\s]{7,15}$/.test(contactNo.trim()) &&
    /^\S+@\S+\.\S+$/.test(email.trim()) &&
    city.trim().length > 1 &&
    studentClass !== "" &&
    plan !== "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || submitting) return;

    setSubmitting(true);
    setError("");

    const supabase = createClient();
    const { error: insertError } = await supabase.from("mentorship_applications").insert({
      full_name: fullName.trim(),
      contact_no: contactNo.trim(),
      email: email.trim(),
      city: city.trim(),
      class: studentClass,
      plan,
      user_id: userId,
    });

    setSubmitting(false);

    if (insertError) {
      setError("Something went wrong. Please try again.");
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-white p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50">
          <CheckCircle2 className="h-7 w-7 text-green-600" />
        </span>
        <div>
          <p className="text-lg font-black text-zinc-900">Thank you for applying!</p>
          <p className="mt-1 text-sm text-muted-foreground">
            We will contact you shortly — usually within 24 hours.
          </p>
        </div>
        <Link href="/" className={cn("inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-colors hover:bg-zinc-900")} style={{ backgroundColor: "#2563eb" }}>
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-xl border border-border bg-white p-6 sm:p-8">
      <Field label="Full name">
        <input type="text" required value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Your full name" className={inputClass} />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Contact number">
          <input type="tel" required value={contactNo} onChange={e => setContactNo(e.target.value)} placeholder="+91 98765 43210" className={inputClass} />
        </Field>
        <Field label="Email">
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className={inputClass} />
        </Field>
      </div>

      <Field label="City">
        <input type="text" required value={city} onChange={e => setCity(e.target.value)} placeholder="e.g. Jaipur" className={inputClass} />
      </Field>

      <Field label="Class">
        <div className="grid grid-cols-3 gap-2">
          {classes.map(c => (
            <button
              key={c}
              type="button"
              onClick={() => setStudentClass(c)}
              className={cn(
                "rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors cursor-pointer",
                studentClass === c
                  ? "border-[#2563eb] bg-[#2563eb] text-white"
                  : "border-border bg-white text-zinc-700 hover:border-[#2563eb]"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Plan">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {plans.map(({ id, icon: Icon, title, desc }) => (
            <button
              key={id}
              type="button"
              onClick={() => setPlan(id)}
              className={cn(
                "flex flex-col gap-2 rounded-xl border p-4 text-left transition-colors cursor-pointer",
                plan === id ? "border-[#2563eb] bg-[#2563eb]/5" : "border-border bg-white hover:border-[#2563eb]"
              )}
            >
              <span className={cn("flex h-8 w-8 items-center justify-center rounded-lg", plan === id ? "bg-[#2563eb]/15" : "bg-zinc-100")}>
                <Icon className={cn("h-4 w-4", plan === id ? "text-[#2563eb]" : "text-zinc-500")} />
              </span>
              <span className="text-sm font-bold text-zinc-900">{title}</span>
              <span className="text-xs text-muted-foreground leading-relaxed">{desc}</span>
            </button>
          ))}
        </div>
      </Field>

      {error && <p className="text-sm font-semibold text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={!isValid || submitting}
        className="mt-2 flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-opacity disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        style={{ backgroundColor: "#2563eb" }}
      >
        {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {submitting ? "Submitting..." : "Submit application"}
      </button>
    </form>
  );
}
