"use client";

import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  async function signInWithGoogle() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden" style={{ backgroundColor: "#15191e" }}>
      {/* Glow blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] opacity-25 pointer-events-none" style={{ background: "radial-gradient(ellipse at top left, #2563eb, transparent 70%)" }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-20 pointer-events-none" style={{ background: "radial-gradient(ellipse at bottom right, #7c3aed, transparent 70%)" }} />

      <div className="w-full max-w-sm flex flex-col items-center gap-8 relative z-10">

        <div
          className="w-full rounded-2xl p-8 flex flex-col gap-6"
          style={{ backgroundColor: "#1b2027", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="text-center">
            <h1 className="text-2xl font-black" style={{ color: "rgba(255,255,255,0.95)" }}>Sign in to continue</h1>
          </div>

          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors cursor-pointer"
            style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.9)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.1)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.06)"; }}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            By signing in you agree to our terms of service and privacy policy.
          </p>
        </div>

      </div>
    </div>
  );
}
