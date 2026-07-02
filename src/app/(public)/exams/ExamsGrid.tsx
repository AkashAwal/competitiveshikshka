"use client";

import { useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import {
  FileText, Building2, X, ExternalLink, CalendarClock, CalendarDays,
  ClipboardList, BookOpen, GraduationCap, TrendingDown, Lightbulb, ArrowRight,
} from "lucide-react";

export interface ExamCard {
  id: string;
  slug: string;
  name: string;
  full_name: string | null;
  category: string;
  conducting_body: string | null;
  about: string | null;
  marking_scheme: string | null;
  application_window: string | null;
  exam_dates: string | null;
  official_link: string | null;
  eligible_institutes: string | null;
  recent_cutoffs: string | null;
  syllabus: string | null;
  tips_and_tricks: string | null;
}

function Row({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-2">
      <p className="flex items-center gap-2 text-sm font-bold text-zinc-900">
        <Icon className="h-4 w-4 text-[#2563eb]" /> {label}
      </p>
      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line pl-6">{value}</p>
    </div>
  );
}

export function ExamsGrid({ exams, initialSlug }: { exams: ExamCard[]; initialSlug?: string }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(() =>
    initialSlug && exams.some(e => e.slug === initialSlug) ? initialSlug : null
  );

  const active = exams.find(e => e.slug === activeSlug) ?? null;

  const grouped = exams.reduce<Record<string, ExamCard[]>>((acc, e) => {
    (acc[e.category] ??= []).push(e);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-14">
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <h2 className="text-2xl font-black text-zinc-900 mb-5">{category} Entrance Exams</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map(exam => (
              <button
                key={exam.id}
                onClick={() => setActiveSlug(exam.slug)}
                className="group flex flex-col gap-4 text-left rounded-xl border border-border bg-white p-6 transition-all duration-200 hover:border-[#2563eb] hover:shadow-sm cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2563eb]/10">
                    <FileText className="h-5 w-5 text-[#2563eb]" />
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 mb-1 leading-snug">{exam.name}</h3>
                  {exam.conducting_body && (
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Building2 className="h-3.5 w-3.5" /> {exam.conducting_body}
                    </p>
                  )}
                </div>
                {exam.about && (
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{exam.about}</p>
                )}
                <span className="mt-auto flex items-center gap-1 text-sm font-semibold text-[#2563eb] opacity-0 group-hover:opacity-100 transition-opacity">
                  Read full details <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}

      <Dialog.Root open={!!active} onOpenChange={o => !o && setActiveSlug(null)}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} />
          <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white max-h-[85vh] overflow-y-auto">
            {active && (
              <div className="p-6 sm:p-8 flex flex-col gap-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600">{active.category}</span>
                    <Dialog.Title className="text-2xl sm:text-3xl font-black text-zinc-900 mt-3 leading-tight">{active.name}</Dialog.Title>
                    {active.full_name && <p className="text-sm text-muted-foreground mt-1">{active.full_name}</p>}
                  </div>
                  <Dialog.Close className="p-1.5 rounded-lg cursor-pointer text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 shrink-0">
                    <X className="h-5 w-5" />
                  </Dialog.Close>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {active.conducting_body && (
                    <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#2563eb]/5 text-zinc-700 border border-border">
                      <Building2 className="h-3.5 w-3.5 text-[#2563eb]" /> Conducted by {active.conducting_body}
                    </span>
                  )}
                  {active.official_link && (
                    <a
                      href={active.official_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full text-white"
                      style={{ backgroundColor: "#2563eb" }}
                    >
                      Official website <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>

                <Row icon={FileText} label="About" value={active.about} />

                {(active.application_window || active.exam_dates) && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {active.application_window && (
                      <div className="rounded-xl border border-border p-4">
                        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-zinc-400 mb-2">
                          <CalendarClock className="h-3.5 w-3.5" /> When to apply
                        </p>
                        <p className="text-sm text-zinc-700 whitespace-pre-line">{active.application_window}</p>
                      </div>
                    )}
                    {active.exam_dates && (
                      <div className="rounded-xl border border-border p-4">
                        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-zinc-400 mb-2">
                          <CalendarDays className="h-3.5 w-3.5" /> Expected exam dates
                        </p>
                        <p className="text-sm text-zinc-700 whitespace-pre-line">{active.exam_dates}</p>
                      </div>
                    )}
                  </div>
                )}

                <Row icon={ClipboardList} label="Marking scheme" value={active.marking_scheme} />
                <Row icon={BookOpen} label="Syllabus" value={active.syllabus} />
                <Row icon={GraduationCap} label="Institutes you can get into" value={active.eligible_institutes} />
                <Row icon={TrendingDown} label="Recent cutoffs" value={active.recent_cutoffs} />
                <Row icon={Lightbulb} label="Tips & tricks" value={active.tips_and_tricks} />
              </div>
            )}
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
