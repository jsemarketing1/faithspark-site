"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) router.replace("/app/login");
  }, [user, router]);

  // user === undefined: still resolving auth state — render nothing rather
  // than flashing the login redirect for a signed-in visitor.
  if (user === undefined || user === null) return null;

  return <>{children}</>;
}
