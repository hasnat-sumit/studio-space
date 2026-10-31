/**
 * Tiny fetch wrapper shared by every backend call.
 *
 * The API base URL comes from `NEXT_PUBLIC_API_URL` (no trailing slash), e.g.
 * `https://api.studiospace.io/v1`. When it is not configured, requests fail
 * fast with an `ApiError` so callers can fall back to mock data.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status = 0) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export function isApiConfigured(): boolean {
  return Boolean(API_BASE_URL);
}

export async function apiGet<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  if (!API_BASE_URL) {
    throw new ApiError(
      "API base URL is not configured (NEXT_PUBLIC_API_URL is unset)."
    );
  }

  const url = `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

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
