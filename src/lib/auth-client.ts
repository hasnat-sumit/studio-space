import { createAuthClient } from "better-auth/react";
import { API_BASE_URL } from "@/lib/api/client";

/** Better Auth client. The handler lives on the API, at `<API_BASE_URL>/auth`. */
export const authClient = createAuthClient({
  baseURL: API_BASE_URL ? `${API_BASE_URL}/auth` : undefined,
});

/**
 * Only same-site paths may be used as a post-login destination, so a crafted
 * `?next=https://evil.example` link can't bounce a user off the site.
 */
export function safeNextPath(next: string | null): string {
  if (next && next.startsWith("/") && !next.startsWith("//") && !next.includes("\\")) {
    return next;
  }
  return "/dashboard";
}
