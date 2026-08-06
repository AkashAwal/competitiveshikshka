import Link from "next/link";
import { BookOpen, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const avatars = [
  { initials: "RS", bg: "bg-amber-400" },
  { initials: "PK", bg: "bg-emerald-400" },
  { initials: "NM", bg: "bg-[#1c67f6]" },
  { initials: "AV", bg: "bg-pink-400" },
  { initials: "SD", bg: "bg-violet-400" },
];

export function AboutSection() {
  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-2xl font-black text-foreground">About Us</p>
            <p className="text-2xl font-black text-muted-foreground">Our prep ecosystem</p>
          </div>
          <p className="max-w-md text-lg text-muted-foreground">
            Introducing everything you need to prepare with confidence — structured study
            material, rank &amp; college predictors, and real reviews from verified students.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="relative flex min-h-[340px] flex-col justify-between gap-10 overflow-hidden rounded-3xl bg-[#f5f6f8] p-10">
            <BookOpen
              className="pointer-events-none absolute -bottom-6 -right-6 h-40 w-40 text-[#1c67f6]/5 sm:h-56 sm:w-56"
              strokeWidth={1}
            />
            <div className="relative flex flex-col gap-3">
              <h3 className="text-2xl font-black text-[#1c67f6]">Study material</h3>
              <p className="max-w-sm text-muted-foreground">
                Chapter-wise notes, previous year papers, mock tests, and rank &amp; college
                calculators — built to take you from syllabus to result day.
              </p>
            </div>
            <Link
              href="/calculators"
              className="btn-cta relative w-fit rounded-full px-6 py-3 text-sm font-bold text-white"
            >
              Explore calculators
            </Link>
          </div>

          <div className="relative flex min-h-[340px] flex-col justify-between gap-6 overflow-hidden rounded-3xl bg-emerald-50 p-10">
            <span
              aria-hidden
              className="pointer-events-none absolute -right-4 -top-6 select-none text-[110px] font-black leading-none text-emerald-100 sm:text-[180px]"
            >
              4.8
            </span>
            <Star className="pointer-events-none absolute bottom-8 right-8 h-10 w-10 fill-emerald-500 text-emerald-500" />

            <div className="relative flex flex-col gap-4">
              <h3 className="max-w-sm text-2xl font-black leading-snug text-foreground">
                <span className="text-emerald-500">Verified college data</span> from real
                students
              </h3>
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
            </div>

            <div className="relative flex flex-col gap-1">
              <p className="text-4xl font-black text-foreground">4.8</p>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-emerald-500 text-emerald-500" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">190+ colleges reviewed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
