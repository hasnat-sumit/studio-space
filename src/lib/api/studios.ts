import { ApiError, apiGet, isApiConfigured } from "@/lib/api/client";
import { MOCK_STUDIOS, mockFeaturedStudios } from "@/lib/mock/studios";
import type { Studio } from "@/types/studio";

export interface FeaturedStudiosResult {
  studios: Studio[];
  /** "mock" when no backend is configured — lets the UI stay honest. */
  source: "api" | "mock";
}

/**
 * Fetches the highest-rated studios from the backend.
 *
 * Endpoint: `GET /studios/featured?limit=6` → `Studio[]`, already sorted by
 * rating. Sorting defensively on the client keeps the contract safe even if the
 * backend changes order.
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
 * Serves `src/lib/mock/studios.ts` only when no backend is configured. Once one
 * is, failures throw (the section renders its error state): falling back would
 * show listings that can't actually be booked. An empty `api` response stays
 * empty — that is a real answer, and the UI shows its empty state.
 */
export async function getFeaturedStudios(
  limit = 6
): Promise<FeaturedStudiosResult> {
  if (!isApiConfigured()) {
    return { studios: mockFeaturedStudios(limit), source: "mock" };
  }

  return { studios: await fetchFeaturedStudios(limit), source: "api" };
}

export interface StudiosResult {
  studios: Studio[];
  /** Total number of listings in the catalogue. */
  total: number;
  /** "mock" when no backend is configured — lets the UI stay honest. */
  source: "api" | "mock";
}

/**
 * Fetches the catalogue from the backend, unfiltered.
 *
 * Endpoint: `GET /studios` → `Studio[]`. The Explore page filters, sorts, and
 * pages client-side with the pure helpers in `src/lib/studio-query.ts`.
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
 * Mirrors `getFeaturedStudios`: mock catalogue when no backend is configured,
 * otherwise failures reach the route's `error.tsx`.
 */
export async function getStudios(): Promise<StudiosResult> {
  if (!isApiConfigured()) {
    return {
      studios: [...MOCK_STUDIOS],
      total: MOCK_STUDIOS.length,
      source: "mock",
    };
  }

  const studios = await fetchStudios();
  return { studios, total: studios.length, source: "api" };
}

/**
 * Fetches one studio by its id or slug.
 *
 * Endpoint: `GET /studios/:idOrSlug` → `Studio`.
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
 * Other API failures reach the route's `error.tsx`.
 */
export async function getStudio(idOrSlug: string): Promise<Studio | null> {
  if (!isApiConfigured()) {
    return (
      MOCK_STUDIOS.find(
        (studio) => studio.slug === idOrSlug || studio.id === idOrSlug
      ) ?? null
    );
  }

  try {
    return await fetchStudio(idOrSlug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }
    throw error;
  }
}
