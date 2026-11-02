import { Suspense } from "react";
import type { Metadata } from "next";
import { DashboardShell, DashboardShellFallback } from "./_components/dashboard-shell";

export const metadata: Metadata = {
  title: "Dashboard - StudioSpace",
  robots: { index: false, follow: false },
};

/**
 * Everything under `/dashboard` is client-rendered behind the auth guard in
 * `DashboardShell`. The guard is for UX only: the API authorizes every request.
 * Suspense is required because the shell reads `usePathname()` (see the note on
 * dynamic params in `src/app/layout.tsx`).
 */
export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  return (
    <Suspense fallback={<DashboardShellFallback />}>
      <DashboardShell>{children}</DashboardShell>
    </Suspense>
  );
}
