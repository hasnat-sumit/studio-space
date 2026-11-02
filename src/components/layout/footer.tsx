import Link from "next/link";
import { ApertureIcon, ArrowUpRightIcon } from "lucide-react";
import { NAV_LINKS } from "@/lib/navigation";

interface FooterColumn {
  heading: string;
  links: { label: string; href: string; external?: boolean }[];
}

const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    heading: "Platform",
    links: [
      { label: "Explore Studios", href: "/studios" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "About Us", href: "/about" },
    ],
  },
  {
    heading: "For Hosts",
    links: [
      { label: "Become a Host", href: "/#host" },
      { label: "List Your Studio", href: "/dashboard/studios/new" },
      { label: "My Listings", href: "/dashboard/studios" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "My Bookings", href: "/dashboard/bookings" },
      { label: "Login", href: "/login" },
      { label: "Register", href: "/register" },
    ],
  },
];

const CURRENT_YEAR = new Date().getFullYear();

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
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
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
            <p className="mt-4 text-sm leading-relaxed text-cream/60 text-pretty">
              Peer-to-peer creative workspaces and production studios, booked
              by the hour. Verified spaces, transparent pricing, and a
              community built for the work.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h3 className="text-xs font-medium tracking-[0.2em] text-brand-accent uppercase">
                {column.heading}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1 rounded text-sm text-cream/70 outline-none transition-colors hover:text-cream focus-visible:ring-3 focus-visible:ring-brand-accent/40"
                    >
                      {link.label}
                      {link.external ? (
                        <ArrowUpRightIcon
                          className="size-3.5"
                          aria-hidden="true"
                        />
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-cream/10 pt-6 text-sm text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {CURRENT_YEAR} StudioSpace. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded outline-none transition-colors hover:text-cream focus-visible:ring-3 focus-visible:ring-brand-accent/40"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
