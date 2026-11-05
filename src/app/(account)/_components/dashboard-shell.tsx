"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ServerOffIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { isApiConfigured } from "@/lib/api/client";
import { ACCOUNT_LINKS, activeAccountHref } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { DashboardMessage } from "./dashboard-states";

const WRAPPER_CLASS =
  "mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 sm:py-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10 lg:px-8";

/** Auth guard + section navigation for every signed-in route. */
export function DashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isPending } = useAuth();
  const configured = isApiConfigured();
  const shouldRedirect = configured && !isPending && !user;

  useEffect(() => {
    if (shouldRedirect) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [shouldRedirect, router, pathname]);

  if (!configured) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
        <DashboardMessage
          icon={ServerOffIcon}
          title="The dashboard needs the backend"
          description="Set NEXT_PUBLIC_API_URL (see .env.example) and start the API to sign in and manage studios and bookings."
        />
      </div>
    );
  }

  if (isPending || !user) return <DashboardShellFallback />;

  const activeHref = activeAccountHref(pathname);

  return (
    <div className={WRAPPER_CLASS}>
      <nav aria-label="Dashboard" className="min-w-0">
        <ul className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:sticky lg:top-24 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
          {ACCOUNT_LINKS.map((link) => {
            const active = link.href === activeHref;
            return (
              <li key={link.href} className="shrink-0">
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm whitespace-nowrap outline-none transition-colors focus-visible:ring-3 focus-visible:ring-brand-accent/40",
                    active
                      ? "bg-brand-accent/10 font-medium text-brand-accent"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <link.icon className="size-4 shrink-0" aria-hidden="true" />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="min-w-0">{children}</div>
    </div>
  );
}

export function DashboardShellFallback() {
  return (
    <div className={WRAPPER_CLASS} aria-busy="true">
      <Skeleton className="hidden h-52 rounded-xl lg:block" />
      <div className="flex flex-col gap-4">
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-40 rounded-2xl" />
        <Skeleton className="h-40 rounded-2xl" />
      </div>
    </div>
  );
}
