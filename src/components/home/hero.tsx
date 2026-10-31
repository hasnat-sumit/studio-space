import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, BadgeCheckIcon, SparklesIcon, StarIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { unsplash } from "@/lib/images";
import { cn } from "@/lib/utils";

const HERO_IMAGE = unsplash("photo-1497366811353-6870744d04b2", 1400);

const STATS = [
  { label: "Bookable studios", value: "2,400+" },
  { label: "Cities", value: "120" },
  { label: "Average host rating", value: "4.9" },
] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 pt-14 pb-16 sm:px-6 sm:pt-20 sm:pb-24 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8 lg:pt-24 lg:pb-28">
        {/* Copy */}
        <div className="animate-in fade-in-50 fill-mode-both duration-700">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-accent/10 px-3 py-1 text-xs font-medium text-brand-accent">
            <SparklesIcon className="size-3.5" aria-hidden="true" />
            Peer-to-peer creative spaces
          </p>

          <h1 className="mt-6 font-heading text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Find the perfect space for your{" "}
            <span className="text-brand-accent">next big idea</span>.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            StudioSpace connects creators with bookable photo studios, sound
            stages, and music suites — verified by us, booked by the hour, and
            ready when inspiration strikes.
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
              href="#host"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-11 border-brand-border bg-transparent px-6 text-[15px] text-brand-fg hover:bg-brand-fg/10 hover:text-brand-fg dark:border-brand-border dark:bg-transparent dark:hover:bg-brand-fg/10"
              )}
            >
              List Your Space
            </Link>
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-border pt-6">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                  {stat.label}
                </dt>
                <dd className="mt-1 font-heading text-2xl font-semibold tracking-tight">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Photography */}
        <div className="relative animate-in fade-in-50 slide-in-from-bottom-4 fill-mode-both delay-200 duration-700">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-border sm:aspect-[4/3] lg:aspect-[4/5]">
            <Image
              src={HERO_IMAGE}
              alt="Sunlit loft studio with a long wooden table and floor-to-ceiling windows"
              fill
              priority
              sizes="(min-width: 1024px) 46vw, (min-width: 640px) 92vw, 92vw"
              className="object-cover"
            />
          </div>

          {/* Floating trust card */}
          <div className="absolute bottom-4 left-4 flex max-w-[16rem] items-center gap-3 rounded-xl border border-border bg-card/90 px-4 py-3 shadow-lg backdrop-blur-md sm:-bottom-6 sm:left-6">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-accent/15 text-brand-accent">
              <BadgeCheckIcon className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-medium">Every studio verified</p>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                <StarIcon
                  className="size-3 fill-current text-brand-accent"
                  aria-hidden="true"
                />
                4.9 average from 12k+ creator bookings
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
