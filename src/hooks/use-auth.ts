"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import type { SessionUser } from "@/types/auth";

/**
 * Placeholder mock authentication state — there is no real session yet.
 *
 * When Better Auth is implemented later, replace the internals of this hook
 * (e.g. with `authClient.useSession()`) but keep the returned `AuthState`
 * shape: the navbar and the rest of the UI only depend on that contract.
 */
const MOCK_USER: SessionUser = {
  id: "user_demo_01",
  name: "Aria Vale",
  email: "aria.vale@studiospace.io",
  image: null,
};

/** Set to `false` to preview the logged-out navbar without touching any UI code. */
const MOCK_SIGNED_IN = true;

export interface AuthState {
  user: SessionUser | null;
  isAuthenticated: boolean;
  logout: () => void;
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<SessionUser | null>(
    MOCK_SIGNED_IN ? MOCK_USER : null
  );

  const logout = useCallback(() => {
    // Replace with Better Auth's signOut() when authentication is implemented.
    setUser(null);
    toast.success("Signed out", {
      description:
        "This session is mocked while authentication is under construction.",
    });
  }, []);

  return { user, isAuthenticated: user !== null, logout };
}
