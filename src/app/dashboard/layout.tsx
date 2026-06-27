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
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { OnboardingModal, type OnboardingProfile } from "@/components/dashboard/onboarding-modal";

interface Profile extends OnboardingProfile {
  onboarding_completed: boolean;
  streak?: number;
  last_visited_date?: string;
  avatar_style?: string;
  target_exam?: string;
  target_year?: number;
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
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null | undefined>(undefined);
  const [streak, setStreak] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [achievementsOpen, setAchievementsOpen] = useState(false);

  function getExamCountdown() {
    const exam = profile?.target_exam;
    const year = profile?.target_year;
    if (!exam || !year) {
      const days = Math.ceil((new Date("2027-01-15").getTime() - Date.now()) / 86_400_000);
      return { label: "JEE", days };
    }
    let month = 1, day = 15;
    if (exam === "NEET") { month = 5; day = 5; }
    else if (exam === "JEE Advanced") { month = 5; day = 18; }
    const target = new Date(year, month - 1, day);
    const days = Math.ceil((target.getTime() - Date.now()) / 86_400_000);
    const shortLabel = exam === "JEE + NEET" ? "JEE" : exam === "JEE Mains" ? "JEE" : exam;
    return { label: shortLabel, days };
  }
  const examCountdown = getExamCountdown();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      setUser(data.user);
      if (data.user) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("class, stream, state, heard_from, strong_subject, weak_subject, coaching, school, onboarding_completed, streak, last_visited_date, avatar_style, target_exam, target_year")
          .eq("id", data.user.id)
          .single();
        setProfile(profileData ?? null);

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
      const { avatar_style, full_name, target_exam, target_year } = (e as CustomEvent<{ avatar_style?: string; full_name?: string; target_exam?: string; target_year?: string }>).detail;
      if (avatar_style !== undefined)
        setProfile(prev => prev ? { ...prev, avatar_style } : prev);
      if (full_name !== undefined)
        setUser(prev => prev ? { ...prev, user_metadata: { ...prev.user_metadata, full_name } } : prev);
      if (target_exam !== undefined || target_year !== undefined)
        setProfile(prev => prev ? {
          ...prev,
          ...(target_exam !== undefined ? { target_exam } : {}),
          ...(target_year !== undefined ? { target_year: parseInt(target_year) } : {}),
        } : prev);
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
      style={{ backgroundColor: "#15191e", width: "240px", minWidth: "240px" }}
    >
      {/* Logo */}
      <div className="px-5 py-3">
        <Link href="/" onClick={() => setSidebarOpen(false)}>
          <Image
            src="/logo-dark-mode.svg"
            alt="CompetitiveShiksha"
            width={160}
            height={44}
            className="h-[44px] w-auto"
            priority
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/logo-white-mode.svg";
            }}
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
                backgroundColor: active ? "#ffffff" : "transparent",
                color: active ? "#0f1318" : "rgba(255,255,255,0.75)",
                fontWeight: active ? 600 : 400,
              }}
              onMouseEnter={e => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)";
                }
              }}
            >
              <Icon
                className="h-4.5 w-4.5 shrink-0"
                style={{ color: active ? "#000" : "rgba(255,255,255,0.5)" }}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 pb-2 flex flex-col gap-0.5 border-t" style={{ borderColor: "rgba(255,255,255,0.15)", paddingTop: "8px" }}>
        {bottomItems.map(({ icon: Icon, label, href, gold }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-[15px] transition-all"
              style={{
                backgroundColor: active ? "#ffffff" : gold ? "rgba(234,179,8,0.08)" : "transparent",
                color: active ? "#0f1318" : gold ? "#fbbf24" : "rgba(255,255,255,0.75)",
                fontWeight: active ? 600 : 400,
              }}
              onMouseEnter={e => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = gold ? "rgba(234,179,8,0.15)" : "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLElement).style.color = gold ? "#fde68a" : "#fff";
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = gold ? "rgba(234,179,8,0.08)" : "transparent";
                  (e.currentTarget as HTMLElement).style.color = gold ? "#fbbf24" : "rgba(255,255,255,0.75)";
                }
              }}
            >
              <Icon
                className="h-4.5 w-4.5 shrink-0"
                style={{ color: active ? "#000" : gold ? "#fbbf24" : "rgba(255,255,255,0.5)" }}
              />
              {label}
            </Link>
          );
        })}

        {/* User + sign out */}
        <div className="mt-2 pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
          {user && (
            <div className="px-3 py-2 mb-1">
              <p className="text-xs font-semibold truncate" style={{ color: "rgba(255,255,255,0.9)" }}>
                {user.user_metadata.full_name ?? "Student"}
              </p>
              <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.35)" }}>
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
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#15191e" }}>
      {/* Desktop sidebar */}
      <div className="hidden md:flex h-full">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
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
          style={{ height: "65px", backgroundColor: "#15191e" }}
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
            <p className="text-xl font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>
              Hey {user?.user_metadata?.full_name?.split(" ")[0] ?? "Student"}!
            </p>
            {profile?.onboarding_completed && (
              <>
                <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
                <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.45)" }}>{profile.class}</span>
                <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
                <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.45)" }}>{profile.stream}</span>
              </>
            )}
          </div>

          {/* Stats chips — right */}
          <div className="flex items-center gap-3">
            {([
              { Icon: CalendarClock, text: `${examCountdown.days} days to ${examCountdown.label}`, color: "#60a5fa", onClick: undefined, isAchievements: false },
              { Icon: Flame,         text: String(streak),         color: "#fb923c", onClick: undefined, isAchievements: false },
              { Icon: Trophy,        text: "0",                    color: "#fbbf24", onClick: () => setAchievementsOpen(o => !o), isAchievements: true },
            ] as const).map(({ Icon, text, color, onClick, isAchievements }) => (
              <div
                key={text + color}
                onClick={onClick}
                className="flex items-center gap-2 px-3 py-2 rounded-xl transition-colors"
                style={{
                  backgroundColor: isAchievements && achievementsOpen ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)",
                  cursor: onClick ? "pointer" : "default",
                }}
              >
                <Icon className="h-4 w-4 shrink-0" style={{ color }} />
                <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main content — rounded top-left corner cuts into the sidebar bg */}
        <div
          className="flex-1 flex flex-col overflow-hidden"
          style={{ backgroundColor: "#1b2027", borderTopLeftRadius: "18px" }}
        >
          {/* Mobile top bar */}
          <header
            className="md:hidden flex items-center gap-3 px-4 h-14 border-b shrink-0"
            style={{ backgroundColor: "#1b2027", borderColor: "rgba(255,255,255,0.07)", borderTopLeftRadius: "18px" }}
          >
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 rounded-md cursor-pointer"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link href="/">
              <Image
                src="/logo-dark-mode.svg"
                alt="CompetitiveShiksha"
                width={120}
                height={32}
                className="h-8 w-auto"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/logo-white-mode.svg";
                }}
              />
            </Link>
          </header>

          {/* Page content */}
          <main
            className="flex-1 overflow-y-auto"
            style={{ color: "rgba(255,255,255,0.87)" }}
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
              style={{ width: "320px", backgroundColor: "#15191e", borderLeft: "1px solid rgba(255,255,255,0.08)" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <p className="font-bold text-base" style={{ color: "rgba(255,255,255,0.9)" }}>Achievements</p>
                <button
                  onClick={() => setAchievementsOpen(false)}
                  className="p-1.5 rounded-lg cursor-pointer transition-colors"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.07)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
                {([
                  { Icon: Target,   iconColor: "#f87171", title: "First Test",   desc: "Complete your first practice test",   earned: false },
                  { Icon: Flame,    iconColor: "#fb923c", title: "3 Day Streak", desc: "Study 3 days in a row",               earned: false },
                  { Icon: BookOpen, iconColor: "#60a5fa", title: "Note Taker",   desc: "Create your first note",              earned: false },
                  { Icon: Zap,      iconColor: "#facc15", title: "Speed Run",    desc: "Finish a test in under 30 minutes",   earned: false },
                  { Icon: Medal,    iconColor: "#a78bfa", title: "Top Scorer",   desc: "Score above 90% on any test",         earned: false },
                ] as const).map(({ Icon, iconColor, title, desc, earned }) => (
                  <div
                    key={title}
                    className="flex items-center gap-4 p-4 rounded-xl"
                    style={{
                      backgroundColor: earned ? "rgba(37,99,235,0.12)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${earned ? "rgba(37,99,235,0.3)" : "rgba(255,255,255,0.06)"}`,
                    }}
                  >
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-lg shrink-0"
                      style={{ backgroundColor: `${iconColor}18` }}
                    >
                      <Icon className="h-4.5 w-4.5" style={{ color: iconColor }} />
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.9)" }}>{title}</p>
                      <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{desc}</p>
                    </div>
                    {/* Checkmark box */}
                    <div
                      className="flex h-5 w-5 items-center justify-center rounded shrink-0"
                      style={{
                        border: `1.5px solid ${earned ? "#60a5fa" : "rgba(255,255,255,0.2)"}`,
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
                <p className="text-xs text-center mt-2" style={{ color: "rgba(255,255,255,0.2)" }}>More achievements coming soon</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
