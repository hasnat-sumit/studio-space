import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { unsplash } from "@/lib/images";
import { cn } from "@/lib/utils";

export const HERO_SLIDES = [
  {
    image: unsplash("photo-1497366811353-6870744d04b2", 2000),
    imageAlt: "Sunlit loft studio with a long wooden table and floor-to-ceiling windows",
    eyebrow: "Photo studios",
    headline: "Find the perfect space for your next big idea.",
    subtext:
      "Daylight lofts and cyc walls for your next shoot, with the price and the free hours shown up front.",
  },
  {
    image: unsplash("photo-1503095396549-807759245b35", 2000),
    imageAlt: "Performers silhouetted against a glowing red stage curtain",
    eyebrow: "Sound stages",
    headline: "Roll camera on a stage built for the shot.",
    subtext:
      "Black-box stages with lighting rigs and room to build sets, booked by the hour for film and live work.",
  },
  {
    image: unsplash("photo-1589903308904-1010c2294adc", 2000),
    imageAlt: "Broadcast microphone and headphones beside an editing workstation",
    eyebrow: "Podcast and music",
    headline: "Record where the room sounds as good as you do.",
    subtext:
      "Acoustically treated podcast lounges and music suites, ready when inspiration strikes.",
  },
] as const;

interface HeroSlideProps {
  slide: (typeof HERO_SLIDES)[number];
  /** True for the slide visitors see first. */
  priority?: boolean;
}

export function HeroSlide({ slide, priority = false }: HeroSlideProps) {
  return (
    <div className="relative flex h-[34rem] items-center sm:h-[38rem] lg:h-[42rem]">
      <Image
        src={slide.image}
        alt={slide.imageAlt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
      />
      {/* Legibility scrim over photography */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-16 lg:px-20">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.2em] text-cream/90 uppercase">
            {slide.eyebrow}
          </p>
          <h2 className="mt-4 font-heading text-4xl leading-[1.05] font-semibold tracking-tight text-balance text-cream sm:text-5xl lg:text-6xl">
            {slide.headline}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-cream/80 sm:text-lg">
            {slide.subtext}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/studios"
              className={cn(
                buttonVariants(),
                "h-11 gap-2 bg-brand-accent px-6 text-[15px] text-brand-on-accent shadow-sm hover:bg-brand-accent/90 hover:text-brand-on-accent focus-visible:border-brand-accent/40 focus-visible:ring-brand-accent/30"
              )}
            >
              Explore Studios
              <ArrowRightIcon aria-hidden="true" />
            </Link>
            <Link
              href="/studios"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-11 border-cream/40 bg-transparent px-6 text-[15px] text-cream hover:bg-cream/10 hover:text-cream dark:border-cream/40 dark:bg-transparent dark:hover:bg-cream/10"
              )}
            >
              Host Your Space
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
