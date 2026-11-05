"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StudioImage } from "@/types/studio";

const FEATURED_SIZES =
  "(min-width: 1024px) 1200px, (min-width: 640px) 92vw, 92vw";
const THUMB_SIZES = "(min-width: 1024px) 300px, (min-width: 640px) 30vw, 45vw";

const ARROW_CLASS =
  "absolute top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-background/85 text-foreground outline-none backdrop-blur-sm transition-colors hover:bg-background focus-visible:ring-3 focus-visible:ring-brand-accent/40";

interface StudioGalleryProps {
  images: StudioImage[];
}

/**
 * Gallery carousel: one large image that crossfades to the next, with previous
 * and next buttons and a thumbnail strip. Falls back to the studio's single
 * image when no gallery is supplied.
 */
export function StudioGallery({ images }: StudioGalleryProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const featured = images[activeIndex] ?? images[0];

  if (!featured) return null;

  function step(by: number) {
    setActiveIndex((index) => (index + by + images.length) % images.length);
  }

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
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className={ARROW_CLASS + " left-3"}
            >
              <ChevronLeftIcon className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className={ARROW_CLASS + " right-3"}
            >
              <ChevronRightIcon className="size-5" aria-hidden="true" />
            </button>
          </>
        ) : null}

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
