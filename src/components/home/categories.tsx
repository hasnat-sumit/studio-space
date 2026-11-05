import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { STUDIO_CATEGORIES, categoryHref } from "@/lib/categories";
import { SectionHeading } from "@/components/shared/section-heading";

const CATEGORY_IMAGE_SIZES = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw";

export function CategoryExplorer() {
  return (
    <section id="categories" className="border-t border-border/60 bg-muted/30 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Browse"
          title="Browse by Studio Categories"
          description="Five kinds of creative space, each equipped for the work you make."
          align="center"
        />

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {STUDIO_CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={categoryHref(category.slug)}
              className="group relative flex h-64 w-full items-end overflow-hidden rounded-2xl ring-1 ring-border outline-none focus-visible:ring-3 focus-visible:ring-brand-accent/40 sm:h-72 sm:w-[calc(50%-0.5rem)] lg:w-[calc((100%-2rem)/3)]"
            >
              <Image
                src={category.image}
                alt={category.imageAlt}
                fill
                sizes={CATEGORY_IMAGE_SIZES}
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
              {/* Legibility scrim over photography */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              <div className="relative flex w-full items-end justify-between gap-4 p-5 sm:p-6">
                <div>
                  <span className="inline-flex items-center gap-2 text-cream/90">
                    <category.icon className="size-4" aria-hidden="true" />
                    <span className="text-xs font-medium tracking-[0.15em] uppercase">
                      Category
                    </span>
                  </span>
                  <h3 className="mt-2 font-heading text-xl font-semibold tracking-tight text-cream sm:text-2xl">
                    {category.name}
                  </h3>
                  <p className="mt-1 max-w-sm text-sm leading-relaxed text-cream/75">
                    {category.description}
                  </p>
                </div>
                <span className="mb-1 grid size-9 shrink-0 place-items-center rounded-full bg-cream/15 text-cream backdrop-blur-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:bg-brand-accent">
                  <ArrowUpRightIcon className="size-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
