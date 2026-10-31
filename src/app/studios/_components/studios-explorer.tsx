"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DEFAULT_STUDIO_SORT,
  countActiveFilters,
  filterStudios,
  sortStudios,
  studioQueryToSearchParams,
} from "@/lib/studio-query";
import { StudioCard } from "./studio-card";
import { StudioFilters, StudioSortSelect } from "./studio-filters";
import { StudiosEmpty, StudiosLoadError } from "./studios-states";
import type { Studio, StudioQuery } from "@/types/studio";

const PAGE_SIZE = 6;

interface StudiosExplorerProps {
  studios: Studio[];
  /** Total listings in the catalogue (shown even while filters narrow it). */
  total: number;
  initialQuery: StudioQuery;
}

/**
 * Client-side Explore engine: search, filters, sorting, and Load More all run
 * in memory over the catalogue handed down by the server, so every change is
 * instant. When the backend grows query support, swap the three `lib` calls
 * for a request — the props stay the same.
 */
export function StudiosExplorer({
  studios,
  total,
  initialQuery,
}: StudiosExplorerProps) {
  const [query, setQuery] = React.useState<StudioQuery>(initialQuery);
  const [visibleCount, setVisibleCount] = React.useState(PAGE_SIZE);

  const results = React.useMemo(
    () => sortStudios(filterStudios(studios, query), query.sort),
    [studios, query]
  );

  // Keep the URL shareable/bookmarkable without a server round-trip.
  React.useEffect(() => {
    const search = studioQueryToSearchParams(query).toString();
    window.history.replaceState(
      null,
      "",
      search ? `?${search}` : window.location.pathname
    );
  }, [query]);

  // Defensive: a malformed API payload gets the retryable error state.
  if (!Array.isArray(studios)) {
    return <StudiosLoadError onRetry={() => window.location.reload()} />;
  }

  const matchCount = results.length;
  const visible = results.slice(0, visibleCount);
  const shownTo = Math.min(visibleCount, matchCount);
  const hasActiveFilters = countActiveFilters(query) > 0;
  const hasMore = shownTo < matchCount;

  /** Applies a filter patch and re-paginate from the first page. */
  function applyQuery(patch: Partial<StudioQuery>) {
    setQuery((current) => ({ ...current, ...patch }));
    setVisibleCount(PAGE_SIZE);
  }

  function clearAll() {
    setQuery({});
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <div>
      {/* Result count + sort */}
      <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-heading text-lg font-semibold tracking-tight">
            {total} {total === 1 ? "studio" : "studios"} available
          </p>
          <p
            role="status"
            className="mt-1 text-sm text-muted-foreground"
          >
            {matchCount === 0 ? (
              "No studios match the current filters."
            ) : (
              <>
                Showing{" "}
                <span className="font-medium text-foreground">
                  1–{shownTo}
                </span>{" "}
                of{" "}
                {matchCount === total ? (
                  `${total}.`
                ) : (
                  <>
                    {matchCount} matching {matchCount === 1 ? "studio" : "studios"}.
                  </>
                )}
              </>
            )}
          </p>
        </div>

        <StudioSortSelect
          value={query.sort ?? DEFAULT_STUDIO_SORT}
          onChange={(sort) =>
            applyQuery({
              sort: sort === DEFAULT_STUDIO_SORT ? undefined : sort,
            })
          }
        />
      </div>

      <StudioFilters query={query} onChange={applyQuery} onClearAll={clearAll} />

      {matchCount === 0 ? (
        <StudiosEmpty
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearAll}
        />
      ) : (
        <>
          <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((studio) => (
              <li key={studio.id} className="flex">
                <StudioCard studio={studio} />
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-col items-center gap-3">
            {hasMore ? (
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                className="group gap-1.5 border-brand-border bg-transparent text-brand-fg hover:bg-brand-fg/10 hover:text-brand-fg dark:border-brand-border dark:bg-transparent dark:hover:bg-brand-fg/10"
              >
                Show more studios
                <ChevronDownIcon
                  className="size-4 transition-transform group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </Button>
            ) : matchCount > PAGE_SIZE ? (
              <p className="text-sm text-muted-foreground">
                You&apos;ve seen every matching studio.
              </p>
            ) : null}

            {hasMore ? (
              <p className="text-xs text-muted-foreground">
                {shownTo} of {matchCount} shown
              </p>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}
