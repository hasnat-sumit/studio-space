import { ApiError, apiGet, isApiConfigured } from "@/lib/api/client";
import { mockFeaturedStudios } from "@/lib/mock/studios";
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
