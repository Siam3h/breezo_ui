import FaqSection from "@/components/FaqSection";
import GoalsSection from "@/components/GoalsSection";
import HowToBreezoSection from "@/components/HowToBreezoSection";
import HowToPartnerSection from "@/components/HowToPartnerSection";
import PatternDivider from "@/components/Patterns";
import PatternDivider2 from "@/components/Pattern2";
import PricingSection from "@/components/PricingSection";
import { lazy, Suspense } from "react";

const Header = lazy(() => import("@/components/Header"));
const Hero = lazy(() => import("@/components/Hero"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ImpactSection = lazy(() => import("@/components/ImpactSection"));
const Footer = lazy(() => import("@/components/Footer"));

export default function Index() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <Hero />
        <PatternDivider />
        <AboutSection />
        <ImpactSection />
        <PatternDivider2 />
          <HowToBreezoSection />
     



        <PricingSection />
        <GoalsSection />
        <HowToPartnerSection />
        <FaqSection />
        <Footer />
      </Suspense>
    </div>
  );
}
