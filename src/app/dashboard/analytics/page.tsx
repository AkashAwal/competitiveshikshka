import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const STREAM_SUBJECTS: Record<string, string[]> = {
  PCM:        ["Physics", "Chemistry", "Mathematics"],
  PCMB:       ["Physics", "Chemistry", "Mathematics", "Biology"],
  Commerce:   ["Accountancy", "Business Studies", "Economics"],
  Humanities: ["History", "Geography", "Political Science", "Economics"],
};

function getExamDate(exam: string | null, year: number | null): Date {
  if (!exam || !year) return new Date("2027-01-15");
  const exams = exam.split(",");
  let month = 1, day = 15;
  if (exams.includes("NEET") && !exams.some(e => e.includes("JEE"))) { month = 5; day = 5; }
  else if (exams.includes("JEE Advanced") && !exams.includes("JEE Mains")) { month = 5; day = 18; }
  return new Date(year, month - 1, day);
}

function getExamLabel(exam: string | null): string {
  if (!exam) return "JEE";
  const exams = exam.split(",");
  const hasJee = exams.some(e => e.includes("JEE"));
  const hasNeet = exams.includes("NEET");
  if (hasJee && hasNeet) return "JEE + NEET";
  if (hasNeet) return "NEET";
  return "JEE";
}

const card = {
  background: "var(--surface-card)",
  border: "1px solid rgba(var(--fg-rgb),0.13)",
};

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("streak, strong_subject, weak_subject, target_exam, target_year, daily_goal_hours, class, stream")
    .eq("id", user.id)
    .single();

  const stream = profile?.stream ?? "PCM";
  const subjects = STREAM_SUBJECTS[stream] ?? STREAM_SUBJECTS["PCM"];

  const examDate   = getExamDate(profile?.target_exam ?? null, profile?.target_year ?? null);
  const daysLeft   = Math.max(0, Math.ceil((examDate.getTime() - Date.now()) / 86_400_000));
  const totalDays  = Math.ceil((examDate.getTime() - new Date("2024-01-01").getTime()) / 86_400_000);
  const progressPct = Math.max(2, Math.min(98, Math.round(((totalDays - daysLeft) / totalDays) * 100)));
  const examLabel  = getExamLabel(profile?.target_exam ?? null);

  const stats = [
    { label: "Current Streak",   value: `${profile?.streak ?? 0}`,               unit: "days",    color: "#fb923c", bg: "rgba(251,146,60,0.1)",  icon: "🔥" },
    { label: "Tests Completed",  value: "0",                                       unit: "tests",   color: "#60a5fa", bg: "rgba(96,165,250,0.1)",  icon: "📝" },
    { label: "Daily Goal",       value: profile?.daily_goal_hours ? `${profile.daily_goal_hours}` : "—", unit: profile?.daily_goal_hours ? "hrs/day" : "", color: "#34d399", bg: "rgba(52,211,153,0.1)", icon: "⏱️" },
    { label: "Avg Score",        value: "—",                                       unit: "",        color: "#a78bfa", bg: "rgba(167,139,250,0.1)", icon: "📊" },
  ];

  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-black mb-1" style={{ color: "rgba(var(--fg-rgb),0.95)" }}>Analytics</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(var(--fg-rgb),0.4)" }}>
        Your performance across tests, topics and time.
      </p>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {stats.map(({ label, value, unit, color, bg, icon }) => (
          <div key={label} className="rounded-2xl p-5 flex flex-col gap-3" style={card}>
            <div className="flex items-center justify-between">
              <span className="text-xl">{icon}</span>
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: bg, color }}
              >
                {label}
              </span>
            </div>
            <div>
              <p className="text-3xl font-black" style={{ color: "rgba(var(--fg-rgb),0.95)" }}>
                {value}
                {unit && <span className="text-sm font-semibold ml-1.5" style={{ color: "rgba(var(--fg-rgb),0.4)" }}>{unit}</span>}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Two columns ── */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">

        {/* Subject Strength */}
        <div className="rounded-2xl p-6 flex flex-col gap-4" style={card}>
          <p className="text-sm font-bold" style={{ color: "rgba(var(--fg-rgb),0.9)" }}>Subject Strength</p>
          <div className="flex flex-col gap-3">
            {subjects.map((subject) => {
              const isStrong = subject === profile?.strong_subject;
              const isWeak   = subject === profile?.weak_subject;
              const label    = isStrong ? "Strong" : isWeak ? "Needs Work" : "Tracking soon";
              const color    = isStrong ? "#34d399" : isWeak ? "#f87171" : "rgba(var(--fg-rgb),0.25)";
              const bg       = isStrong ? "rgba(52,211,153,0.1)" : isWeak ? "rgba(248,113,113,0.1)" : "rgba(var(--fg-rgb),0.04)";
              const barWidth = isStrong ? "85%" : isWeak ? "30%" : "55%";
              const barColor = isStrong ? "#34d399" : isWeak ? "#f87171" : "rgba(var(--fg-rgb),0.12)";

              return (
                <div key={subject} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium" style={{ color: "rgba(var(--fg-rgb),0.8)" }}>{subject}</span>
                    <span
                      className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: bg, color }}
                    >
                      {label}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full w-full" style={{ backgroundColor: "rgba(var(--fg-rgb),0.06)" }}>
                    <div
                      className="h-1.5 rounded-full transition-all"
                      style={{ width: barWidth, backgroundColor: barColor }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-xs mt-1" style={{ color: "rgba(var(--fg-rgb),0.2)" }}>
            Bars will reflect real test data once you attempt tests.
          </p>
        </div>

        {/* Exam Countdown */}
        <div className="rounded-2xl p-6 flex flex-col gap-5" style={card}>
          <p className="text-sm font-bold" style={{ color: "rgba(var(--fg-rgb),0.9)" }}>Exam Countdown</p>

          <div className="flex items-end gap-2">
            <p className="text-5xl font-black" style={{ color: "rgba(var(--fg-rgb),0.95)" }}>{daysLeft}</p>
            <p className="text-sm mb-2 font-semibold" style={{ color: "rgba(var(--fg-rgb),0.4)" }}>days left</p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-semibold" style={{ color: "rgba(var(--fg-rgb),0.35)" }}>
              <span>Preparation progress</span>
              <span>{progressPct}%</span>
            </div>
            <div className="h-2 rounded-full w-full" style={{ backgroundColor: "rgba(var(--fg-rgb),0.06)" }}>
              <div
                className="h-2 rounded-full"
                style={{ width: `${progressPct}%`, background: "linear-gradient(90deg, #2563eb, #818cf8)" }}
              />
            </div>
          </div>

          <div
            className="rounded-xl p-4 flex items-center gap-4"
            style={{ backgroundColor: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)" }}
          >
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 text-lg font-black"
              style={{ background: "linear-gradient(135deg, #2563eb, #818cf8)", color: "#fff" }}
            >
              {examLabel[0]}
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: "rgba(var(--fg-rgb),0.9)" }}>
                {examLabel}
              </p>
              <p className="text-xs" style={{ color: "rgba(var(--fg-rgb),0.4)" }}>
                {examDate.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
          </div>

          {!profile?.target_exam && (
            <p className="text-xs" style={{ color: "rgba(var(--fg-rgb),0.25)" }}>
              Set your target exam in Profile to personalise this.
            </p>
          )}
        </div>
      </div>

      {/* ── Test Performance (empty state) ── */}
      <div className="rounded-2xl p-8 flex flex-col gap-6" style={card}>
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold" style={{ color: "rgba(var(--fg-rgb),0.9)" }}>Test Performance</p>
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: "rgba(var(--fg-rgb),0.06)", color: "rgba(var(--fg-rgb),0.3)" }}
          >
            No data yet
          </span>
        </div>

        {/* Mock chart skeleton */}
        <div className="flex items-end gap-2 h-28">
          {[40, 60, 35, 75, 50, 85, 45, 70, 55, 80].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-md"
              style={{ height: `${h}%`, backgroundColor: "rgba(var(--fg-rgb),0.05)" }}
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-2 py-4">
          <p className="text-sm font-semibold" style={{ color: "rgba(var(--fg-rgb),0.35)" }}>
            Attempt your first test to see score trends here
          </p>
          <p className="text-xs" style={{ color: "rgba(var(--fg-rgb),0.2)" }}>
            Subject-wise accuracy · Score over time · Time per question
          </p>
        </div>
      </div>

      {/* ── Bottom two columns ── */}
      <div className="grid md:grid-cols-2 gap-4 mt-4">

        {/* Recent Tests */}
        <div className="rounded-2xl p-6 flex flex-col gap-4" style={card}>
          <p className="text-sm font-bold" style={{ color: "rgba(var(--fg-rgb),0.9)" }}>Recent Tests</p>
          <div className="flex flex-col items-center justify-center gap-2 py-8">
            <span className="text-3xl">📝</span>
            <p className="text-sm font-medium" style={{ color: "rgba(var(--fg-rgb),0.3)" }}>No tests attempted yet</p>
          </div>
        </div>

        {/* Weak Topics */}
        <div className="rounded-2xl p-6 flex flex-col gap-4" style={card}>
          <p className="text-sm font-bold" style={{ color: "rgba(var(--fg-rgb),0.9)" }}>Weak Topics</p>
          {profile?.weak_subject ? (
            <div className="flex flex-col gap-2">
              <div
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{ backgroundColor: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.15)" }}
              >
                <span className="text-lg">⚠️</span>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "rgba(var(--fg-rgb),0.85)" }}>
                    {profile.weak_subject}
                  </p>
                  <p className="text-xs" style={{ color: "rgba(var(--fg-rgb),0.35)" }}>
                    Marked as weak in your profile
                  </p>
                </div>
              </div>
              <p className="text-xs mt-1" style={{ color: "rgba(var(--fg-rgb),0.2)" }}>
                Chapter-level weak topics will appear here after you attempt tests.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-8">
              <span className="text-3xl">🎯</span>
              <p className="text-sm font-medium" style={{ color: "rgba(var(--fg-rgb),0.3)" }}>
                Set your weak subject in Profile
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
