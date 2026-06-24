import { Metadata } from "next";

export const dynamic = "force-dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityClient } from "@/sanity/lib/client";
import { ncertChapterQuery } from "@/sanity/lib/queries";
import { slugToSubject } from "@/lib/subject-slug";
import { PortableText } from "@/components/portable-text";
import { ChevronRight, ChevronDown } from "lucide-react";

type Props = { params: Promise<{ classNum: string; subject: string; chapter: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { classNum, subject, chapter } = await params;
  const chapterNum = chapter.replace("chapter-", "");
  const subjectTitle = slugToSubject(subject);
  return {
    title: `Class ${classNum} ${subjectTitle} Chapter ${chapterNum} NCERT Solutions`,
    description: `NCERT solutions for Class ${classNum} ${subjectTitle} Chapter ${chapterNum}.`,
  };
}

type QA = {
  questionNumber: string;
  questionText: unknown[];
  answer: unknown[];
};

type ChapterData = {
  class: number;
  subject: string;
  chapter: number;
  chapterTitle: string;
  questions: QA[];
};

export default async function NcertChapterPage({ params }: Props) {
  const { classNum, subject, chapter } = await params;
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

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-8 flex-wrap">
        <Link href="/ncert" className="hover:text-primary transition-colors">NCERT</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/ncert/${cls}`} className="hover:text-primary transition-colors">Class {cls}</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/ncert/${cls}/${subject}`} className="hover:text-primary transition-colors capitalize">{subjectTitle}</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">Chapter {chapterNum}</span>
      </nav>

      <div className="mb-8">
        <p className="text-sm text-primary font-medium mb-1">Chapter {chapterNum}</p>
        <h1 className="text-3xl font-bold">{data.chapterTitle}</h1>
        <p className="text-muted-foreground mt-1">Class {cls} · {subjectTitle}</p>
      </div>

      <div className="space-y-4">
        {data.questions.map((qa, i) => (
          <details
            key={i}
            className="group border border-border rounded-xl bg-card overflow-hidden"
            id={`q${qa.questionNumber}`}
          >
            <summary className="flex items-start justify-between gap-4 p-5 cursor-pointer select-none hover:bg-accent transition-colors list-none">
              <div className="flex items-start gap-3">
                <span className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold mt-0.5">
                  {qa.questionNumber}
                </span>
                <div className="text-sm font-medium leading-relaxed">
                  {qa.questionText?.length ? (
                    <PortableText value={qa.questionText as unknown[]} />
                  ) : (
                    <span className="text-muted-foreground">Question {qa.questionNumber}</span>
                  )}
                </div>
              </div>
              <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground mt-0.5 transition-transform group-open:rotate-180" />
            </summary>

            <div className="px-5 pb-5 pt-1 border-t border-border">
              <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-3">Answer</p>
              {qa.answer?.length ? (
                <PortableText value={qa.answer as unknown[]} />
              ) : (
                <p className="text-muted-foreground text-sm">Answer coming soon.</p>
              )}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
