import Link from "next/link";
import {
  BookOpen, Calculator, GraduationCap,
  FileText, Users, FlaskConical, ArrowRight,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CLAY_CARD = "flex flex-col rounded-3xl border-[3px] p-5 [transition-property:all] [transition-duration:200ms] [transition-timing-function:var(--clay-bounce)] hover:-translate-y-1";
const SHADOW = "[box-shadow:inset_-2px_-4px_10px_rgba(0,0,0,0.08),_5px_10px_28px_rgba(232,97,26,0.18)]";
const SHADOW_HOVER = "hover:[box-shadow:inset_-2px_-4px_10px_rgba(0,0,0,0.10),_8px_16px_36px_rgba(232,97,26,0.28)]";

function SmallCard({
  icon: Icon,
  label,
  description,
  href,
  cta,
  bg,
  border,
  iconColor,
}: {
  icon: React.ElementType;
  label: string;
  description: string;
  href: string;
  cta: string;
  bg: string;
  border: string;
  iconColor: string;
}) {
  return (
    <div className={cn(CLAY_CARD, SHADOW, SHADOW_HOVER, bg, border)}>
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border-[3px] border-white/80 bg-white [box-shadow:inset_-1px_-2px_5px_rgba(0,0,0,0.08),_2px_4px_10px_rgba(232,97,26,0.16)]">
        <Icon className={cn("h-5 w-5", iconColor)} />
      </span>
      <h2 className="mb-1.5 text-lg font-bold">{label}</h2>
      <p className="mb-5 flex-1 text-sm text-muted-foreground leading-relaxed">{description}</p>
      <Link href={href} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full justify-between group bg-white/70 border-white/80")}>
        {cta}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 left-1/4 h-96 w-96 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute top-60 right-10 h-72 w-72 rounded-full bg-amber-300/12 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-primary/6 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">

        {/* 4-col bento grid */}
        <div className="grid grid-cols-4 gap-5">

          {/* NCERT — wide left, row 1 */}
          <div className={cn(
            "col-span-2 rounded-3xl border-[3px] border-orange-200 bg-orange-50 p-7",
            "[box-shadow:inset_-3px_-5px_14px_rgba(0,0,0,0.08),_6px_12px_34px_rgba(232,97,26,0.22)]",
            "hover:[box-shadow:inset_-3px_-5px_14px_rgba(0,0,0,0.10),_10px_18px_44px_rgba(232,97,26,0.32)]",
            "hover:-translate-y-1 [transition-property:all] [transition-duration:200ms] [transition-timing-function:var(--clay-bounce)]"
          )}>
            <div className="flex items-start gap-6">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl border-[3px] border-orange-200 bg-white [box-shadow:inset_-2px_-3px_8px_rgba(0,0,0,0.08),_3px_6px_14px_rgba(232,97,26,0.22)]">
                <BookOpen className="h-8 w-8 text-primary" />
              </span>
              <div className="flex-1">
                <div className="mb-1 text-xs font-bold uppercase tracking-widest text-primary/60">Most Popular</div>
                <h2 className="text-2xl font-bold mb-2">NCERT Solutions</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Step-by-step solutions for Class 6–12 — Physics, Chemistry, Maths, Biology and more.
                </p>
                <div className="flex items-center gap-3 mb-5">
                  <div className="rounded-2xl border-[3px] border-orange-200 bg-white px-3 py-1.5 text-center [box-shadow:inset_-1px_-2px_4px_rgba(0,0,0,0.06),_2px_3px_8px_rgba(232,97,26,0.14)]">
                    <p className="text-base font-bold text-primary leading-none">7</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Classes</p>
                  </div>
                  <div className="rounded-2xl border-[3px] border-orange-200 bg-white px-3 py-1.5 text-center [box-shadow:inset_-1px_-2px_4px_rgba(0,0,0,0.06),_2px_3px_8px_rgba(232,97,26,0.14)]">
                    <p className="text-base font-bold text-primary leading-none">10+</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Subjects</p>
                  </div>
                </div>
                <Link href="/ncert" className={cn(buttonVariants({ size: "default" }), "gap-2 group")}>
                  Browse Solutions
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* PYQs — col 3, row 1 */}
          <SmallCard
            icon={FileText}
            label="Previous Year Questions"
            description="JEE, NEET & govt exam PYQs with detailed answer keys."
            href="/pyqs"
            cta="Explore PYQs"
            bg="bg-amber-50"
            border="border-amber-200"
            iconColor="text-amber-600"
          />

          {/* Rank Calculator — col 4, row 1 */}
          <SmallCard
            icon={Calculator}
            label="Rank Calculator"
            description="Estimate your rank and college chances from your marks."
            href="/calculators"
            cta="Calculate Now"
            bg="bg-yellow-50"
            border="border-yellow-200"
            iconColor="text-yellow-600"
          />

          {/* Colleges — col 1, row 2 */}
          <SmallCard
            icon={GraduationCap}
            label="College Info"
            description="Cutoffs, rankings, fees and admission details for top colleges."
            href="/colleges"
            cta="Find Colleges"
            bg="bg-amber-50"
            border="border-amber-200"
            iconColor="text-amber-600"
          />

          {/* Exams — col 2, row 2 */}
          <SmallCard
            icon={FlaskConical}
            label="Exam Guides"
            description="Syllabus, eligibility, dates and strategy for every major exam."
            href="/exams"
            cta="View Exams"
            bg="bg-orange-50/80"
            border="border-orange-200"
            iconColor="text-primary"
          />

          {/* Mentorship — col 3-4 wide, row 2 */}
          <div className={cn(
            "col-span-2 rounded-3xl border-[3px] border-primary/20 bg-gradient-to-br from-orange-50 to-amber-50 p-6",
            "[box-shadow:inset_-3px_-5px_14px_rgba(0,0,0,0.07),_6px_12px_34px_rgba(232,97,26,0.20)]",
            "hover:[box-shadow:inset_-3px_-5px_14px_rgba(0,0,0,0.10),_10px_18px_44px_rgba(232,97,26,0.30)]",
            "hover:-translate-y-1 [transition-property:all] [transition-duration:200ms] [transition-timing-function:var(--clay-bounce)]",
            "flex flex-col justify-between"
          )}>
            <div>
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border-[3px] border-orange-200 bg-white [box-shadow:inset_-1px_-2px_5px_rgba(0,0,0,0.07),_2px_4px_10px_rgba(232,97,26,0.16)]">
                <Users className="h-5 w-5 text-primary" />
              </span>
              <h2 className="text-xl font-bold mb-1.5">Get Mentored by Toppers</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
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
    </div>
  );
}
