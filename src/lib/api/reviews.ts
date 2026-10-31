import { ApiError, apiGet, isApiConfigured } from "@/lib/api/client";
import { mockReviewsFor } from "@/lib/mock/reviews";
import type { StudioReview } from "@/types/review";

export interface StudioReviewsResult {
  reviews: StudioReview[];
  /** "mock" while the backend is unavailable — lets the UI stay honest. */
  source: "api" | "mock";
}

/**
 * Fetches written reviews for one studio.
 *
 * Expected endpoint: `GET /studios/:slug/reviews` → `StudioReview[]`,
 * newest first.
 */
export async function fetchReviews(studioSlug: string): Promise<StudioReview[]> {
  const reviews = await apiGet<StudioReview[]>(
    `/studios/${encodeURIComponent(studioSlug)}/reviews`
  );

  if (!Array.isArray(reviews)) {
    throw new ApiError(
      "Unexpected API response: expected an array of reviews."
    );
  }

  return reviews;
}

/**
 * App-facing entry point for the studio details page's reviews section.
 *
 * Never throws: falls back to the mock reviews while the backend is
 * unconfigured or unreachable. An empty list is a real answer (the section
 * shows its own empty state).
 */
export async function getReviews(
  studioSlug: string
): Promise<StudioReviewsResult> {
  if (!isApiConfigured()) {
    return { reviews: mockReviewsFor(studioSlug), source: "mock" };
  }

  try {
    return { reviews: await fetchReviews(studioSlug), source: "api" };
  } catch (error) {
    console.warn("[reviews] API unavailable, serving mock data.", error);
    return { reviews: mockReviewsFor(studioSlug), source: "mock" };
  }
}
