"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LogInIcon,
  RotateCcwIcon,
  TriangleAlertIcon,
  type LucideIcon,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { ApiError } from "@/lib/api/client";
import { cn } from "@/lib/utils";

export const ACCENT_BUTTON_CLASS =
  "bg-brand-accent text-brand-on-accent shadow-sm hover:bg-brand-accent/90 hover:text-brand-on-accent focus-visible:border-brand-accent/40 focus-visible:ring-brand-accent/30";

interface DashboardHeadingProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function DashboardHeading({ title, description, action }: DashboardHeadingProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="min-w-0">
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

interface DashboardMessageProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

/** Centered notice used for empty states. */
export function DashboardMessage({
  icon: Icon,
  title,
  description,
  action,
}: DashboardMessageProps) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-14 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-muted text-muted-foreground">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <h2 className="mt-4 font-heading text-lg font-medium">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

interface DashboardErrorProps {
  error: ApiError;
  onRetry: () => void;
}

/** Load failure. A 401 means the session expired, so it offers sign-in instead of retry. */
export function DashboardError({ error, onRetry }: DashboardErrorProps) {
  const pathname = usePathname();
  const expired = error.status === 401;

  return (
    <div
      role="alert"
      className="flex flex-col items-center rounded-2xl border border-destructive/30 bg-destructive/5 px-6 py-14 text-center"
    >
      <span className="grid size-12 place-items-center rounded-full bg-destructive/10 text-destructive">
        <TriangleAlertIcon className="size-5" aria-hidden="true" />
      </span>
      <h2 className="mt-4 font-heading text-lg font-medium">
        {expired ? "Your session has expired" : "We couldn't load this"}
      </h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        {expired ? "Sign in again to pick up where you left off." : error.message}
      </p>
      <div className="mt-6">
        {expired ? (
          <Link
            href={`/login?next=${encodeURIComponent(pathname)}`}
            className={cn(buttonVariants(), ACCENT_BUTTON_CLASS, "gap-1.5")}
          >
            <LogInIcon aria-hidden="true" />
            Sign in
          </Link>
        ) : (
          <Button type="button" variant="outline" onClick={onRetry} className="gap-1.5">
            <RotateCcwIcon aria-hidden="true" />
            Try again
          </Button>
        )}
      </div>
    </div>
  );
}

export function DashboardListSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-4" aria-busy="true" aria-label="Loading">
      {Array.from({ length: rows }, (_, index) => (
        <Skeleton key={index} className="h-32 rounded-2xl" />
      ))}
    </div>
  );
}
