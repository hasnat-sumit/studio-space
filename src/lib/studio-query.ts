import { STUDIO_CATEGORIES } from "@/lib/categories";
import type {
  Studio,
  StudioCapacityFilter,
  StudioCategory,
  StudioPriceBand,
  StudioQuery,
  StudioSort,
} from "@/types/studio";

/**
 * Pure, framework-free query logic for the Explore Studios page.
 *
 * Parsing, filtering, and sorting all live here (not in components) so the
 * exact same functions can later be swapped for `GET /studios?...` calls once
 * the Express API does the work server-side.
 */

/** Applied whenever the URL doesn't ask for another sort. */
export const DEFAULT_STUDIO_SORT: StudioSort = "rating";

export interface StudioSortOption {
  value: StudioSort;
  label: string;
}

export const STUDIO_SORT_OPTIONS: readonly StudioSortOption[] = [
  { value: "rating", label: "Highest rated" },
  { value: "price-asc", label: "Lowest price" },
  { value: "price-desc", label: "Highest price" },
  { value: "newest", label: "Newest" },
];

export interface StudioPriceBandOption {
  value: StudioPriceBand;
  label: string;
  /** Inclusive hourly-rate bounds; `undefined` means unbounded. */
  min?: number;
  max?: number;
}

export const PRICE_BAND_OPTIONS: readonly StudioPriceBandOption[] = [
  { value: "any", label: "Any price" },
  { value: "under-50", label: "Under $50/hr", max: 49 },
  { value: "50-74", label: "$50–$74/hr", min: 50, max: 74 },
  { value: "75-99", label: "$75–$99/hr", min: 75, max: 99 },
  { value: "100-plus", label: "$100+/hr", min: 100 },
];

export interface StudioCapacityOption {
  value: StudioCapacityFilter;
  label: string;
}

export const CAPACITY_OPTIONS: readonly StudioCapacityOption[] = [
  { value: "any", label: "Any capacity" },
  { value: "6", label: "Seats 6+" },
  { value: "8", label: "Seats 8+" },
  { value: "12", label: "Seats 12+" },
  { value: "20", label: "Seats 20+" },
];

/** Select value meaning "no restriction" (query stores `undefined` instead). */
export const UNFILTERED = "any";

const CATEGORY_SLUGS = new Set<string>(
  STUDIO_CATEGORIES.map((category) => category.slug)
);
const PRICE_BANDS = new Set<string>(PRICE_BAND_OPTIONS.map((option) => option.value));
const CAPACITY_VALUES = new Set<string>(
  CAPACITY_OPTIONS.map((option) => option.value)
);
const SORT_VALUES = new Set<string>(STUDIO_SORT_OPTIONS.map((option) => option.value));

/** First value of a search-param entry (Next hands back `string[]` for repeats). */
function firstParam(value: string | string[] | undefined): string | undefined {
  const single = Array.isArray(value) ? value[0] : value;
  const trimmed = single?.trim();
  return trimmed ? trimmed : undefined;
}

/**
 * Reads `?q=&category=&price=&capacity=&sort=` into a sanitized `StudioQuery`.
 *
 * Unknown or malformed values are dropped rather than trusted, so a hand-
 * edited URL can never reach the filter logic in an unexpected shape.
 */
export function parseStudioQuery(
  params: Record<string, string | string[] | undefined>
): StudioQuery {
  const query: StudioQuery = {};

  const q = firstParam(params.q)?.slice(0, 80);
  if (q) {
    query.q = q;
  }

  const category = firstParam(params.category);
  if (category && CATEGORY_SLUGS.has(category)) {
    query.category = category as StudioCategory;
  }

  const price = firstParam(params.price);
  if (price && price !== UNFILTERED && PRICE_BANDS.has(price)) {
    query.price = price as StudioPriceBand;
  }

  const capacity = firstParam(params.capacity);
  if (capacity && capacity !== UNFILTERED && CAPACITY_VALUES.has(capacity)) {
    query.capacity = capacity as StudioCapacityFilter;
  }

  const sort = firstParam(params.sort);
  if (sort && sort !== DEFAULT_STUDIO_SORT && SORT_VALUES.has(sort)) {
    query.sort = sort as StudioSort;
  }

  return query;
}

/** How many refinements the visitor has applied (drives "Clear all filters"). */
export function countActiveFilters(query: StudioQuery): number {
  let count = 0;
  if (query.q) count += 1;
  if (query.category) count += 1;
  if (query.price) count += 1;
  if (query.capacity) count += 1;
  return count;
}

/** Serializes a query back to URL params, omitting every default value. */
export function studioQueryToSearchParams(query: StudioQuery): URLSearchParams {
  const params = new URLSearchParams();
  if (query.q) params.set("q", query.q);
  if (query.category) params.set("category", query.category);
  if (query.price && query.price !== UNFILTERED) params.set("price", query.price);
  if (query.capacity && query.capacity !== UNFILTERED) {
    params.set("capacity", query.capacity);
  }
  if (query.sort && query.sort !== DEFAULT_STUDIO_SORT) {
    params.set("sort", query.sort);
  }
  return params;
}

/** Applies the search + filter half of a query (sorting stays separate). */
export function filterStudios(
  studios: readonly Studio[],
  query: StudioQuery
): Studio[] {
  // Multi-word search: every term must appear in the title or location, so
  // "print brooklyn" finds "The Print Lab" in "Brooklyn, New York".
  const terms = query.q ? query.q.toLowerCase().split(/\s+/).filter(Boolean) : [];
  const band = PRICE_BAND_OPTIONS.find(
    (option) => option.value === (query.price ?? UNFILTERED)
  );
  const minCapacity = Number.parseInt(query.capacity ?? UNFILTERED, 10);

  return studios.filter((studio) => {
    if (terms.length > 0) {
      const haystack = `${studio.title} ${studio.location}`.toLowerCase();
      if (!terms.every((term) => haystack.includes(term))) return false;
    }
    if (query.category && studio.category !== query.category) return false;
    if (band?.min !== undefined && studio.hourlyRate < band.min) return false;
    if (band?.max !== undefined && studio.hourlyRate > band.max) return false;
    if (Number.isFinite(minCapacity) && studio.capacity < minCapacity) return false;
    return true;
  });
}

/** Returns a sorted copy of the list; ties resolve by rating for stability. */
export function sortStudios(
  studios: readonly Studio[],
  sort: StudioSort = DEFAULT_STUDIO_SORT
): Studio[] {
  const sorted = [...studios];

  switch (sort) {
    case "price-asc":
      sorted.sort((a, b) => a.hourlyRate - b.hourlyRate || b.rating - a.rating);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.hourlyRate - a.hourlyRate || b.rating - a.rating);
      break;
    case "newest":
      sorted.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
      break;
    case "rating":
    default:
      sorted.sort(
        (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount
      );
  }

  return sorted;
}
