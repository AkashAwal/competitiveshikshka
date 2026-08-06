import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";

export function FinalCtaSection() {
  return (
    <section className="w-full bg-primary px-4 sm:px-6 py-20 flex flex-col items-center gap-6 text-center">
      <GraduationCap className="h-8 w-8 text-white/70" />
      <h2 className="max-w-xl text-4xl font-black leading-tight text-white sm:text-5xl">
        Ready to start your prep?
      </h2>
      <p className="max-w-md text-sm leading-relaxed text-white/70">
        Talk to a mentor who&apos;s already cracked your exam, or explore verified cutoffs and
        guides for every major exam — free to start.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/mentorship/apply"
          className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold text-primary transition-colors hover:bg-zinc-100"
        >
          Talk to a mentor
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/exams"
          className="inline-flex items-center gap-2 rounded-full border border-white/40 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
        >
          Explore exams
        </Link>
      </div>
    </section>
  );
}
