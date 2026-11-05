import {
  BuildingIcon,
  CalendarCheckIcon,
  CirclePlayIcon,
  CirclePlusIcon,
  CompassIcon,
  HouseIcon,
  InfoIcon,
  LayoutDashboardIcon,
  UserRoundIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

/** Primary navigation links shown in the navbar (desktop + mobile). */
export const NAV_LINKS: readonly NavLink[] = [
  { label: "Home", href: "/", icon: HouseIcon },
  { label: "Explore Studios", href: "/studios", icon: CompassIcon },
  { label: "How It Works", href: "/how-it-works", icon: CirclePlayIcon },
  { label: "About Us", href: "/about", icon: InfoIcon },
];

/** Signed-in account links (avatar dropdown + mobile menu). */
export const ACCOUNT_LINKS: readonly NavLink[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboardIcon },
  { label: "Add New Studio", href: "/add-studio", icon: CirclePlusIcon },
  { label: "My Studio Listings", href: "/my-listings", icon: BuildingIcon },
  { label: "My Bookings", href: "/my-bookings", icon: CalendarCheckIcon },
  { label: "My Profile", href: "/dashboard/profile", icon: UserRoundIcon },
];

/**
 * The account link for `pathname`. The most specific match wins, so
 * `/dashboard/profile` highlights only "My Profile", not its parent.
 */
export function activeAccountHref(pathname: string): string | null {
  const matches = ACCOUNT_LINKS.filter((link) => isActivePath(link.href, pathname));
  return matches.reduce<string | null>(
    (best, link) => (!best || link.href.length > best.length ? link.href : best),
    null
  );
}

/** True when `pathname` is `href` or a child route of it (Home only matches exactly). */
export function isActivePath(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  // The edit page's URL sits under /studios, but it belongs to the host's listings.
  if (pathname.startsWith("/studios/edit/")) return href === "/my-listings";
  return pathname === href || pathname.startsWith(`${href}/`);
}
