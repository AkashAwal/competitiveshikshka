import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const pills = ["All Exams", "JEE", "NEET", "NCERT", "PYQs", "Colleges"];

const avatars = [
  { initials: "AS", bg: "bg-amber-400" },
  { initials: "RP", bg: "bg-emerald-400" },
  { initials: "MK", bg: "bg-[#1c67f6]" },
  { initials: "TN", bg: "bg-pink-400" },
  { initials: "JV", bg: "bg-violet-400" },
];

export function HeroContent() {
  return (
    <div className="flex flex-col gap-8">
      <Link
        href="/colleges"
        className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-sm text-foreground shadow-sm transition-colors hover:border-[#1c67f6]"
      >
        <span className="flex items-center gap-1.5 rounded-full bg-[#1c67f6]/10 px-2 py-0.5 text-xs font-bold text-[#1c67f6]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#1c67f6]" />
          New!
        </span>
        Cutoff lists updated for 190+ colleges
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>

      <div className="flex flex-col gap-4">
        <h1 className="text-5xl sm:text-6xl font-black leading-[1.05] text-foreground">
          Ace Your <br />
          <span className="text-[#1c67f6]">Next Rank</span> <span aria-hidden>🎯</span>
        </h1>

        <p className="max-w-lg text-lg">
          <span className="block text-foreground">with Free NCERT Solutions and PYQs.</span>
          <span className="block text-muted-foreground">Learn from Toppers and Track Your Rank.</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {pills.map((pill, i) => (
          <span
            key={pill}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold",
              i === 0
                ? "border-[#1c67f6] text-[#1c67f6] bg-[#1c67f6]/5"
                : "border-border bg-white text-foreground"
            )}
          >
            {pill}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/exams"
            className="btn-cta rounded-full px-6 py-3 text-sm font-bold text-white"
          >
            Explore Now
          </Link>
          <Link
            href="/colleges"
            className="rounded-full border border-[#1c67f6] px-6 py-3 text-sm font-bold text-[#1c67f6] transition-colors hover:bg-[#1c67f6] hover:text-white"
          >
            View Colleges
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {avatars.map((a) => (
              <span
                key={a.initials}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white",
                  a.bg
                )}
              >
                {a.initials}
              </span>
            ))}
          </div>
          <div>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">50k+ happy students</p>
          </div>
        </div>
      </div>
    </div>
  );
}
