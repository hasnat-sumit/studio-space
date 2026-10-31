"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOutIcon } from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import { ACCOUNT_LINKS, isActivePath } from "@/lib/navigation";
import type { SessionUser } from "@/types/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarUserMenuProps {
  user: SessionUser;
  onLogout: () => void;
}

export function NavbarUserMenu({ user, onLogout }: NavbarUserMenuProps) {
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`Account menu for ${user.name}`}
        className="group flex size-9 items-center justify-center rounded-full outline-none transition-colors hover:bg-brand-fg/10 focus-visible:ring-3 focus-visible:ring-brand-accent/40 data-popup-open:bg-brand-fg/10"
      >
        <Avatar>
          {user.image ? <AvatarImage src={user.image} alt={user.name} /> : null}
          <AvatarFallback className="bg-brand-accent/15 font-medium text-brand-accent">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-60 p-1.5">
        {/* Base UI's GroupLabel requires a Menu.Group ancestor */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-2 py-1.5 text-left">
            <p className="truncate text-sm font-medium text-foreground">
              {user.name}
            </p>
            <p className="truncate font-normal text-muted-foreground">
              {user.email}
            </p>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {ACCOUNT_LINKS.map((link) => {
          const active = isActivePath(link.href, pathname);
          return (
            <DropdownMenuItem
              key={link.href}
              render={<Link href={link.href} />}
              className={cn(
                "gap-2.5 py-1.5",
                active &&
                  "bg-brand-accent/10 font-medium text-brand-accent focus:bg-brand-accent/10"
              )}
            >
              <link.icon />
              {link.label}
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onClick={onLogout}
          className="gap-2.5 py-1.5"
        >
          <LogOutIcon />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
