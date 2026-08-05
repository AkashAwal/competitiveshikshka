"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const messages = [
  { text: "JEE Main 2026 cutoffs updated for 190+ colleges", href: "/colleges" },
  { text: "New NCERT solutions added weekly — free forever", href: "/ncert" },
  { text: "Get 1-on-1 mentorship from seniors at IITs & NITs", href: "/mentorship" },
];

const DISMISS_KEY = "cs-preheader-dismissed";

export function PreHeader() {
  const [dismissed, setDismissed] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDismissed(sessionStorage.getItem(DISMISS_KEY) === "1");
  }, []);

  useEffect(() => {
    if (dismissed) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 4000);
    return () => clearInterval(id);
  }, [dismissed]);

  if (dismissed) return null;

  function dismiss() {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setDismissed(true);
  }

  const message = messages[index];

  return (
    <div className="relative w-full bg-[#1c67f6] text-white text-xs sm:text-sm">
      <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-center gap-2 text-center">
        <Link href={message.href} className="font-medium hover:underline underline-offset-2">
          {message.text}
        </Link>
      </div>
      <button
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-white/15 transition-colors cursor-pointer"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
