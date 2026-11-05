import { Hero } from "@/components/home/hero";
import { FeaturedStudiosSection } from "@/components/home/featured-studios";
import { CategoryExplorer } from "@/components/home/categories";
import { HowItWorks } from "@/components/home/how-it-works";
import { HostGuarantee } from "@/components/home/host-guarantee";
import { HostCta } from "@/components/home/host-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedStudiosSection />
      <CategoryExplorer />
      <HowItWorks />
      <HostGuarantee />
      <HostCta />
    </>
  );
}
