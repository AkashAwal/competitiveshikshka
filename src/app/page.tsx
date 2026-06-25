import Link from "next/link";
import { BookOpen, Calculator, GraduationCap, FileText, Users, FlaskConical, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const compartments = [
  {
    icon: BookOpen,
    label: "NCERT Solutions",
    description: "Step-by-step solutions for Class 6–12 across all subjects.",
    href: "/ncert",
    cta: "Browse Solutions",
    color: "bg-orange-50 border-orange-200 text-orange-600",
    iconBg: "bg-orange-100 border-orange-200",
  },
  {
    icon: FileText,
    label: "Previous Year Questions",
    description: "JEE, NEET & govt exam PYQs with detailed answer keys.",
    href: "/pyqs",
    cta: "Explore PYQs",
    color: "bg-amber-50 border-amber-200 text-amber-700",
    iconBg: "bg-amber-100 border-amber-200",
  },
  {
    icon: GraduationCap,
    label: "College Info",
    description: "Cutoffs, rankings, fees and admission details for top colleges.",
    href: "/colleges",
    cta: "Find Colleges",
    color: "bg-yellow-50 border-yellow-200 text-yellow-700",
    iconBg: "bg-yellow-100 border-yellow-200",
  },
  {
    icon: FlaskConical,
    label: "Exam Guides",
    description: "Syllabus, eligibility, dates and strategy for every major exam.",
    href: "/exams",
    cta: "View Exams",
    color: "bg-orange-50 border-orange-200 text-orange-600",
    iconBg: "bg-orange-100 border-orange-200",
  },
  {
    icon: Calculator,
    label: "Rank Calculator",
    description: "Estimate your rank and college chances from your marks.",
    href: "/calculators",
    cta: "Calculate Now",
    color: "bg-amber-50 border-amber-200 text-amber-700",
    iconBg: "bg-amber-100 border-amber-200",
  },
  {
    icon: Users,
    label: "Mentorship",
    description: "Get personalised guidance from JEE & NEET toppers.",
    href: "/mentorship",
    cta: "Get Mentored",
    color: "bg-yellow-50 border-yellow-200 text-yellow-700",
    iconBg: "bg-yellow-100 border-yellow-200",
  },
];

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
        <div className="text-center mb-12">
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

        {/* Compartment grid */}
        <div className="grid grid-cols-3 gap-5">
          {compartments.map(({ icon: Icon, label, description, href, cta, color, iconBg }) => (
            <div
              key={href}
              className="flex flex-col rounded-3xl border-[3px] border-primary/15 bg-card p-6 [box-shadow:var(--clay-shadow)]"
            >
              {/* Icon */}
              <span className={cn(
                "mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border-[3px]",
                iconBg,
                "[box-shadow:inset_-1px_-2px_5px_rgba(0,0,0,0.08),_2px_4px_10px_rgba(232,97,26,0.18)]"
              )}>
                <Icon className="h-6 w-6 text-primary" />
              </span>

              {/* Text */}
              <h2 className="mb-1.5 text-lg font-bold">{label}</h2>
              <p className="mb-5 flex-1 text-sm text-muted-foreground leading-relaxed">{description}</p>

              {/* Button */}
              <Link
                href={href}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "w-full justify-between group"
                )}
              >
                {cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
