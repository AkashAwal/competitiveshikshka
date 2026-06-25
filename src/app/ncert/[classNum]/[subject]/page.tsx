import { Metadata } from "next";

export const dynamic = "force-dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityClient } from "@/sanity/lib/client";
import { ncertChaptersBySubjectQuery } from "@/sanity/lib/queries";
import { ChevronRight } from "lucide-react";
import { slugToSubject } from "@/lib/subject-slug";

type Props = { params: Promise<{ classNum: string; subject: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { classNum, subject } = await params;
  const subjectTitle = decodeURIComponent(subject);
  return {
    title: `Class ${classNum} ${subjectTitle} NCERT Solutions`,
    description: `Chapter-wise NCERT solutions for Class ${classNum} ${subjectTitle}.`,
  };
}

type ChapterRow = { chapter: number; chapterTitle: string; questionCount: number };

export default async function NcertSubjectPage({ params }: Props) {
  const { classNum, subject } = await params;
  const cls = parseInt(classNum, 10);
  const subjectTitle = slugToSubject(subject);

  if (isNaN(cls) || cls < 6 || cls > 12) notFound();

  const chapters: ChapterRow[] = await sanityClient.fetch(ncertChaptersBySubjectQuery, {
    class: cls,
    subject: subjectTitle,
  });

  if (chapters.length === 0) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-8 flex-wrap">
        <Link href="/ncert" className="hover:text-primary transition-colors">NCERT</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/ncert/${cls}`} className="hover:text-primary transition-colors">Class {cls}</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-semibold capitalize">{subjectTitle}</span>
      </nav>

      <h1 className="text-3xl font-bold mb-2 capitalize">
        Class {cls} {subjectTitle} Solutions
      </h1>
      <p className="text-muted-foreground mb-8">Select a chapter to view solutions.</p>

      <div className="space-y-3">
        {chapters.map(({ chapter, chapterTitle, questionCount }) => (
          <Link
            key={chapter}
            href={`/ncert/${cls}/${subject}/chapter-${chapter}`}
            className="group flex cursor-pointer items-center justify-between p-5 rounded-3xl border-[3px] border-primary/15 bg-card [box-shadow:var(--clay-shadow)] hover:[box-shadow:var(--clay-shadow-hover)] hover:-translate-y-0.5 [transition-property:all] [transition-duration:200ms] [transition-timing-function:var(--clay-bounce)]"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border-[3px] border-primary/20 bg-primary/10 text-sm font-bold text-primary/50 group-hover:text-primary group-hover:bg-primary/15 transition-colors [box-shadow:inset_-1px_-2px_4px_rgba(0,0,0,0.06)]">
                {chapter}
              </span>
              <div>
                <p className="font-bold group-hover:text-primary transition-colors">{chapterTitle}</p>
                <p className="text-sm text-muted-foreground">{questionCount} questions</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
