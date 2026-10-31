"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogInIcon, UserPlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, isActivePath } from "@/lib/navigation";
import { useAuth } from "@/hooks/use-auth";
import { buttonVariants } from "@/components/ui/button";
import { NavbarBrand } from "@/components/layout/navbar-brand";
import { NavbarUserMenu } from "@/components/layout/navbar-user-menu";
import { NavbarMobileMenu } from "@/components/layout/navbar-mobile-menu";

export function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-border bg-brand-bg backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <NavbarBrand />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-0.5 lg:flex lg:gap-1"
        >
          {NAV_LINKS.map((link) => {
            const active = isActivePath(link.href, pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm outline-none transition-colors after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:rounded-full after:bg-brand-accent after:opacity-0 after:transition-opacity after:content-[''] focus-visible:ring-3 focus-visible:ring-brand-accent/40",
                  active
                    ? "font-medium text-brand-fg after:opacity-100"
                    : "text-brand-fg/70 hover:text-brand-fg"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 lg:flex">
            {user ? (
              <NavbarUserMenu user={user} onLogout={logout} />
            ) : (
              <>
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "h-9 gap-1.5 px-4 text-brand-fg/80 hover:bg-brand-fg/10 hover:text-brand-fg dark:hover:bg-brand-fg/10"
                  )}
                >
                  <LogInIcon />
                  Login
                </Link>
                <Link
                  href="/register"
                  className={cn(
                    buttonVariants(),
                    "h-9 gap-1.5 bg-brand-accent px-4 text-brand-on-accent shadow-sm hover:bg-brand-accent/90 hover:text-brand-on-accent focus-visible:border-brand-accent/40 focus-visible:ring-brand-accent/30"
                  )}
                >
                  <UserPlusIcon />
                  Register
                </Link>
              </>
            )}
          </div>

          {/* key remounts the menu on route change so it always resets to closed */}
          <NavbarMobileMenu key={pathname} user={user} onLogout={logout} />
        </div>
      </div>
    </header>
  );
}
