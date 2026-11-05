import Link from "next/link";
import { ApertureIcon } from "lucide-react";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { STUDIO_CATEGORIES, categoryHref } from "@/lib/categories";
import { NAV_LINKS } from "@/lib/navigation";

const CURRENT_YEAR = new Date().getFullYear();

/** lucide dropped brand icons, so these are drawn here. X is the current logo, not the bird. */
const SOCIAL_LINKS = [
  {
    label: "StudioSpace on X",
    href: "https://x.com",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "StudioSpace on Instagram",
    href: "https://www.instagram.com",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.86 5.86 0 0 0-2.13 1.38A5.86 5.86 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13a5.86 5.86 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.86 5.86 0 0 0 2.13-1.38 5.86 5.86 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.86 5.86 0 0 0-1.38-2.13A5.86 5.86 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0m0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88",
  },
  {
    label: "StudioSpace on YouTube",
    href: "https://www.youtube.com",
    path: "M23.5 6.2a3 3 0 0 0-2.12-2.13C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.52A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.12 2.13c1.88.52 9.38.52 9.38.52s7.5 0 9.38-.52a3 3 0 0 0 2.12-2.13A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8M9.55 15.57V8.43L15.82 12z",
  },
] as const;

const COLUMN_HEADING_CLASS =
  "text-xs font-medium tracking-[0.2em] text-brand-accent uppercase";
const COLUMN_LINK_CLASS =
  "inline-flex rounded text-sm text-cream/70 outline-none transition-colors hover:text-cream focus-visible:ring-3 focus-visible:ring-brand-accent/40";

/**
 * Site footer rendered on every route from the root layout.
 * Charcoal band matching `CtaBand`/`HostCta` so pages close on the
 * brand's darkest surface. `NAV_LINKS` supplies the primary navigation so it
 * can't drift.
 */
export function Footer() {
  return (
    <footer className="bg-charcoal text-cream ring-1 ring-brand-border">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1.3fr]">
          {/* Brand column */}
          <div className="max-w-sm">
            <Link
              href="/"
              aria-label="StudioSpace — home"
              className="inline-flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-brand-accent/40"
            >
              <span className="grid size-8 place-items-center rounded-[10px] bg-brand-accent/15 text-brand-accent ring-1 ring-brand-accent/25">
                <ApertureIcon
                  className="size-[18px]"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </span>
              <span className="font-heading text-[17px] leading-none tracking-tight">
                <span className="font-semibold text-cream">Studio</span>
                <span className="font-medium text-brand-accent">Space</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-pretty text-cream/60">
              Our mission is to put every creator in the right room. Peer-to-peer
              creative workspaces and production studios, booked by the hour
              with transparent pricing.
            </p>
            <ul className="mt-5 flex items-center gap-2">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="grid size-9 place-items-center rounded-full bg-cream/10 text-cream/80 outline-none transition-colors hover:bg-brand-accent hover:text-brand-on-accent focus-visible:ring-3 focus-visible:ring-brand-accent/40"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4"
                      aria-hidden="true"
                    >
                      <path d={social.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Quick links">
            <h3 className={COLUMN_HEADING_CLASS}>Quick Links</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={COLUMN_LINK_CLASS}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Popular categories">
            <h3 className={COLUMN_HEADING_CLASS}>Popular Categories</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {STUDIO_CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={categoryHref(category.slug)}
                    className={COLUMN_LINK_CLASS}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className={COLUMN_HEADING_CLASS}>Newsletter</h3>
            <p className="mt-4 text-sm leading-relaxed text-cream/60">
              New spaces and creator stories, straight to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-cream/10 pt-6 text-sm text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {CURRENT_YEAR} StudioSpace. All rights reserved.</p>
          <p>
            By using StudioSpace, you agree to our{" "}
            <Link
              href="/terms"
              className="rounded underline underline-offset-2 outline-none transition-colors hover:text-cream focus-visible:ring-3 focus-visible:ring-brand-accent/40"
            >
              Terms of Use
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
