"use client";

import { useState, useTransition } from "react";
import { Check } from "lucide-react";
import { updateCollegeDetails, type CollegeDetailsInput } from "../actions";

const inputClass = "w-full rounded-lg px-3 py-2 text-sm outline-none";
const inputStyle = { backgroundColor: "rgba(var(--fg-rgb),0.05)", border: "1px solid rgba(var(--fg-rgb),0.08)", color: "rgba(var(--fg-rgb),0.9)" };
const card = { background: "var(--surface-card)", border: "1px solid rgba(var(--fg-rgb),0.13)" };

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ color: "rgba(var(--fg-rgb),0.4)" }}>{children}</label>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-6 flex flex-col gap-4" style={card}>
      <p className="text-sm font-bold" style={{ color: "rgba(var(--fg-rgb),0.9)" }}>{title}</p>
      {children}
    </div>
  );
}

export interface CollegeDetails extends CollegeDetailsInput {
  id: string;
}

export function CollegeEditForm({ college }: { college: CollegeDetails }) {
  const [form, setForm] = useState<CollegeDetailsInput>({
    address: college.address ?? "",
    overview: college.overview ?? "",
    admission_email: college.admission_email ?? "",
    phone: college.phone ?? "",
    how_to_reach: college.how_to_reach ?? "",
    campus_facilities: college.campus_facilities ?? [],
    admission_process: college.admission_process ?? "",
    nirf_rank: college.nirf_rank,
    avg_fees_lpa: college.avg_fees_lpa,
    website: college.website ?? "",
    accepts_exams: college.accepts_exams ?? "",
    avg_package_lpa: college.avg_package_lpa,
    highest_package_lpa: college.highest_package_lpa,
    placement_percentage: college.placement_percentage,
    top_recruiters: college.top_recruiters ?? "",
    placement_year: college.placement_year,
  });
  const [facilitiesText, setFacilitiesText] = useState((college.campus_facilities ?? []).join(", "));
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function save() {
    setError("");
    setSaved(false);
    const facilities = facilitiesText.split(",").map(s => s.trim()).filter(Boolean);
    startTransition(async () => {
      try {
        await updateCollegeDetails(college.id, { ...form, campus_facilities: facilities });
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong.");
      }
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <Section title="Location">
        <div>
          <Label>Address</Label>
          <input className={inputClass} style={inputStyle} value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="Full postal address" />
        </div>
        <div>
          <Label>How to reach</Label>
          <textarea rows={2} className={inputClass} style={inputStyle} value={form.how_to_reach} onChange={e => setForm({ ...form, how_to_reach: e.target.value })} placeholder="Nearest airport/station, local transport options..." />
        </div>
      </Section>

      <Section title="Overview">
        <textarea rows={4} className={inputClass} style={inputStyle} value={form.overview} onChange={e => setForm({ ...form, overview: e.target.value })} placeholder="What makes this college worth considering..." />
      </Section>

      <Section title="Campus facilities">
        <div>
          <Label>Comma-separated list</Label>
          <input className={inputClass} style={inputStyle} value={facilitiesText} onChange={e => setFacilitiesText(e.target.value)} placeholder="Hostel, Library, Sports Complex, Wi-Fi Campus, Medical Center" />
        </div>
      </Section>

      <Section title="Admission">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Admission email</Label>
            <input className={inputClass} style={inputStyle} value={form.admission_email} onChange={e => setForm({ ...form, admission_email: e.target.value })} placeholder="admissions@college.edu" />
          </div>
          <div>
            <Label>Phone</Label>
            <input className={inputClass} style={inputStyle} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          </div>
        </div>
        <div>
          <Label>Accepted exams</Label>
          <input className={inputClass} style={inputStyle} value={form.accepts_exams} onChange={e => setForm({ ...form, accepts_exams: e.target.value })} placeholder="JEE Main, JEE Advanced" />
        </div>
        <div>
          <Label>Admission process</Label>
          <textarea rows={3} className={inputClass} style={inputStyle} value={form.admission_process} onChange={e => setForm({ ...form, admission_process: e.target.value })} placeholder="How students get in — counselling rounds, documents, timeline..." />
        </div>
      </Section>

      <Section title="Ranking & fees">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>NIRF rank</Label>
            <input type="number" className={inputClass} style={inputStyle} value={form.nirf_rank ?? ""} onChange={e => setForm({ ...form, nirf_rank: e.target.value ? Number(e.target.value) : null })} />
          </div>
          <div>
            <Label>Avg fees (LPA)</Label>
            <input type="number" step="0.1" className={inputClass} style={inputStyle} value={form.avg_fees_lpa ?? ""} onChange={e => setForm({ ...form, avg_fees_lpa: e.target.value ? Number(e.target.value) : null })} />
          </div>
          <div>
            <Label>Website</Label>
            <input className={inputClass} style={inputStyle} value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} placeholder="https://..." />
          </div>
        </div>
      </Section>

      <Section title="Placements">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Avg package (LPA)</Label>
            <input type="number" step="0.1" className={inputClass} style={inputStyle} value={form.avg_package_lpa ?? ""} onChange={e => setForm({ ...form, avg_package_lpa: e.target.value ? Number(e.target.value) : null })} />
          </div>
          <div>
            <Label>Highest package (LPA)</Label>
            <input type="number" step="0.1" className={inputClass} style={inputStyle} value={form.highest_package_lpa ?? ""} onChange={e => setForm({ ...form, highest_package_lpa: e.target.value ? Number(e.target.value) : null })} />
          </div>
          <div>
            <Label>Placement %</Label>
            <input type="number" step="0.1" className={inputClass} style={inputStyle} value={form.placement_percentage ?? ""} onChange={e => setForm({ ...form, placement_percentage: e.target.value ? Number(e.target.value) : null })} />
          </div>
          <div>
            <Label>Placement year</Label>
            <input type="number" className={inputClass} style={inputStyle} value={form.placement_year ?? ""} onChange={e => setForm({ ...form, placement_year: e.target.value ? Number(e.target.value) : null })} />
          </div>
        </div>
        <div>
          <Label>Top recruiters</Label>
          <input className={inputClass} style={inputStyle} value={form.top_recruiters} onChange={e => setForm({ ...form, top_recruiters: e.target.value })} placeholder="Google, Microsoft, Goldman Sachs..." />
        </div>
      </Section>

      {error && <p className="text-sm font-semibold text-red-400">{error}</p>}

      <button
        onClick={save}
        disabled={pending}
        className="self-start flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white cursor-pointer disabled:opacity-50"
        style={{ backgroundColor: saved ? "#16a34a" : "#2563eb" }}
      >
        {saved && <Check className="h-4 w-4" />}
        {pending ? "Saving..." : saved ? "Saved" : "Save changes"}
      </button>
    </div>
  );
}
