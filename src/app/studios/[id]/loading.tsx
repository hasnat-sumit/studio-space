import { ArrowLeftIcon } from "lucide-react";
import { StudioDetailSkeleton } from "./_components/studio-detail-skeleton";

/** Route-level loading state shown while the studio details stream in. */
export default function StudioLoading() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <ArrowLeftIcon className="size-4" aria-hidden="true" />
          Explore studios
        </span>

        <div className="mt-6 sm:mt-8">
          <StudioDetailSkeleton />
        </div>
      </div>
    </main>
  );
}
