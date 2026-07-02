"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ShieldCheck } from "lucide-react";

export interface StudentRow {
  id: string;
  fullName: string;
  email: string;
  class: string;
  stream: string;
  targetExam: string;
  streak: number;
  isAdmin: boolean;
  joinedAt: string;
}

export function StudentsTable({ rows }: { rows: StudentRow[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(r =>
      r.fullName.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.class.toLowerCase().includes(q) ||
      r.targetExam.toLowerCase().includes(q)
    );
  }, [rows, query]);

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "var(--surface-card)", border: "1px solid rgba(var(--fg-rgb),0.13)" }}>
      <div className="p-4 border-b" style={{ borderColor: "rgba(var(--fg-rgb),0.08)" }}>
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "rgba(var(--fg-rgb),0.3)" }} />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search name, email, class, exam..."
            className="w-full rounded-lg pl-9 pr-3 py-2 text-sm outline-none"
            style={{ backgroundColor: "rgba(var(--fg-rgb),0.05)", border: "1px solid rgba(var(--fg-rgb),0.08)", color: "rgba(var(--fg-rgb),0.9)" }}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ color: "rgba(var(--fg-rgb),0.4)" }}>
              {["Name", "Email", "Class", "Stream", "Target exam", "Streak", "Joined"].map(h => (
                <th key={h} className="text-left font-semibold px-4 py-3 text-xs uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(row => (
              <tr key={row.id} className="border-t" style={{ borderColor: "rgba(var(--fg-rgb),0.06)" }}>
                <td className="px-4 py-3">
                  <Link href={`/admin/students/${row.id}`} className="flex items-center gap-2 font-semibold hover:underline" style={{ color: "rgba(var(--fg-rgb),0.9)" }}>
                    {row.fullName}
                    {row.isAdmin && <ShieldCheck className="h-3.5 w-3.5" style={{ color: "#60a5fa" }} />}
                  </Link>
                </td>
                <td className="px-4 py-3" style={{ color: "rgba(var(--fg-rgb),0.6)" }}>{row.email}</td>
                <td className="px-4 py-3" style={{ color: "rgba(var(--fg-rgb),0.6)" }}>{row.class}</td>
                <td className="px-4 py-3" style={{ color: "rgba(var(--fg-rgb),0.6)" }}>{row.stream}</td>
                <td className="px-4 py-3" style={{ color: "rgba(var(--fg-rgb),0.6)" }}>{row.targetExam}</td>
                <td className="px-4 py-3" style={{ color: "rgba(var(--fg-rgb),0.6)" }}>{row.streak}</td>
                <td className="px-4 py-3 whitespace-nowrap" style={{ color: "rgba(var(--fg-rgb),0.4)" }}>
                  {row.joinedAt ? new Date(row.joinedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center py-10 text-sm" style={{ color: "rgba(var(--fg-rgb),0.3)" }}>No students match your search.</p>
        )}
      </div>
    </div>
  );
}
