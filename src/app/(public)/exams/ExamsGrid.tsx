import Link from "next/link";
import { FileText, Building2, ArrowRight } from "lucide-react";

export interface ExamCard {
  id: string;
  slug: string;
  name: string;
  full_name: string | null;
  category: string;
  conducting_body: string | null;
  about: string | null;
}

export function ExamsGrid({ exams }: { exams: ExamCard[] }) {
  const grouped = exams.reduce<Record<string, ExamCard[]>>((acc, e) => {
    (acc[e.category] ??= []).push(e);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-14">
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <h2 className="text-2xl font-black text-foreground mb-5">{category} Entrance Exams</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map(exam => (
              <Link
                key={exam.id}
                href={`/exams/${exam.slug}`}
                className="group flex flex-col gap-4 text-left rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary hover:shadow-md hover:shadow-primary/5 cursor-pointer"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary group-hover:[&_svg]:text-white">
                  <FileText className="h-5 w-5 text-primary transition-colors" />
                </span>
                <div>
                  <h3 className="font-bold text-foreground mb-1 leading-snug">{exam.name}</h3>
                  {exam.conducting_body && (
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Building2 className="h-3.5 w-3.5" /> {exam.conducting_body}
                    </p>
                  )}
                </div>
                {exam.about && (
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{exam.about}</p>
                )}
                <span className="mt-auto flex items-center gap-1 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Read full details <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
