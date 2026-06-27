import { Metadata } from "next";

export const dynamic = "force-dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityClient } from "@/sanity/lib/client";
import { ncertChapterQuery } from "@/sanity/lib/queries";
import { slugToSubject } from "@/lib/subject-slug";
import { PortableText } from "@/components/portable-text";
import { ChevronRight, ChevronLeft } from "lucide-react";

type Props = {
  params: Promise<{ classNum: string; subject: string; chapter: string }>;
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { classNum, subject, chapter } = await params;
  const { q } = await searchParams;
  const chapterNum = chapter.replace("chapter-", "");
  const subjectTitle = slugToSubject(subject);
  const questionNum = q ?? "1";

  const ogUrl = new URL("/api/og", process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");
  ogUrl.searchParams.set("class", classNum);
  ogUrl.searchParams.set("subject", subjectTitle);
  ogUrl.searchParams.set("chapter", chapterNum);
  ogUrl.searchParams.set("q", questionNum);

  return {
    title: `Class ${classNum} ${subjectTitle} Chapter ${chapterNum} NCERT Solutions`,
    description: `NCERT solutions for Class ${classNum} ${subjectTitle} Chapter ${chapterNum}.`,
    openGraph: {
      title: `Class ${classNum} ${subjectTitle} Chapter ${chapterNum} — Q.${questionNum} | NCERT Solutions`,
      description: `Step-by-step NCERT solutions for Class ${classNum} ${subjectTitle} Chapter ${chapterNum}.`,
      images: [{ url: ogUrl.toString(), width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogUrl.toString()],
    },
  };
}

type Step = { stepTitle: string; content: unknown[] };

type QA = {
  questionNumber: string;
  questionText: unknown[];
  answer: unknown[];
  explanation?: unknown[];
  steps?: Step[];
};

type ChapterData = {
  class: number;
  subject: string;
  chapter: number;
  chapterTitle: string;
  questions: QA[];
};

export default async function NcertChapterPage({ params, searchParams }: Props) {
  const { classNum, subject, chapter } = await params;
  const { q } = await searchParams;

  const cls = parseInt(classNum, 10);
  const subjectTitle = slugToSubject(subject);
  const chapterNum = parseInt(chapter.replace("chapter-", ""), 10);

  if (isNaN(cls) || isNaN(chapterNum)) notFound();

  const data: ChapterData | null = await sanityClient.fetch(ncertChapterQuery, {
    class: cls,
    subject: subjectTitle,
    chapter: chapterNum,
  });

  if (!data) notFound();

  const total = data.questions.length;
  const currentIndex = Math.min(Math.max(parseInt(q ?? "1", 10), 1), total) - 1;
  const qa = data.questions[currentIndex];
  const current = currentIndex + 1;

  const base = `/ncert/${cls}/${subject}/${chapter}`;

  return (
    <div className="flex min-h-screen">
      {/* Left sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-border bg-card px-5 py-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-4">Questions</p>
        <div className="grid grid-cols-4 gap-2">
          {data.questions.map((question, i) => (
            <Link
              key={i}
              href={`${base}?q=${i + 1}`}
              className={`flex h-12 w-12 items-center justify-center rounded-xl text-sm font-semibold border transition-colors ${
                i === currentIndex
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border bg-background hover:bg-accent text-muted-foreground"
              }`}
            >
              {question.questionNumber}
            </Link>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 px-8 py-10">
        {/* Breadcrumb — left aligned */}
        <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-10 flex-wrap">
          <Link href="/ncert" className="hover:text-primary transition-colors">NCERT</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/ncert/${cls}`} className="hover:text-primary transition-colors">Class {cls}</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/ncert/${cls}/${subject}`} className="hover:text-primary transition-colors capitalize">{subjectTitle}</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-semibold">Chapter {chapterNum}</span>
        </nav>

        {/* Chapter header — left aligned */}
        <div className="mb-10">
<h1 className="text-2xl font-bold">{data.chapterTitle}</h1>
          <p className="text-muted-foreground text-sm mt-1">Class {cls} · {subjectTitle}</p>
        </div>

        {/* Q&A — centered column */}
        <div className="max-w-2xl mx-auto">
          <p className="text-sm text-muted-foreground mb-6">
            Question <span className="font-semibold text-foreground">{current}</span> of {total}
          </p>

          <div className="mb-10">
            <div className="flex items-start gap-3 mb-8">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-sm font-bold text-primary">
                {qa.questionNumber}
              </span>
              <div className="text-base font-medium leading-relaxed">
                {qa.questionText?.length ? (
                  <PortableText value={qa.questionText as unknown[]} />
                ) : (
                  <span className="text-muted-foreground">Question {qa.questionNumber}</span>
                )}
              </div>
            </div>

            <div className="border-t border-border pt-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-primary">Answer</p>
              {qa.answer?.length ? (
                <PortableText value={qa.answer as unknown[]} />
              ) : (
                <p className="text-muted-foreground text-sm">Answer coming soon.</p>
              )}
            </div>

            {qa.steps?.length ? (
              <div className="border-t border-border pt-8 mt-8">
                <p className="mb-4 text-xs font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400">Step-by-Step</p>
                <div className="space-y-2">
                  {qa.steps.map((step, i) => (
                    <details key={i} className="group rounded-xl border border-border overflow-hidden">
                      <summary className="flex cursor-pointer select-none list-none items-center justify-between gap-3 px-4 py-3 hover:bg-accent/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                            {i + 1}
                          </span>
                          <span className="text-sm font-medium">{step.stepTitle}</span>
                        </div>
                        <svg className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </summary>
                      <div className="px-4 pb-4 pt-2 text-sm text-muted-foreground leading-relaxed border-t border-border bg-muted/20">
                        <PortableText value={step.content as unknown[]} />
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ) : null}

            {qa.explanation?.length ? (
              <div className="border-t border-border pt-8 mt-8">
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">Why it works</p>
                <div className="text-muted-foreground leading-relaxed">
                  <PortableText value={qa.explanation as unknown[]} />
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex items-center justify-between gap-3">
            {current > 1 ? (
              <Link
                href={`${base}?q=${current - 1}`}
                className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Link>
            ) : (
              <div />
            )}

            {current < total ? (
              <Link
                href={`${base}?q=${current + 1}`}
                className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-accent transition-colors ml-auto"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link
                href={`/ncert/${cls}/${subject}`}
                className="flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors ml-auto"
              >
                All Chapters
                <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          {/* Share card image */}
          <div className="mt-8">
            <img
              src={`/api/og?class=${cls}&subject=${encodeURIComponent(subjectTitle)}&chapter=${chapterNum}&q=${current}`}
              alt={`Class ${cls} ${subjectTitle} Chapter ${chapterNum} Q.${current} NCERT Solution`}
              width={1200}
              height={630}
              className="w-full rounded-xl border border-border shadow-sm"
            />
          </div>

          {/* Mobile question picker */}
          <div className="md:hidden mt-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Jump to Question</p>
            <div className="grid grid-cols-8 gap-1.5">
              {data.questions.map((question, i) => (
                <Link
                  key={i}
                  href={`${base}?q=${i + 1}`}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-semibold border transition-colors ${
                    i === currentIndex
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border bg-card hover:bg-accent text-muted-foreground"
                  }`}
                >
                  {question.questionNumber}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
