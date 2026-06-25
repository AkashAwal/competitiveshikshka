import Link from "next/link";
import { BookOpen, Calculator, GraduationCap, FileText, Users, FlaskConical } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: BookOpen,
    label: "NCERT Solutions",
    description: "Class 6–12 step-by-step solutions",
    href: "/ncert",
  },
  {
    icon: FileText,
    label: "PYQs",
    description: "Previous year questions with answers",
    href: "/pyqs",
  },
  {
    icon: GraduationCap,
    label: "Colleges",
    description: "Cutoffs, rankings & admission info",
    href: "/colleges",
  },
  {
    icon: FlaskConical,
    label: "Exams",
    description: "JEE, NEET & govt exam guides",
    href: "/exams",
  },
  {
    icon: Calculator,
    label: "Calculators",
    description: "Rank & marks calculators",
    href: "/calculators",
  },
  {
    icon: Users,
    label: "Mentorship",
    description: "Get guidance from toppers",
    href: "/mentorship",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-20">
        {/* Background blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-10 left-1/3 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-primary/8 blur-3xl" />
        </div>

        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border-[3px] border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary [box-shadow:inset_-1px_-2px_4px_rgba(0,0,0,0.06),_2px_3px_8px_rgba(232,97,26,0.18)]">
            JEE · NEET · Govt Exams
          </div>

          <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-6xl">
            Everything you need to{" "}
            <span className="text-primary">crack your exam</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
            Free NCERT solutions, PYQs, college info, rank calculators and expert mentorship — all in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/ncert" className={cn(buttonVariants({ size: "lg" }))}>
              Browse NCERT Solutions
            </Link>
            <Link href="/mentorship" className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>
              Get Mentorship
            </Link>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        <h2 className="mb-10 text-center text-2xl font-bold">What&apos;s on CompetitiveShikshka</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, label, description, href }) => (
            <Link
              key={href}
              href={href}
              className="group flex cursor-pointer items-start gap-4 rounded-3xl border-[3px] border-primary/15 bg-card p-5 [box-shadow:var(--clay-shadow)] hover:[box-shadow:var(--clay-shadow-hover)] hover:-translate-y-1 [transition-property:all] [transition-duration:200ms] [transition-timing-function:var(--clay-bounce)]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-[3px] border-primary/20 bg-primary/10 [box-shadow:inset_-1px_-2px_4px_rgba(0,0,0,0.07),_2px_4px_8px_rgba(232,97,26,0.15)]">
                <Icon className="h-5 w-5 text-primary" />
              </span>
              <div>
                <p className="font-bold group-hover:text-primary transition-colors">{label}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
