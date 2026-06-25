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
        <p className="text-muted-foreground">Select your class to get started.</p>
      </div>

      {classes.length === 0 ? (
        <p className="text-muted-foreground">Solutions coming soon. Check back shortly!</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {classes.map((cls) => (
            <Link
              key={cls}
              href={`/ncert/${cls}`}
              className="group flex flex-col items-center justify-center gap-2 p-6 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-sm transition-all duration-200"
            >
              <BookOpen className="h-6 w-6 text-primary" />
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
