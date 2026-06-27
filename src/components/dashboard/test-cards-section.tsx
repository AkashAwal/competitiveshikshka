"use client";

import { useState } from "react";
import { FileText, ClipboardList, ChevronRight } from "lucide-react";

const PAGE_BG = "#1b2027";

function TestCard({
  icon: Icon,
  title,
  badge,
  badgeColor,
  iconColor,
  colorA,
  colorB,
}: {
  icon: React.ElementType;
  title: string;
  badge: string;
  badgeColor: string;
  iconColor: string;
  colorA: string;
  colorB: string;
}) {
  const [hovered, setHovered] = useState(false);

  const maskStyle = {
    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor" as const,
    maskComposite: "exclude" as const,
    padding: "1px",
  };

  return (
    <div
      className="relative rounded-2xl cursor-pointer"
      style={{ padding: "1px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left-concentrated gradient — visible when inactive */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `linear-gradient(90deg, ${colorA} 0%, ${colorB} 40%, transparent 100%)`,
          ...maskStyle,
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Right-concentrated gradient — visible on hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${colorA} 60%, ${colorB} 100%)`,
          ...maskStyle,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Inner card */}
      <div
        className="relative flex items-center gap-3 px-5 py-4 rounded-[15px]"
        style={{ backgroundColor: PAGE_BG }}
      >
        <Icon className="h-5 w-5 shrink-0" style={{ color: iconColor }} />
        <p className="text-sm font-bold flex-1" style={{ color: "rgba(255,255,255,0.9)" }}>
          {title}
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className="text-[10px] font-black px-2 py-0.5 rounded-full"
            style={{ backgroundColor: badgeColor, color: "#fff" }}
          >
            {badge}
          </span>
          <ChevronRight className="h-4 w-4" style={{ color: "rgba(255,255,255,0.3)" }} />
        </div>
      </div>
    </div>
  );
}

export function TestCardsSection() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <TestCard
        icon={FileText}
        title="PYQ Mock Tests"
        badge="NEW"
        badgeColor="#ec4899"
        iconColor="#ec4899"
        colorA="#ec4899"
        colorB="#f97316"
      />
      <TestCard
        icon={ClipboardList}
        title="Create Your Own Test"
        badge="BETA"
        badgeColor="#06b6d4"
        iconColor="#06b6d4"
        colorA="#06b6d4"
        colorB="#3b82f6"
      />
    </div>
  );
}
