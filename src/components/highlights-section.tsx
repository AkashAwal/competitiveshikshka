import Link from "next/link";
import { GraduationCap, Gem, BadgeCheck, Briefcase, ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const cards = [
  {
    icon: GraduationCap,
    title: "Structured guides for every entrance exam",
    href: "/exams",
    active: false,
  },
  {
    icon: Gem,
    title: "Mentorship from verified rank holders",
    href: "/mentorship",
    active: true,
  },
  {
    icon: BadgeCheck,
    title: "Verified cutoffs & college data",
    href: "/colleges",
    active: false,
  },
  {
    icon: Briefcase,
    title: "50,000+ students already admitted",
    href: "/colleges",
    active: false,
  },
];

export function HighlightsSection() {
  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-4xl font-black text-foreground sm:text-5xl">
          Why students choose us
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Icon, title, href, active }) => (
            <Link
              key={title}
              href={href}
              className={cn(
                "flex min-h-[220px] flex-col justify-between rounded-2xl border bg-[#f5f6f8] p-6 transition-colors",
                active
                  ? "border-[#1c67f6] bg-white"
                  : "border-transparent hover:border-border"
              )}
            >
              <div className="flex items-start justify-between">
                <Icon className="h-8 w-8 text-foreground" strokeWidth={1.75} />
                {active ? (
                  <ArrowRight className="h-5 w-5 text-[#1c67f6]" />
                ) : (
                  <ArrowUpRight className="h-5 w-5 text-foreground" />
                )}
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-lg font-bold leading-snug text-foreground">{title}</p>
                <span
                  className={cn(
                    "text-sm font-medium",
                    active ? "text-[#1c67f6]" : "text-muted-foreground"
                  )}
                >
                  Read more
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
