import Link from "next/link";
import {
  ArrowRight, MessageCircle, Target, CalendarClock,
  TrendingUp, Users, GraduationCap, Star, Quote, ClipboardCheck, ChevronDown,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const stats = [
  { value: "500+", label: "Students mentored" },
  { value: "40+", label: "Mentors from IITs & AIIMS" },
  { value: "AIR 120", label: "Best mentor rank (JEE Adv.)" },
  { value: "4.9/5", label: "Average mentor rating" },
];

const problems = [
  {
    icon: Target,
    title: "No clear roadmap",
    desc: "Coaching, self-study and YouTube playlists with no single plan tying it all together.",
  },
  {
    icon: MessageCircle,
    title: "Doubts pile up",
    desc: "A question asked today gets answered next week — momentum dies while you wait.",
  },
  {
    icon: TrendingUp,
    title: "No one tracks the plateau",
    desc: "Mock scores stall for months and nobody diagnoses why.",
  },
];

const perks = [
  { icon: CalendarClock, label: "Weekly 1-on-1 calls", desc: "Live video sessions with your dedicated mentor, every week." },
  { icon: Target, label: "Personalised roadmap", desc: "A study plan built around your exam date, class and weak subjects." },
  { icon: MessageCircle, label: "Unlimited doubt support", desc: "Chat-based doubt solving between sessions — never stuck for long." },
  { icon: ClipboardCheck, label: "Mock test analysis", desc: "Mentors review every test with you and fix the exact gaps." },
  { icon: TrendingUp, label: "Progress tracking", desc: "Weekly check-ins on syllabus coverage, revision and test scores." },
  { icon: Users, label: "Parent updates", desc: "Monthly progress summaries sent directly to your parents." },
];

const steps = [
  { step: "01", title: "Apply in 2 minutes", desc: "Tell us your target exam, class and current preparation level." },
  { step: "02", title: "Get matched", desc: "We pair you with a mentor who cracked the exact exam you are targeting." },
  { step: "03", title: "Kickoff call", desc: "A 1-on-1 session to map your strengths, gaps and a 90-day plan." },
  { step: "04", title: "Weekly mentorship", desc: "Regular calls, doubt support and test reviews all the way to exam day." },
];

const mentors = [
  { name: "Aarav Sharma", tag: "AIR 342 · JEE Advanced", college: "IIT Bombay, CSE", initials: "AS" },
  { name: "Priya Nair", tag: "AIR 891 · NEET UG", college: "AIIMS Delhi, MBBS", initials: "PN" },
  { name: "Rohan Mehta", tag: "AIR 120 · JEE Advanced", college: "IIT Delhi, EE", initials: "RM" },
  { name: "Sneha Iyer", tag: "AIR 1204 · NEET UG", college: "AIIMS Jodhpur, MBBS", initials: "SI" },
];

const testimonials = [
  { quote: "My mentor caught that I was over-revising Physics and under-testing Chemistry — fixed my whole strategy in one call.", name: "Kabir, Class 12, JEE aspirant" },
  { quote: "Having someone who scored AIR 800 answer my 11pm doubts changed how fast I could move.", name: "Ananya, Class 12, NEET aspirant" },
  { quote: "The weekly check-ins kept me accountable in a way no app reminder ever did.", name: "Yash, Dropper, JEE aspirant" },
];

const faqs = [
  { q: "Who are the mentors?", a: "Current students and recent graduates of IITs, AIIMS and other top institutes who cleared JEE or NEET in the last few years." },
  { q: "Is mentorship free?", a: "Applying is free. Mentorship itself is part of CompetitiveShiksha Premium, or available as a standalone add-on — pricing is shown after you apply." },
  { q: "How much time does it need each week?", a: "One 30–45 minute call plus async doubt support. Most students spend under an hour a week directly with their mentor." },
  { q: "Can I switch mentors?", a: "Yes — if the match is not working for you, tell us and we will re-pair you at no extra cost." },
];

export default function MentorshipPage() {
  return (
    <>
      {/* Hero */}
      <section className="w-full">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 lg:py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-xs font-bold text-[#2563eb]">
              <GraduationCap className="h-3.5 w-3.5" /> 1-on-1 mentorship
            </span>
            <h1 className="mt-4 text-5xl font-black leading-[1.1] tracking-tight text-zinc-900">
              Learn from students who&apos;ve<br />
              <span className="text-[#2563eb]">already cracked it.</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Get paired with an IITian or AIIMS mentor for weekly 1-on-1 guidance,
              a personalised roadmap and unlimited doubt support — all the way to exam day.
            </p>
            <div className="mt-6 flex items-center gap-3 flex-wrap">
              <Link href="/mentorship/apply" className={cn(buttonVariants({ size: "lg" }))}>
                Apply for Mentorship <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#how-it-works" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                See how it works
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-5">
            {stats.map(({ value, label }) => (
              <div key={label} className="rounded-xl border border-border bg-white p-5">
                <p className="text-3xl font-black text-zinc-900">{value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problems mentorship solves */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="mb-10">
          <h2 className="text-4xl font-black leading-[1.1] tracking-tight text-zinc-900">
            Studying alone makes every mistake <span className="text-[#2563eb]">expensive.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {problems.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col gap-4 rounded-xl border border-border bg-white p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                <Icon className="h-5 w-5 text-red-500" />
              </span>
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What you get */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="mb-10">
          <h2 className="text-5xl font-black leading-[1.1] tracking-tight text-zinc-900">What you <span className="text-[#2563eb]">get</span></h2>
          <p className="mt-2 text-muted-foreground">A dedicated mentor in your corner, every week, until exam day.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {perks.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex flex-col gap-4 rounded-xl border border-border bg-white p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2563eb]/10">
                <Icon className="h-5 w-5 text-[#2563eb]" />
              </span>
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">{label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 scroll-mt-20">
        <div className="mb-12">
          <h2 className="text-5xl font-black leading-[1.1] tracking-tight text-zinc-900">How it <span className="text-[#2563eb]">works</span></h2>
          <p className="mt-2 text-muted-foreground">From application to your first call in under a week.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
          {steps.map(({ step, title, desc }) => (
            <div key={step} className="relative flex flex-col gap-4 p-8 border border-border bg-white first:rounded-l-xl last:rounded-r-xl -ml-px first:ml-0">
              <div className="flex items-center gap-4">
                <span className="text-xs font-black text-[#2563eb] tracking-widest">{step}</span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div>
                <h3 className="font-black text-zinc-900 text-lg mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mentors */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="mb-10">
          <h2 className="text-5xl font-black leading-[1.1] tracking-tight text-zinc-900">Meet your <span className="text-[#2563eb]">mentors</span></h2>
          <p className="mt-2 text-muted-foreground">A small sample of the rankers you could be paired with.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {mentors.map(({ name, tag, college, initials }) => (
            <div key={name} className="flex flex-col items-center text-center gap-3 rounded-xl border border-border bg-white p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2563eb]/10 text-lg font-black text-[#2563eb]">
                {initials}
              </div>
              <div>
                <h3 className="font-bold text-zinc-900">{name}</h3>
                <p className="text-xs font-semibold text-[#2563eb] mt-0.5">{tag}</p>
                <p className="text-xs text-muted-foreground mt-1">{college}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="mb-10">
          <h2 className="text-5xl font-black leading-[1.1] tracking-tight text-zinc-900">Trusted by <span className="text-[#2563eb]">aspirants</span></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {testimonials.map(({ quote, name }) => (
            <div key={name} className="flex flex-col gap-4 rounded-xl border border-border bg-white p-6">
              <Quote className="h-6 w-6 text-[#2563eb]/30" />
              <p className="text-sm text-zinc-700 leading-relaxed flex-1">&ldquo;{quote}&rdquo;</p>
              <div className="flex gap-0.5 pt-2 border-t border-border">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-[#fbbf24] text-[#fbbf24]" />
                ))}
              </div>
              <p className="text-xs font-semibold text-zinc-900">{name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing tie-in */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="rounded-xl border border-border bg-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2563eb]/10">
              <GraduationCap className="h-6 w-6 text-[#2563eb]" />
            </span>
            <div>
              <h3 className="font-black text-zinc-900 text-lg">Included in Premium</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-md">
                Mentorship comes bundled with CompetitiveShiksha Premium — or apply for
                it on its own as a standalone add-on.
              </p>
            </div>
          </div>
          <Link href="/dashboard/premium" className={cn(buttonVariants({ size: "lg" }), "shrink-0")}>
            View Premium <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="mb-10">
          <h2 className="text-5xl font-black leading-[1.1] tracking-tight text-zinc-900">Frequently <span className="text-[#2563eb]">asked</span></h2>
        </div>
        <div className="flex flex-col gap-3 max-w-3xl">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group rounded-xl border border-border bg-white p-5">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-zinc-900 list-none [&::-webkit-details-marker]:hidden">
                {q}
                <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full px-4 sm:px-6 py-20 flex flex-col items-center text-center gap-6" style={{ backgroundColor: "#2563eb" }}>
        <h2 className="text-4xl font-black text-white leading-tight">
          Your mentor is waiting.
        </h2>
        <p className="text-white/70 max-w-md text-sm leading-relaxed">
          Applying takes two minutes. We will match you with a mentor who has
          already walked the path you are on.
        </p>
        <Link
          href="/mentorship/apply"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold transition-colors bg-white text-[#2563eb] hover:bg-zinc-100"
        >
          Apply for Mentorship
        </Link>
      </section>
    </>
  );
}
