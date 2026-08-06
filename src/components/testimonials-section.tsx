import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

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

function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <div className="flex w-[320px] shrink-0 flex-col gap-4 rounded-2xl border border-border bg-white p-6 shadow-sm">
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
  );
}

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

      <div className="mt-16 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div className="animate-marquee flex w-max gap-6">
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
