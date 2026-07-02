"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Bell, Check } from "lucide-react";

interface Props {
  icon: ReactNode;
  title: string;
  description: string;
  storageKey: string;
  accent?: string;
}

export function ComingSoon({ icon, title, description, storageKey, accent = "#60a5fa" }: Props) {
  const [notified, setNotified] = useState(false);

  useEffect(() => {
    try {
      setNotified(localStorage.getItem(storageKey) === "1");
    } catch { /* noop */ }
  }, [storageKey]);

  function notify() {
    try {
      localStorage.setItem(storageKey, "1");
    } catch { /* noop */ }
    setNotified(true);
  }

  return (
    <div
      className="rounded-xl p-10 flex flex-col items-center justify-center text-center gap-4"
      style={{ background: "var(--surface-card)", border: "1px solid rgba(var(--fg-rgb),0.13)", minHeight: "300px" }}
    >
      <span
        className="flex h-14 w-14 items-center justify-center rounded-2xl"
        style={{ backgroundColor: `${accent}18`, color: accent }}
      >
        {icon}
      </span>
      <div>
        <p className="text-lg font-black" style={{ color: "rgba(var(--fg-rgb),0.9)" }}>{title}</p>
        <p className="text-sm mt-1 max-w-sm" style={{ color: "rgba(var(--fg-rgb),0.4)" }}>{description}</p>
      </div>
      <button
        onClick={notify}
        disabled={notified}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-opacity cursor-pointer disabled:cursor-default"
        style={{
          backgroundColor: notified ? "rgba(52,211,153,0.1)" : `${accent}18`,
          color: notified ? "#34d399" : accent,
        }}
      >
        {notified ? <Check className="h-3.5 w-3.5" /> : <Bell className="h-3.5 w-3.5" />}
        {notified ? "We'll let you know" : "Notify me when it's ready"}
      </button>
    </div>
  );
}
