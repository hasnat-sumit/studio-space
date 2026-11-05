import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, CalendarCheckIcon, KeyRoundIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { unsplash } from "@/lib/images";
import { cn } from "@/lib/utils";

const HOST_IMAGE = unsplash("photo-1524758631624-e2822e304c36", 1200);

const HOST_PERKS = [
  { icon: CalendarCheckIcon, label: "You confirm every booking request" },
  { icon: KeyRoundIcon, label: "You set the rules, rates, and dates" },
] as const;

export function HostCta() {
  return (
    <section id="host" className="pb-20 sm:pb-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 overflow-hidden rounded-3xl bg-charcoal px-6 py-12 ring-1 ring-brand-border sm:px-12 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:px-16">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-brand-accent uppercase">
              For studio owners
            </p>
            <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-cream text-balance sm:text-4xl">
              Your Space. Their Next Big Idea.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/70 text-pretty sm:text-lg">
              Turn idle hours into income. List your studio on StudioSpace and
              earn on your own schedule, with every request in one place.
            </p>

            <ul className="mt-6 flex flex-col gap-2.5">
              {HOST_PERKS.map((perk) => (
                <li
                  key={perk.label}
                  className="flex items-center gap-2.5 text-sm text-cream/80"
                >
                  <perk.icon
                    className="size-4 shrink-0 text-brand-accent"
                    aria-hidden="true"
                  />
                  {perk.label}
                </li>
              ))}
            </ul>

            <Link
              href="/register"
              className={cn(
                buttonVariants(),
                "mt-8 h-11 gap-2 bg-brand-accent px-6 text-[15px] text-brand-on-accent shadow-sm hover:bg-brand-accent/90 hover:text-brand-on-accent focus-visible:border-brand-accent/40 focus-visible:ring-brand-accent/30"
              )}
            >
              Become a Host
              <ArrowRightIcon aria-hidden="true" />
            </Link>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-cream/10 lg:aspect-[5/4]">
            <Image
              src={HOST_IMAGE}
              alt="Bright designer lounge with sculptural chairs and a statement floor lamp"
              fill
              sizes="(min-width: 1024px) 42vw, (min-width: 640px) 84vw, 92vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
