import { ApiError, apiGet, isApiConfigured } from "@/lib/api/client";
import { mockReviewsFor } from "@/lib/mock/reviews";
import type { StudioReview } from "@/types/review";

export interface StudioReviewsResult {
  reviews: StudioReview[];
  /** "mock" when no backend is configured — lets the UI stay honest. */
  source: "api" | "mock";
}

/**
 * Fetches written reviews for one studio.
 *
 * Endpoint: `GET /studios/:slug/reviews` → `StudioReview[]`, newest first.
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
 * Serves mock reviews only when no backend is configured. An empty list is a
 * real answer (the section shows its own empty state).
 */
export async function getReviews(
  studioSlug: string
): Promise<StudioReviewsResult> {
  if (!isApiConfigured()) {
    return { reviews: mockReviewsFor(studioSlug), source: "mock" };
  }

  return { reviews: await fetchReviews(studioSlug), source: "api" };
}
