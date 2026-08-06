import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FileText, Building2, ExternalLink, CalendarClock, CalendarDays,
  ClipboardList, BookOpen, GraduationCap, TrendingDown, Lightbulb, ArrowRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

interface ExamDetail {
  id: string;
  slug: string;
  name: string;
  full_name: string | null;
  category: string;
  conducting_body: string | null;
  about: string | null;
  marking_scheme: string | null;
  application_window: string | null;
  exam_dates: string | null;
  official_link: string | null;
  eligible_institutes: string | null;
  recent_cutoffs: string | null;
  syllabus: string | null;
  tips_and_tricks: string | null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: exam } = await supabase
    .from("exams")
    .select("name, full_name, category, about")
    .eq("slug", slug)
    .single();

  if (!exam) return { title: "Exam not found" };

  const title = `${exam.name} — Syllabus, Dates, Cutoffs & Preparation Tips`;
  const description =
    exam.about?.slice(0, 155) ??
    `${exam.full_name ?? exam.name} — ${exam.category} entrance exam guide: syllabus, marking scheme, dates and cutoffs on CompetitiveShiksha.`;

  return {
    title,
    description,
    alternates: { canonical: `/exams/${slug}` },
    openGraph: { images: [{ url: `/api/og?type=exam&slug=${slug}`, width: 1200, height: 630 }] },
  };
}

function Row({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-2">
      <p className="flex items-center gap-2 text-sm font-bold text-foreground">
        <Icon className="h-4 w-4 text-primary" /> {label}
      </p>
      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line pl-6">{value}</p>
    </div>
  );
}

export default async function ExamDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: exam } = await supabase.from("exams").select("*").eq("slug", slug).single<ExamDetail>();
  if (!exam) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalCredential",
    name: exam.full_name ?? exam.name,
    alternateName: exam.name,
    description: exam.about ?? undefined,
    credentialCategory: exam.category,
    url: exam.official_link ?? undefined,
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="w-full border-b border-border bg-card">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-secondary text-muted-foreground">{exam.category}</span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight text-foreground leading-[1.1]">{exam.name}</h1>
          {exam.full_name && <p className="mt-2 text-muted-foreground">{exam.full_name}</p>}

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {exam.conducting_body && (
              <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-primary/5 text-muted-foreground border border-border">
                <Building2 className="h-3.5 w-3.5 text-primary" /> Conducted by {exam.conducting_body}
              </span>
            )}
            {exam.official_link && (
              <a
                href={exam.official_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-primary text-primary-foreground"
              >
                Official website <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 flex flex-col gap-8">
        <Row icon={FileText} label="About" value={exam.about} />

        {(exam.application_window || exam.exam_dates) && (
          <div className="grid sm:grid-cols-2 gap-4">
            {exam.application_window && (
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">
                  <CalendarClock className="h-3.5 w-3.5" /> When to apply
                </p>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{exam.application_window}</p>
              </div>
            )}
            {exam.exam_dates && (
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">
                  <CalendarDays className="h-3.5 w-3.5" /> Expected exam dates
                </p>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{exam.exam_dates}</p>
              </div>
            )}
          </div>
        )}

        <Row icon={ClipboardList} label="Marking scheme" value={exam.marking_scheme} />
        <Row icon={BookOpen} label="Syllabus" value={exam.syllabus} />
        <Row icon={GraduationCap} label="Institutes you can get into" value={exam.eligible_institutes} />
        <Row icon={TrendingDown} label="Recent cutoffs" value={exam.recent_cutoffs} />
        <Row icon={Lightbulb} label="Tips & tricks" value={exam.tips_and_tricks} />
      </div>

      <section className="w-full px-4 sm:px-6 py-20 flex flex-col items-center text-center gap-6 bg-primary">
        <GraduationCap className="h-8 w-8 text-white/70" />
        <h2 className="text-4xl font-black text-white leading-tight">Preparing for {exam.name}?</h2>
        <p className="text-white/70 max-w-md text-sm leading-relaxed">
          Talk to a mentor who has already cracked this exam — free to apply.
        </p>
        <Link
          href="/mentorship"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold transition-colors bg-white text-primary hover:bg-zinc-100"
        >
          Talk to a mentor <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
