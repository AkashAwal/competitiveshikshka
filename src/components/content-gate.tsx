"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ContentGateProps {
  children: React.ReactNode;
  /** Number of px to show before the blur starts */
  previewHeight?: number;
}

export function ContentGate({ children, previewHeight = 320 }: ContentGateProps) {
  return (
    <div className="relative">
      <div style={{ maxHeight: previewHeight, overflow: "hidden" }}>
        {children}
      </div>

      {/* Blur gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent" />

      {/* Sign in prompt */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end pb-8 gap-4">
        <div className="flex items-center gap-2 text-zinc-500 text-sm">
          <Lock className="h-4 w-4" />
          Sign in to access the full content
        </div>
        <Link
          href="/login"
          className={cn(buttonVariants({ size: "lg" }))}
        >
          Get Started — it&apos;s free
        </Link>
      </div>
    </div>
  );
}
