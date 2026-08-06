import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const tracks = [
  {
    title: "JEE (Main & Advanced)",
    gradient: "from-violet-600 to-indigo-500",
    tags: ["Physics", "Chemistry", "Mathematics", "Mock Tests", "Previous Year Papers", "Rank Predictor"],
    ctaLabel: "Explore JEE prep",
    href: "/exams",
  },
  {
    title: "NEET (UG)",
    gradient: "from-emerald-500 to-green-400",
    tags: ["Biology", "Physics", "Chemistry", "Mock Tests", "NCERT Notes"],
    ctaLabel: "Explore NEET prep",
    href: "/exams",
  },
  {
    title: "Foundation (Class 9–10)",
    gradient: "from-orange-500 to-amber-400",
    tags: ["Olympiads", "NTSE", "Basic Concepts", "Early Rank Building"],
    ctaLabel: "Explore Foundation prep",
    href: "/mentorship",
  },
];

export function TracksSection() {
  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <h2 className="max-w-md text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Pick the track built for your goal
          </h2>
          <p className="max-w-md text-lg text-muted-foreground">
            Each track comes with a structured syllabus, mock tests, and mentor support
            tailored to that exam.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {tracks.map(({ title, gradient, tags, ctaLabel, href }) => (
            <div
              key={title}
              className={cn(
                "flex flex-col justify-between gap-8 rounded-3xl bg-gradient-to-b p-8",
                gradient
              )}
            >
              <div className="flex flex-col gap-5">
                <h3 className="text-2xl font-black leading-tight text-white">{title}</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="w-fit rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href={href}
                className="flex items-center justify-between rounded-full bg-white px-6 py-3.5 text-sm font-bold text-foreground transition-colors hover:bg-white/90"
              >
                {ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
