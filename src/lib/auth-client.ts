import { createAuthClient } from "better-auth/react";
import { API_BASE_URL } from "@/lib/api/client";

/**
 * Better Auth rethrows network failures instead of returning `{ error }`, which
 * would skip every caller's error toast and leave its form stuck on "submitting".
 * Report them as a failed response so they all take the normal error path.
 */
async function fetchWithNetworkError(
  input: string | URL | Request,
  init?: RequestInit
): Promise<Response> {
  try {
    return await fetch(input, init);
  } catch {
    return Response.json(
      {
        message:
          "We couldn't reach StudioSpace. Check your connection and try again.",
      },
      { status: 503 }
    );
  }
}

/** Better Auth client. The handler lives on the API, at `<API_BASE_URL>/auth`. */
export const authClient = createAuthClient({
  baseURL: API_BASE_URL ? `${API_BASE_URL}/auth` : undefined,
  fetchOptions: { customFetchImpl: fetchWithNetworkError },
});

/**
 * Only same-site paths may be used as a post-login destination, so a crafted
 * `?next=https://evil.example` link can't bounce a user off the site.
 */
export function safeNextPath(next: string | null): string {
  if (next && next.startsWith("/") && !next.startsWith("//") && !next.includes("\\")) {
    return next;
  }
  return "/";
}
