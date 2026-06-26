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
          <h2 className="text-5xl font-black leading-[1.1] tracking-tight text-zinc-900">What we <span className="text-[#2563eb]">offer</span></h2>
          <p className="mt-2 text-muted-foreground">Everything in one place — free, structured and exam-ready.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, label, description, href }) => (
            <Link
              key={label}
              href={href}
              className="group flex flex-col gap-4 rounded-xl border border-border bg-white p-6 transition-all duration-200 hover:border-[#2563eb] hover:shadow-sm"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 group-hover:bg-[#2563eb]/10 transition-colors">
                <Icon className="h-5 w-5 text-zinc-600 group-hover:text-[#2563eb] transition-colors" />
              </span>
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">{label}</h3>
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { value: "10,000+", label: "Students preparing" },
            { value: "50,000+", label: "Questions available" },
            { value: "500+",    label: "Colleges listed" },
            { value: "20+",     label: "Exams covered" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col gap-1 items-center text-center">
              <span className="text-4xl font-black text-[#2563eb]">{value}</span>
              <span className="text-sm text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="mb-10">
          <h2 className="text-5xl font-black leading-[1.1] tracking-tight text-zinc-900">Pick your <span className="text-[#2563eb]">exam</span></h2>
          <p className="mt-2 text-muted-foreground">Resources, PYQs and strategy — tailored to your target.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {[
            {
              name: "JEE",
              full: "Joint Entrance Examination",
              tag: "Engineering",
              description: "India's most competitive engineering entrance. Covers Physics, Chemistry and Mathematics for Class 11–12.",
              details: ["2 stages: Main & Advanced", "1.2M+ applicants yearly", "Class 11–12 PCM"],
              href: "/exams/jee",
            },
            {
              name: "NEET",
              full: "National Eligibility cum Entrance Test",
              tag: "Medical",
              description: "Single entrance exam for MBBS, BDS and allied medical courses across India.",
              details: ["1 stage exam", "2M+ applicants yearly", "Class 11–12 PCB"],
              href: "/exams/neet",
            },
            {
              name: "CUET",
              full: "Common University Entrance Test",
              tag: "Undergraduate",
              description: "Central university admission test for 250+ universities. Based on Class 12 subjects.",
              details: ["Single stage", "1.4M+ applicants yearly", "Class 12 pass"],
              href: "/exams/cuet",
            },
            {
              name: "NDA",
              full: "National Defence Academy",
              tag: "Defence",
              description: "Gateway to the Indian Army, Navy and Air Force for Class 12 students.",
              details: ["2 stages: Written & SSB", "400K+ applicants yearly", "Class 12 pass"],
              href: "/exams/nda",
            },
            {
              name: "CAT",
              full: "Common Admission Test",
              tag: "MBA",
              description: "Premier MBA entrance for IIMs and top B-schools. Tests quantitative, verbal and reasoning skills.",
              details: ["Single stage", "300K+ applicants yearly", "Any graduate"],
              href: "/exams/cat",
            },
            {
              name: "IPMAT",
              full: "Integrated Program in Management Aptitude Test",
              tag: "Integrated MBA",
              description: "5-year integrated MBA program entrance for IIM Indore, Rohtak and Ranchi.",
              details: ["Single stage", "Class 12 pass", "Maths & English based"],
              href: "/exams/ipmat",
            },
          ].map(({ name, full, tag, description, details, href }) => (
            <Link
              key={name}
              href={href}
              className="group flex flex-col gap-4 rounded-xl border border-border bg-white p-6 transition-all duration-200 hover:border-[#2563eb] hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-2xl font-black text-zinc-900">{name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{full}</p>
                </div>
                <span className="shrink-0 rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold text-zinc-600">
                  {tag}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              <ul className="flex flex-col gap-1">
                {details.map(d => (
                  <li key={d} className="flex items-center gap-2 text-xs text-zinc-500">
                    <span className="h-1 w-1 rounded-full bg-[#2563eb] shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
              <span className="mt-auto flex items-center gap-1 text-sm font-semibold text-[#2563eb] opacity-0 group-hover:opacity-100 transition-opacity">
                Explore {name} <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
