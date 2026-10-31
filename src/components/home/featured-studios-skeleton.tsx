import { Skeleton } from "@/components/ui/skeleton";

function StudioCardSkeleton() {
  return (
    <div className="flex flex-col">
      <Skeleton className="aspect-[4/3] w-full rounded-xl" />
      <Skeleton className="mt-4 h-5 w-3/4" />
      <Skeleton className="mt-2 h-4 w-1/2" />
      <Skeleton className="mt-3 h-4 w-24" />
    </div>
  );
}

/** Loading placeholder shown while the featured studios request streams in. */
export function FeaturedStudiosSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: 6 }, (_, index) => (
        <StudioCardSkeleton key={index} />
      ))}
    </div>
  );
}
