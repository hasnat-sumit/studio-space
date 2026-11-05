import { Suspense } from "react";
import type { Metadata } from "next";
import { DashboardShell, DashboardShellFallback } from "@/app/(account)/_components/dashboard-shell";

export const metadata: Metadata = {
  title: "Dashboard - StudioSpace",
  robots: { index: false, follow: false },
};

/**
 * Every signed-in page is client-rendered behind the auth guard in
 * `DashboardShell`. The guard is for UX only: the API authorizes every request.
 * Suspense is required because the shell reads `usePathname()` (see the note on
 * dynamic params in `src/app/layout.tsx`).
 */
export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<DashboardShellFallback />}>
      <DashboardShell>{children}</DashboardShell>
    </Suspense>
  );
}
