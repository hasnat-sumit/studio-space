import Image from "next/image";
import Link from "next/link";
import { MapPinIcon, StarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { categoryLabel } from "@/lib/categories";
import type { Studio } from "@/types/studio";

const CARD_IMAGE_SIZES =
  "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

interface StudioCardProps {
  studio: Studio;
}

export function StudioCard({ studio }: StudioCardProps) {
  return (
    <Link
      href={`/studios/${studio.slug}`}
      className="group flex flex-col outline-none focus-visible:ring-3 focus-visible:ring-brand-accent/40"
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
          className="absolute top-3 left-3 border border-border/60 bg-background/85 text-foreground backdrop-blur-sm"
        >
          {categoryLabel(studio.category)}
        </Badge>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-heading text-base font-medium tracking-tight transition-colors group-hover:text-brand-accent sm:text-lg">
            {studio.title}
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPinIcon className="size-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{studio.location}</span>
          </p>
        </div>
        <span className="flex shrink-0 items-center gap-1 text-sm font-medium">
          <StarIcon
            className="size-3.5 fill-current text-brand-accent"
            aria-hidden="true"
          />
          {studio.rating.toFixed(1)}
          <span className="font-normal text-muted-foreground">
            ({studio.reviewCount})
          </span>
        </span>
      </div>

      <p className="mt-3 text-sm">
        <span className="font-heading text-base font-semibold">
          ${studio.hourlyRate}
        </span>{" "}
        <span className="text-muted-foreground">/ hour</span>
      </p>
    </Link>
  );
}
