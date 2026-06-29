"use client";

import { useState, useMemo } from "react";
import {
  FileText, FileX, Edit3, CreditCard, BookOpen, Trophy, Users,
  ChevronDown, ChevronUp, Bell, Info,
} from "lucide-react";

type ExamKey = "JEE Mains" | "JEE Advanced" | "NEET" | "CUET";
type EventType = "form_out" | "form_end" | "correction" | "admit_card" | "exam" | "result" | "counselling";

interface ExamEvent {
  id: string;
  exam: ExamKey;
  session: string;
  type: EventType;
  title: string;
  date: string; // YYYY-MM-DD
  note?: string;
}

const ALL_EVENTS: ExamEvent[] = [
  // ── JEE Mains 2026 Session 1 ──────────────────────────────────────────────
  { id: "jm26s1-out",  exam: "JEE Mains", session: "2026 S1", type: "form_out",   title: "JEE Mains 2026 S1 — Registration Opens",   date: "2025-10-28" },
  { id: "jm26s1-end",  exam: "JEE Mains", session: "2026 S1", type: "form_end",   title: "JEE Mains 2026 S1 — Registration Closes",  date: "2025-11-22" },
  { id: "jm26s1-cor",  exam: "JEE Mains", session: "2026 S1", type: "correction", title: "JEE Mains 2026 S1 — Correction Window",    date: "2025-11-23" },
  { id: "jm26s1-adm",  exam: "JEE Mains", session: "2026 S1", type: "admit_card", title: "JEE Mains 2026 S1 — Admit Card Released",  date: "2026-01-10" },
  { id: "jm26s1-exam", exam: "JEE Mains", session: "2026 S1", type: "exam",       title: "JEE Mains 2026 Session 1 — Exam",          date: "2026-01-22", note: "Jan 22–30, 2026 · Paper 1 & 2" },
  { id: "jm26s1-res",  exam: "JEE Mains", session: "2026 S1", type: "result",     title: "JEE Mains 2026 S1 — Result Declared",      date: "2026-02-12" },
  // ── JEE Mains 2026 Session 2 ──────────────────────────────────────────────
  { id: "jm26s2-out",  exam: "JEE Mains", session: "2026 S2", type: "form_out",   title: "JEE Mains 2026 S2 — Registration Opens",   date: "2026-02-01" },
  { id: "jm26s2-end",  exam: "JEE Mains", session: "2026 S2", type: "form_end",   title: "JEE Mains 2026 S2 — Registration Closes",  date: "2026-03-07" },
  { id: "jm26s2-adm",  exam: "JEE Mains", session: "2026 S2", type: "admit_card", title: "JEE Mains 2026 S2 — Admit Card Released",  date: "2026-03-28" },
  { id: "jm26s2-exam", exam: "JEE Mains", session: "2026 S2", type: "exam",       title: "JEE Mains 2026 Session 2 — Exam",          date: "2026-04-02", note: "Apr 2–9, 2026 · Paper 1 & 2" },
  { id: "jm26s2-res",  exam: "JEE Mains", session: "2026 S2", type: "result",     title: "JEE Mains 2026 S2 — Result Declared",      date: "2026-04-28" },
  // ── JEE Advanced 2026 ─────────────────────────────────────────────────────
  { id: "ja26-out",  exam: "JEE Advanced", session: "2026", type: "form_out",   title: "JEE Advanced 2026 — Registration Opens",  date: "2026-04-23" },
  { id: "ja26-end",  exam: "JEE Advanced", session: "2026", type: "form_end",   title: "JEE Advanced 2026 — Registration Closes", date: "2026-05-02" },
  { id: "ja26-adm",  exam: "JEE Advanced", session: "2026", type: "admit_card", title: "JEE Advanced 2026 — Admit Card Released", date: "2026-05-11" },
  { id: "ja26-exam", exam: "JEE Advanced", session: "2026", type: "exam",       title: "JEE Advanced 2026 — Exam",                date: "2026-05-18", note: "Paper 1 (9 AM) & Paper 2 (2 PM)" },
  { id: "ja26-res",  exam: "JEE Advanced", session: "2026", type: "result",     title: "JEE Advanced 2026 — Result Declared",     date: "2026-06-09" },
  // ── NEET 2026 ─────────────────────────────────────────────────────────────
  { id: "neet26-out",  exam: "NEET", session: "2026", type: "form_out",    title: "NEET 2026 — Registration Opens",          date: "2026-02-02" },
  { id: "neet26-end",  exam: "NEET", session: "2026", type: "form_end",    title: "NEET 2026 — Registration Closes",         date: "2026-03-07" },
  { id: "neet26-cor",  exam: "NEET", session: "2026", type: "correction",  title: "NEET 2026 — Correction Window",           date: "2026-03-11" },
  { id: "neet26-adm",  exam: "NEET", session: "2026", type: "admit_card",  title: "NEET 2026 — Admit Card Released",         date: "2026-04-20" },
  { id: "neet26-exam", exam: "NEET", session: "2026", type: "exam",        title: "NEET UG 2026 — Exam",                     date: "2026-05-05", note: "200 questions · 3 hrs 20 min · Offline" },
  { id: "neet26-res",  exam: "NEET", session: "2026", type: "result",      title: "NEET 2026 — Result Expected",             date: "2026-07-15" },
  { id: "neet26-cou",  exam: "NEET", session: "2026", type: "counselling", title: "NEET 2026 — MCC Counselling Begins",      date: "2026-08-01" },
  // ── CUET 2026 ─────────────────────────────────────────────────────────────
  { id: "cuet26-out",  exam: "CUET", session: "2026", type: "form_out",   title: "CUET 2026 — Registration Opens",          date: "2026-02-05" },
  { id: "cuet26-end",  exam: "CUET", session: "2026", type: "form_end",   title: "CUET 2026 — Registration Closes",         date: "2026-03-22" },
  { id: "cuet26-adm",  exam: "CUET", session: "2026", type: "admit_card", title: "CUET 2026 — Admit Card Released",         date: "2026-05-15" },
  { id: "cuet26-exam", exam: "CUET", session: "2026", type: "exam",       title: "CUET UG 2026 — Exam",                     date: "2026-05-20", note: "Computer-based · Multiple slots" },
  { id: "cuet26-res",  exam: "CUET", session: "2026", type: "result",     title: "CUET 2026 — Result Expected",             date: "2026-07-10" },
  // ── JEE Mains 2027 Session 1 ──────────────────────────────────────────────
  { id: "jm27s1-out",  exam: "JEE Mains", session: "2027 S1", type: "form_out",   title: "JEE Mains 2027 S1 — Registration Opens",   date: "2026-10-01", note: "Expected — dates may shift slightly" },
  { id: "jm27s1-end",  exam: "JEE Mains", session: "2027 S1", type: "form_end",   title: "JEE Mains 2027 S1 — Registration Closes",  date: "2026-11-15", note: "Expected — dates may shift slightly" },
  { id: "jm27s1-cor",  exam: "JEE Mains", session: "2027 S1", type: "correction", title: "JEE Mains 2027 S1 — Correction Window",    date: "2026-11-20", note: "Expected — dates may shift slightly" },
  { id: "jm27s1-adm",  exam: "JEE Mains", session: "2027 S1", type: "admit_card", title: "JEE Mains 2027 S1 — Admit Card",           date: "2027-01-10", note: "Expected — dates may shift slightly" },
  { id: "jm27s1-exam", exam: "JEE Mains", session: "2027 S1", type: "exam",       title: "JEE Mains 2027 Session 1 — Exam",          date: "2027-01-20", note: "Expected: Jan 20–28, 2027" },
  // ── JEE Mains 2027 Session 2 ──────────────────────────────────────────────
  { id: "jm27s2-out",  exam: "JEE Mains", session: "2027 S2", type: "form_out",   title: "JEE Mains 2027 S2 — Registration Opens",   date: "2027-02-01", note: "Expected — dates may shift slightly" },
  { id: "jm27s2-end",  exam: "JEE Mains", session: "2027 S2", type: "form_end",   title: "JEE Mains 2027 S2 — Registration Closes",  date: "2027-03-05", note: "Expected — dates may shift slightly" },
  { id: "jm27s2-exam", exam: "JEE Mains", session: "2027 S2", type: "exam",       title: "JEE Mains 2027 Session 2 — Exam",          date: "2027-04-02", note: "Expected: Apr 2–9, 2027" },
  // ── NEET 2027 ─────────────────────────────────────────────────────────────
  { id: "neet27-out",  exam: "NEET", session: "2027", type: "form_out",   title: "NEET 2027 — Registration Expected",       date: "2027-01-15", note: "Expected — dates may shift slightly" },
  { id: "neet27-end",  exam: "NEET", session: "2027", type: "form_end",   title: "NEET 2027 — Registration Closes",         date: "2027-02-20", note: "Expected — dates may shift slightly" },
  { id: "neet27-exam", exam: "NEET", session: "2027", type: "exam",       title: "NEET UG 2027 — Exam Expected",            date: "2027-05-02", note: "Expected: First Sunday of May" },
  // ── JEE Advanced 2027 ─────────────────────────────────────────────────────
  { id: "ja27-out",  exam: "JEE Advanced", session: "2027", type: "form_out",   title: "JEE Advanced 2027 — Registration Expected", date: "2027-04-24", note: "Expected — dates may shift slightly" },
  { id: "ja27-exam", exam: "JEE Advanced", session: "2027", type: "exam",       title: "JEE Advanced 2027 — Exam Expected",         date: "2027-05-16", note: "Expected: Third Sunday of May" },
  // ── CUET 2027 ─────────────────────────────────────────────────────────────
  { id: "cuet27-out",  exam: "CUET", session: "2027", type: "form_out",   title: "CUET 2027 — Registration Expected",       date: "2027-02-01", note: "Expected — dates may shift slightly" },
  { id: "cuet27-exam", exam: "CUET", session: "2027", type: "exam",       title: "CUET UG 2027 — Exam Expected",            date: "2027-05-20", note: "Expected: May/June 2027" },
];

const EXAM_STYLE: Record<ExamKey, { color: string; dimColor: string; bg: string; border: string }> = {
  "JEE Mains":    { color: "#60a5fa", dimColor: "#3b6fad", bg: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.35)" },
  "JEE Advanced": { color: "#a78bfa", dimColor: "#6d5fad", bg: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.35)" },
  "NEET":         { color: "#4ade80", dimColor: "#2d8a52", bg: "rgba(34,197,94,0.12)",  border: "rgba(34,197,94,0.35)" },
  "CUET":         { color: "#fb923c", dimColor: "#ad6030", bg: "rgba(249,115,22,0.12)", border: "rgba(249,115,22,0.35)" },
};

const EVENT_ICON: Record<EventType, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  form_out:    FileText,
  form_end:    FileX,
  correction:  Edit3,
  admit_card:  CreditCard,
  exam:        BookOpen,
  result:      Trophy,
  counselling: Users,
};

const EVENT_LABEL: Record<EventType, string> = {
  form_out:    "Form Released",
  form_end:    "Reg. Closes",
  correction:  "Correction",
  admit_card:  "Admit Card",
  exam:        "Exam Day",
  result:      "Result",
  counselling: "Counselling",
};

const EVENT_URGENCY: Record<EventType, "critical" | "high" | "normal"> = {
  form_end:    "critical",
  exam:        "critical",
  correction:  "high",
  admit_card:  "high",
  result:      "normal",
  form_out:    "normal",
  counselling: "normal",
};

function parseDateLocal(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function getDayDiff(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = parseDateLocal(dateStr);
  return Math.round((eventDate.getTime() - today.getTime()) / 86_400_000);
}

function formatDate(dateStr: string): string {
  return parseDateLocal(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function DaysBadge({ diff, type, isPast }: { diff: number; type: EventType; isPast: boolean }) {
  if (isPast) {
    return (
      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.06)", borderRadius: 6, padding: "2px 8px", whiteSpace: "nowrap" }}>
        {Math.abs(diff)}d ago
      </span>
    );
  }
  if (diff === 0) {
    return <span style={{ fontSize: 11, fontWeight: 700, color: "#fbbf24", background: "rgba(251,191,36,0.15)", borderRadius: 6, padding: "2px 8px", whiteSpace: "nowrap" }}>Today</span>;
  }
  const urgency = EVENT_URGENCY[type];
  const color = urgency === "critical" && diff <= 7 ? "#f87171"
    : urgency === "critical" && diff <= 30 ? "#fb923c"
    : "#60a5fa";
  const bg = urgency === "critical" && diff <= 7 ? "rgba(248,113,113,0.12)"
    : urgency === "critical" && diff <= 30 ? "rgba(249,115,22,0.12)"
    : "rgba(96,165,250,0.10)";
  return (
    <span style={{ fontSize: 11, fontWeight: 600, color, background: bg, borderRadius: 6, padding: "2px 8px", whiteSpace: "nowrap" }}>
      in {diff}d
    </span>
  );
}

function EventCard({ event, isPast }: { event: ExamEvent; isPast: boolean }) {
  const style = EXAM_STYLE[event.exam];
  const Icon = EVENT_ICON[event.type];
  const diff = getDayDiff(event.date);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
        padding: "14px 16px",
        borderRadius: 12,
        background: "#171b20",
        border: `1px solid ${isPast ? "rgba(255,255,255,0.07)" : style.border}`,
        borderLeft: `3px solid ${isPast ? "rgba(255,255,255,0.15)" : style.color}`,
        opacity: isPast ? 0.55 : 1,
        transition: "opacity 0.2s",
      }}
    >
      {/* Icon */}
      <div style={{
        flexShrink: 0,
        width: 34,
        height: 34,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: isPast ? "rgba(255,255,255,0.06)" : style.bg,
        border: `1px solid ${isPast ? "rgba(255,255,255,0.1)" : style.border}`,
        marginTop: 1,
      }}>
        <Icon size={16} strokeWidth={2} style={{ color: isPast ? "rgba(255,255,255,0.3)" : style.color }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 3 }}>
          <span style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: isPast ? "rgba(255,255,255,0.3)" : style.color,
            background: isPast ? "rgba(255,255,255,0.06)" : style.bg,
            border: `1px solid ${isPast ? "rgba(255,255,255,0.08)" : style.border}`,
            borderRadius: 5,
            padding: "1px 6px",
          }}>
            {event.exam}
          </span>
          <span style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.35)",
            background: "rgba(255,255,255,0.05)",
            borderRadius: 5,
            padding: "1px 6px",
          }}>
            {EVENT_LABEL[event.type]}
          </span>
        </div>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: isPast ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.88)", marginBottom: 2, lineHeight: 1.3 }}>
          {event.title}
        </div>
        {event.note && (
          <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>{event.note}</div>
        )}
      </div>

      {/* Date + badge */}
      <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, marginTop: 2 }}>
        <span style={{ fontSize: 11.5, fontWeight: 500, color: isPast ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.6)", whiteSpace: "nowrap" }}>
          {formatDate(event.date)}
        </span>
        <DaysBadge diff={diff} type={event.type} isPast={isPast} />
      </div>
    </div>
  );
}

const ALL_EXAMS: ExamKey[] = ["JEE Mains", "JEE Advanced", "NEET", "CUET"];

export default function NotificationsClient({ userExams }: { userExams: string[] }) {
  const hasUserExams = userExams.length > 0;
  const [showMine, setShowMine] = useState(hasUserExams);
  const [pastExpanded, setPastExpanded] = useState(false);
  const [selectedExams, setSelectedExams] = useState<Set<ExamKey>>(
    new Set(hasUserExams ? (userExams as ExamKey[]) : ALL_EXAMS)
  );

  const activeExams: ExamKey[] = showMine
    ? (userExams as ExamKey[])
    : Array.from(selectedExams);

  const { upcoming, past } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const filtered = ALL_EVENTS.filter(e => activeExams.includes(e.exam));
    const up = filtered.filter(e => parseDateLocal(e.date) >= today).sort((a, b) => a.date.localeCompare(b.date));
    const pa = filtered.filter(e => parseDateLocal(e.date) < today).sort((a, b) => b.date.localeCompare(a.date));
    return { upcoming: up, past: pa };
  }, [activeExams]);

  const nextEvent = upcoming[0];
  const nextDiff = nextEvent ? getDayDiff(nextEvent.date) : null;

  function toggleExam(exam: ExamKey) {
    setSelectedExams(prev => {
      const next = new Set(prev);
      if (next.has(exam)) { if (next.size > 1) next.delete(exam); }
      else next.add(exam);
      return next;
    });
  }

  const glass = {
    background: "#171b20",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16,
  } as React.CSSProperties;

  return (
    <div className="px-6 py-8 max-w-5xl">
      <div>

        {/* Header */}
        <h1 className="text-3xl font-black mb-1" style={{ color: "rgba(255,255,255,0.95)" }}>Notifications</h1>
        <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
          Exam dates, registration deadlines, admit cards, results and more.
        </p>

        {/* Summary strip */}
        {nextEvent && (
          <div style={{
            ...glass,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "14px 18px",
            marginBottom: 16,
            borderColor: "rgba(96,165,250,0.2)",
            background: "#171b20",
          }}>
            <Bell size={15} style={{ color: "#60a5fa", flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
              <span style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>
                {upcoming.length} upcoming event{upcoming.length !== 1 ? "s" : ""}
              </span>
              {" · Next: "}
              <span style={{ color: EXAM_STYLE[nextEvent.exam].color, fontWeight: 500 }}>
                {nextEvent.title}
              </span>
              {nextDiff === 0 ? " — Today!" : ` in ${nextDiff} days`}
            </span>
          </div>
        )}

        {/* No target exam nudge */}
        {!hasUserExams && (
          <div style={{
            ...glass,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "13px 18px",
            marginBottom: 16,
            borderColor: "rgba(251,191,36,0.2)",
            background: "#171b20",
          }}>
            <Info size={14} style={{ color: "#fbbf24", flexShrink: 0 }} />
            <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.6)" }}>
              Set your target exams in{" "}
              <a href="/dashboard/profile" style={{ color: "#fbbf24", textDecoration: "underline", textUnderlineOffset: 3 }}>
                Profile
              </a>{" "}
              to see personalised alerts.
            </span>
          </div>
        )}

        {/* Filter panel */}
        <div style={{ ...glass, padding: "14px 18px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {/* My / All toggle */}
          {hasUserExams && (
            <div style={{
              display: "flex",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
              padding: 2,
              gap: 2,
            }}>
              {(["my", "all"] as const).map(v => (
                <button
                  key={v}
                  onClick={() => {
                    setShowMine(v === "my");
                    if (v === "all") setSelectedExams(new Set(ALL_EXAMS));
                  }}
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    padding: "5px 14px",
                    borderRadius: 6,
                    border: "none",
                    cursor: "pointer",
                    background: (v === "my") === showMine ? "rgba(255,255,255,0.12)" : "transparent",
                    color: (v === "my") === showMine ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)",
                    transition: "all 0.15s",
                  }}
                >
                  {v === "my" ? "My Exams" : "All Exams"}
                </button>
              ))}
            </div>
          )}

          {/* Exam chips — shown in "All" mode */}
          {!showMine && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {ALL_EXAMS.map(exam => {
                const s = EXAM_STYLE[exam];
                const active = selectedExams.has(exam);
                return (
                  <button
                    key={exam}
                    onClick={() => toggleExam(exam)}
                    style={{
                      fontSize: 11.5,
                      fontWeight: 600,
                      padding: "5px 12px",
                      borderRadius: 20,
                      border: `1px solid ${active ? s.border : "rgba(255,255,255,0.1)"}`,
                      background: active ? s.bg : "rgba(255,255,255,0.04)",
                      color: active ? s.color : "rgba(255,255,255,0.35)",
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    {exam}
                  </button>
                );
              })}
            </div>
          )}

          {/* "My Exams" mode: show opted exam chips (read-only) */}
          {showMine && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {(userExams as ExamKey[]).map(exam => {
                const s = EXAM_STYLE[exam];
                return (
                  <span key={exam} style={{
                    fontSize: 11.5,
                    fontWeight: 600,
                    padding: "5px 12px",
                    borderRadius: 20,
                    border: `1px solid ${s.border}`,
                    background: s.bg,
                    color: s.color,
                  }}>
                    {exam}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* Upcoming events panel */}
        <div style={{ ...glass, padding: "18px 18px", marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 12 }}>
            Upcoming · {upcoming.length}
          </div>
          {upcoming.length === 0 ? (
            <div style={{ padding: "28px 0", textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
              No upcoming events for the selected exams.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {upcoming.map(e => <EventCard key={e.id} event={e} isPast={false} />)}
            </div>
          )}
        </div>

        {/* Past events panel */}
        {past.length > 0 && (
          <div style={{ ...glass, padding: "14px 18px" }}>
            <button
              onClick={() => setPastExpanded(p => !p)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                width: "100%",
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
                Past · {past.length}
              </span>
              {pastExpanded
                ? <ChevronUp size={13} style={{ color: "rgba(255,255,255,0.3)" }} />
                : <ChevronDown size={13} style={{ color: "rgba(255,255,255,0.3)" }} />}
            </button>

            {pastExpanded && (
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
                {past.map(e => <EventCard key={e.id} event={e} isPast />)}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
