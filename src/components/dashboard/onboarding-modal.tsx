"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

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
const heardFromOptions = ["Instagram", "YouTube", "Google Search", "Friend / Word of mouth", "Other"];
const coachingOptions = [
  "Allen", "Aakash", "FIITJEE", "Resonance", "Narayana",
  "Vidyamandir", "PW (Physics Wallah)", "Unacademy", "Self-study", "Other",
];

function getSubjects(stream: string) {
  if (stream === "PCM") return ["Physics", "Chemistry", "Maths"];
  if (stream === "PCB") return ["Physics", "Chemistry", "Biology"];
  return ["Physics", "Chemistry", "Maths", "Biology"];
}

export interface OnboardingProfile {
  class: string;
  stream: string;
  state: string;
  heard_from?: string;
  strong_subject?: string;
  weak_subject?: string;
  coaching?: string;
  school?: string;
}

interface Props {
  userId: string;
  onComplete: (profile: OnboardingProfile) => void;
}

function ChipButton({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
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

export function OnboardingModal({ userId, onComplete }: Props) {
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);

  // Card 1
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStream, setSelectedStream] = useState("");
  const [selectedState, setSelectedState] = useState("");

  // Card 2
  const [heardFrom, setHeardFrom] = useState("");

  // Card 3
  const [strongSub, setStrongSub] = useState("");
  const [weakSub, setWeakSub] = useState("");

  // Card 4
  const [coaching, setCoaching] = useState("");
  const [school, setSchool] = useState("");

  const card1Valid = selectedClass && selectedStream && selectedState;
  const subjects = getSubjects(selectedStream);

  async function saveAndFinish() {
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase.from("profiles").upsert({
      id: userId,
      class: selectedClass,
      stream: selectedStream,
      state: selectedState,
      heard_from: heardFrom || null,
      strong_subject: strongSub || null,
      weak_subject: weakSub || null,
      coaching: coaching || null,
      school: school || null,
      onboarding_completed: true,
    });
    if (error) {
      setSaving(false);
      return;
    }
    setSaving(false);
    onComplete({
      class: selectedClass,
      stream: selectedStream,
      state: selectedState,
      heard_from: heardFrom || undefined,
      strong_subject: strongSub || undefined,
      weak_subject: weakSub || undefined,
      coaching: coaching || undefined,
      school: school || undefined,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
      <div
        className="w-full max-w-md rounded-2xl p-7 flex flex-col gap-6"
        style={{ backgroundColor: "#1b2027", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        {/* Progress dots */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map(i => (
            <div
              key={i}
              className="rounded-full transition-all"
              style={{
                height: "4px",
                flex: i === step ? 2 : 1,
                backgroundColor: i <= step ? "#2563eb" : "rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </div>

        {/* ── Card 1: Mandatory ── */}
        {step === 1 && (
          <>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#60a5fa" }}>Step 1 of 4</p>
              <h2 className="text-xl font-black" style={{ color: "rgba(255,255,255,0.95)" }}>Let's set up your profile</h2>
              <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>Takes 10 seconds. Helps us personalise your dashboard.</p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>Your class</p>
              <div className="grid grid-cols-2 gap-2">
                {classes.map(c => <ChipButton key={c} label={c} selected={selectedClass === c} onClick={() => setSelectedClass(c)} />)}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>Your stream</p>
              <div className="grid grid-cols-3 gap-2">
                {streams.map(s => <ChipButton key={s} label={s} selected={selectedStream === s} onClick={() => setSelectedStream(s)} />)}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>Your state</p>
              <select
                value={selectedState}
                onChange={e => setSelectedState(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm font-semibold outline-none cursor-pointer"
                style={{
                  backgroundColor: selectedState ? "#1e2d45" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${selectedState ? "#2563eb" : "rgba(255,255,255,0.08)"}`,
                  color: selectedState ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
                }}
              >
                <option value="" disabled style={{ backgroundColor: "#1b2027" }}>Select your state</option>
                {states.map(st => (
                  <option key={st} value={st} style={{ backgroundColor: "#1b2027", color: "rgba(255,255,255,0.9)" }}>{st}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => card1Valid && setStep(2)}
              disabled={!card1Valid}
              className="w-full py-3 rounded-xl text-sm font-bold transition-opacity"
              style={{
                backgroundColor: card1Valid ? "#2563eb" : "rgba(255,255,255,0.07)",
                color: card1Valid ? "#fff" : "rgba(255,255,255,0.25)",
                cursor: card1Valid ? "pointer" : "not-allowed",
              }}
            >
              Continue →
            </button>
          </>
        )}

        {/* ── Card 2: Where did you hear about us ── */}
        {step === 2 && (
          <>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#60a5fa" }}>Step 2 of 4</p>
              <h2 className="text-xl font-black" style={{ color: "rgba(255,255,255,0.95)" }}>Where did you find us?</h2>
              <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>Helps us understand how students discover CompetitiveShiksha.</p>
            </div>

            <div className="flex flex-col gap-2">
              {heardFromOptions.map(h => <ChipButton key={h} label={h} selected={heardFrom === h} onClick={() => setHeardFrom(h)} />)}
            </div>

            <div className="flex flex-col items-center gap-3">
              <button
                onClick={() => setStep(3)}
                disabled={!heardFrom}
                className="w-full py-3 rounded-xl text-sm font-bold transition-opacity"
                style={{
                  backgroundColor: heardFrom ? "#2563eb" : "rgba(255,255,255,0.07)",
                  color: heardFrom ? "#fff" : "rgba(255,255,255,0.25)",
                  cursor: heardFrom ? "pointer" : "not-allowed",
                }}
              >
                Continue →
              </button>
              <button
                onClick={() => setStep(3)}
                className="text-sm cursor-pointer transition-opacity hover:opacity-100"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Skip
              </button>
            </div>
          </>
        )}

        {/* ── Card 3: Strong & Weak subject ── */}
        {step === 3 && (
          <>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#60a5fa" }}>Step 3 of 4</p>
              <h2 className="text-xl font-black" style={{ color: "rgba(255,255,255,0.95)" }}>Your subject strengths</h2>
              <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>We'll use this to personalise your practice and tips.</p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>Strongest subject</p>
              <div className="grid grid-cols-2 gap-2">
                {subjects.map(s => <ChipButton key={s} label={s} selected={strongSub === s} onClick={() => { setStrongSub(s); if (weakSub === s) setWeakSub(""); }} />)}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>Weakest subject</p>
              <div className="grid grid-cols-2 gap-2">
                {subjects.map(s => (
                  <ChipButton
                    key={s}
                    label={s}
                    selected={weakSub === s}
                    onClick={() => { setWeakSub(s); if (strongSub === s) setStrongSub(""); }}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <button
                onClick={() => setStep(4)}
                disabled={!strongSub || !weakSub}
                className="w-full py-3 rounded-xl text-sm font-bold transition-opacity"
                style={{
                  backgroundColor: strongSub && weakSub ? "#2563eb" : "rgba(255,255,255,0.07)",
                  color: strongSub && weakSub ? "#fff" : "rgba(255,255,255,0.25)",
                  cursor: strongSub && weakSub ? "pointer" : "not-allowed",
                }}
              >
                Continue →
              </button>
              <button
                onClick={() => setStep(4)}
                className="text-sm cursor-pointer transition-opacity hover:opacity-100"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Skip
              </button>
            </div>
          </>
        )}

        {/* ── Card 4: Coaching & School ── */}
        {step === 4 && (
          <>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#60a5fa" }}>Step 4 of 4</p>
              <h2 className="text-xl font-black" style={{ color: "rgba(255,255,255,0.95)" }}>Your study background</h2>
              <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>Almost done!</p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>Coaching institute (if any)</p>
              <div className="grid grid-cols-2 gap-2">
                {coachingOptions.map(c => <ChipButton key={c} label={c} selected={coaching === c} onClick={() => setCoaching(c)} />)}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>School name <span style={{ color: "rgba(255,255,255,0.25)", textTransform: "none", letterSpacing: 0 }}>(optional)</span></p>
              <input
                type="text"
                placeholder="e.g. Delhi Public School"
                value={school}
                onChange={e => setSchool(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.9)",
                }}
              />
            </div>

            <div className="flex flex-col items-center gap-3">
              <button
                onClick={() => saveAndFinish()}
                disabled={saving}
                className="w-full py-3 rounded-xl text-sm font-bold cursor-pointer transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#2563eb", color: "#fff" }}
              >
                {saving ? "Saving…" : "Done →"}
              </button>
              <button
                onClick={() => saveAndFinish()}
                className="text-sm cursor-pointer transition-opacity hover:opacity-100"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Skip
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
