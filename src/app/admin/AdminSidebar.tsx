"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Users, GraduationCap, BookCheck, UserCheck, LogOut, ArrowLeft, FileText,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { icon: LayoutDashboard, label: "Overview",   href: "/admin" },
  { icon: Users,           label: "Students",   href: "/admin/students" },
  { icon: GraduationCap,   label: "Colleges",   href: "/admin/colleges" },
  { icon: FileText,        label: "Exams",      href: "/admin/exams" },
  { icon: BookCheck,       label: "Questions",  href: "/admin/questions" },
  { icon: UserCheck,       label: "Mentorship", href: "/admin/mentorship" },
];

export function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <aside className="flex flex-col h-full" style={{ backgroundColor: "#15191e", width: "240px", minWidth: "240px" }}>
      <div className="px-5 py-5">
        <p className="text-lg font-black" style={{ color: "rgba(255,255,255,0.95)" }}>Admin</p>
        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>CompetitiveShiksha</p>
      </div>

      <nav className="flex-1 px-3 py-2 flex flex-col gap-0.5">
        {navItems.map(({ icon: Icon, label, href }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-[15px] transition-all"
              style={{
                backgroundColor: active ? "#ffffff" : "transparent",
                color: active ? "#0f1318" : "rgba(255,255,255,0.75)",
                fontWeight: active ? 600 : 400,
              }}
              onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.color = "#fff"; } }}
              onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)"; } }}
            >
              <Icon className="h-4.5 w-4.5 shrink-0" style={{ color: active ? "#000" : "rgba(255,255,255,0.5)" }} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-3 flex flex-col gap-0.5 border-t" style={{ borderColor: "rgba(255,255,255,0.15)", paddingTop: "10px" }}>
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all"
          style={{ color: "rgba(255,255,255,0.6)" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.07)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          Back to site
        </Link>

        <div className="mt-1 pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
          <div className="px-3 py-2 mb-1">
            <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.35)" }}>{email}</p>
          </div>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer"
            style={{ color: "rgba(248,113,113,0.75)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(239,68,68,0.08)"; (e.currentTarget as HTMLElement).style.color = "#f87171"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(248,113,113,0.75)"; }}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
}
