import { StudiosExplorerSkeleton } from "./_components/studio-grid-skeleton";
import { StudiosMasthead } from "./_components/studios-masthead";

/** Route-level loading state shown while the catalogue streams in. */
export default function StudiosLoading() {
  return (
    <div className="min-h-screen">
      <StudiosMasthead />

      <section
        aria-label="Studio listings"
        className="mx-auto w-full max-w-7xl px-4 pt-8 pb-20 sm:px-6 sm:pt-10 sm:pb-24 lg:px-8"
      >
        <StudiosExplorerSkeleton />
      </section>
    </div>
  );
}
