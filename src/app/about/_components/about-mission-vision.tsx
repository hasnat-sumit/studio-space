import Image from "next/image";
import { TelescopeIcon } from "lucide-react";
import { unsplash } from "@/lib/images";

const MISSION_IMAGE = unsplash("photo-1519389950473-47ba0277781c", 1200);
const VISION_IMAGE = unsplash("photo-1547891654-e66ed7ebb968", 1200);

/**
 * Mission and Vision as two editorial rows.
 *
 * Mission is a light, image-right row; Vision flips to image-left on a
 * charcoal band so the page has a clear light → dark progression that echoes
 * the homepage's `HostCta`.
 */
export function AboutMissionVision() {
  return (
    <>
      {/* Mission — light row, image on the right */}
      <section id="mission" className="py-20 sm:py-24">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-brand-accent uppercase">
              Our mission
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Make good space easier to find — and easier to share
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
              <p>
                Most creators never get the room their idea deserves. Studios
                are booked months out, quoted behind DMs, and priced for
                productions twice the size. Meanwhile, perfectly good spaces
                sit empty between shoots.
              </p>
              <p>
                StudioSpace closes both gaps. We connect creators with
                inspiring, accessible spaces they can book by the hour — and
                help owners unlock the potential of the rooms they already
                have, turning idle hours into steady income.
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-border animate-in fade-in-50 fill-mode-both duration-500">
            <Image
              src={MISSION_IMAGE}
              alt="Creative team collaborating around a shared desk with laptops, notebooks, and a teapot"
              fill
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Vision — charcoal band, image on the left */}
      <section
        id="vision"
        className="border-y border-border bg-muted/40 py-20 sm:py-24"
      >
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="relative order-last aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-brand-border animate-in fade-in-50 fill-mode-both duration-500 lg:order-first">
            <Image
              src={VISION_IMAGE}
              alt="Colorful street-art mural of a face surrounded by painted flowers and abstract shapes"
              fill
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-brand-accent uppercase">
              Our vision
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              A community where creativity compounds
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
              <p>
                We&apos;re building toward a thriving community where creativity,
                collaboration, and innovation flourish — where a photographer
                can find a daylight loft the week they need it, and a host can
                watch their studio become the set for someone&apos;s first
                short film.
              </p>
              <p>
                That means more than listings. It means trusted reviews,
                transparent pricing, and the kind of neighborhood that turns
                solo renters into a scene.
              </p>
            </div>

            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-accent/10 px-3 py-1 text-xs font-medium text-brand-accent">
              <TelescopeIcon className="size-3.5" aria-hidden="true" />
              One bookable room at a time
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
