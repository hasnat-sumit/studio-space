/**
 * Tiny fetch wrapper shared by every backend call.
 *
 * The API base URL comes from `NEXT_PUBLIC_API_URL` (no trailing slash), e.g.
 * `http://localhost:5000/api`. When it is not configured, requests fail fast
 * with an `ApiError` so public pages can fall back to mock data.
 *
 * The server calls it directly. The browser goes through this site's own `/api`
 * (rewritten in `next.config.ts`) so the session cookie stays first-party. That
 * URL must be absolute because Better Auth rejects relative ones.
 */

const CONFIGURED_API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

export const API_BASE_URL =
  CONFIGURED_API_URL && typeof window !== "undefined"
    ? `${window.location.origin}/api`
    : CONFIGURED_API_URL;

export type FieldErrors = Record<string, string[] | undefined>;

export class ApiError extends Error {
  readonly status: number;
  /** Per-field messages from the API's validation errors, keyed by field name. */
  readonly fieldErrors: FieldErrors;

  constructor(message: string, status = 0, fieldErrors: FieldErrors = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

export function isApiConfigured(): boolean {
  return Boolean(API_BASE_URL);
}

function apiUrl(path: string): string {
  if (!API_BASE_URL) {
    throw new ApiError(
      "API base URL is not configured (NEXT_PUBLIC_API_URL is unset)."
    );
  }
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function apiGet<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const url = apiUrl(path);

  let response: Response;
  try {
    response = await fetch(url, {
      ...init,
      headers: {
        accept: "application/json",
        ...(init?.headers ?? {}),
      },
    });
  } catch {
    throw new ApiError(`Could not reach the API at ${url}.`);
  }

  if (!response.ok) {
    throw new ApiError(
      `Request to ${url} failed with status ${response.status}.`,
      response.status
    );
  }

  return (await response.json()) as T;
}

/**
 * Authenticated request from the browser: sends the session cookie and surfaces
 * the API's own error message, so forms can show it as written.
 */
export async function apiRequest<T>(
  path: string,
  options: { method?: "GET" | "POST" | "PATCH" | "DELETE"; body?: unknown } = {}
): Promise<T> {
  const url = apiUrl(path);

  let response: Response;
  try {
    response = await fetch(url, {
      method: options.method ?? "GET",
      credentials: "include",
      headers: {
        accept: "application/json",
        ...(options.body !== undefined
          ? { "content-type": "application/json" }
          : {}),
      },
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    });
  } catch {
    throw new ApiError(
      "We couldn't reach StudioSpace. Check your connection and try again."
    );
  }

  if (response.status === 204) return undefined as T;

  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const error = (payload ?? {}) as {
      message?: string;
      details?: { fieldErrors?: FieldErrors };
    };
    throw new ApiError(
      error.message ?? "Something went wrong. Please try again.",
      response.status,
      error.details?.fieldErrors ?? {}
    );
  }

  return payload as T;
}
