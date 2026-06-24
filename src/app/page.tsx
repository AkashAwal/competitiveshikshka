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
      <section className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">
            For JEE · NEET · Govt Exams
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5">
            Everything you need to{" "}
            <span className="text-primary">crack your exam</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Free NCERT solutions, PYQs, college info, rank calculators and expert mentorship — all in one place.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
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
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">What&apos;s on CompetitiveShikshka</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, label, description, href }) => (
            <Link
              key={href}
              href={href}
              className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary hover:bg-accent transition-colors group"
            >
              <span className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Icon className="h-5 w-5 text-primary" />
              </span>
              <div>
                <p className="font-semibold group-hover:text-primary transition-colors">{label}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
