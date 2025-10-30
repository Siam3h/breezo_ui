import FaqSection from "@/components/FaqSection";
import GoalsSection from "@/components/GoalsSection";
import HowToBreezoHeader from "@/components/HowToBreezoHeader";
import HowToBreezoMobile from "@/components/HowToBreezoMobile";
import HowToBreezoSection from "@/components/HowToBreezoSection";
import HowToPartnerSection from "@/components/HowToPartnerSection";
import PatternDivider from "@/components/Patterns";
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

        {/* Desktop version — hidden on small screens */}
        <div className="hidden lg:block">
          <HowToBreezoHeader />
          <HowToBreezoSection />
        </div>

        {/* Mobile version — visible only on small screens */}
        <div className="block lg:hidden">
          <HowToBreezoMobile />
        </div>

        <PricingSection />
        <GoalsSection />
        <HowToPartnerSection />
        <FaqSection />
        <Footer />
      </Suspense>
    </div>
  );
}
