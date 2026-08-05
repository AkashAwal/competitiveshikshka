"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const messages = [
  { text: "JEE Main 2026 cutoffs updated for 190+ colleges", href: "/colleges" },
  { text: "New NCERT solutions added weekly — free forever", href: "/ncert" },
  { text: "Get 1-on-1 mentorship from seniors at IITs & NITs", href: "/mentorship" },
];

export function PreHeader() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const message = messages[index];

  return (
    <div className="w-full bg-[#1c67f6] text-white text-xs sm:text-sm overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-center text-center">
        <Link
          key={index}
          href={message.href}
          className="font-medium hover:underline underline-offset-2 animate-preheader-slide"
        >
          {message.text}
        </Link>
      </div>
    </div>
  );
}
