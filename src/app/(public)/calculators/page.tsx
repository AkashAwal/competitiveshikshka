import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Rank & Percentile Calculator — JEE, NEET & Govt Exams",
  description: "Estimate your rank, percentile and realistic college chances based on your expected marks.",
  alternates: { canonical: "/calculators" },
};

export default function CalculatorsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <h1 className="text-5xl font-black tracking-tight text-foreground mb-2">
        Rank <span className="text-primary">Calculator</span>
      </h1>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        Enter your marks and instantly estimate your rank, percentile and college chances.
      </p>

      <div className="rounded-2xl border border-border bg-card p-10 flex flex-col items-center text-center gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <Calculator className="h-7 w-7 text-primary" />
        </span>
        <h2 className="text-xl font-bold text-foreground">Calculators are launching soon</h2>
        <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
          We&apos;re building rank and percentile calculators backed by real cutoff data
          from our <Link href="/colleges" className="text-primary font-semibold hover:underline">colleges</Link> and{" "}
          <Link href="/exams" className="text-primary font-semibold hover:underline">exams</Link> database.
        </p>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-primary mt-2">
          <Sparkles className="h-3.5 w-3.5" /> In the meantime, talk to a mentor for a personalised estimate
        </span>
      </div>
    </div>
  );
}
