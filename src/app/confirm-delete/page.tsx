"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Trash2, ShieldAlert } from "lucide-react";

function ConfirmDeleteContent() {
  const router = useRouter();
  const params = useSearchParams();
  const [status, setStatus] = useState<"verifying" | "ready" | "deleting" | "error">("verifying");
  const [error, setError] = useState("");

  useEffect(() => {
    async function verify() {
      const supabase = createClient();
      const tokenHash = params.get("token_hash");
      const type = params.get("type") as "magiclink" | "email" | null;

      if (!tokenHash || !type) {
        setError("Invalid or missing confirmation link.");
        setStatus("error");
        return;
      }

      const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: type === "magiclink" ? "magiclink" : "email" });
      if (error) {
        setError(error.message);
        setStatus("error");
        return;
      }

      setStatus("ready");
    }
    verify();
  }, [params]);

  async function deleteAccount() {
    setStatus("deleting");
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("profiles").delete().eq("id", user.id);
    }
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: "#1b2027" }}>
      <div className="w-full max-w-sm flex flex-col items-center gap-6 text-center">

        {status === "verifying" && (
          <>
            <div className="h-12 w-12 rounded-full flex items-center justify-center animate-pulse" style={{ backgroundColor: "rgba(239,68,68,0.1)" }}>
              <ShieldAlert className="h-6 w-6" style={{ color: "#f87171" }} />
            </div>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Verifying your link…</p>
          </>
        )}

        {status === "ready" && (
          <>
            <div className="h-14 w-14 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <Trash2 className="h-7 w-7" style={{ color: "#f87171" }} />
            </div>
            <div>
              <p className="text-xl font-black" style={{ color: "rgba(255,255,255,0.95)" }}>Delete your account?</p>
              <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.45)" }}>
                This will permanently delete your profile, progress, and all data. This action cannot be undone.
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={deleteAccount}
                className="w-full py-3 rounded-xl font-black text-sm cursor-pointer"
                style={{ backgroundColor: "#ef4444", color: "#fff" }}
              >
                Yes, permanently delete my account
              </button>
              <button
                onClick={() => router.push("/dashboard/profile")}
                className="w-full py-3 rounded-xl font-semibold text-sm cursor-pointer"
                style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)" }}
              >
                Cancel, keep my account
              </button>
            </div>
          </>
        )}

        {status === "deleting" && (
          <>
            <div className="h-12 w-12 rounded-full flex items-center justify-center animate-pulse" style={{ backgroundColor: "rgba(239,68,68,0.1)" }}>
              <Trash2 className="h-6 w-6" style={{ color: "#f87171" }} />
            </div>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Deleting your account…</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(239,68,68,0.1)" }}>
              <ShieldAlert className="h-6 w-6" style={{ color: "#f87171" }} />
            </div>
            <div>
              <p className="text-lg font-black" style={{ color: "rgba(255,255,255,0.9)" }}>Link invalid or expired</p>
              <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{error}</p>
            </div>
            <button
              onClick={() => router.push("/dashboard/profile")}
              className="px-6 py-2.5 rounded-xl text-sm font-bold cursor-pointer"
              style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}
            >
              Go back to profile
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default function ConfirmDeletePage() {
  return (
    <Suspense>
      <ConfirmDeleteContent />
    </Suspense>
  );
}
