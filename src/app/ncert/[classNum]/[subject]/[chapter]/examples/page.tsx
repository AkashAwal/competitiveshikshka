import { Metadata } from "next";

export const dynamic = "force-dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityClient } from "@/sanity/lib/client";
import { ncertChapterQuery } from "@/sanity/lib/queries";
import { slugToSubject } from "@/lib/subject-slug";
import { PortableText } from "@/components/portable-text";
import { ChevronRight, ChevronLeft, BookOpen } from "lucide-react";
import { StepsSection } from "../StepsSection";

type Props = {
  params: Promise<{ classNum: string; subject: string; chapter: string }>;
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { classNum, subject, chapter } = await params;
  const { q } = await searchParams;
  const chapterNum = chapter.replace("chapter-", "");
  const subjectTitle = slugToSubject(subject);

  return {
    title: `Class ${classNum} ${subjectTitle} Chapter ${chapterNum} Worked Examples | NCERT Solutions`,
    description: `Worked examples for Class ${classNum} ${subjectTitle} Chapter ${chapterNum} NCERT.`,
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
  examples?: QA[];
};

export default async function NcertExamplesPage({ params, searchParams }: Props) {
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
  if (!data.examples?.length) notFound();

  const examples = data.examples;
  const total = examples.length;
  const currentIndex = Math.min(Math.max(parseInt(q ?? "1", 10), 1), total) - 1;
  const qa = examples[currentIndex];
  const current = currentIndex + 1;

  const base = `/ncert/${cls}/${subject}/${chapter}/examples`;
  const exercisesBase = `/ncert/${cls}/${subject}/${chapter}`;

  return (
    <div className="flex min-h-screen">
      {/* Left sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-border bg-card px-5 py-10">
        <Link
          href={exercisesBase}
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <BookOpen className="h-3.5 w-3.5" />
          Back to Exercises
        </Link>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-4">Examples</p>
        <div className="grid grid-cols-4 gap-2">
          {examples.map((example, i) => (
            <Link
              key={i}
              href={`${base}?q=${i + 1}`}
              className={`flex h-12 w-12 items-center justify-center rounded-xl text-xs font-semibold border transition-colors ${
                i === currentIndex
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border bg-background hover:bg-accent text-muted-foreground"
              }`}
            >
              {example.questionNumber}
            </Link>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-10 flex-wrap">
          <Link href="/ncert" className="hover:text-primary transition-colors">NCERT</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/ncert/${cls}`} className="hover:text-primary transition-colors">Class {cls}</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/ncert/${cls}/${subject}`} className="hover:text-primary transition-colors capitalize">{subjectTitle}</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={exercisesBase} className="hover:text-primary transition-colors">Chapter {chapterNum}</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-semibold">Worked Examples</span>
        </nav>

        {/* Chapter header */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold">{data.chapterTitle} — Worked Examples</h1>
          <p className="text-muted-foreground text-sm mt-1">Class {cls} · {subjectTitle}</p>
        </div>

        {/* Example content */}
        <div className="max-w-2xl mx-auto">
          <p className="text-sm text-muted-foreground mb-6">
            Example <span className="font-semibold text-foreground">{current}</span> of {total}
          </p>

          <div className="mb-10">
            <div className="flex items-start gap-3 mb-8">
              <span className="flex h-7 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 px-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {qa.questionNumber}
              </span>
              <div className="text-base font-medium leading-relaxed">
                {qa.questionText?.length ? (
                  <PortableText value={qa.questionText as unknown[]} />
                ) : (
                  <span className="text-muted-foreground">Example {qa.questionNumber}</span>
                )}
              </div>
            </div>

            <div className="border-t border-border pt-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">Solution</p>
              {qa.answer?.length ? (
                <PortableText value={qa.answer as unknown[]} />
              ) : (
                <p className="text-muted-foreground text-sm">Solution coming soon.</p>
              )}
            </div>

            {qa.steps?.length ? <StepsSection steps={qa.steps} accentColor="emerald" /> : null}

            {qa.explanation?.length ? (
              <div className="border-t border-border pt-8 mt-8">
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-primary">Why it works</p>
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
                href={exercisesBase}
                className="flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors ml-auto"
              >
                Go to Exercises
                <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          {/* Mobile example picker */}
          <div className="md:hidden mt-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Jump to Example</p>
            <div className="grid grid-cols-8 gap-1.5">
              {examples.map((example, i) => (
                <Link
                  key={i}
                  href={`${base}?q=${i + 1}`}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-semibold border transition-colors ${
                    i === currentIndex
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border bg-card hover:bg-accent text-muted-foreground"
                  }`}
                >
                  {example.questionNumber}
                </Link>
              ))}
            </div>
            <div className="mt-4">
              <Link
                href={exercisesBase}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <BookOpen className="h-3.5 w-3.5" />
                Back to Exercises
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
