import { cache } from "react";
import { notFound } from "next/navigation";
import { getReviews } from "@/lib/api/reviews";
import { getStudio } from "@/lib/api/studios";
import { BookingPanel } from "./booking-panel";
import { StudioGallery } from "./studio-gallery";
import { StudioHeader } from "./studio-header";
import { StudioHost } from "./studio-host";
import { StudioOverview } from "./studio-overview";
import { StudioReviews } from "./studio-reviews";

/**
 * Request-scoped memoization: `generateMetadata` (in `page.tsx`) and this
 * component resolve the same studio once per request.
 */
export const getStudioCached = cache(getStudio);

interface StudioDetailProps {
  /** The route's `params` promise, unwrapped here so the page shell stays static. */
  params: Promise<{ id: string }>;
}

/**
 * Full studio details composition.
 *
 * Gallery + header + booking panel sit above the fold; the aside holds the
 * sticky booking card on desktop (`lg:sticky`) and flows inline on mobile,
 * between the header and the overview. Unknown ids call `notFound()`, which
 * renders the route's `not-found.tsx`.
 */
export async function StudioDetail({ params }: StudioDetailProps) {
  const { id } = await params;
  const studio = await getStudioCached(id);

  if (!studio) notFound();

  const { reviews, source } = await getReviews(studio.slug);

  // Defensive: API responses predating the gallery field fall back to the
  // studio's single image.
  const gallery = studio.gallery?.length
    ? studio.gallery
    : [{ src: studio.image, alt: studio.imageAlt }];

  return (
    <div className="pb-20 sm:pb-24">
      <StudioGallery images={gallery} />

      <div className="mt-8 grid grid-cols-1 sm:mt-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-x-12">
        <div className="min-w-0 lg:col-start-1 lg:row-start-1">
          <StudioHeader studio={studio} />
        </div>

        {/* One DOM instance: right rail on desktop (sticky across both left
            rows), flowing right below the header on mobile. */}
        <aside
          aria-label="Booking"
          className="mt-8 min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:self-start lg:sticky lg:top-24"
        >
          <BookingPanel studio={studio} />
        </aside>

        <div className="mt-10 min-w-0 lg:col-start-1 lg:row-start-2 lg:mt-12">
          <StudioOverview studio={studio} />
          <StudioHost host={studio.host} />
          <StudioReviews
            studio={studio}
            reviews={reviews}
            source={source}
          />
        </div>
      </div>
    </div>
  );
}
