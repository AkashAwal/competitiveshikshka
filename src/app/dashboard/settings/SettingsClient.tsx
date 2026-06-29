"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Bell, Palette, BookOpen, Shield, Database, Trash2,
  Eye, EyeOff, Check, Moon, Download, LogOut, Monitor, Sun,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type NotifPrefs = {
  dailyReminder: boolean;
  dailyReminderTime: string;
  streakSaver: boolean;
  streakSaverTime: string;
  weeklyDigest: boolean;
  examAlerts: boolean;
};
type AppearancePrefs = {
  theme: "dark" | "light" | "system";
  fontSize: "normal" | "large";
  compactMode: boolean;
  reduceAnimations: boolean;
};
type StudyPrefs = {
  autoAdvance: boolean;
  stepsExpanded: boolean;
  timerVisibility: "show" | "hide" | "end";
  defaultExam: "jee" | "neet" | "";
};
type PrivacyPrefs = {
  showOnLeaderboard: boolean;
  shareAnonymousData: boolean;
};

const D_NOTIF: NotifPrefs     = { dailyReminder: false, dailyReminderTime: "19:00", streakSaver: true, streakSaverTime: "22:00", weeklyDigest: true, examAlerts: true };
const D_APPEAR: AppearancePrefs = { theme: "dark", fontSize: "normal", compactMode: false, reduceAnimations: false };
const D_STUDY: StudyPrefs     = { autoAdvance: false, stepsExpanded: false, timerVisibility: "show", defaultExam: "" };
const D_PRIV: PrivacyPrefs    = { showOnLeaderboard: true, shareAnonymousData: true };

function load<T>(key: string, def: T): T {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch { return def; }
}
function save<T>(key: string, val: T) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
    window.dispatchEvent(new Event("storage"));
  } catch { /* noop */ }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const selectStyle: React.CSSProperties = {
  backgroundColor: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "rgba(255,255,255,0.8)",
  borderRadius: "8px",
  padding: "5px 8px",
  fontSize: "12px",
  fontWeight: 600,
  outline: "none",
  cursor: "pointer",
};

function TimePicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [hStr, mStr] = value.split(":");
  const h24  = parseInt(hStr) || 0;
  const isPM = h24 >= 12;
  const h12  = h24 === 0 ? 12 : h24 > 12 ? h24 - 12 : h24;

  function update(newH12: number, newPM: boolean, newM: string) {
    const h = newPM ? (newH12 === 12 ? 12 : newH12 + 12) : (newH12 === 12 ? 0 : newH12);
    onChange(`${String(h).padStart(2, "0")}:${newM}`);
  }

  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <select value={h12} onChange={e => update(parseInt(e.target.value), isPM, mStr)} style={selectStyle}>
        {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
          <option key={h} value={h} style={{ backgroundColor: "#1b2027" }}>{h}</option>
        ))}
      </select>
      <span className="text-xs font-bold" style={{ color: "rgba(255,255,255,0.3)" }}>:</span>
      <select value={mStr} onChange={e => update(h12, isPM, e.target.value)} style={selectStyle}>
        {["00", "15", "30", "45"].map(m => (
          <option key={m} value={m} style={{ backgroundColor: "#1b2027" }}>{m}</option>
        ))}
      </select>
      <select value={isPM ? "PM" : "AM"} onChange={e => update(h12, e.target.value === "PM", mStr)} style={selectStyle}>
        <option value="AM" style={{ backgroundColor: "#1b2027" }}>AM</option>
        <option value="PM" style={{ backgroundColor: "#1b2027" }}>PM</option>
      </select>
    </div>
  );
}

function Section({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-5"
      style={{ background: "#171b20", border: "1px solid rgba(255,255,255,0.13)" }}
    >
      <div className="flex items-center gap-2.5">
        <Icon className="h-4 w-4" style={{ color: "rgba(255,255,255,0.5)" }} />
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>{title}</p>
      </div>
      {children}
    </div>
  );
}

function Row({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>{label}</p>
        {description && <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{description}</p>}
      </div>
      {children}
    </div>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className="relative shrink-0 rounded-full transition-colors duration-200 cursor-pointer"
      style={{ width: 42, height: 24, backgroundColor: on ? "#2563eb" : "rgba(255,255,255,0.12)" }}
    >
      <span
        className="absolute top-[3px] rounded-full transition-transform duration-200"
        style={{ width: 18, height: 18, backgroundColor: "#fff", position: "absolute", top: 3, left: 0, transform: on ? "translateX(21px)" : "translateX(3px)" }}
      />
    </button>
  );
}

function Divider() {
  return <div className="h-px" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />;
}

function Pill({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
      style={{
        backgroundColor: selected ? "#2563eb" : "rgba(255,255,255,0.07)",
        border: `1px solid ${selected ? "#2563eb" : "rgba(255,255,255,0.1)"}`,
        color: selected ? "#fff" : "rgba(255,255,255,0.6)",
      }}
    >
      {label}
    </button>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  email: string;
  providers: string[];
  hasPassword: boolean;
  stream: string;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function SettingsClient({ email, providers, hasPassword, stream }: Props) {
  const router = useRouter();

  // Preferences state (localStorage)
  const [notif, setNotifRaw]     = useState<NotifPrefs>(D_NOTIF);
  const [appear, setAppearRaw]   = useState<AppearancePrefs>(D_APPEAR);
  const [study, setStudyRaw]     = useState<StudyPrefs>(D_STUDY);
  const [privacy, setPrivacyRaw] = useState<PrivacyPrefs>(D_PRIV);
  const [prefsLoaded, setPrefsLoaded] = useState(false);
  const [prefsSaved, setPrefsSaved]   = useState(false);

  useEffect(() => {
    setNotifRaw(load("cs-notif", D_NOTIF));
    setAppearRaw(load("cs-appear", D_APPEAR));
    setStudyRaw(load("cs-study", D_STUDY));
    setPrivacyRaw(load("cs-privacy", D_PRIV));
    setPrefsLoaded(true);
  }, []);

  function setNotif(patch: Partial<NotifPrefs>) {
    setNotifRaw(prev => { const next = { ...prev, ...patch }; save("cs-notif", next); flash(); return next; });
  }
  function setAppear(patch: Partial<AppearancePrefs>) {
    setAppearRaw(prev => { const next = { ...prev, ...patch }; save("cs-appear", next); flash(); return next; });
  }
  function setStudy(patch: Partial<StudyPrefs>) {
    setStudyRaw(prev => { const next = { ...prev, ...patch }; save("cs-study", next); flash(); return next; });
  }
  function setPrivacy(patch: Partial<PrivacyPrefs>) {
    setPrivacyRaw(prev => { const next = { ...prev, ...patch }; save("cs-privacy", next); flash(); return next; });
  }

  function flash() {
    setPrefsSaved(true);
    setTimeout(() => setPrefsSaved(false), 1800);
  }

  // Push notification permission
  const [notifPermission, setNotifPermission] = useState<NotificationPermission | "unsupported">("default");
  useEffect(() => {
    setNotifPermission("Notification" in window ? Notification.permission : "unsupported");
  }, []);
  async function requestNotifPermission() {
    if (!("Notification" in window)) return;
    const result = await Notification.requestPermission();
    setNotifPermission(result);
  }

  // Change password
  const [showPwForm, setShowPwForm] = useState(false);
  const [newPw, setNewPw]           = useState("");
  const [confirmPw, setConfirmPw]   = useState("");
  const [showPw, setShowPw]         = useState(false);
  const [pwSaving, setPwSaving]     = useState(false);
  const [pwMsg, setPwMsg]           = useState<{ ok: boolean; text: string } | null>(null);

  async function changePassword() {
    if (newPw.length < 8) { setPwMsg({ ok: false, text: "Password must be at least 8 characters." }); return; }
    if (newPw !== confirmPw) { setPwMsg({ ok: false, text: "Passwords don't match." }); return; }
    setPwSaving(true);
    setPwMsg(null);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newPw });
    setPwSaving(false);
    if (error) { setPwMsg({ ok: false, text: error.message }); return; }
    setPwMsg({ ok: true, text: "Password updated successfully." });
    setNewPw(""); setConfirmPw(""); setShowPwForm(false);
    setTimeout(() => setPwMsg(null), 3000);
  }

  // Sign out all devices
  const [signingOutAll, setSigningOutAll] = useState(false);

  async function signOutAll() {
    setSigningOutAll(true);
    const supabase = createClient();
    await supabase.auth.signOut({ scope: "global" });
    router.push("/");
  }

  // Export data
  function clearAppData() {
    ["cs-notif", "cs-appear", "cs-study", "cs-privacy"].forEach(k => localStorage.removeItem(k));
    setNotifRaw(D_NOTIF); setAppearRaw(D_APPEAR); setStudyRaw(D_STUDY); setPrivacyRaw(D_PRIV);
    flash();
  }

  // Delete account
  const [deleteStep, setDeleteStep]   = useState<"idle" | "typing" | "otp" | "deleting">("idle");
  const [deleteText, setDeleteText]   = useState("");
  const [otpSending, setOtpSending]   = useState(false);
  const [otpValue, setOtpValue]       = useState("");
  const [otpError, setOtpError]       = useState("");

  function cancelDelete() { setDeleteStep("idle"); setDeleteText(""); setOtpValue(""); setOtpError(""); }

  async function sendOtp() {
    setOtpSending(true); setOtpError("");
    const supabase = createClient();
    const { error } = await supabase.auth.reauthenticate();
    setOtpSending(false);
    if (error) { setOtpError(error.message); return; }
    setDeleteStep("otp");
  }

  async function confirmDelete() {
    setOtpError(""); setDeleteStep("deleting");
    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({ email, token: otpValue.trim(), type: "reauthentication" });
    if (error) { setOtpError(error.message); setDeleteStep("otp"); return; }
    const { data: { user } } = await supabase.auth.getUser();
    if (user) await supabase.from("profiles").delete().eq("id", user.id);
    await supabase.auth.signOut();
    router.push("/");
  }

  if (!prefsLoaded) return null;

  return (
    <div className="flex flex-col gap-5 max-w-2xl">

      {/* ── Notifications ─────────────────────────────────────────────── */}
      <Section icon={Bell} title="Notifications">
        <Row label="Daily study reminder" description="Get a nudge to open the app and study.">
          <div className="flex items-center gap-3 shrink-0">
            {notif.dailyReminder && (
              <TimePicker value={notif.dailyReminderTime} onChange={v => setNotif({ dailyReminderTime: v })} />
            )}
            <Toggle on={notif.dailyReminder} onChange={v => setNotif({ dailyReminder: v })} />
          </div>
        </Row>
        <Divider />
        <Row label="Streak saver alert" description="Alert before midnight if you haven't studied.">
          <div className="flex items-center gap-3 shrink-0">
            {notif.streakSaver && (
              <TimePicker value={notif.streakSaverTime} onChange={v => setNotif({ streakSaverTime: v })} />
            )}
            <Toggle on={notif.streakSaver} onChange={v => setNotif({ streakSaver: v })} />
          </div>
        </Row>
        <Divider />
        <Row label="Weekly progress digest" description="Summary email every Sunday.">
          <Toggle on={notif.weeklyDigest} onChange={v => setNotif({ weeklyDigest: v })} />
        </Row>
        <Divider />
        <Row label="Exam countdown alerts" description="Notifications at 30 days, 7 days, and 1 day before your exam.">
          <Toggle on={notif.examAlerts} onChange={v => setNotif({ examAlerts: v })} />
        </Row>
        <Divider />
        <Row
          label="Push notification permission"
          description={notifPermission === "granted" ? "Browser notifications enabled." : notifPermission === "denied" ? "Blocked in browser — change in site settings." : notifPermission === "unsupported" ? "Not supported in this browser." : "Grant permission to receive alerts."}
        >
          {notifPermission === "granted" ? (
            <span className="text-xs font-bold px-3 py-1.5 rounded-lg shrink-0" style={{ backgroundColor: "rgba(52,211,153,0.1)", color: "#34d399" }}>Enabled</span>
          ) : notifPermission === "denied" ? (
            <span className="text-xs font-bold px-3 py-1.5 rounded-lg shrink-0" style={{ backgroundColor: "rgba(248,113,113,0.1)", color: "#f87171" }}>Blocked</span>
          ) : notifPermission === "unsupported" ? (
            <span className="text-xs font-bold px-3 py-1.5 rounded-lg shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)" }}>N/A</span>
          ) : (
            <button onClick={requestNotifPermission} className="text-xs font-bold px-3 py-1.5 rounded-lg shrink-0 cursor-pointer transition-opacity hover:opacity-80" style={{ backgroundColor: "#2563eb", color: "#fff" }}>
              Enable
            </button>
          )}
        </Row>
      </Section>

      {/* ── Appearance ────────────────────────────────────────────────── */}
      <Section icon={Palette} title="Appearance">
        <Row label="Theme" description="Light mode coming soon.">
          <div className="flex gap-2">
            {([
              { val: "dark",   Icon: Moon,    label: "Dark"   },
              { val: "light",  Icon: Sun,     label: "Light"  },
              { val: "system", Icon: Monitor, label: "System" },
            ] as const).map(({ val, Icon, label }) => (
              <button
                key={val}
                onClick={() => val === "dark" && setAppear({ theme: val })}
                className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-[10px] font-bold transition-colors"
                style={{
                  backgroundColor: appear.theme === val ? "#2563eb" : "rgba(255,255,255,0.06)",
                  border: `1px solid ${appear.theme === val ? "#2563eb" : "rgba(255,255,255,0.1)"}`,
                  color: appear.theme === val ? "#fff" : val === "dark" ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)",
                  cursor: val === "dark" ? "pointer" : "not-allowed",
                  opacity: val === "dark" ? 1 : 0.4,
                }}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>
        </Row>
        <Divider />
        <Row label="Font size" description="Affects text size across the entire dashboard.">
          <div className="flex gap-2">
            {(["Normal", "Large"] as const).map(s => (
              <Pill key={s} label={s} selected={appear.fontSize === s.toLowerCase()} onClick={() => setAppear({ fontSize: s.toLowerCase() as "normal" | "large" })} />
            ))}
          </div>
        </Row>
        <Divider />
        <Row label="Compact mode" description="Tighter spacing — fit more on screen.">
          <Toggle on={appear.compactMode} onChange={v => setAppear({ compactMode: v })} />
        </Row>
        <Divider />
        <Row label="Reduce animations" description="Disable transitions and motion effects.">
          <Toggle on={appear.reduceAnimations} onChange={v => setAppear({ reduceAnimations: v })} />
        </Row>
      </Section>

      {/* ── Study Preferences ─────────────────────────────────────────── */}
      <Section icon={BookOpen} title="Study Preferences">
        <Row label="Auto-advance after answering" description="Jump to next question automatically after selecting an answer.">
          <Toggle on={study.autoAdvance} onChange={v => setStudy({ autoAdvance: v })} />
        </Row>
        <Divider />
        <Row label="Expand step-by-step by default" description="Show solution steps open instead of collapsed.">
          <Toggle on={study.stepsExpanded} onChange={v => setStudy({ stepsExpanded: v })} />
        </Row>
        <Divider />
        <Row label="Timer in tests">
          <div className="flex gap-2">
            {(["Show", "Hide", "End only"] as const).map(opt => (
              <Pill
                key={opt}
                label={opt}
                selected={study.timerVisibility === (opt === "End only" ? "end" : opt.toLowerCase())}
                onClick={() => setStudy({ timerVisibility: opt === "End only" ? "end" : opt.toLowerCase() as "show" | "hide" })}
              />
            ))}
          </div>
        </Row>
        {stream === "PCMB" && (
          <>
            <Divider />
            <Row label="Default exam view" description="Which content to prioritise when you have both JEE and NEET selected.">
              <div className="flex gap-2">
                <Pill label="JEE" selected={study.defaultExam === "jee"} onClick={() => setStudy({ defaultExam: "jee" })} />
                <Pill label="NEET" selected={study.defaultExam === "neet"} onClick={() => setStudy({ defaultExam: "neet" })} />
              </div>
            </Row>
          </>
        )}
      </Section>

      {/* ── Privacy ───────────────────────────────────────────────────── */}
      <Section icon={Shield} title="Privacy">
        <Row label="Appear on leaderboard" description="Let other students see your rank and streak.">
          <Toggle on={privacy.showOnLeaderboard} onChange={v => setPrivacy({ showOnLeaderboard: v })} />
        </Row>
        <Divider />
        <Row label="Share anonymous usage data" description="Help improve the platform. No personal data is shared.">
          <Toggle on={privacy.shareAnonymousData} onChange={v => setPrivacy({ shareAnonymousData: v })} />
        </Row>
      </Section>

      {/* ── Account & Security ────────────────────────────────────────── */}
      <Section icon={Shield} title="Account & Security">

        {/* Connected accounts */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>Connected accounts</p>
          <div className="flex flex-col gap-2">
            {providers.map(p => (
              <div key={p} className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold capitalize" style={{ color: "rgba(255,255,255,0.8)" }}>{p}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: "rgba(52,211,153,0.1)", color: "#34d399" }}>Connected</span>
                </div>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{email}</span>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* Change password */}
        {hasPassword && (
          <>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>Change password</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Update your login password.</p>
                </div>
                <button
                  onClick={() => { setShowPwForm(o => !o); setPwMsg(null); }}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-opacity hover:opacity-80"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
                >
                  {showPwForm ? "Cancel" : "Change"}
                </button>
              </div>
              {showPwForm && (
                <div className="flex flex-col gap-3 pt-1">
                  <div className="relative">
                    <input
                      type={showPw ? "text" : "password"}
                      placeholder="New password (min 8 chars)"
                      value={newPw}
                      onChange={e => setNewPw(e.target.value)}
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none pr-11"
                      style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.9)" }}
                    />
                    <button onClick={() => setShowPw(o => !o)} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" style={{ color: "rgba(255,255,255,0.3)" }}>
                      {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <input
                    type={showPw ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPw}
                    onChange={e => setConfirmPw(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                    style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.9)" }}
                  />
                  {pwMsg && (
                    <p className="text-xs font-semibold" style={{ color: pwMsg.ok ? "#34d399" : "#f87171" }}>{pwMsg.text}</p>
                  )}
                  <button
                    onClick={changePassword}
                    disabled={pwSaving || !newPw || !confirmPw}
                    className="self-start px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-opacity"
                    style={{ backgroundColor: "#2563eb", color: "#fff", opacity: pwSaving || !newPw || !confirmPw ? 0.5 : 1 }}
                  >
                    {pwSaving ? "Updating…" : "Update password"}
                  </button>
                </div>
              )}
            </div>
            <Divider />
          </>
        )}

        {/* Sign out all devices */}
        <Row label="Sign out of all devices" description="Ends all active sessions including this one.">
          <button
            onClick={signOutAll}
            disabled={signingOutAll}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-opacity hover:opacity-80 shrink-0"
            style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
          >
            <LogOut className="h-3.5 w-3.5" />
            {signingOutAll ? "Signing out…" : "Sign out all"}
          </button>
        </Row>
      </Section>

      {/* ── Data ──────────────────────────────────────────────────────── */}
      <Section icon={Database} title="Data">
        <Row label="Export your progress" description="Download your study data as a CSV file.">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold cursor-not-allowed shrink-0"
            style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.3)" }}
          >
            <Download className="h-3.5 w-3.5" />
            Coming soon
          </button>
        </Row>
        <Divider />
        <Row label="Reset local preferences" description="Clears all appearance, notification, and study settings saved on this device.">
          <button
            onClick={clearAppData}
            className="px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-opacity hover:opacity-80 shrink-0"
            style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}
          >
            Reset
          </button>
        </Row>
      </Section>

      {/* ── Danger Zone ───────────────────────────────────────────────── */}
      <div className="rounded-2xl p-6 flex flex-col gap-4" style={{ border: "1px solid rgba(239,68,68,0.2)", backgroundColor: "rgba(239,68,68,0.04)" }}>
        <div className="flex items-center gap-2.5">
          <Trash2 className="h-4 w-4" style={{ color: "rgba(239,68,68,0.6)" }} />
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(239,68,68,0.6)" }}>Danger zone</p>
        </div>

        {deleteStep === "idle" && (
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>Delete account</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Permanently deletes your profile and all data. Cannot be undone.</p>
            </div>
            <button
              onClick={() => setDeleteStep("typing")}
              className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
              style={{ backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171" }}
            >
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </button>
          </div>
        )}

        {deleteStep === "typing" && (
          <div className="flex flex-col gap-3">
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
              Type <span className="font-black tracking-widest" style={{ color: "#f87171" }}>DELETE</span> to continue
            </p>
            <input
              autoFocus
              value={deleteText}
              onChange={e => setDeleteText(e.target.value)}
              placeholder="DELETE"
              className="w-full rounded-xl px-4 py-3 text-sm font-bold outline-none"
              style={{ backgroundColor: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171", letterSpacing: "0.1em" }}
            />
            <div className="flex items-center gap-2">
              <button onClick={cancelDelete} className="px-4 py-2 rounded-xl text-xs font-bold cursor-pointer" style={{ color: "rgba(255,255,255,0.4)" }}>Cancel</button>
              <button
                onClick={sendOtp}
                disabled={deleteText !== "DELETE" || otpSending}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black cursor-pointer"
                style={{ backgroundColor: deleteText === "DELETE" ? "#ef4444" : "rgba(239,68,68,0.15)", color: deleteText === "DELETE" ? "#fff" : "rgba(255,255,255,0.3)", transition: "all 0.2s" }}
              >
                {otpSending ? "Sending…" : "Send verification code"}
              </button>
            </div>
            {otpError && <p className="text-xs" style={{ color: "#f87171" }}>{otpError}</p>}
          </div>
        )}

        {(deleteStep === "otp" || deleteStep === "deleting") && (
          <div className="flex flex-col gap-3">
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
              Enter the 8-digit code from the email sent to <span className="font-semibold" style={{ color: "rgba(255,255,255,0.9)" }}>{email}</span>.
            </p>
            <input
              autoFocus
              value={otpValue}
              onChange={e => setOtpValue(e.target.value.replace(/\D/g, "").slice(0, 8))}
              placeholder="00000000"
              maxLength={8}
              className="w-full rounded-xl px-4 py-3 text-xl font-black text-center outline-none tracking-[0.4em]"
              style={{ backgroundColor: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171" }}
            />
            {otpError && <p className="text-xs" style={{ color: "#f87171" }}>{otpError}</p>}
            <div className="flex items-center gap-2">
              <button onClick={cancelDelete} className="px-4 py-2 rounded-xl text-xs font-bold cursor-pointer" style={{ color: "rgba(255,255,255,0.4)" }}>Cancel</button>
              <button onClick={sendOtp} disabled={otpSending} className="px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer" style={{ color: "rgba(255,255,255,0.4)" }}>
                {otpSending ? "Resending…" : "Resend"}
              </button>
              <button
                onClick={confirmDelete}
                disabled={otpValue.length !== 8 || deleteStep === "deleting"}
                className="flex-1 px-4 py-2 rounded-xl text-xs font-black cursor-pointer"
                style={{ backgroundColor: otpValue.length === 8 ? "#ef4444" : "rgba(239,68,68,0.15)", color: otpValue.length === 8 ? "#fff" : "rgba(255,255,255,0.3)", transition: "all 0.2s" }}
              >
                {deleteStep === "deleting" ? "Deleting…" : "Confirm deletion"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Saved toast */}
      {prefsSaved && (
        <div
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl px-4 py-3 shadow-2xl"
          style={{ backgroundColor: "#1e2535", border: "1px solid rgba(52,211,153,0.3)" }}
        >
          <Check className="h-4 w-4" style={{ color: "#34d399" }} />
          <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.8)" }}>Preferences saved</p>
        </div>
      )}
    </div>
  );
}
