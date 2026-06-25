import { Metadata } from "next";

export const dynamic = "force-dynamic";
import Link from "next/link";
import { sanityClient } from "@/sanity/lib/client";
import { ncertClassesQuery } from "@/sanity/lib/queries";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "NCERT Solutions",
  description: "Free NCERT solutions for classes 6 to 12 — Physics, Chemistry, Maths, Biology and more.",
};

const CLASS_LABELS: Record<number, string> = {
  6: "Class 6", 7: "Class 7", 8: "Class 8", 9: "Class 9",
  10: "Class 10", 11: "Class 11", 12: "Class 12",
};

export default async function NcertHomePage() {
  const classes: number[] = await sanityClient.fetch(ncertClassesQuery);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">NCERT Solutions</h1>
        <p className="text-muted-foreground">
          Step-by-step solutions for all classes and subjects. Select your class to get started.
        </p>
      </div>

      {classes.length === 0 ? (
        <p className="text-muted-foreground">Solutions coming soon. Check back shortly!</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {classes.map((cls) => (
            <Link
              key={cls}
              href={`/ncert/${cls}`}
              className="group flex cursor-pointer flex-col items-center justify-center gap-2 p-6 rounded-3xl border-[3px] border-primary/15 bg-card [box-shadow:var(--clay-shadow)] hover:[box-shadow:var(--clay-shadow-hover)] hover:-translate-y-1 [transition-property:all] [transition-duration:200ms] [transition-timing-function:var(--clay-bounce)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border-[3px] border-primary/20 bg-primary/10 [box-shadow:inset_-1px_-2px_4px_rgba(0,0,0,0.07),_2px_4px_8px_rgba(232,97,26,0.15)]">
                <BookOpen className="h-5 w-5 text-primary" />
              </span>
              <span className="font-bold text-sm group-hover:text-primary transition-colors">
                {CLASS_LABELS[cls] ?? `Class ${cls}`}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
