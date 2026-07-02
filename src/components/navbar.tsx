"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { ThemeToggle } from "@/components/theme-toggle";
import type { User } from "@supabase/supabase-js";

const navLinks = [
  { label: "NCERT", href: "/ncert" },
  { label: "PYQs", href: "/pyqs" },
  { label: "Colleges", href: "/colleges" },
  { label: "Exams", href: "/exams" },
  { label: "Calculators", href: "/calculators" },
  { label: "Mentorship", href: "/mentorship" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();

    async function loadAdminFlag(userId: string) {
      const { data } = await supabase.from("profiles").select("is_admin").eq("id", userId).single();
      setIsAdmin(data?.is_admin ?? false);
    }

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) loadAdminFlag(data.user.id);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      if (session?.user) loadAdminFlag(session.user.id);
      else setIsAdmin(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="w-full pl-[35px] pr-4 sm:pr-6 h-[64px] flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo_br_dark.png"
            alt="CompetitiveShiksha"
            width={200}
            height={265}
            className="h-[62px] w-auto dark:hidden"
            priority
          />
          <Image
            src="/logo_br_light.png"
            alt="CompetitiveShiksha"
            width={200}
            height={265}
            className="hidden h-[62px] w-auto dark:block"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-semibold transition-all cursor-pointer",
                  isActive ? "text-white" : "text-foreground"
                )}
                style={{ backgroundColor: isActive ? "#2563eb" : "transparent" }}
                onMouseEnter={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.backgroundColor = "#2563eb"; e.currentTarget.classList.remove("text-foreground"); e.currentTarget.classList.add("text-white"); } }}
                onMouseLeave={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; e.currentTarget.classList.remove("text-white"); e.currentTarget.classList.add("text-foreground"); } }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="cursor-pointer rounded-full focus:outline-none flex items-center"
                >
                  {user.user_metadata.avatar_url ? (
                    <Image
                      src={user.user_metadata.avatar_url}
                      alt={user.user_metadata.full_name ?? "Profile"}
                      width={34}
                      height={34}
                      className="rounded-full border-2 border-border hover:border-[#2563eb] transition-colors"
                    />
                  ) : (
                    <div className="h-[34px] w-[34px] rounded-full bg-[#2563eb] flex items-center justify-center text-white text-sm font-bold">
                      {user.email?.[0].toUpperCase()}
                    </div>
                  )}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-xl border border-border bg-popover shadow-lg py-1 z-50">
                    <div className="px-4 py-2.5 border-b border-border">
                      <p className="text-sm font-semibold text-foreground truncate">{user.user_metadata.full_name ?? "Student"}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-foreground/80 hover:bg-accent transition-colors"
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/dashboard/todo"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-foreground/80 hover:bg-accent transition-colors"
                    >
                      To Do List
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-foreground/80 hover:bg-accent transition-colors"
                    >
                      Settings
                    </Link>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-1.5 px-4 py-2 text-sm text-foreground/80 hover:bg-accent transition-colors"
                      >
                        <ShieldCheck className="h-3.5 w-3.5 text-[#2563eb]" />
                        Admin
                      </Link>
                    )}
                    <div className="border-t border-border mt-1 pt-1">
                      <button
                        onClick={signOut}
                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/dashboard"
                className="px-4 py-1.5 rounded-md text-sm font-semibold text-white transition-colors hover:bg-zinc-900"
                style={{ backgroundColor: "#2563eb" }}
              >
                Dashboard
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="px-4 py-1.5 rounded-md text-sm font-semibold text-white transition-colors"
              style={{ backgroundColor: "#2563eb" }}
            >
              Login
            </Link>
          )}
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            className="p-2 rounded-md hover:bg-accent transition-colors cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-semibold transition-colors cursor-pointer",
                pathname.startsWith(link.href)
                  ? "text-white"
                  : "text-foreground hover:bg-accent"
              )}
              style={pathname.startsWith(link.href) ? { backgroundColor: "#2563eb" } : undefined}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="px-3 py-2 rounded-md text-sm font-semibold text-foreground hover:bg-accent">Dashboard</Link>
              <Link href="/dashboard/profile" onClick={() => setMenuOpen(false)} className="px-3 py-2 rounded-md text-sm font-semibold text-foreground/80 hover:bg-accent">My Profile</Link>
              <Link href="/dashboard/settings" onClick={() => setMenuOpen(false)} className="px-3 py-2 rounded-md text-sm font-semibold text-foreground/80 hover:bg-accent">Settings</Link>
              {isAdmin && (
                <Link href="/admin" onClick={() => setMenuOpen(false)} className="px-3 py-2 rounded-md text-sm font-semibold text-foreground/80 hover:bg-accent">Admin</Link>
              )}
              <button onClick={signOut} className="text-left px-3 py-2 rounded-md text-sm font-semibold text-red-500 hover:bg-red-50 cursor-pointer">Sign out</button>
            </>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)} className="px-3 py-2 rounded-md text-sm font-semibold text-white" style={{ backgroundColor: "#2563eb" }}>Login</Link>
          )}
        </div>
      )}
    </header>
  );
}
