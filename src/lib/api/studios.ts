import { ApiError, apiGet, isApiConfigured } from "@/lib/api/client";
import { MOCK_STUDIOS, mockFeaturedStudios } from "@/lib/mock/studios";
import type { Studio } from "@/types/studio";

export interface FeaturedStudiosResult {
  studios: Studio[];
  /** "mock" while the backend is unavailable — lets the UI stay honest. */
  source: "api" | "mock";
}

/**
 * Fetches the highest-rated studios from the backend.
 *
 * Expected endpoint: `GET /studios/featured?limit=6` → `Studio[]`, already
 * sorted by rating. Sorting defensively on the client keeps the contract safe
 * even if the backend changes order.
 */
export async function fetchFeaturedStudios(limit = 6): Promise<Studio[]> {
  const studios = await apiGet<Studio[]>(`/studios/featured?limit=${limit}`);

  if (!Array.isArray(studios)) {
    throw new ApiError("Unexpected API response: expected an array of studios.");
  }

  return [...studios]
    .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
    .slice(0, limit);
}

/**
 * App-facing entry point for the homepage.
 *
 * Never throws for ordinary API problems: when the backend is unconfigured or
 * unreachable, it silently serves the mock data from `src/lib/mock/studios.ts`
 * so the homepage always renders. An empty `api` response stays empty — that
 * is a real answer, and the UI shows its empty state.
 */
export async function getFeaturedStudios(
  limit = 6
): Promise<FeaturedStudiosResult> {
  if (!isApiConfigured()) {
    return { studios: mockFeaturedStudios(limit), source: "mock" };
  }

  try {
    const studios = await fetchFeaturedStudios(limit);
    return { studios, source: "api" };
  } catch (error) {
    console.warn("[studios] API unavailable, serving mock data.", error);
    return { studios: mockFeaturedStudios(limit), source: "mock" };
  }
}

export interface StudiosResult {
  studios: Studio[];
  /** Total number of listings in the catalogue. */
  total: number;
  /** "mock" while the backend is unavailable — lets the UI stay honest. */
  source: "api" | "mock";
}

/**
 * Fetches the full catalogue from the backend, unfiltered.
 *
 * Expected endpoint: `GET /studios` → `Studio[]`. Until the API supports
 * query strings, the Explore page filters, sorts, and pages client-side with
 * the pure helpers in `src/lib/studio-query.ts` — the same params (`q`,
 * `category`, `price`, `capacity`, `sort`) are ready to hand over later.
 */
export async function fetchStudios(): Promise<Studio[]> {
  const studios = await apiGet<Studio[]>("/studios");

  if (!Array.isArray(studios)) {
    throw new ApiError("Unexpected API response: expected an array of studios.");
  }

  return studios;
}

/**
 * App-facing entry point for the Explore Studios page (`/studios`).
 *
 * Mirrors `getFeaturedStudios`: falls back to the mock catalogue when the
 * backend is unconfigured or unreachable, and only throws for callers that
 * opt into rendering an error state (the route's `error.tsx`).
 */
export async function getStudios(): Promise<StudiosResult> {
  if (!isApiConfigured()) {
    return {
      studios: [...MOCK_STUDIOS],
      total: MOCK_STUDIOS.length,
      source: "mock",
    };
  }

  try {
    const studios = await fetchStudios();
    return { studios, total: studios.length, source: "api" };
  } catch (error) {
    console.warn("[studios] API unavailable, serving mock data.", error);
    return {
      studios: [...MOCK_STUDIOS],
      total: MOCK_STUDIOS.length,
      source: "mock",
    };
  }
}

/**
 * Fetches one studio by its id or slug.
 *
 * Expected endpoint: `GET /studios/:idOrSlug` → `Studio`.
 */
export async function fetchStudio(idOrSlug: string): Promise<Studio> {
  const studio = await apiGet<Studio>(
    `/studios/${encodeURIComponent(idOrSlug)}`
  );

  if (!studio || typeof studio !== "object" || Array.isArray(studio)) {
    throw new ApiError("Unexpected API response: expected a studio object.");
  }

  return studio;
}

/**
 * App-facing entry point for the studio details page.
 *
 * Returns `null` when the studio doesn't exist (both for a missing mock
 * record and for a backend 404) so the page can render its Not Found state.
 */
export async function getStudio(idOrSlug: string): Promise<Studio | null> {
  const findMock = () =>
    MOCK_STUDIOS.find(
      (studio) => studio.slug === idOrSlug || studio.id === idOrSlug
    ) ?? null;

  if (!isApiConfigured()) {
    return findMock();
  }

  try {
    return await fetchStudio(idOrSlug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }
    console.warn("[studios] API unavailable, serving mock data.", error);
    return findMock();
  }
}
