"use client";

import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard") ?? false;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={isDashboard ? "dark" : "light"}
      enableSystem
    >
      {children}
    </ThemeProvider>
  );
}
