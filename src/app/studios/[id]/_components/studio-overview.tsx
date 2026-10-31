import { AMENITIES } from "@/lib/amenities";
import type { Studio } from "@/types/studio";

interface StudioOverviewProps {
  studio: Studio;
}

/** Long-form description plus the amenity grid. */
export function StudioOverview({ studio }: StudioOverviewProps) {
  return (
    <section aria-labelledby="overview-heading">
      <h2
        id="overview-heading"
        className="font-heading text-2xl font-semibold tracking-tight"
      >
        Overview
      </h2>

      <p className="mt-4 text-lg leading-relaxed text-foreground/90 text-pretty">
        {studio.description}
      </p>

      <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground text-pretty">
        {studio.overview.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <h3 className="mt-10 font-heading text-lg font-medium">
        What&apos;s included
      </h3>
      <ul className="mt-5 grid grid-cols-1 gap-x-10 gap-y-3.5 sm:grid-cols-2">
        {studio.amenities.map((amenityId) => {
          const amenity = AMENITIES[amenityId];
          const Icon = amenity.icon;

          return (
            <li key={amenityId} className="flex items-center gap-3.5 text-sm">
              <span
                className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-accent/10 text-brand-accent"
                aria-hidden="true"
              >
                <Icon className="size-4" />
              </span>
              {amenity.label}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
