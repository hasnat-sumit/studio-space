"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import type { SessionUser } from "@/types/auth";

export interface AuthState {
  user: SessionUser | null;
  isAuthenticated: boolean;
  /** True until the first session check finishes; don't redirect before then. */
  isPending: boolean;
  logout: () => void;
  /**
   * Re-reads the session and settles once the store is updated. Await it after
   * signing in, before navigating, or the dashboard guard sees no user yet.
   */
  refresh: () => Promise<void>;
}

export function useAuth(): AuthState {
  const { data, isPending, refetch } = authClient.useSession();

  const logout = useCallback(() => {
    void authClient.signOut().then(({ error }) => {
      if (error) {
        toast.error("Couldn't sign you out", {
          description: error.message ?? "Please try again.",
        });
        return;
      }
      toast.success("Signed out");
    });
  }, []);

  const refresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const user: SessionUser | null = data?.user
    ? {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        image: data.user.image ?? null,
      }
    : null;

  return { user, isAuthenticated: user !== null, isPending, logout, refresh };
}
