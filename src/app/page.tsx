import { Hero } from "@/components/home/hero";
import { FeaturedStudiosSection } from "@/components/home/featured-studios";
import { CategoryExplorer } from "@/components/home/categories";
import { HowItWorks } from "@/components/home/how-it-works";
import { HostCta } from "@/components/home/host-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedStudiosSection />
      <CategoryExplorer />
      <HowItWorks />
      <HostCta />
    </>
  );
}
