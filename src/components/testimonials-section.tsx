import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const dots = [
  { top: "8%", left: "46%", size: 40, color: "#fbbf24", opacity: 0.8, blur: 0 },
  { top: "4%", left: "58%", size: 44, color: "#a78bfa", opacity: 0.7, blur: 1 },
  { top: "14%", left: "68%", size: 36, color: "#34d399", opacity: 0.75, blur: 0 },
  { top: "22%", left: "36%", size: 48, color: "#f472b6", opacity: 0.8, blur: 0 },
  { top: "30%", left: "50%", size: 52, color: "#1c67f6", opacity: 0.85, blur: 0 },
  { top: "26%", left: "62%", size: 34, color: "#fb923c", opacity: 0.7, blur: 1 },
  { top: "18%", left: "26%", size: 32, color: "#38bdf8", opacity: 0.6, blur: 1 },
  { top: "38%", left: "22%", size: 28, color: "#fbbf24", opacity: 0.5, blur: 2 },
  { top: "42%", left: "58%", size: 30, color: "#a78bfa", opacity: 0.55, blur: 1 },
  { top: "44%", left: "40%", size: 26, color: "#34d399", opacity: 0.45, blur: 2 },
  { top: "52%", left: "30%", size: 24, color: "#f472b6", opacity: 0.4, blur: 2 },
  { top: "54%", left: "50%", size: 24, color: "#1c67f6", opacity: 0.4, blur: 2 },
  { top: "50%", left: "68%", size: 22, color: "#fb923c", opacity: 0.35, blur: 2 },
  { top: "60%", left: "40%", size: 20, color: "#38bdf8", opacity: 0.3, blur: 3 },
  { top: "62%", left: "58%", size: 20, color: "#a78bfa", opacity: 0.3, blur: 3 },
];

const testimonials = [
  {
    name: "Aarav Mehta",
    role: "JEE Main, AIR 412",
    initials: "AM",
    bg: "bg-amber-400",
    quote:
      "The rank predictor was scarily accurate. I shortlisted my colleges weeks before results and didn't waste a single day of counselling.",
  },
  {
    name: "Sneha Kapoor",
    role: "NEET UG, AIIMS Delhi",
    initials: "SK",
    bg: "bg-pink-400",
    quote:
      "My mentor had cleared NEET herself, so every tip actually applied to my situation. That personal guidance made all the difference.",
  },
  {
    name: "Rohan Iyer",
    role: "JEE Advanced, IIT Bombay",
    initials: "RI",
    bg: "bg-[#1c67f6]",
    quote:
      "The mock tests matched the real exam difficulty almost exactly. By the time I sat for JEE Advanced, nothing felt unfamiliar.",
  },
  {
    name: "Priya Sharma",
    role: "Foundation, Class 10",
    initials: "PS",
    bg: "bg-emerald-400",
    quote:
      "Starting with the Foundation track in Class 9 gave me such a head start. I walked into Class 11 already ahead of the syllabus.",
  },
  {
    name: "Karan Malhotra",
    role: "NEET UG, AIIMS Jodhpur",
    initials: "KM",
    bg: "bg-violet-400",
    quote:
      "Verified cutoffs saved me from chasing colleges that were never realistic for my rank. I focused only on what actually fit.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f8f9fb] py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-4xl font-black text-foreground sm:text-5xl">
          Kind words from our students
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Read testimonials from our students and alumni about preparing with us.
        </p>
      </div>

      <div className="relative mx-auto mt-12 h-[220px] max-w-3xl" aria-hidden="true">
        {dots.map((d, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              top: d.top,
              left: d.left,
              width: d.size,
              height: d.size,
              backgroundColor: d.color,
              opacity: d.opacity,
              filter: d.blur ? `blur(${d.blur}px)` : undefined,
            }}
          />
        ))}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#f8f9fb]" />
      </div>

      <div className="scrollbar-hide mt-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 sm:px-[max(1.5rem,calc((100vw-72rem)/2))]">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="flex w-[320px] shrink-0 snap-start flex-col gap-4 rounded-2xl border border-border bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white",
                  t.bg
                )}
              >
                {t.initials}
              </span>
              <div>
                <p className="font-bold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </div>

            <div className="flex gap-0.5 border-t border-border pt-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-emerald-500 text-emerald-500" />
              ))}
            </div>

            <p className="text-sm text-muted-foreground">{t.quote}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
