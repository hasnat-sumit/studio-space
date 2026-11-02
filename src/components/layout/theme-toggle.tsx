"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

/**
 * Light/dark switch. The icon is chosen by CSS rather than state, because the
 * theme is unknown during server rendering and state would cause a hydration
 * mismatch.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Toggle light or dark theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="size-9 rounded-full text-brand-fg/80 hover:bg-brand-fg/10 hover:text-brand-fg dark:hover:bg-brand-fg/10"
    >
      <MoonIcon className="dark:hidden" aria-hidden="true" />
      <SunIcon className="hidden dark:block" aria-hidden="true" />
    </Button>
  );
}
