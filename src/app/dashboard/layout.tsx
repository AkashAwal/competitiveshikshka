"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  BookCheck,
  StickyNote,
  ListTodo,
  Bell,
  Sparkles,
  UserCircle,
  LogOut,
  Menu,
  X,
  BarChart2,
  Bookmark,
  CalendarDays,
  Settings,
  CalendarClock,
  Flame,
  Trophy,
  Target,
  BookOpen,
  Zap,
  Medal,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { OnboardingModal, type OnboardingProfile } from "@/components/dashboard/onboarding-modal";

type AppearPrefs = { theme: string; fontSize: string; compactMode: boolean; reduceAnimations: boolean };
const APPEAR_DEFAULT: AppearPrefs = { theme: "dark", fontSize: "normal", compactMode: false, reduceAnimations: false };

interface Profile extends OnboardingProfile {
  onboarding_completed: boolean;
  streak?: number;
  last_visited_date?: string;
  avatar_style?: string;
  target_exam?: string;
  target_year?: number;
  created_at?: string;
}

const BG = "backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf";
function resolveAvatarUrl(avatarStyle: string | undefined, googleUrl: string | undefined) {
  if (!avatarStyle || avatarStyle === "google") return googleUrl ?? "";
  const idx = avatarStyle.indexOf(":");
  if (idx === -1) return `https://api.dicebear.com/9.x/${avatarStyle}/svg?seed=default&${BG}`;
  const style = avatarStyle.slice(0, idx);
  const seed = avatarStyle.slice(idx + 1);
  return `https://api.dicebear.com/9.x/${style}/svg?seed=${encodeURIComponent(seed)}&${BG}`;
}

const navItems = [
  { icon: LayoutDashboard, label: "Home",          href: "/dashboard" },
  { icon: BarChart2,       label: "Analytics",     href: "/dashboard/analytics" },
  { icon: BookCheck,       label: "Tests",         href: "/dashboard/tests" },
  { icon: StickyNote,      label: "Notes",         href: "/dashboard/notes" },
  { icon: Bookmark,        label: "Bookmarks",     href: "/dashboard/bookmarks" },
  { icon: CalendarDays,    label: "Planner",       href: "/dashboard/planner" },
  { icon: Bell,            label: "Notifications", href: "/dashboard/exams" },
  { icon: Settings,        label: "Settings",      href: "/dashboard/settings" },
];

const bottomItems = [
  { icon: Sparkles,   label: "Get Premium", href: "/dashboard/premium", gold: true },
  { icon: UserCircle, label: "Profile",     href: "/dashboard/profile" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mountedTheme, setMountedTheme] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null | undefined>(undefined);
  const [streak, setStreak] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [achievementsOpen, setAchievementsOpen] = useState(false);

  useEffect(() => setMountedTheme(true), []);

  function daysTo(month: number, day: number, year: number) {
    return Math.max(0, Math.ceil((new Date(year, month - 1, day).getTime() - Date.now()) / 86_400_000));
  }

  function getFallbackYear(examMonth: number, examDay: number): number {
    const cls = profile?.class ?? "Class 12";
    let yr: number;
    if (cls.startsWith("Dropper")) {
      yr = new Date().getFullYear();
    } else {
      const classNum = parseInt(cls.replace(/\D/g, "")) || 12;
      const createdDate = profile?.created_at ? new Date(profile.created_at) : new Date();
      yr = createdDate.getFullYear() + (12 - classNum);
    }
    if (new Date(yr, examMonth - 1, examDay) <= new Date()) yr++;
    return yr;
  }

  function getExamCountdowns(): { label: string; days: number }[] {
    if (profile?.target_exam) {
      const exams = profile.target_exam.split(",");
      const hasJee  = exams.some(e => e.includes("JEE"));
      const hasNeet = exams.includes("NEET");

      const jeeMonth = exams.includes("JEE Mains") ? 1 : 5;
      const jeeDay   = exams.includes("JEE Mains") ? 15 : 18;
      const validYear = profile.target_year && !isNaN(profile.target_year) ? profile.target_year : null;
      const jeeYr    = validYear ?? getFallbackYear(jeeMonth, jeeDay);
      const neetYr   = validYear ?? getFallbackYear(5, 5);

      if (hasJee && hasNeet) {
        return [
          { label: "JEE",  days: daysTo(jeeMonth, jeeDay, jeeYr) },
          { label: "NEET", days: daysTo(5, 5, neetYr) },
        ];
      }
      if (hasNeet) return [{ label: "NEET", days: daysTo(5, 5, neetYr) }];
      if (hasJee)  return [{ label: "JEE",  days: daysTo(jeeMonth, jeeDay, jeeYr) }];
    }

    // Fallback from stream
    const stream = profile?.stream ?? "PCM";
    const isNEET = stream === "PCB";
    const examMonth = isNEET ? 5 : 1;
    const examDay   = isNEET ? 5 : 15;
    const yr = getFallbackYear(examMonth, examDay);
    return [{ label: isNEET ? "NEET" : "JEE", days: daysTo(examMonth, examDay, yr) }];
  }
  const examCountdowns = getExamCountdowns();

  const achievements = [
    { Icon: Target,   iconColor: "#f87171", title: "First Test",   desc: "Complete your first practice test",   earned: false, locked: "Unlocks once Tests are live" },
    { Icon: Flame,    iconColor: "#fb923c", title: "3 Day Streak", desc: "Study 3 days in a row",               earned: streak >= 3, locked: null },
    { Icon: BookOpen, iconColor: "#60a5fa", title: "Note Taker",   desc: "Create your first note",              earned: false, locked: "Unlocks once Notes are live" },
    { Icon: Zap,      iconColor: "#facc15", title: "Speed Run",    desc: "Finish a test in under 30 minutes",   earned: false, locked: "Unlocks once Tests are live" },
    { Icon: Medal,    iconColor: "#a78bfa", title: "Top Scorer",   desc: "Score above 90% on any test",         earned: false, locked: "Unlocks once Tests are live" },
  ] as const;
  const earnedCount = achievements.filter(a => a.earned).length;

  useEffect(() => {
    function applyAppearPrefs() {
      try {
        const raw = localStorage.getItem("cs-appear");
        const prefs: AppearPrefs = raw ? { ...APPEAR_DEFAULT, ...JSON.parse(raw) } : APPEAR_DEFAULT;
        document.documentElement.classList.toggle("cs-large-text", prefs.fontSize === "large");
        document.documentElement.classList.toggle("cs-compact", prefs.compactMode);
        document.documentElement.classList.toggle("cs-no-anim", prefs.reduceAnimations);
      } catch { /* noop */ }
    }
    applyAppearPrefs();
    window.addEventListener("storage", applyAppearPrefs);
    return () => window.removeEventListener("storage", applyAppearPrefs);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      setUser(data.user);
      if (data.user) {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("class, stream, state, heard_from, strong_subject, weak_subject, coaching, school, onboarding_completed, streak, last_visited_date, avatar_style, target_exam, target_year, created_at")
          .eq("id", data.user.id)
          .single();

        if (profileData) {
          setProfile(profileData);
        } else if (profileError?.code === "PGRST116") {
          // Genuinely no profile row yet — a real new-user case, safe to trigger onboarding.
          setProfile(null);
        }
        // Any other error (network blip, RLS hiccup) leaves `profile` as `undefined` —
        // that intentionally keeps the onboarding-gate check pending instead of
        // misfiring the onboarding modal for an already-onboarded returning student.

        if (profileData) {
          const today = new Date().toISOString().slice(0, 10);
          const last = profileData.last_visited_date;
          const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);

          if (last !== today) {
            const newStreak = last === yesterday ? (profileData.streak ?? 0) + 1 : 1;
            setStreak(newStreak);
            await supabase.from("profiles").update({
              streak: newStreak,
              last_visited_date: today,
            }).eq("id", data.user.id);
          } else {
            setStreak(profileData.streak ?? 0);
          }
        }
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    // Listen for profile updates from the profile page
    function onProfileUpdated(e: Event) {
      const { avatar_style, full_name, target_exam, target_year, stream, class: cls } =
        (e as CustomEvent<{ avatar_style?: string; full_name?: string; target_exam?: string; target_year?: string; stream?: string; class?: string }>).detail;
      if (full_name !== undefined)
        setUser(prev => prev ? { ...prev, user_metadata: { ...prev.user_metadata, full_name } } : prev);
      setProfile(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          ...(avatar_style !== undefined ? { avatar_style } : {}),
          ...(target_exam !== undefined ? { target_exam } : {}),
          ...(target_year !== undefined ? { target_year: parseInt(target_year) || undefined } : {}),
          ...(stream !== undefined ? { stream } : {}),
          ...(cls !== undefined ? { class: cls } : {}),
        };
      });
    }
    window.addEventListener("cs-profile-updated", onProfileUpdated);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener("cs-profile-updated", onProfileUpdated);
    };
  }, []);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  }

  const Sidebar = () => (
    <aside
      className="flex flex-col h-full"
      style={{ backgroundColor: "var(--surface-sidebar)", width: "240px", minWidth: "240px" }}
    >
      {/* Logo */}
      <div className="px-5 py-3">
        <Link href="/" onClick={() => setSidebarOpen(false)}>
          <Image
            src="/logo_br_light.png"
            alt="CompetitiveShiksha"
            width={160}
            height={44}
            className="hidden h-[44px] w-auto dark:block"
            priority
          />
          <Image
            src="/logo_br_dark.png"
            alt="CompetitiveShiksha"
            width={160}
            height={44}
            className="h-[44px] w-auto dark:hidden"
            priority
          />
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-2 flex flex-col justify-between overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {navItems.map(({ icon: Icon, label, href }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-[15px] transition-all"
              style={{
                backgroundColor: active ? "var(--surface-active-bg)" : "transparent",
                color: active ? "var(--surface-active-fg)" : "rgba(var(--fg-rgb),0.75)",
                fontWeight: active ? 600 : 400,
              }}
              onMouseEnter={e => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "var(--hover-bg)";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "rgba(var(--fg-rgb),0.75)";
                }
              }}
            >
              <Icon
                className="h-4.5 w-4.5 shrink-0"
                style={{ color: active ? "var(--surface-active-fg)" : "rgba(var(--fg-rgb),0.5)" }}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 pb-2 flex flex-col gap-0.5 border-t" style={{ borderColor: "rgba(var(--fg-rgb),0.15)", paddingTop: "8px" }}>
        {bottomItems.map(({ icon: Icon, label, href, gold }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-[15px] transition-all"
              style={{
                backgroundColor: active ? "var(--surface-active-bg)" : gold ? "rgba(234,179,8,0.08)" : "transparent",
                color: active ? "var(--surface-active-fg)" : gold ? "#fbbf24" : "rgba(var(--fg-rgb),0.75)",
                fontWeight: active ? 600 : 400,
              }}
              onMouseEnter={e => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = gold ? "rgba(234,179,8,0.15)" : "var(--hover-bg)";
                  (e.currentTarget as HTMLElement).style.color = gold ? "#fde68a" : "var(--text-primary)";
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = gold ? "rgba(234,179,8,0.08)" : "transparent";
                  (e.currentTarget as HTMLElement).style.color = gold ? "#fbbf24" : "rgba(var(--fg-rgb),0.75)";
                }
              }}
            >
              <Icon
                className="h-4.5 w-4.5 shrink-0"
                style={{ color: active ? "var(--surface-active-fg)" : gold ? "#fbbf24" : "rgba(var(--fg-rgb),0.5)" }}
              />
              {label}
            </Link>
          );
        })}

        {/* User + sign out */}
        <div className="mt-2 pt-2 border-t" style={{ borderColor: "rgba(var(--fg-rgb),0.15)" }}>
          {user && (
            <div className="px-3 py-2 mb-1">
              <p className="text-xs font-semibold truncate" style={{ color: "rgba(var(--fg-rgb),0.9)" }}>
                {user.user_metadata.full_name ?? "Student"}
              </p>
              <p className="text-xs truncate" style={{ color: "rgba(var(--fg-rgb),0.35)" }}>
                {user.email}
              </p>
            </div>
          )}
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer"
            style={{ color: "rgba(248,113,113,0.75)" }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(239,68,68,0.08)";
              (e.currentTarget as HTMLElement).style.color = "#f87171";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLElement).style.color = "rgba(248,113,113,0.75)";
            }}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    /* Outer bg = sidebar color so the curved corner blends seamlessly */
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "var(--surface-sidebar)" }}>
      {/* Desktop sidebar */}
      <div className="hidden md:flex h-full">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "var(--overlay)" }}
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative z-10 h-full">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Right column: topbar + content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Topbar — sits in sidebar bg color */}
        <div
          className="hidden md:flex items-center justify-end px-6 shrink-0 relative"
          style={{ height: "65px", backgroundColor: "var(--surface-sidebar)" }}
        >
          {/* Greeting — centred across full viewport */}
          <div className="fixed left-1/2 -translate-x-1/2 flex items-center gap-3">
            {/* Avatar */}
            {(() => {
              const url = resolveAvatarUrl(profile?.avatar_style, user?.user_metadata?.avatar_url);
              return url ? (
                <Image src={url} alt="avatar" width={32} height={32} className="rounded-full object-cover shrink-0" unoptimized style={{ width: 32, height: 32 }} />
              ) : (
                <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0" style={{ backgroundColor: "#2563eb" }}>
                  {user?.user_metadata?.full_name?.[0]?.toUpperCase() ?? "S"}
                </div>
              );
            })()}
            <p className="text-xl font-bold" style={{ color: "rgba(var(--fg-rgb),0.9)" }}>
              Hey {user?.user_metadata?.full_name?.split(" ")[0] ?? "Student"}!
            </p>
            {profile?.onboarding_completed && (
              <>
                <span style={{ color: "rgba(var(--fg-rgb),0.2)" }}>·</span>
                <span className="text-sm font-semibold" style={{ color: "rgba(var(--fg-rgb),0.45)" }}>{profile.class}</span>
                <span style={{ color: "rgba(var(--fg-rgb),0.2)" }}>·</span>
                <span className="text-sm font-semibold" style={{ color: "rgba(var(--fg-rgb),0.45)" }}>{profile.stream}</span>
              </>
            )}
          </div>

          {/* Stats chips — right */}
          <div className="flex items-center gap-3">
            {examCountdowns.map(({ label, days }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{ backgroundColor: "rgba(var(--fg-rgb),0.06)" }}
              >
                <CalendarClock className="h-4 w-4 shrink-0" style={{ color: "#60a5fa" }} />
                <span className="text-xs font-semibold" style={{ color: "rgba(var(--fg-rgb),0.85)" }}>{days} days to {label}</span>
              </div>
            ))}
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ backgroundColor: "rgba(var(--fg-rgb),0.06)" }}
            >
              <Flame className="h-4 w-4 shrink-0" style={{ color: "#fb923c" }} />
              <span className="text-xs font-semibold" style={{ color: "rgba(var(--fg-rgb),0.85)" }}>{streak}</span>
            </div>
            <button
              onClick={() => setAchievementsOpen(o => !o)}
              aria-label={`Achievements — ${earnedCount} earned`}
              aria-expanded={achievementsOpen}
              className="flex items-center gap-2 px-3 py-2 rounded-xl transition-colors cursor-pointer"
              style={{ backgroundColor: achievementsOpen ? "rgba(var(--fg-rgb),0.12)" : "rgba(var(--fg-rgb),0.06)" }}
            >
              <Trophy className="h-4 w-4 shrink-0" style={{ color: "#fbbf24" }} />
              <span className="text-xs font-semibold" style={{ color: "rgba(var(--fg-rgb),0.85)" }}>{earnedCount}</span>
            </button>
            {mountedTheme && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="flex items-center justify-center p-2 rounded-xl transition-colors cursor-pointer"
                style={{ backgroundColor: "rgba(var(--fg-rgb),0.06)" }}
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4 shrink-0" style={{ color: "#fbbf24" }} />
                ) : (
                  <Moon className="h-4 w-4 shrink-0" style={{ color: "rgba(var(--fg-rgb),0.6)" }} />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Main content — rounded top-left corner cuts into the sidebar bg */}
        <div
          className="flex-1 flex flex-col overflow-hidden"
          style={{ backgroundColor: "var(--surface-content)", borderTopLeftRadius: "18px" }}
        >
          {/* Mobile top bar */}
          <header
            className="md:hidden flex items-center gap-3 px-4 h-14 border-b shrink-0"
            style={{ backgroundColor: "var(--surface-content)", borderColor: "rgba(var(--fg-rgb),0.07)", borderTopLeftRadius: "18px" }}
          >
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar menu"
              className="p-1.5 rounded-md cursor-pointer"
              style={{ color: "rgba(var(--fg-rgb),0.6)" }}
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link href="/">
              <Image
                src="/logo_br_light.png"
                alt="CompetitiveShiksha"
                width={120}
                height={32}
                className="hidden h-8 w-auto dark:block"
              />
              <Image
                src="/logo_br_dark.png"
                alt="CompetitiveShiksha"
                width={120}
                height={32}
                className="h-8 w-auto dark:hidden"
              />
            </Link>
          </header>

          {/* Page content */}
          <main
            className="flex-1 overflow-y-auto"
            style={{ color: "rgba(var(--fg-rgb),0.87)" }}
          >
            {children}
          </main>
        </div>

        {/* Onboarding modal — shown when profile not yet completed */}
        {user && profile !== undefined && !profile?.onboarding_completed && (
          <OnboardingModal
            userId={user.id}
            onComplete={(p) => setProfile({ ...p, onboarding_completed: true })}
          />
        )}

        {/* Achievements side panel */}
        {achievementsOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setAchievementsOpen(false)}
            />
            <div
              className="fixed top-0 right-0 h-full z-50 flex flex-col"
              style={{ width: "320px", backgroundColor: "var(--surface-sidebar)", borderLeft: "1px solid rgba(var(--fg-rgb),0.08)" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "rgba(var(--fg-rgb),0.08)" }}>
                <p className="font-bold text-base" style={{ color: "rgba(var(--fg-rgb),0.9)" }}>Achievements</p>
                <button
                  onClick={() => setAchievementsOpen(false)}
                  aria-label="Close achievements panel"
                  className="p-1.5 rounded-lg cursor-pointer transition-colors"
                  style={{ color: "rgba(var(--fg-rgb),0.5)" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(var(--fg-rgb),0.07)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
                {achievements.map(({ Icon, iconColor, title, desc, earned, locked }) => (
                  <div
                    key={title}
                    className="flex items-center gap-4 p-4 rounded-xl"
                    style={{
                      backgroundColor: earned ? "rgba(37,99,235,0.12)" : "rgba(var(--fg-rgb),0.04)",
                      border: `1px solid ${earned ? "rgba(37,99,235,0.3)" : "rgba(var(--fg-rgb),0.06)"}`,
                      opacity: locked ? 0.55 : 1,
                    }}
                  >
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-lg shrink-0"
                      style={{ backgroundColor: `${iconColor}18` }}
                    >
                      <Icon className="h-4.5 w-4.5" style={{ color: iconColor }} />
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold" style={{ color: "rgba(var(--fg-rgb),0.9)" }}>{title}</p>
                      <p className="text-xs mt-0.5" style={{ color: "rgba(var(--fg-rgb),0.4)" }}>{locked ?? desc}</p>
                    </div>
                    {/* Checkmark box */}
                    <div
                      className="flex h-5 w-5 items-center justify-center rounded shrink-0"
                      style={{
                        border: `1.5px solid ${earned ? "#60a5fa" : "rgba(var(--fg-rgb),0.2)"}`,
                        backgroundColor: earned ? "#2563eb" : "transparent",
                      }}
                    >
                      {earned && (
                        <svg viewBox="0 0 10 8" className="h-2.5 w-2.5" fill="none">
                          <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
                <p className="text-xs text-center mt-2" style={{ color: "rgba(var(--fg-rgb),0.2)" }}>More achievements unlock as new features ship</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
