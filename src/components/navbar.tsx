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
    <header className="sticky top-0 z-50 w-full border-b-[3px] border-black bg-white">
      <div className="w-full pl-[35px] pr-4 sm:pr-6 h-[68px] flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-white-mode.svg"
            alt="CompetitiveShiksha"
            width={200}
            height={265}
            className="h-[66px] w-auto"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-sm font-bold transition-all duration-150 cursor-pointer border-[2px]",
                pathname.startsWith(link.href)
                  ? "bg-primary text-white border-black [box-shadow:2px_2px_0_#000]"
                  : "text-foreground border-transparent hover:border-black hover:bg-accent hover:[box-shadow:2px_2px_0_#000]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            className="md:hidden p-2 rounded-lg border-[2px] border-black bg-white hover:bg-accent transition-all duration-150 cursor-pointer [box-shadow:2px_2px_0_#000] hover:[box-shadow:3px_3px_0_#000]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t-[3px] border-black bg-white px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "px-3.5 py-2.5 rounded-lg text-sm font-bold transition-all duration-150 cursor-pointer border-[2px]",
                pathname.startsWith(link.href)
                  ? "bg-primary text-white border-black [box-shadow:2px_2px_0_#000]"
                  : "text-foreground border-transparent hover:border-black hover:bg-accent"
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
