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
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-8 flex-wrap">
        <Link href="/ncert" className="hover:text-primary transition-colors">NCERT</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/ncert/${cls}`} className="hover:text-primary transition-colors">Class {cls}</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/ncert/${cls}/${subject}`} className="hover:text-primary transition-colors capitalize">{subjectTitle}</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-bold">Chapter {chapterNum}</span>
      </nav>

      <div className="mb-8">
        <span className="inline-flex items-center rounded-lg border-[2px] border-black bg-primary px-3 py-1 text-sm font-bold text-white mb-3 [box-shadow:2px_2px_0_#000]">
          Chapter {chapterNum}
        </span>
        <h1 className="text-3xl font-bold">{data.chapterTitle}</h1>
        <p className="text-muted-foreground mt-1">Class {cls} · {subjectTitle}</p>
      </div>

      <div className="space-y-3">
        {data.questions.map((qa, i) => (
          <details
            key={i}
            className="group rounded-lg border-[3px] border-black bg-white overflow-hidden [box-shadow:var(--neo-shadow)] open:[box-shadow:var(--neo-shadow-hover)]"
            id={`q${qa.questionNumber}`}
          >
            <summary className="flex cursor-pointer select-none list-none items-start justify-between gap-4 p-5 hover:bg-accent transition-colors">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-[2px] border-black bg-primary text-xs font-bold text-white [box-shadow:1px_1px_0_#000]">
                  {qa.questionNumber}
                </span>
                <div className="text-sm font-semibold leading-relaxed">
                  {qa.questionText?.length ? (
                    <PortableText value={qa.questionText as unknown[]} />
                  ) : (
                    <span className="text-muted-foreground">Question {qa.questionNumber}</span>
                  )}
                </div>
              </div>
              <ChevronDown className="h-5 w-5 mt-0.5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>

            <div className="border-t-[3px] border-black px-5 pb-5 pt-4 bg-accent/30">
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-primary">Answer</p>
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
