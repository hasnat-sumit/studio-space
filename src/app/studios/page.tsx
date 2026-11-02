import { Suspense } from "react";
import type { Metadata } from "next";
import { StudiosExplorerSkeleton } from "./_components/studio-grid-skeleton";
import { StudiosMasthead } from "./_components/studios-masthead";
import { StudiosResults } from "./_components/studios-results";

export const metadata: Metadata = {
  title: "Explore Studios - StudioSpace",
  description:
    "Search and filter hourly photo studios, sound stages, podcast rooms, music suites, and art workshops by price, capacity, and rating.",
};

interface StudiosPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Explore Studios (`/studios`).
 *
 * The masthead renders immediately; the catalogue streams in behind a
 * Suspense boundary (required by `cacheComponents`). Deep links such as
 * `/studios?category=podcast` — used by the homepage category cards — are
 * parsed server-side in `StudiosResults` and applied as the initial filters.
 */
export default function StudiosPage({ searchParams }: StudiosPageProps) {
  return (
    <div className="min-h-screen">
      <StudiosMasthead />

      <section
        aria-label="Studio listings"
        className="mx-auto w-full max-w-7xl px-4 pt-8 pb-20 sm:px-6 sm:pt-10 sm:pb-24 lg:px-8"
      >
        <Suspense fallback={<StudiosExplorerSkeleton />}>
          <StudiosResults searchParams={searchParams} />
        </Suspense>
      </section>
    </div>
  );
}
