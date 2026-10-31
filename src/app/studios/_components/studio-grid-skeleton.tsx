import { Skeleton } from "@/components/ui/skeleton";

function StudioCardSkeleton() {
  return (
    <div className="flex flex-col">
      <Skeleton className="aspect-[4/3] w-full rounded-xl" />
      <Skeleton className="mt-4 h-5 w-3/4" />
      <Skeleton className="mt-2 h-4 w-1/2" />
      <Skeleton className="mt-2 h-4 w-2/3" />
      <Skeleton className="mt-3 h-4 w-full" />
      <Skeleton className="mt-4 h-4 w-24" />
    </div>
  );
}

/**
 * Full placeholder for the Explore UI (meta row, filter bar, grid) — used as
 * the route's `loading.tsx` and as the Suspense fallback in `page.tsx`.
 */
export function StudiosExplorerSkeleton() {
  return (
    <div role="status" aria-label="Loading studios" aria-busy="true">
      <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Skeleton className="h-6 w-44" />
          <Skeleton className="mt-2 h-4 w-64 max-w-full" />
        </div>
        <Skeleton className="h-11 w-44 rounded-lg" />
      </div>

      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-end">
        <Skeleton className="h-11 w-full rounded-lg lg:max-w-sm" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:flex">
          <Skeleton className="h-11 w-full rounded-lg lg:w-44" />
          <Skeleton className="h-11 w-full rounded-lg lg:w-40" />
          <Skeleton className="h-11 w-full rounded-lg lg:w-40" />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {Array.from({ length: 6 }, (_, index) => (
          <StudioCardSkeleton key={index} />
        ))}
      </div>
      <span className="sr-only">Loading studios…</span>
    </div>
  );
}
