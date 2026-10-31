import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import { ArrowLeftIcon } from "lucide-react";
import { StudioDetail, getStudioCached } from "./_components/studio-detail";
import { StudioDetailSkeleton } from "./_components/studio-detail-skeleton";

interface StudioPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Studio details (`/studios/[id]`).
 *
 * The route segment is `[id]`, but `getStudio()` resolves either the id or
 * the slug — every existing `/studios/<slug>` link (homepage + Explore cards)
 * lands here. Unknown ids trigger `notFound()` inside `StudioDetail`, which
 * renders the route's `not-found.tsx`.
 *
 * The breadcrumb bar renders immediately; the details stream in behind a
 * Suspense boundary (required by `cacheComponents`). `generateMetadata`
 * shares the studio fetch with the page body via `cache()`.
 */
export async function generateMetadata(
  props: StudioPageProps
): Promise<Metadata> {
  const { id } = await props.params;
  const studio = await getStudioCached(id);

  if (!studio) {
    return { title: "Studio not found - StudioSpace" };
  }

  return {
    title: `${studio.title} - StudioSpace`,
    description: studio.description,
  };
}

export default function StudioPage(props: StudioPageProps) {
  return (
    <main className="min-h-screen">
      <div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <Link
          href="/studios"
          className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon
            className="size-4 transition-transform group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          Explore studios
        </Link>

        <div className="mt-6 sm:mt-8">
          <Suspense fallback={<StudioDetailSkeleton />}>
            <StudioDetail params={props.params} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
