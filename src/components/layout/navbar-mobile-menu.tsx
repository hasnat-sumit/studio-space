"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogInIcon, LogOutIcon, MenuIcon, UserPlusIcon } from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import { ACCOUNT_LINKS, NAV_LINKS, isActivePath } from "@/lib/navigation";
import type { NavLink } from "@/lib/navigation";
import type { SessionUser } from "@/types/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NavbarBrand } from "@/components/layout/navbar-brand";

interface NavbarMobileMenuProps {
  user: SessionUser | null;
  onLogout: () => void;
}

function MobileNavLink({
  link,
  active,
  onClick,
}: {
  link: NavLink;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={link.href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm outline-none transition-colors focus-visible:ring-3 focus-visible:ring-brand-accent/40",
        active
          ? "bg-brand-accent/10 font-medium text-brand-accent"
          : "text-brand-fg/75 hover:bg-brand-fg/10 hover:text-brand-fg"
      )}
    >
      <link.icon
        className={cn(
          "size-4 shrink-0",
          active ? "text-brand-accent" : "text-brand-fg/60"
        )}
      />
      {link.label}
    </Link>
  );
}

export function NavbarMobileMenu({ user, onLogout }: NavbarMobileMenuProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-full lg:hidden"
            aria-label="Open navigation menu"
          />
        }
      >
        <MenuIcon />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="data-[side=right]:w-[88%] max-w-sm gap-0 border-l border-brand-border bg-brand-bg text-brand-fg backdrop-blur-lg"
      >
        <div className="flex items-center border-b border-brand-border px-5 py-4">
          <NavbarBrand />
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        </div>

        <nav
          aria-label="Primary mobile"
          className="flex flex-1 flex-col gap-1 overflow-y-auto p-4"
        >
          {NAV_LINKS.map((link) => (
            <MobileNavLink
              key={link.href}
              link={link}
              active={isActivePath(link.href, pathname)}
              onClick={() => setOpen(false)}
            />
          ))}

          {user ? (
            <div className="mt-3 border-t border-brand-border pt-3">
              <p className="px-3 pb-2 text-xs font-medium tracking-widest text-brand-fg/50">
                ACCOUNT
              </p>
              {ACCOUNT_LINKS.map((link) => (
                <MobileNavLink
                  key={link.href}
                  link={link}
                  active={isActivePath(link.href, pathname)}
                  onClick={() => setOpen(false)}
                />
              ))}
              <button
                type="button"
                onClick={handleLogout}
                className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm outline-none transition-colors hover:bg-destructive/10 focus-visible:ring-3 focus-visible:ring-destructive/30"
              >
                <LogOutIcon className="size-4 shrink-0" />
                <span className="text-destructive">Logout</span>
              </button>
            </div>
          ) : null}
        </nav>

        <div className="border-t border-brand-border p-4">
          {user ? (
            <div className="flex items-center gap-3 rounded-xl bg-brand-fg/5 px-3 py-2.5 ring-1 ring-brand-border">
              <Avatar>
                {user.image ? (
                  <AvatarImage src={user.image} alt={user.name} />
                ) : null}
                <AvatarFallback className="bg-brand-accent/15 text-xs font-medium text-brand-accent">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-brand-fg">
                  {user.name}
                </p>
                <p className="truncate text-xs text-brand-fg/60">
                  {user.email}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-9 w-full gap-1.5 border-brand-border bg-transparent text-brand-fg hover:bg-brand-fg/10 hover:text-brand-fg dark:border-brand-border dark:bg-transparent dark:hover:bg-brand-fg/10"
                )}
              >
                <LogInIcon />
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants(),
                  "h-9 w-full gap-1.5 bg-brand-accent text-brand-on-accent shadow-sm hover:bg-brand-accent/90 hover:text-brand-on-accent focus-visible:border-brand-accent/40 focus-visible:ring-brand-accent/30"
                )}
              >
                <UserPlusIcon />
                Register
              </Link>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
