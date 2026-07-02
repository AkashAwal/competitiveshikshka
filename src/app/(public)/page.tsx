import Link from "next/link";
import {
  BookOpen, Calculator, GraduationCap,
  FileText, Users, FlaskConical, ArrowRight,
} from "lucide-react";
import { HeroSection } from "@/components/hero-section";

const features = [
  {
    icon: BookOpen,
    label: "NCERT Solutions",
    description: "Step-by-step solutions for Class 6–12 across Physics, Chemistry, Maths, Biology and more.",
    href: "/ncert",
  },
  {
    icon: FileText,
    label: "Previous Year Questions",
    description: "JEE, NEET and government exam PYQs with detailed answer keys and topic-wise filters.",
    href: "/pyqs",
  },
  {
    icon: Calculator,
    label: "Rank Calculator",
    description: "Enter your marks and instantly estimate your rank, percentile and college chances.",
    href: "/calculators",
  },
  {
    icon: GraduationCap,
    label: "College Info",
    description: "Cutoffs, rankings, fees and admission details for every top engineering and medical college.",
    href: "/colleges",
  },
  {
    icon: FlaskConical,
    label: "Exam Guides",
    description: "Syllabus, eligibility, important dates and preparation strategy for every major exam.",
    href: "/exams",
  },
  {
    icon: Users,
    label: "Mentorship",
    description: "Personalised guidance from JEE and NEET rankers — form-based and free to apply.",
    href: "/mentorship",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="mb-10">
          <h2 className="text-5xl font-black leading-[1.1] tracking-tight text-foreground">What we <span className="text-[#2563eb]">offer</span></h2>
          <p className="mt-2 text-muted-foreground">Everything in one place — free, structured and exam-ready.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, label, description, href }) => (
            <Link
              key={label}
              href={href}
              className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-[#2563eb] hover:shadow-sm"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2563eb]/10 transition-colors">
                <Icon className="h-5 w-5 text-[#2563eb]" />
              </span>
              <div>
                <h3 className="font-bold text-foreground mb-1">{label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
              <span className="mt-auto flex items-center gap-1 text-sm font-semibold text-[#2563eb] opacity-0 group-hover:opacity-100 transition-opacity">
                Explore <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>


      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="mb-12">
          <h2 className="text-5xl font-black leading-[1.1] tracking-tight text-foreground">Your personal <span className="text-[#2563eb]">study space</span></h2>
          <p className="mt-2 text-muted-foreground">Everything organised around you — your exam, your class, your pace.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {[
            {
              step: "01",
              title: "Sign up in seconds",
              description: "Sign up with Google and set up your profile in minutes. Pick your target exam, class and subjects — and we personalise everything around you.",
            },
            {
              step: "02",
              title: "Get your dashboard",
              description: "Instantly access materials, PYQs, tests and tools curated specifically for your exam and class.",
            },
            {
              step: "03",
              title: "Track your progress",
              description: "See your test scores, completed topics and weak areas. Know exactly where you stand every day.",
            },
          ].map(({ step, title, description }) => (
            <div key={step} className="relative flex flex-col gap-4 p-8 border border-border bg-card first:rounded-l-xl last:rounded-r-xl -ml-px first:ml-0">
              <div className="flex items-center gap-4">
                <span className="text-xs font-black text-[#2563eb] tracking-widest">{step}</span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div>
                <h3 className="font-black text-foreground text-lg mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link href="/login" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-colors hover:bg-zinc-900" style={{ backgroundColor: "#2563eb" }}>
            Get Started <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="mb-10">
          <h2 className="text-5xl font-black leading-[1.1] tracking-tight text-foreground">Join the <span className="text-[#2563eb]">community</span></h2>
          <p className="mt-2 text-muted-foreground">Study with thousands of JEE and NEET aspirants. Ask doubts, share notes, stay motivated.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              name: "Telegram",
              description: "Daily updates, free resources and doubt-solving with our most active community.",
              color: "#229ED9",
              href: "https://t.me/competitiveshiksha",
              icon: (
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.31 14.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.506.969z"/>
                </svg>
              ),
            },
            {
              name: "Discord",
              description: "Structured channels for each subject, exam strategy discussions and live doubt sessions.",
              color: "#5865F2",
              href: "https://discord.gg/BnVn9MHspT",
              icon: (
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              ),
            },
            {
              name: "WhatsApp",
              description: "Quick announcements, exam alerts and important updates straight to your phone.",
              color: "#25D366",
              href: "https://whatsapp.com/channel/0029VbDiP8R6xCSKqlUxjB0s",
              icon: (
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
              ),
            },
          ].map(({ name, color, href, icon }) => (
            <div key={name} className="flex flex-col items-center gap-4 p-8">
              <span className="flex h-20 w-20 items-center justify-center [&_svg]:h-12 [&_svg]:w-12" style={{ color }}>
                {icon}
              </span>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-2.5 rounded-xl text-sm font-bold text-white text-center transition-opacity hover:opacity-90"
                style={{ backgroundColor: color }}
              >
                Join Now
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full px-4 sm:px-6 py-20 flex flex-col items-center text-center gap-6" style={{ backgroundColor: "#2563eb" }}>
        <h2 className="text-4xl font-black text-white leading-tight">
          Ready to start preparing?
        </h2>
        <p className="text-white/70 max-w-md text-sm leading-relaxed">
          Join thousands of JEE and NEET aspirants who are already using CompetitiveShiksha to study smarter.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold transition-colors bg-white text-[#2563eb] hover:bg-zinc-100"
        >
          Get Started
        </Link>
      </section>
    </>
  );
}
