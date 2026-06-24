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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-8 flex-wrap">
        <Link href="/ncert" className="hover:text-primary transition-colors">NCERT</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/ncert/${cls}`} className="hover:text-primary transition-colors">Class {cls}</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium capitalize">{subjectTitle}</span>
      </nav>

      <h1 className="text-3xl font-bold mb-2 capitalize">
        Class {cls} {subjectTitle} Solutions
      </h1>
      <p className="text-muted-foreground mb-8">Select a chapter to view solutions.</p>

      <div className="space-y-2">
        {chapters.map(({ chapter, chapterTitle, questionCount }) => (
          <Link
            key={chapter}
            href={`/ncert/${cls}/${subject}/chapter-${chapter}`}
            className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-primary hover:bg-accent transition-colors group"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-primary/40 group-hover:text-primary/70 transition-colors w-8 text-right tabular-nums">
                {chapter}
              </span>
              <div>
                <p className="font-medium group-hover:text-primary transition-colors">{chapterTitle}</p>
                <p className="text-sm text-muted-foreground">{questionCount} questions</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
