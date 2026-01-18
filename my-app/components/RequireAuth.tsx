"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;

    const run = async () => {
      const supabase = await createClient(); // ✅ await in case it's async

      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("getSession error:", error.message);
      }

      if (!data?.session) {
        router.replace("/auth/login");
        return;
      }

      if (alive) setReady(true);
    };

    run();

    return () => {
      alive = false;
    };
  }, [router]);

  if (!ready) return null;
  return <>{children}</>;
}
