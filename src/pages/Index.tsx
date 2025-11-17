import Pattern from "@/components/Patterns";
import Pattern2 from "@/components/PatternDivider";
import PricingSection from "@/components/PricingSection";
import HowToBreezo from "@/components/HowToBreezoSection";
import { lazy } from "react";
import FaqSection from "@/components/FaqSection";

const Header = lazy(() => import("@/components/Header"));
const Hero = lazy(() => import("@/components/Hero"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ImpactSection = lazy(() => import("@/components/ImpactSection"));
const Footer = lazy(() => import("@/components/Footer"));

export default function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Pattern />
      <AboutSection />
      <ImpactSection />
       <div className="w-full border-t border-double border-gray-300" />
      <HowToBreezo />
      <Pattern2 />
      <PricingSection />
      <FaqSection />
      <Footer />
    </div>
  );
}
