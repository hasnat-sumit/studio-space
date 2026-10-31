import {
  BuildingIcon,
  CalendarCheckIcon,
  CirclePlayIcon,
  CirclePlusIcon,
  CompassIcon,
  HouseIcon,
  InfoIcon,
  LayoutDashboardIcon,
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
  { label: "Add New Studio", href: "/dashboard/studios/new", icon: CirclePlusIcon },
  { label: "My Studio Listings", href: "/dashboard/studios", icon: BuildingIcon },
  { label: "My Bookings", href: "/dashboard/bookings", icon: CalendarCheckIcon },
];

/** True when `pathname` is `href` or a child route of it (Home only matches exactly). */
export function isActivePath(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
