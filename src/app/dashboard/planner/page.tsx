import Link from "next/link";
import { CalendarDays, UserCheck, Brain, Bell, Crown, GraduationCap } from "lucide-react";

const perks = [
  { icon: CalendarDays, label: "Personalised weekly timetable", desc: "Built around your exam date, weak subjects, and daily goal hours." },
  { icon: UserCheck,    label: "Expert mentor guidance",        desc: "1-on-1 sessions with toppers and educators who've cracked the exam." },
  { icon: Brain,        label: "Smart subject allocation",      desc: "Revision slots auto-adjusted based on your test performance." },
  { icon: Bell,         label: "Deadline reminders",           desc: "Alerts for syllabus checkpoints, mock tests, and revision rounds." },
];

export default function PlannerPage() {
  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      <div>

        <h1 className="text-3xl font-black mb-1" style={{ color: "rgba(255,255,255,0.95)" }}>Planner</h1>
        <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>Plan your weekly study schedule around your exam date.</p>

        {/* Upsell card */}
        <div style={{
          borderRadius: 20,
          padding: "36px 32px",
          background: "#171b20",
          border: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 0,
        }}>
          {/* Icon */}
          <div style={{
            width: 60,
            height: 60,
            borderRadius: 16,
            background: "linear-gradient(135deg, rgba(251,191,36,0.2) 0%, rgba(234,179,8,0.1) 100%)",
            border: "1px solid rgba(251,191,36,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}>
            <Crown size={26} style={{ color: "#fbbf24" }} />
          </div>

          <p style={{ fontSize: 22, fontWeight: 900, color: "#fde68a", lineHeight: 1.2, marginBottom: 10 }}>
            Get your personalised study planner
          </p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", maxWidth: 460, lineHeight: 1.6, marginBottom: 28 }}>
            Premium members get a customised weekly schedule built by expert mentors —
            tailored to your target exam, weak subjects, and available study hours.
          </p>

          {/* Perks grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            width: "100%",
            marginBottom: 28,
            textAlign: "left",
          }}>
            {perks.map(({ icon: Icon, label, desc }) => (
              <div key={label} style={{
                padding: "13px 14px",
                borderRadius: 12,
                background: "#1e2530",
                border: "1px solid rgba(255,255,255,0.07)",
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
              }}>
                <div style={{
                  flexShrink: 0,
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: "rgba(251,191,36,0.12)",
                  border: "1px solid rgba(251,191,36,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <Icon size={14} style={{ color: "#fbbf24" }} />
                </div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.8)", marginBottom: 2 }}>{label}</p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", lineHeight: 1.4 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: "100%" }}>
            <Link href="/dashboard/premium" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "11px 28px",
              borderRadius: 10,
              background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
              color: "#1a1200",
              fontWeight: 800,
              fontSize: 13.5,
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(251,191,36,0.3)",
            }}>
              <Crown size={15} />
              Unlock with Premium
            </Link>

            {/* Mentorship standalone option */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
            }}>
              <GraduationCap size={14} style={{ color: "rgba(255,255,255,0.5)", flexShrink: 0 }} />
              <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.5)" }}>
                Mentorship is included in Premium —{" "}
                <Link href="/dashboard/premium" style={{ color: "#a78bfa", textDecoration: "underline", textUnderlineOffset: 3, fontWeight: 600 }}>
                  or available as a standalone add-on
                </Link>
              </span>
            </div>
          </div>

          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 16 }}>
            Premium also includes · No ads · Exclusive test series · Priority support
          </p>
        </div>

      </div>
    </div>
  );
}
