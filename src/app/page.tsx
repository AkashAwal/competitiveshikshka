import Link from "next/link";
import {
  BookOpen, Calculator, GraduationCap,
  FileText, Users, FlaskConical, ArrowRight,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function SmallCard({
  icon: Icon,
  label,
  description,
  href,
  cta,
  bg,
  iconBg,
  iconColor,
}: {
  icon: React.ElementType;
  label: string;
  description: string;
  href: string;
  cta: string;
  bg: string;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className={cn(
      "flex flex-col rounded-lg border-[3px] border-black p-5 [box-shadow:var(--neo-shadow)]",
      "hover:[box-shadow:var(--neo-shadow-hover)] hover:-translate-x-0.5 hover:-translate-y-0.5",
      "transition-all duration-150",
      bg
    )}>
      <span className={cn(
        "mb-4 flex h-11 w-11 items-center justify-center rounded-lg border-[3px] border-black",
        iconBg
      )}>
        <Icon className={cn("h-5 w-5", iconColor)} />
      </span>
      <h2 className="mb-1.5 text-lg font-bold">{label}</h2>
      <p className="mb-5 flex-1 text-sm leading-relaxed opacity-70">{description}</p>
      <Link href={href} className={cn(
        buttonVariants({ variant: "outline", size: "sm" }),
        "w-full justify-between group bg-white"
      )}>
        {cta}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <div className="grid grid-cols-4 gap-4">

        {/* NCERT — orange featured card, col 1-2 row 1 */}
        <div className={cn(
          "col-span-2 rounded-lg border-[3px] border-black bg-primary p-7",
          "[box-shadow:var(--neo-shadow)]",
          "hover:[box-shadow:var(--neo-shadow-hover)] hover:-translate-x-0.5 hover:-translate-y-0.5",
          "transition-all duration-150"
        )}>
          <div className="flex items-start gap-5">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border-[3px] border-black bg-white [box-shadow:2px_2px_0_#000]">
              <BookOpen className="h-8 w-8 text-primary" />
            </span>
            <div className="flex-1 text-white">
              <div className="mb-1 text-xs font-bold uppercase tracking-widest opacity-70">Most Popular</div>
              <h2 className="text-2xl font-bold mb-2">NCERT Solutions</h2>
              <p className="text-sm leading-relaxed opacity-80 mb-4">
                Step-by-step solutions for Class 6–12 — Physics, Chemistry, Maths, Biology and more.
              </p>
              <div className="flex items-center gap-3 mb-5">
                <div className="rounded-lg border-[2px] border-black bg-white px-3 py-1.5 text-center [box-shadow:2px_2px_0_#000]">
                  <p className="text-base font-bold text-primary leading-none">7</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Classes</p>
                </div>
                <div className="rounded-lg border-[2px] border-black bg-white px-3 py-1.5 text-center [box-shadow:2px_2px_0_#000]">
                  <p className="text-base font-bold text-primary leading-none">10+</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Subjects</p>
                </div>
              </div>
              <Link href="/ncert" className={cn(
                buttonVariants({ variant: "outline", size: "default" }),
                "gap-2 group bg-white"
              )}>
                Browse Solutions
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* PYQs — col 3 row 1 */}
        <SmallCard
          icon={FileText}
          label="Previous Year Questions"
          description="JEE, NEET & govt exam PYQs with detailed answer keys."
          href="/pyqs"
          cta="Explore PYQs"
          bg="bg-yellow-300"
          iconBg="bg-white"
          iconColor="text-yellow-700"
        />

        {/* Rank Calculator — col 4 row 1 */}
        <SmallCard
          icon={Calculator}
          label="Rank Calculator"
          description="Estimate your rank and college chances from your marks."
          href="/calculators"
          cta="Calculate Now"
          bg="bg-white"
          iconBg="bg-primary"
          iconColor="text-white"
        />

        {/* Colleges — col 1 row 2 */}
        <SmallCard
          icon={GraduationCap}
          label="College Info"
          description="Cutoffs, rankings, fees and admission details for top colleges."
          href="/colleges"
          cta="Find Colleges"
          bg="bg-white"
          iconBg="bg-yellow-300"
          iconColor="text-yellow-800"
        />

        {/* Exams — col 2 row 2 */}
        <SmallCard
          icon={FlaskConical}
          label="Exam Guides"
          description="Syllabus, eligibility, dates and strategy for every major exam."
          href="/exams"
          cta="View Exams"
          bg="bg-orange-100"
          iconBg="bg-white"
          iconColor="text-primary"
        />

        {/* Mentorship — black featured card, col 3-4 row 2 */}
        <div className={cn(
          "col-span-2 rounded-lg border-[3px] border-black bg-black p-6",
          "[box-shadow:var(--neo-shadow)]",
          "hover:[box-shadow:var(--neo-shadow-hover)] hover:-translate-x-0.5 hover:-translate-y-0.5",
          "transition-all duration-150",
          "flex flex-col justify-between"
        )}>
          <div>
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border-[3px] border-white bg-primary [box-shadow:2px_2px_0_rgba(255,255,255,0.3)]">
              <Users className="h-5 w-5 text-white" />
            </span>
            <h2 className="text-xl font-bold text-white mb-1.5">Get Mentored by Toppers</h2>
            <p className="text-sm text-white/60 leading-relaxed">
              Personalised guidance from JEE & NEET rankers — form-based, free to apply.
            </p>
          </div>
          <Link href="/mentorship" className={cn(
            buttonVariants({ variant: "outline", size: "default" }),
            "mt-5 gap-2 group w-fit bg-white"
          )}>
            Apply Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
