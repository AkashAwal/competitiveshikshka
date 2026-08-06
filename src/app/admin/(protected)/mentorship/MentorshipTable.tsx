"use client";

import { useTransition } from "react";
import { updateApplicationStatus, type ApplicationStatus } from "./actions";

export interface ApplicationRow {
  id: string;
  full_name: string;
  contact_no: string;
  email: string;
  city: string;
  class: string;
  plan: string;
  status: ApplicationStatus;
  created_at: string;
}

const STATUS_COLORS: Record<ApplicationStatus, { bg: string; color: string }> = {
  new: { bg: "rgba(96,165,250,0.12)", color: "#60a5fa" },
  contacted: { bg: "rgba(250,204,21,0.12)", color: "#facc15" },
  enrolled: { bg: "rgba(74,222,128,0.12)", color: "#4ade80" },
  rejected: { bg: "rgba(248,113,113,0.12)", color: "#f87171" },
};

export function MentorshipTable({ rows }: { rows: ApplicationRow[] }) {
  const [pending, startTransition] = useTransition();

  function setStatus(id: string, status: ApplicationStatus) {
    startTransition(async () => {
      await updateApplicationStatus(id, status);
    });
  }

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "var(--surface-card)", border: "1px solid rgba(var(--fg-rgb),0.13)" }}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ color: "rgba(var(--fg-rgb),0.4)" }}>
              {["Name", "Contact", "Email", "City", "Class", "Plan", "Applied", "Status"].map(h => (
                <th key={h} className="text-left font-semibold px-4 py-3 text-xs uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => {
              const colors = STATUS_COLORS[row.status];
              return (
                <tr key={row.id} className="border-t" style={{ borderColor: "rgba(var(--fg-rgb),0.06)" }}>
                  <td className="px-4 py-3 font-semibold" style={{ color: "rgba(var(--fg-rgb),0.9)" }}>{row.full_name}</td>
                  <td className="px-4 py-3" style={{ color: "rgba(var(--fg-rgb),0.6)" }}>{row.contact_no}</td>
                  <td className="px-4 py-3" style={{ color: "rgba(var(--fg-rgb),0.6)" }}>{row.email}</td>
                  <td className="px-4 py-3" style={{ color: "rgba(var(--fg-rgb),0.6)" }}>{row.city}</td>
                  <td className="px-4 py-3" style={{ color: "rgba(var(--fg-rgb),0.6)" }}>{row.class}</td>
                  <td className="px-4 py-3" style={{ color: "rgba(var(--fg-rgb),0.6)" }}>{row.plan === "premium" ? "Premium" : "Mentorship only"}</td>
                  <td className="px-4 py-3 whitespace-nowrap" style={{ color: "rgba(var(--fg-rgb),0.4)" }}>
                    {new Date(row.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      disabled={pending}
                      value={row.status}
                      onChange={e => setStatus(row.id, e.target.value as ApplicationStatus)}
                      className="text-xs font-semibold px-2.5 py-1.5 rounded-full outline-none cursor-pointer"
                      style={{ backgroundColor: colors.bg, color: colors.color, border: "none" }}
                    >
                      {(["new", "contacted", "enrolled", "rejected"] as const).map(s => (
                        <option key={s} value={s} style={{ backgroundColor: "var(--surface-content)", color: "var(--text-primary)" }}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {rows.length === 0 && (
          <p className="text-center py-10 text-sm" style={{ color: "rgba(var(--fg-rgb),0.3)" }}>No mentorship applications yet.</p>
        )}
      </div>
    </div>
  );
}
