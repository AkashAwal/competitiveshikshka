"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Check, Pencil, ChevronDown, ChevronUp, Flame, FlaskConical, BookOpen, Trash2 } from "lucide-react";
import Image from "next/image";

const PACKS = [
  { id: "thumbs",    label: "Thumbs" },
  { id: "dylan",     label: "Dylan" },
  { id: "toon-head", label: "Toon Head" },
];

const SEEDS = ["felix","lola","max","mia","noah","emma","leo","sophia",
  "oliver","ava","lucas","ella","charlie","grace","oscar","ruby"];

const BG = "backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf";

function dicebearUrl(style: string, seed: string) {
  return `https://api.dicebear.com/9.x/${style}/svg?seed=${encodeURIComponent(seed)}&${BG}`;
}

function encodeChoice(style: string, seed: string) { return `${style}:${seed}`; }
function decodeChoice(value: string) {
  if (!value || value === "google") return { style: value || "", seed: "" };
  const idx = value.indexOf(":");
  if (idx === -1) return { style: value, seed: SEEDS[0] };
  return { style: value.slice(0, idx), seed: value.slice(idx + 1) };
}

function getAvatarUrl(encoded: string, googleUrl: string) {
  if (encoded === "google") return googleUrl;
  const { style, seed } = decodeChoice(encoded);
  return dicebearUrl(style || "thumbs", seed || SEEDS[0]);
}

const classes = ["Class 11", "Class 12", "Dropper 1st yr", "Dropper 2nd yr+"];
const streams = ["PCM", "PCMB", "PCB"];
const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman & Nicobar", "Chandigarh", "Delhi", "Jammu & Kashmir", "Ladakh",
  "Lakshadweep", "Puducherry", "Dadra & Nagar Haveli",
];
const coachingOptions = [
  "Allen", "Aakash", "FIITJEE", "Resonance", "Narayana",
  "Vidyamandir", "PW (Physics Wallah)", "Unacademy", "Self-study", "Other",
];
const targetExams = ["JEE Mains", "JEE Advanced", "NEET", "JEE + NEET"];
const targetYears = ["2025", "2026", "2027", "2028"];
const dailyGoals = ["1 hr", "2 hrs", "3 hrs", "4 hrs", "5 hrs", "6+ hrs"];

function subjectsForStream(stream: string) {
  if (stream === "PCM") return ["Physics", "Chemistry", "Maths"];
  if (stream === "PCB") return ["Physics", "Chemistry", "Biology"];
  return ["Physics", "Chemistry", "Maths", "Biology"];
}

function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl px-4 py-2.5 text-sm font-semibold text-left transition-colors cursor-pointer"
      style={{
        backgroundColor: selected ? "#2563eb" : "rgba(255,255,255,0.05)",
        border: `1px solid ${selected ? "#2563eb" : "rgba(255,255,255,0.08)"}`,
        color: selected ? "#fff" : "rgba(255,255,255,0.7)",
      }}
    >
      {label}
    </button>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="w-full rounded-xl p-6 flex flex-col gap-5"
      style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>{title}</p>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>{label}</p>
      {children}
    </div>
  );
}

interface Props {
  userId: string;
  email: string;
  initialName: string;
  initialAvatarStyle: string;
  googleAvatarUrl: string;
  streak: number;
  initial: {
    class: string;
    stream: string;
    state: string;
    strong_subject: string;
    weak_subject: string;
    coaching: string;
    school: string;
    target_exam: string;
    target_year: string;
    daily_goal_hours: string;
  };
}

export function ProfileForm({ userId, email, initialName, initialAvatarStyle, googleAvatarUrl, streak, initial }: Props) {
  const router = useRouter();
  const [avatarStyle, setAvatarStyle] = useState(initialAvatarStyle || "thumbs:felix");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [displayName, setDisplayName] = useState(initialName);
  const [editingName, setEditingName] = useState(false);

  const [cls, setCls] = useState(initial.class ?? "");
  const [stream, setStream] = useState(initial.stream ?? "");
  const [state, setState] = useState(initial.state ?? "");
  const [strongSub, setStrongSub] = useState(initial.strong_subject ?? "");
  const [weakSub, setWeakSub] = useState(initial.weak_subject ?? "");
  const [coaching, setCoaching] = useState(initial.coaching ?? "");
  const [school, setSchool] = useState(initial.school ?? "");
  const [targetExam, setTargetExam] = useState(initial.target_exam ?? "");
  const [targetYear, setTargetYear] = useState(initial.target_year ?? "");
  const [dailyGoal, setDailyGoal] = useState(initial.daily_goal_hours ?? "");

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  // delete flow: idle → typing → otp → deleting
  const [deleteStep, setDeleteStep] = useState<"idle" | "typing" | "otp" | "deleting">("idle");
  const [deleteText, setDeleteText] = useState("");
  const [otpSending, setOtpSending] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [otpError, setOtpError] = useState("");

  const subjects = subjectsForStream(stream);
  const currentAvatarUrl = getAvatarUrl(avatarStyle, googleAvatarUrl);

  function dispatchProfileUpdate(detail: { avatar_style?: string; full_name?: string; target_exam?: string; target_year?: string }) {
    window.dispatchEvent(new CustomEvent("cs-profile-updated", { detail }));
  }

  async function pickAvatar(style: string, seed: string) {
    const encoded = encodeChoice(style, seed);
    setAvatarStyle(encoded);
    setPickerOpen(false);
    const supabase = createClient();
    await supabase.from("profiles").update({ avatar_style: encoded }).eq("id", userId);
    dispatchProfileUpdate({ avatar_style: encoded });
  }

  async function pickGoogle() {
    setAvatarStyle("google");
    setPickerOpen(false);
    const supabase = createClient();
    await supabase.from("profiles").update({ avatar_style: "google" }).eq("id", userId);
    dispatchProfileUpdate({ avatar_style: "google" });
  }

  async function saveName() {
    setEditingName(false);
    const name = displayName.trim();
    if (!name) return;
    const supabase = createClient();
    await supabase.auth.updateUser({ data: { full_name: name } });
    dispatchProfileUpdate({ full_name: name });
  }

  async function save() {
    setSaving(true);
    const supabase = createClient();
    await supabase.from("profiles").update({
      class: cls,
      stream,
      state,
      strong_subject: strongSub || null,
      weak_subject: weakSub || null,
      coaching: coaching || null,
      school: school || null,
      target_exam: targetExam || null,
      target_year: targetYear ? parseInt(targetYear) : null,
      daily_goal_hours: dailyGoal ? parseInt(dailyGoal) || null : null,
    }).eq("id", userId);
    dispatchProfileUpdate({ target_exam: targetExam, target_year: targetYear });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function cancelDelete() {
    setDeleteStep("idle");
    setDeleteText("");
    setOtpValue("");
    setOtpError("");
  }

  async function sendOtp() {
    setOtpSending(true);
    setOtpError("");
    const supabase = createClient();
    const { error } = await supabase.auth.reauthenticate();
    setOtpSending(false);
    if (error) { setOtpError(error.message); return; }
    setDeleteStep("otp");
  }

  async function confirmDelete() {
    setOtpError("");
    setDeleteStep("deleting");
    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({ email, token: otpValue.trim(), type: "reauthentication" });
    if (error) {
      setOtpError(error.message);
      setDeleteStep("otp");
      return;
    }
    await supabase.from("profiles").delete().eq("id", userId);
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xl mx-auto">

      {/* Avatar + name */}
      <div className="flex flex-col items-center gap-4 pt-4">
        <div className="flex flex-col items-center gap-2">
          <div className="h-24 w-24 rounded-full overflow-hidden" style={{ border: "2px solid rgba(255,255,255,0.1)" }}>
            <Image src={currentAvatarUrl} alt="Avatar" width={96} height={96} className="w-full h-full object-cover" unoptimized />
          </div>

          <button
            onClick={() => setPickerOpen(o => !o)}
            className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer transition-opacity hover:opacity-80"
            style={{ color: "#60a5fa" }}
          >
            Change avatar
            {pickerOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>

          {pickerOpen && (
            <div
              className="p-4 rounded-2xl flex flex-col gap-5"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", maxHeight: "420px", overflowY: "auto", width: "320px" }}
            >
              {googleAvatarUrl && (
                <div className="flex flex-col gap-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>Google</p>
                  <button onClick={pickGoogle} className="flex flex-col items-center gap-1.5 cursor-pointer w-fit">
                    <div className="h-14 w-14 rounded-full overflow-hidden" style={{ border: `2px solid ${avatarStyle === "google" ? "#2563eb" : "rgba(255,255,255,0.1)"}`, boxShadow: avatarStyle === "google" ? "0 0 0 3px rgba(37,99,235,0.3)" : "none" }}>
                      <Image src={googleAvatarUrl} alt="Google" width={56} height={56} className="w-full h-full object-cover" unoptimized />
                    </div>
                    <span className="text-[10px]" style={{ color: avatarStyle === "google" ? "#60a5fa" : "rgba(255,255,255,0.35)" }}>Your photo</span>
                  </button>
                </div>
              )}

              {PACKS.map(({ id, label }) => (
                <div key={id} className="flex flex-col gap-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>{label}</p>
                  <div className="grid grid-cols-4 gap-2">
                    {SEEDS.map(seed => {
                      const encoded = encodeChoice(id, seed);
                      const isSelected = avatarStyle === encoded;
                      return (
                        <button key={seed} onClick={() => pickAvatar(id, seed)} className="flex items-center justify-center cursor-pointer">
                          <div className="h-14 w-14 rounded-full overflow-hidden" style={{ border: `2px solid ${isSelected ? "#2563eb" : "rgba(255,255,255,0.1)"}`, boxShadow: isSelected ? "0 0 0 3px rgba(37,99,235,0.3)" : "none" }}>
                            <Image src={dicebearUrl(id, seed)} alt={seed} width={56} height={56} className="w-full h-full object-cover" unoptimized />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {editingName ? (
            <input autoFocus value={displayName} onChange={e => setDisplayName(e.target.value)} onBlur={saveName} onKeyDown={e => e.key === "Enter" && saveName()}
              className="text-2xl font-black text-center bg-transparent outline-none border-b"
              style={{ color: "rgba(255,255,255,0.95)", borderColor: "#2563eb", minWidth: "160px" }} />
          ) : (
            <p className="text-2xl font-black" style={{ color: "rgba(255,255,255,0.95)" }}>{displayName}</p>
          )}
          {!editingName && (
            <button onClick={() => setEditingName(true)} className="cursor-pointer transition-opacity hover:opacity-100 opacity-40" style={{ color: "rgba(255,255,255,0.8)" }}>
              <Pencil className="h-4 w-4" />
            </button>
          )}
        </div>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>{email}</p>
      </div>

      <div className="w-full h-px" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />

      {/* Stats mini-card */}
      <div className="w-full grid grid-cols-3 gap-3">
        {[
          { icon: Flame,       color: "#fb923c", label: "Day Streak",     value: String(streak) },
          { icon: FlaskConical, color: "#60a5fa", label: "Tests Taken",   value: "0" },
          { icon: BookOpen,    color: "#a78bfa", label: "Questions Solved", value: "0" },
        ].map(({ icon: Icon, color, label, value }) => (
          <div key={label} className="rounded-xl p-4 flex flex-col gap-1.5 items-center"
            style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <Icon className="h-5 w-5" style={{ color }} />
            <p className="text-2xl font-black" style={{ color: "rgba(255,255,255,0.95)" }}>{value}</p>
            <p className="text-[11px] text-center" style={{ color: "rgba(255,255,255,0.35)" }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Academic profile */}
      <Section title="Academic profile">
        <Field label="Class">
          <div className="grid grid-cols-2 gap-2">
            {classes.map(c => <Chip key={c} label={c} selected={cls === c} onClick={() => setCls(c)} />)}
          </div>
        </Field>
        <Field label="Stream">
          <div className="grid grid-cols-3 gap-2">
            {streams.map(s => <Chip key={s} label={s} selected={stream === s} onClick={() => { setStream(s); setStrongSub(""); setWeakSub(""); }} />)}
          </div>
        </Field>
        <Field label="State">
          <select value={state} onChange={e => setState(e.target.value)} className="w-full rounded-xl px-4 py-3 text-sm font-semibold outline-none cursor-pointer"
            style={{ backgroundColor: state ? "#1e2d45" : "rgba(255,255,255,0.05)", border: `1px solid ${state ? "#2563eb" : "rgba(255,255,255,0.08)"}`, color: state ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)" }}>
            <option value="" disabled style={{ backgroundColor: "#1b2027" }}>Select your state</option>
            {states.map(st => <option key={st} value={st} style={{ backgroundColor: "#1b2027", color: "rgba(255,255,255,0.9)" }}>{st}</option>)}
          </select>
        </Field>
      </Section>

      {/* Target & Goals */}
      <Section title="Target & Goals">
        <Field label="Target exam">
          <div className="grid grid-cols-2 gap-2">
            {targetExams.map(e => <Chip key={e} label={e} selected={targetExam === e} onClick={() => setTargetExam(e)} />)}
          </div>
        </Field>
        <Field label="Target year">
          <div className="grid grid-cols-4 gap-2">
            {targetYears.map(y => <Chip key={y} label={y} selected={targetYear === y} onClick={() => setTargetYear(y)} />)}
          </div>
        </Field>
        <Field label="Daily study goal">
          <div className="grid grid-cols-3 gap-2">
            {dailyGoals.map(g => <Chip key={g} label={g} selected={dailyGoal === g} onClick={() => setDailyGoal(g)} />)}
          </div>
        </Field>
      </Section>

      {/* Subject strengths */}
      <Section title="Subject strengths">
        <Field label="Strongest subject">
          <div className="grid grid-cols-2 gap-2">
            {subjects.map(s => <Chip key={s} label={s} selected={strongSub === s} onClick={() => { setStrongSub(s); if (weakSub === s) setWeakSub(""); }} />)}
          </div>
        </Field>
        <Field label="Weakest subject">
          <div className="grid grid-cols-2 gap-2">
            {subjects.map(s => <Chip key={s} label={s} selected={weakSub === s} onClick={() => { setWeakSub(s); if (strongSub === s) setStrongSub(""); }} />)}
          </div>
        </Field>
      </Section>

      {/* Study background */}
      <Section title="Study background">
        <Field label="Coaching institute">
          <div className="grid grid-cols-2 gap-2">
            {coachingOptions.map(c => <Chip key={c} label={c} selected={coaching === c} onClick={() => setCoaching(c)} />)}
          </div>
        </Field>
        <Field label="School name (optional)">
          <input type="text" placeholder="e.g. Delhi Public School" value={school} onChange={e => setSchool(e.target.value)}
            className="w-full rounded-xl px-4 py-3 text-sm outline-none"
            style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.9)" }} />
        </Field>
      </Section>

      {/* Save button */}
      <button onClick={save} disabled={saving || saved}
        className="flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer"
        style={{ backgroundColor: saved ? "#16a34a" : "#2563eb", color: "#fff", opacity: saving ? 0.7 : 1 }}>
        {saved && <Check className="h-4 w-4" />}
        {saving ? "Saving…" : saved ? "Saved" : "Save changes"}
      </button>

      {/* Danger zone */}
      <div className="w-full rounded-xl p-6 flex flex-col gap-4" style={{ border: "1px solid rgba(239,68,68,0.2)", backgroundColor: "rgba(239,68,68,0.04)" }}>
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(239,68,68,0.7)" }}>Danger zone</p>

        {deleteStep === "idle" && (
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>Delete account</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Permanently deletes your profile and all data. This cannot be undone.</p>
            </div>
            <button onClick={() => setDeleteStep("typing")} className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
              style={{ backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171" }}>
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
              Check your email — the 8-digit code is in the <span className="font-semibold" style={{ color: "rgba(255,255,255,0.9)" }}>subject line</span> of the message sent to {email}.
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
                {otpSending ? "Resending…" : "Resend code"}
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

      <div className="h-4" />
    </div>
  );
}
