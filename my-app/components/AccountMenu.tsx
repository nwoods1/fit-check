"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type UserInfo = {
  email?: string | null;
};

export default function AccountMenu() {
  const supabase = createClient();
  const router = useRouter();

  const [user, setUser] = useState<UserInfo | null>(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Load user + keep in sync when auth changes
  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getUser();
      setUser({ email: data.user?.email });
    };
    load();

    const { data: sub } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setUser({ email: session?.user?.email ?? null });
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, [supabase]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setOpen(false);
    router.replace("/auth/login");
  };

  // ✅ Hide entirely if not logged in
  if (!user?.email) return null;

  const label = user.email.length > 22 ? `${user.email.slice(0, 22)}…` : user.email;

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm text-foreground hover:bg-muted"
      >
        <span className="h-2 w-2 rounded-full bg-green-400" />
        <span className="max-w-[180px] truncate">{label}</span>
        <span className="text-muted-foreground">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
          <button
            onClick={() => {
              setOpen(false);
              router.push("/account"); // optional route you can create later
            }}
            className="w-full px-4 py-3 text-left text-sm text-foreground hover:bg-muted"
          >
            Account
          </button>

          <button
            onClick={handleSignOut}
            className="w-full px-4 py-3 text-left text-sm text-red-500 hover:bg-muted"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
