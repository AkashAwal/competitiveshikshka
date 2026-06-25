import Link from "next/link";
import {
  BookOpen, Calculator, GraduationCap,
  FileText, Users, FlaskConical, ArrowRight,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 left-1/4 h-96 w-96 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute top-40 right-1/5 h-72 w-72 rounded-full bg-amber-300/15 blur-3xl" />
        <div className="absolute bottom-20 left-1/3 h-64 w-64 rounded-full bg-primary/6 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
        {/* Headline */}
        <div className="text-center mb-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border-[3px] border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary [box-shadow:inset_-1px_-2px_4px_rgba(0,0,0,0.06),_2px_3px_8px_rgba(232,97,26,0.18)]">
            JEE · NEET · Govt Exams
          </div>
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl mb-4">
            Everything you need to{" "}
            <span className="text-primary">crack your exam</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Free resources, smart tools, and real mentorship — all built for serious aspirants.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-3 grid-rows-[auto_auto_auto] gap-5">

          {/* NCERT — tall hero card, col 1 rows 1–2 */}
          <div className="row-span-2 flex flex-col rounded-3xl border-[3px] border-orange-200 bg-orange-50 p-7 [box-shadow:inset_-3px_-5px_12px_rgba(0,0,0,0.08),_6px_12px_32px_rgba(232,97,26,0.22)] hover:[box-shadow:inset_-3px_-5px_12px_rgba(0,0,0,0.10),_8px_16px_40px_rgba(232,97,26,0.32)] hover:-translate-y-1 [transition-property:all] [transition-duration:200ms] [transition-timing-function:var(--clay-bounce)]">
            <span className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border-[3px] border-orange-300 bg-white [box-shadow:inset_-2px_-3px_8px_rgba(0,0,0,0.08),_3px_6px_14px_rgba(232,97,26,0.22)]">
              <BookOpen className="h-9 w-9 text-primary" />
            </span>
            <div className="mb-2 text-xs font-bold uppercase tracking-widest text-primary/60">
              Most Popular
            </div>
            <h2 className="mb-3 text-3xl font-bold">NCERT Solutions</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Step-by-step solutions for every question in Class 6–12 textbooks — Physics, Chemistry, Maths, Biology and more.
            </p>
            <div className="mb-6 flex gap-4">
              <div className="rounded-2xl border-[3px] border-orange-200 bg-white px-4 py-2 text-center [box-shadow:inset_-1px_-2px_5px_rgba(0,0,0,0.06),_2px_4px_10px_rgba(232,97,26,0.14)]">
                <p className="text-xl font-bold text-primary">7</p>
                <p className="text-xs text-muted-foreground">Classes</p>
              </div>
              <div className="rounded-2xl border-[3px] border-orange-200 bg-white px-4 py-2 text-center [box-shadow:inset_-1px_-2px_5px_rgba(0,0,0,0.06),_2px_4px_10px_rgba(232,97,26,0.14)]">
                <p className="text-xl font-bold text-primary">10+</p>
                <p className="text-xs text-muted-foreground">Subjects</p>
              </div>
            </div>
            <Link
              href="/ncert"
              className={cn(buttonVariants({ size: "lg" }), "mt-auto w-full justify-between group")}
            >
              Browse Solutions
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* PYQs — col 2 row 1 */}
          <div className="flex flex-col rounded-3xl border-[3px] border-amber-200 bg-amber-50 p-5 [box-shadow:inset_-3px_-5px_12px_rgba(0,0,0,0.07),_5px_10px_26px_rgba(232,97,26,0.18)] hover:[box-shadow:inset_-3px_-5px_12px_rgba(0,0,0,0.10),_7px_14px_34px_rgba(232,97,26,0.28)] hover:-translate-y-1 [transition-property:all] [transition-duration:200ms] [transition-timing-function:var(--clay-bounce)]">
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border-[3px] border-amber-200 bg-white [box-shadow:inset_-1px_-2px_5px_rgba(0,0,0,0.07),_2px_4px_10px_rgba(232,97,26,0.16)]">
              <FileText className="h-5 w-5 text-amber-600" />
            </span>
            <h2 className="mb-1.5 text-lg font-bold">Previous Year Questions</h2>
            <p className="mb-4 flex-1 text-sm text-muted-foreground leading-relaxed">JEE, NEET & govt exam PYQs with detailed answer keys.</p>
            <Link href="/pyqs" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full justify-between group border-amber-200 hover:border-amber-300")}>
              Explore PYQs <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Colleges — col 3 row 1 */}
          <div className="flex flex-col rounded-3xl border-[3px] border-yellow-200 bg-yellow-50 p-5 [box-shadow:inset_-3px_-5px_12px_rgba(0,0,0,0.07),_5px_10px_26px_rgba(232,97,26,0.18)] hover:[box-shadow:inset_-3px_-5px_12px_rgba(0,0,0,0.10),_7px_14px_34px_rgba(232,97,26,0.28)] hover:-translate-y-1 [transition-property:all] [transition-duration:200ms] [transition-timing-function:var(--clay-bounce)]">
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border-[3px] border-yellow-200 bg-white [box-shadow:inset_-1px_-2px_5px_rgba(0,0,0,0.07),_2px_4px_10px_rgba(232,97,26,0.16)]">
              <GraduationCap className="h-5 w-5 text-yellow-600" />
            </span>
            <h2 className="mb-1.5 text-lg font-bold">College Info</h2>
            <p className="mb-4 flex-1 text-sm text-muted-foreground leading-relaxed">Cutoffs, rankings, fees and admission details for top colleges.</p>
            <Link href="/colleges" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full justify-between group border-yellow-200 hover:border-yellow-300")}>
              Find Colleges <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Exams — col 2 row 2 */}
          <div className="flex flex-col rounded-3xl border-[3px] border-orange-200 bg-orange-50/70 p-5 [box-shadow:inset_-3px_-5px_12px_rgba(0,0,0,0.07),_5px_10px_26px_rgba(232,97,26,0.18)] hover:[box-shadow:inset_-3px_-5px_12px_rgba(0,0,0,0.10),_7px_14px_34px_rgba(232,97,26,0.28)] hover:-translate-y-1 [transition-property:all] [transition-duration:200ms] [transition-timing-function:var(--clay-bounce)]">
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border-[3px] border-orange-200 bg-white [box-shadow:inset_-1px_-2px_5px_rgba(0,0,0,0.07),_2px_4px_10px_rgba(232,97,26,0.16)]">
              <FlaskConical className="h-5 w-5 text-primary" />
            </span>
            <h2 className="mb-1.5 text-lg font-bold">Exam Guides</h2>
            <p className="mb-4 flex-1 text-sm text-muted-foreground leading-relaxed">Syllabus, eligibility, dates and strategy for every major exam.</p>
            <Link href="/exams" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full justify-between group border-orange-200 hover:border-orange-300")}>
              View Exams <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Calculators — col 3 row 2 */}
          <div className="flex flex-col rounded-3xl border-[3px] border-amber-200 bg-amber-50/70 p-5 [box-shadow:inset_-3px_-5px_12px_rgba(0,0,0,0.07),_5px_10px_26px_rgba(232,97,26,0.18)] hover:[box-shadow:inset_-3px_-5px_12px_rgba(0,0,0,0.10),_7px_14px_34px_rgba(232,97,26,0.28)] hover:-translate-y-1 [transition-property:all] [transition-duration:200ms] [transition-timing-function:var(--clay-bounce)]">
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border-[3px] border-amber-200 bg-white [box-shadow:inset_-1px_-2px_5px_rgba(0,0,0,0.07),_2px_4px_10px_rgba(232,97,26,0.16)]">
              <Calculator className="h-5 w-5 text-amber-600" />
            </span>
            <h2 className="mb-1.5 text-lg font-bold">Rank Calculator</h2>
            <p className="mb-4 flex-1 text-sm text-muted-foreground leading-relaxed">Estimate your rank and college chances from your marks.</p>
            <Link href="/calculators" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full justify-between group border-amber-200 hover:border-amber-300")}>
              Calculate Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mentorship — full width bottom strip */}
          <div className="col-span-3 flex items-center justify-between rounded-3xl border-[3px] border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 px-8 py-6 [box-shadow:inset_-3px_-5px_12px_rgba(0,0,0,0.07),_5px_10px_26px_rgba(232,97,26,0.18)] hover:[box-shadow:inset_-3px_-5px_12px_rgba(0,0,0,0.10),_7px_14px_34px_rgba(232,97,26,0.28)] hover:-translate-y-0.5 [transition-property:all] [transition-duration:200ms] [transition-timing-function:var(--clay-bounce)]">
            <div className="flex items-center gap-5">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-[3px] border-orange-200 bg-white [box-shadow:inset_-1px_-2px_5px_rgba(0,0,0,0.07),_2px_4px_10px_rgba(232,97,26,0.16)]">
                <Users className="h-6 w-6 text-primary" />
              </span>
              <div>
                <h2 className="text-xl font-bold">Get Mentored by Toppers</h2>
                <p className="text-sm text-muted-foreground">Personalised guidance from JEE & NEET rankers — form-based, free to apply.</p>
              </div>
            </div>
            <Link href="/mentorship" className={cn(buttonVariants({ size: "lg" }), "shrink-0 gap-2 group")}>
              Apply Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
