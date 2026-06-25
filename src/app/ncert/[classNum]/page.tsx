import { Metadata } from "next";

export const dynamic = "force-dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityClient } from "@/sanity/lib/client";
import { ncertSubjectsByClassQuery } from "@/sanity/lib/queries";
import { ChevronRight } from "lucide-react";
import { subjectToSlug } from "@/lib/subject-slug";

type Props = { params: Promise<{ classNum: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { classNum } = await params;
  return {
    title: `Class ${classNum} NCERT Solutions`,
    description: `Free NCERT solutions for Class ${classNum} — all subjects.`,
  };
}

type SubjectRow = { subject: string; chapters: number };

export default async function NcertClassPage({ params }: Props) {
  const { classNum } = await params;
  const cls = parseInt(classNum, 10);

  if (isNaN(cls) || cls < 6 || cls > 12) notFound();

  const subjects: SubjectRow[] = await sanityClient.fetch(ncertSubjectsByClassQuery, { class: cls });

  if (subjects.length === 0) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-8">
        <Link href="/ncert" className="hover:text-primary transition-colors">NCERT</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-bold">Class {cls}</span>
      </nav>

      <h1 className="text-3xl font-bold mb-2">Class {cls} NCERT Solutions</h1>
      <p className="text-muted-foreground mb-8">Select a subject to view chapter-wise solutions.</p>

      <div className="grid sm:grid-cols-2 gap-4">
        {subjects.map(({ subject, chapters }) => (
          <Link
            key={subject}
            href={`/ncert/${cls}/${subjectToSlug(subject)}`}
            className="group flex cursor-pointer items-center justify-between p-5 rounded-lg border-[3px] border-black bg-white [box-shadow:var(--neo-shadow)] hover:[box-shadow:var(--neo-shadow-hover)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150"
          >
            <div>
              <p className="font-bold group-hover:text-primary transition-colors">{subject}</p>
              <p className="text-sm text-muted-foreground">{chapters} chapter{chapters !== 1 ? "s" : ""}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
