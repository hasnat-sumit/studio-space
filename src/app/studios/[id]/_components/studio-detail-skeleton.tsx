import { Skeleton } from "@/components/ui/skeleton";

/**
 * Full placeholder for the studio details layout (gallery, header, overview,
 * booking card) — used as the route's `loading.tsx` and as the Suspense
 * fallback in `page.tsx`.
 */
export function StudioDetailSkeleton() {
  return (
    <div role="status" aria-label="Loading studio" aria-busy="true" className="pb-20 sm:pb-24">
      <Skeleton className="aspect-[4/3] w-full rounded-2xl sm:aspect-[16/9] lg:aspect-[2/1]" />
      <div className="mt-3 grid max-w-xl grid-cols-3 gap-3" aria-hidden="true">
        {Array.from({ length: 3 }, (_, index) => (
          <Skeleton key={index} className="aspect-[3/2] rounded-lg" />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 sm:mt-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-x-12">
        <div className="lg:col-start-1 lg:row-start-1">
          <Skeleton className="h-6 w-28 rounded-full" />
          <Skeleton className="mt-4 h-10 w-2/3 max-w-lg rounded-lg" />
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            <Skeleton className="h-4 w-40 rounded" />
            <Skeleton className="h-4 w-36 rounded" />
            <Skeleton className="h-4 w-32 rounded" />
          </div>
        </div>

        <aside className="mt-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0">
          <Skeleton className="h-80 w-full rounded-2xl" />
        </aside>

        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:mt-12">
          <Skeleton className="h-7 w-32 rounded" />
          <Skeleton className="mt-4 h-4 w-full rounded" />
          <Skeleton className="mt-2 h-4 w-full rounded" />
          <Skeleton className="mt-2 h-4 w-4/5 rounded" />
          <Skeleton className="mt-2 h-4 w-2/3 rounded" />

          <Skeleton className="mt-10 h-5 w-44 rounded" />
          <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2" aria-hidden="true">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="flex items-center gap-3.5">
                <Skeleton className="size-9 rounded-full" />
                <Skeleton className="h-4 w-32 rounded" />
              </div>
            ))}
          </div>

          <Skeleton className="mt-14 h-7 w-44 rounded" />
          <Skeleton className="mt-6 h-28 w-full rounded-2xl" />
        </div>
      </div>

      <span className="sr-only">Loading studio…</span>
    </div>
  );
}
