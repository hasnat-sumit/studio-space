import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon, MapPinIcon, StarIcon, UsersIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { categoryLabel } from "@/lib/categories";
import type { Studio } from "@/types/studio";

const CARD_IMAGE_SIZES =
  "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

interface StudioCardProps {
  studio: Studio;
}

/**
 * Explore-page listing card (richer than the homepage card: capacity,
 * blurb, and a "View details" affordance). The whole card is one link, so
 * it stays keyboard-accessible with a single tab stop.
 */
export function StudioCard({ studio }: StudioCardProps) {
  return (
    <Link
      href={`/studios/${studio.slug}`}
      className="group flex h-full flex-col outline-none focus-visible:ring-3 focus-visible:ring-brand-accent/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-border">
        <Image
          src={studio.image}
          alt={studio.imageAlt}
          fill
          sizes={CARD_IMAGE_SIZES}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <Badge
          variant="secondary"
          className="absolute top-3 left-3 bg-background/85 text-foreground backdrop-blur-sm"
        >
          {categoryLabel(studio.category)}
        </Badge>
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-background/85 px-2.5 py-1 text-xs font-medium backdrop-blur-sm">
          <StarIcon
            className="size-3 fill-current text-brand-accent"
            aria-hidden="true"
          />
          {studio.rating.toFixed(1)}
          <span className="text-muted-foreground">({studio.reviewCount})</span>
        </span>
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-heading text-lg font-medium tracking-tight transition-colors group-hover:text-brand-accent">
            {studio.title}
          </h3>
          <p className="shrink-0 text-right">
            <span className="font-heading text-lg font-semibold text-brand-accent">
              ${studio.hourlyRate}
            </span>
            <span className="text-xs text-muted-foreground">/hr</span>
          </p>
        </div>

        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPinIcon className="size-3.5 shrink-0" aria-hidden="true" />
          {studio.location}
        </p>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
          <UsersIcon className="size-3.5 shrink-0" aria-hidden="true" />
          Seats up to {studio.capacity}
        </p>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {studio.description}
        </p>

        <span className="mt-auto inline-flex items-center gap-1 border-t border-border pt-4 text-sm font-medium text-brand-accent">
          View details
          <ArrowUpRightIcon
            className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
