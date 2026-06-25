import Link from "next/link";
import {
  BookOpen, Calculator, GraduationCap,
  FileText, Users, FlaskConical, ArrowRight,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HeroSlider } from "@/components/hero-slider";

function SmallCard({
  icon: Icon,
  label,
  description,
  href,
  cta,
}: {
  icon: React.ElementType;
  label: string;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-sm transition-all duration-200">
      <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </span>
      <h2 className="mb-1.5 text-base font-bold">{label}</h2>
      <p className="mb-5 flex-1 text-sm text-muted-foreground leading-relaxed">{description}</p>
      <Link href={href} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full justify-between group")}>
        {cta}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
    <HeroSlider />
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <div className="grid grid-cols-4 gap-4">

        {/* NCERT — featured left card */}
        <div className="col-span-2 rounded-xl border border-border bg-primary p-7 hover:shadow-md transition-all duration-200">
          <div className="flex items-start gap-5">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/20">
              <BookOpen className="h-7 w-7 text-white" />
            </span>
            <div className="flex-1 text-white">
              <div className="mb-1 text-xs font-bold uppercase tracking-widest text-white/50">Most Popular</div>
              <h2 className="text-2xl font-bold mb-2">NCERT Solutions</h2>
              <p className="text-sm leading-relaxed text-white/70 mb-4">
                Step-by-step solutions for Class 6–12 — Physics, Chemistry, Maths, Biology and more.
              </p>
              <div className="flex items-center gap-3 mb-5">
                <div className="rounded-lg bg-white/15 px-3 py-1.5 text-center">
                  <p className="text-base font-bold text-white leading-none">7</p>
                  <p className="text-xs text-white/50 mt-0.5">Classes</p>
                </div>
                <div className="rounded-lg bg-white/15 px-3 py-1.5 text-center">
                  <p className="text-base font-bold text-white leading-none">10+</p>
                  <p className="text-xs text-white/50 mt-0.5">Subjects</p>
                </div>
              </div>
              <Link href="/ncert" className={cn(buttonVariants({ variant: "outline", size: "default" }), "gap-2 group bg-white border-white/50 hover:bg-white/90")}>
                Browse Solutions
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* PYQs */}
        <SmallCard
          icon={FileText}
          label="Previous Year Questions"
          description="JEE, NEET & govt exam PYQs with detailed answer keys."
          href="/pyqs"
          cta="Explore PYQs"
        />

        {/* Rank Calculator */}
        <SmallCard
          icon={Calculator}
          label="Rank Calculator"
          description="Estimate your rank and college chances from your marks."
          href="/calculators"
          cta="Calculate Now"
        />

        {/* Colleges */}
        <SmallCard
          icon={GraduationCap}
          label="College Info"
          description="Cutoffs, rankings, fees and admission details for top colleges."
          href="/colleges"
          cta="Find Colleges"
        />

        {/* Exams */}
        <SmallCard
          icon={FlaskConical}
          label="Exam Guides"
          description="Syllabus, eligibility, dates and strategy for every major exam."
          href="/exams"
          cta="View Exams"
        />

        {/* Mentorship — dark featured card */}
        <div className="col-span-2 rounded-xl border border-border bg-zinc-900 p-6 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
          <div>
            <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Users className="h-5 w-5 text-white" />
            </span>
            <h2 className="text-xl font-bold text-white mb-1.5">Get Mentored by Toppers</h2>
            <p className="text-sm text-white/50 leading-relaxed">
              Personalised guidance from JEE & NEET rankers — form-based, free to apply.
            </p>
          </div>
          <Link href="/mentorship" className={cn(buttonVariants({ size: "default" }), "mt-5 gap-2 group w-fit")}>
            Apply Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

      </div>
    </div>
    </>
  );
}
