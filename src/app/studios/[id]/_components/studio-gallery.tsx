"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { StudioImage } from "@/types/studio";

const FEATURED_SIZES =
  "(min-width: 1024px) 1200px, (min-width: 640px) 92vw, 92vw";
const THUMB_SIZES = "(min-width: 1024px) 300px, (min-width: 640px) 30vw, 45vw";

interface StudioGalleryProps {
  images: StudioImage[];
}

/**
 * Cinematic gallery: one large featured image with a crossfade into the
 * selected photo, plus a thumbnail strip. Falls back to the studio's single
 * image when no gallery is supplied.
 */
export function StudioGallery({ images }: StudioGalleryProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const featured = images[activeIndex] ?? images[0];

  if (!featured) return null;

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-border sm:aspect-[16/9] lg:aspect-[2/1]">
        {images.map((image, index) => (
          <Image
            key={image.src}
            src={image.src}
            alt={index === activeIndex ? image.alt : ""}
            fill
            sizes={FEATURED_SIZES}
            priority={index === 0}
            className={cn(
              "object-cover transition-opacity duration-500 ease-out",
              index === activeIndex
                ? "opacity-100"
                : "pointer-events-none opacity-0"
            )}
          />
        ))}

        {images.length > 1 ? (
          <span className="absolute right-4 bottom-4 rounded-full bg-background/85 px-3 py-1 text-xs font-medium tabular-nums text-foreground backdrop-blur-sm">
            {activeIndex + 1} / {images.length}
          </span>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="mt-3 grid max-w-xl grid-cols-3 gap-3">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show photo ${index + 1} of ${images.length}: ${image.alt}`}
              aria-current={index === activeIndex}
              data-active={index === activeIndex}
              className="group relative aspect-[3/2] overflow-hidden rounded-lg ring-1 ring-border outline-none focus-visible:ring-3 focus-visible:ring-brand-accent/40 data-[active=true]:ring-2 data-[active=true]:ring-brand-accent"
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes={THUMB_SIZES}
                className={cn(
                  "object-cover transition duration-300 group-hover:scale-[1.04]",
                  index === activeIndex
                    ? ""
                    : "opacity-75 group-hover:opacity-100"
                )}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
