"use client";

import dynamic from "next/dynamic";
import { HERO_SLIDES, HeroSlide } from "@/components/home/hero-slide";

/**
 * Swiper's markup differs between the prerendered page and the browser, which
 * fails hydration in production builds. So the first slide is server-rendered
 * as plain markup, and the slider takes over from it once the browser has it.
 */
const HeroSlider = dynamic(() => import("@/components/home/hero-slider"), {
  ssr: false,
  loading: () => <HeroSlide slide={HERO_SLIDES[0]} priority />,
});

export function Hero() {
  return (
    <section aria-label="Featured creative spaces" className="relative bg-charcoal">
      <h1 className="sr-only">StudioSpace: book creative studios by the hour</h1>
      <HeroSlider />
    </section>
  );
}
