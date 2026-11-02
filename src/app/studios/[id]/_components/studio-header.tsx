import { MapPinIcon, UsersIcon } from "lucide-react";
import { StarRating } from "@/components/shared/star-rating";
import { Badge } from "@/components/ui/badge";
import { categoryLabel } from "@/lib/categories";
import { formatMoney } from "@/lib/booking";
import type { Studio } from "@/types/studio";

interface StudioHeaderProps {
  studio: Studio;
}

/** Title block: category, name, meta row, and the headline price. */
export function StudioHeader({ studio }: StudioHeaderProps) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <Badge
          variant="secondary"
          className="border-brand-border bg-brand-accent/10 text-brand-accent"
        >
          {categoryLabel(studio.category)}
        </Badge>

        <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
          {studio.title}
        </h1>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPinIcon className="size-4 shrink-0" aria-hidden="true" />
            {studio.location}
          </span>
          {studio.reviewCount > 0 ? (
            <span className="inline-flex items-center gap-2">
              <StarRating rating={studio.rating} />
              <span>
                <span className="font-medium text-foreground">
                  {studio.rating.toFixed(1)}
                </span>{" "}
                ({studio.reviewCount} reviews)
              </span>
            </span>
          ) : (
            <span>New listing, no reviews yet</span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <UsersIcon className="size-4 shrink-0" aria-hidden="true" />
            Seats up to {studio.capacity}
          </span>
        </div>
      </div>

      <div className="shrink-0 sm:pt-1 sm:text-right">
        <p>
          <span className="font-heading text-3xl font-semibold text-brand-accent">
            {formatMoney(studio.hourlyRate)}
          </span>
          <span className="text-sm text-muted-foreground"> / hour</span>
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          + {formatMoney(studio.deposit)} refundable deposit
        </p>
      </div>
    </div>
  );
}
