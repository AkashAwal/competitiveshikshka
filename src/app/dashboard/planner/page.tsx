import Link from "next/link";
import { CalendarDays, UserCheck, Brain, Bell, Crown, GraduationCap, Check, Star } from "lucide-react";

const perks = [
  { icon: CalendarDays, label: "Personalised weekly timetable", desc: "Built around your exam date, weak subjects, and daily goal hours." },
  { icon: UserCheck,    label: "Expert mentor guidance",        desc: "1-on-1 sessions with toppers and educators who've cracked the exam." },
  { icon: Brain,        label: "Smart subject allocation",      desc: "Revision slots auto-adjusted based on your test performance." },
  { icon: Bell,         label: "Deadline reminders",           desc: "Alerts for syllabus checkpoints, mock tests, and revision rounds." },
];

const extras = ["No ads", "Exclusive test series", "Priority support"];

export default function PlannerPage() {
  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-black mb-1" style={{ color: "rgba(var(--fg-rgb),0.95)" }}>Planner</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(var(--fg-rgb),0.45)" }}>Plan your weekly study schedule around your exam date.</p>

      {/* Gradient border wrapper */}
      <div style={{
        padding: 1,
        borderRadius: 24,
        background: "linear-gradient(145deg, rgba(202,138,4,0.55) 0%, rgba(202,138,4,0.06) 45%, rgba(202,138,4,0.28) 100%)",
        boxShadow: "0 0 80px rgba(202,138,4,0.07)",
      }}>
        <div style={{
          borderRadius: 23,
          padding: "52px 44px 40px",
          background: "radial-gradient(ellipse 90% 45% at 50% -8%, rgba(202,138,4,0.09) 0%, transparent 60%), var(--surface-card)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>

          {/* Top edge shimmer line */}
          <div style={{
            position: "absolute",
            top: 0,
            left: "8%",
            right: "8%",
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(202,138,4,0.6), rgba(var(--fg-rgb),0.25), rgba(202,138,4,0.6), transparent)",
          }} />

          {/* Background glow orb */}
          <div style={{
            position: "absolute",
            top: -100,
            left: "50%",
            transform: "translateX(-50%)",
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(202,138,4,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* Crown icon with ambient glow */}
          <div style={{ position: "relative", marginBottom: 22 }}>
            <div style={{
              position: "absolute",
              inset: -18,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(202,138,4,0.18) 0%, transparent 70%)",
            }} />
            <div style={{
              width: 66,
              height: 66,
              borderRadius: 18,
              background: "linear-gradient(145deg, rgba(202,138,4,0.22) 0%, rgba(120,80,0,0.12) 100%)",
              border: "1px solid rgba(202,138,4,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 28px rgba(202,138,4,0.22), 0 0 0 1px rgba(202,138,4,0.08), inset 0 1px 0 rgba(var(--fg-rgb),0.07)",
              position: "relative",
            }}>
              <Crown size={29} style={{ color: "#ca8a04" }} />
            </div>
          </div>

          {/* PREMIUM badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            padding: "4px 13px",
            borderRadius: 999,
            background: "rgba(202,138,4,0.1)",
            border: "1px solid rgba(202,138,4,0.28)",
            marginBottom: 18,
          }}>
            <Star size={9} style={{ color: "#ca8a04", fill: "#ca8a04" }} />
            <span style={{ fontSize: 10, fontWeight: 800, color: "#ca8a04", letterSpacing: "0.13em", textTransform: "uppercase" }}>Premium</span>
          </div>

          {/* Headline — white gradient, not yellow (yellow reads cheap) */}
          <h2 style={{
            fontSize: 31,
            fontWeight: 900,
            lineHeight: 1.15,
            marginBottom: 14,
            background: "linear-gradient(180deg, rgba(var(--fg-rgb),0.97) 0%, rgba(var(--fg-rgb),0.58) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.022em",
          }}>
            Get your personalised<br />study planner
          </h2>

          <p style={{ fontSize: 14.5, color: "rgba(var(--fg-rgb),0.42)", maxWidth: 400, lineHeight: 1.7, marginBottom: 40 }}>
            A customised weekly schedule built by expert mentors — tailored to your target exam, weak subjects, and available study hours.
          </p>

          {/* Perks grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            width: "100%",
            marginBottom: 36,
            textAlign: "left",
          }}>
            {perks.map(({ icon: Icon, label, desc }) => (
              <div key={label} style={{
                padding: "15px 16px",
                borderRadius: 14,
                background: "rgba(var(--fg-rgb),0.03)",
                border: "1px solid rgba(var(--fg-rgb),0.07)",
                borderLeft: "2px solid rgba(202,138,4,0.38)",
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
              }}>
                <div style={{
                  flexShrink: 0,
                  width: 32,
                  height: 32,
                  borderRadius: 9,
                  background: "rgba(202,138,4,0.1)",
                  border: "1px solid rgba(202,138,4,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 1,
                }}>
                  <Icon size={14} style={{ color: "#ca8a04" }} />
                </div>
                <div>
                  <p style={{ fontSize: 12.5, fontWeight: 700, color: "rgba(var(--fg-rgb),0.82)", marginBottom: 4 }}>{label}</p>
                  <p style={{ fontSize: 11, color: "rgba(var(--fg-rgb),0.32)", lineHeight: 1.5 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: "100%", maxWidth: 340 }}>
            <Link href="/dashboard/premium" style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              width: "100%",
              padding: "14px 24px",
              borderRadius: 12,
              background: "linear-gradient(135deg, #ca8a04 0%, #a16207 100%)",
              color: "#fff8e7",
              fontWeight: 800,
              fontSize: 14,
              textDecoration: "none",
              boxShadow: "0 4px 32px rgba(202,138,4,0.32), 0 1px 0 rgba(var(--fg-rgb),0.14) inset",
              letterSpacing: "-0.01em",
              cursor: "pointer",
            }}>
              <Crown size={16} />
              Unlock with Premium
            </Link>

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "9px 18px",
              borderRadius: 10,
              border: "1px solid rgba(var(--fg-rgb),0.07)",
              background: "rgba(var(--fg-rgb),0.025)",
              width: "100%",
              justifyContent: "center",
            }}>
              <GraduationCap size={12} style={{ color: "rgba(var(--fg-rgb),0.35)", flexShrink: 0 }} />
              <span style={{ fontSize: 11.5, color: "rgba(var(--fg-rgb),0.38)" }}>
                Mentorship included —{" "}
                <Link href="/dashboard/premium" style={{ color: "#a78bfa", textDecoration: "underline", textUnderlineOffset: 3, fontWeight: 600 }}>
                  also a standalone add-on
                </Link>
              </span>
            </div>
          </div>

          {/* Extras row */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 22, flexWrap: "wrap", justifyContent: "center" }}>
            {extras.map((e, i) => (
              <span key={e} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                {i > 0 && <span style={{ color: "rgba(var(--fg-rgb),0.12)", margin: "0 4px" }}>·</span>}
                <Check size={9} style={{ color: "rgba(202,138,4,0.55)" }} />
                <span style={{ fontSize: 10.5, color: "rgba(var(--fg-rgb),0.22)" }}>{e}</span>
              </span>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
