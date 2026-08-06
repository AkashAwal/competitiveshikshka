import Link from "next/link";
import { GraduationCap, Gem, BadgeCheck, Briefcase, ArrowUpRight } from "lucide-react";

const cards = [
  {
    icon: GraduationCap,
    title: "Structured guides for every entrance exam",
    href: "/exams",
  },
  {
    icon: Gem,
    title: "Mentorship from verified rank holders",
    href: "/mentorship",
  },
  {
    icon: BadgeCheck,
    title: "Verified cutoffs & college data",
    href: "/colleges",
  },
  {
    icon: Briefcase,
    title: "50,000+ students already admitted",
    href: "/colleges",
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
          {cards.map(({ icon: Icon, title, href }) => (
            <Link
              key={title}
              href={href}
              className="flex min-h-[220px] flex-col justify-between rounded-2xl border border-transparent bg-[#f5f6f8] p-6 transition-colors hover:border-border"
            >
              <div className="flex items-start justify-between">
                <Icon className="h-8 w-8 text-foreground" strokeWidth={1.75} />
                <ArrowUpRight className="h-5 w-5 text-foreground" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-lg font-bold leading-snug text-foreground">{title}</p>
                <span className="text-sm font-medium text-muted-foreground">Read more</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
