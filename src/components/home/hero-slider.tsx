"use client";

import { A11y, Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { HERO_SLIDES, HeroSlide } from "@/components/home/hero-slide";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/** Swiper reads its colors from these variables. */
const SWIPER_THEME = {
  "--swiper-theme-color": "var(--brand-accent)",
  "--swiper-navigation-color": "var(--brand-cream)",
  "--swiper-navigation-size": "28px",
  "--swiper-pagination-bullet-inactive-color": "var(--brand-cream)",
  "--swiper-pagination-bullet-inactive-opacity": "0.5",
} as React.CSSProperties;

/** Autoplay moves the page on its own, so it stays off for people who ask for less motion. */
function pauseForReducedMotion(swiper: SwiperInstance) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    swiper.autoplay?.stop();
  }
}

export default function HeroSlider() {
  return (
    <Swiper
      modules={[A11y, Autoplay, Keyboard, Navigation, Pagination]}
      loop
      // Phones swipe, and arrows would sit on top of the text.
      navigation={{ enabled: false }}
      breakpoints={{ 640: { navigation: { enabled: true } } }}
      keyboard={{ enabled: true }}
      pagination={{ clickable: true }}
      autoplay={{ delay: 6000, pauseOnMouseEnter: true, disableOnInteraction: false }}
      onSwiper={pauseForReducedMotion}
      style={SWIPER_THEME}
    >
      {HERO_SLIDES.map((slide, index) => (
        <SwiperSlide key={slide.eyebrow}>
          <HeroSlide slide={slide} priority={index === 0} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
