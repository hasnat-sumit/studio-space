import { Suspense } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { getFeaturedStudios } from "@/lib/api/studios";
import { SectionHeading } from "@/components/shared/section-heading";
import { StudioCard } from "@/components/home/studio-card";
import { FeaturedStudiosSkeleton } from "@/components/home/featured-studios-skeleton";
import {
  FeaturedStudiosEmpty,
  FeaturedStudiosError,
} from "@/components/home/featured-studios-states";

const FEATURED_LIMIT = 6;

async function FeaturedStudiosGrid() {
  let studios: Awaited<ReturnType<typeof getFeaturedStudios>>;
  try {
    studios = await getFeaturedStudios(FEATURED_LIMIT);
  } catch {
    return <FeaturedStudiosError />;
  }

  if (studios.studios.length === 0) {
    return <FeaturedStudiosEmpty source={studios.source} />;
  }

  return (
    <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {studios.studios.map((studio) => (
        <StudioCard key={studio.id} studio={studio} />
      ))}
    </div>
  );
}

/**
 * "Spaces Worth Creating In" — the six highest-rated studios.
 *
 * The heading renders immediately; only the data-backed grid streams inside a
 * Suspense boundary (required by `cacheComponents` for uncached reads).
 */
export function FeaturedStudiosSection() {
  return (
    <section id="featured" className="py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Featured"
            title="Spaces Worth Creating In"
            description="The highest-rated studios on StudioSpace, loved by photographers, directors, and musicians alike."
          />
          <Link
            href="/studios"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-brand-accent outline-none hover:underline focus-visible:ring-3 focus-visible:ring-brand-accent/40"
          >
            View All Studios
            <ArrowRightIcon
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <Suspense fallback={<FeaturedStudiosSkeleton />}>
          <FeaturedStudiosGrid />
        </Suspense>
      </div>
    </section>
  );
}
