"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-3 z-50 px-3">
      <div
        className={cn(
          "border-[3px] border-primary/20 bg-white/95 backdrop-blur-md",
          "[box-shadow:inset_-1px_-2px_6px_rgba(0,0,0,0.05),_4px_8px_24px_rgba(232,97,26,0.13)]",
          menuOpen ? "rounded-t-3xl" : "rounded-3xl"
        )}
      >
        <div className="pl-[35px] pr-4 sm:pr-6 h-[66px] flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-white-mode.svg"
              alt="CompetitiveShiksha"
              width={200}
              height={265}
              className="h-[68px] w-auto"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-1.5 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer",
                  pathname.startsWith(link.href)
                    ? "text-primary bg-primary/10 border-[2px] border-primary/25 [box-shadow:inset_-1px_-2px_4px_rgba(0,0,0,0.05),_2px_3px_8px_rgba(232,97,26,0.15)]"
                    : "text-muted-foreground border-[2px] border-transparent hover:text-foreground hover:bg-accent hover:border-primary/15"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              className="md:hidden p-2 rounded-2xl border-[2px] border-primary/20 hover:bg-accent transition-all duration-200 cursor-pointer [box-shadow:inset_-1px_-2px_4px_rgba(0,0,0,0.05),_2px_3px_8px_rgba(232,97,26,0.10)]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-[3px] border-t-0 border-primary/20 bg-white/95 rounded-b-3xl px-4 py-3 flex flex-col gap-1 [box-shadow:0_8px_24px_rgba(232,97,26,0.12)]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "px-3.5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer",
                pathname.startsWith(link.href)
                  ? "text-primary bg-primary/10 border-[2px] border-primary/25"
                  : "text-muted-foreground border-[2px] border-transparent hover:text-foreground hover:bg-accent hover:border-primary/15"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
