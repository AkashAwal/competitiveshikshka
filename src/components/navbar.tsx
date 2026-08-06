"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Colleges", href: "/colleges" },
  { label: "Exams", href: "/exams" },
  { label: "Calculators", href: "/calculators" },
  { label: "Mentorship", href: "/mentorship" },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="w-full pl-[35px] pr-4 sm:pr-6 h-[64px] flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo_br_dark.png"
            alt="CompetitiveShiksha"
            width={200}
            height={265}
            className="h-[62px] w-auto"
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
                style={{ backgroundColor: isActive ? "#1c67f6" : "transparent" }}
                onMouseEnter={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.backgroundColor = "#1c67f6"; e.currentTarget.classList.remove("text-foreground"); e.currentTarget.classList.add("text-white"); } }}
                onMouseLeave={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; e.currentTarget.classList.remove("text-white"); e.currentTarget.classList.add("text-foreground"); } }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/mentorship/apply"
            className="btn-cta px-4 py-1.5 rounded-md text-sm font-semibold text-white"
          >
            Apply for Mentorship
          </Link>
        </div>

        <div className="flex items-center gap-1 md:hidden">
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
              style={pathname.startsWith(link.href) ? { backgroundColor: "#1c67f6" } : undefined}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/mentorship/apply"
            onClick={() => setMenuOpen(false)}
            className="btn-cta px-3 py-2 rounded-md text-sm font-semibold text-white text-center"
          >
            Apply for Mentorship
          </Link>
        </div>
      )}
    </header>
  );
}
