import PatternDivider from "@/components/Patterns";
import PricingSection from "@/components/PricingSection";
import HowToBreezo from "@/components/HowToBreezoSection";
import PatternDivider2 from "@/components/Patterns1";
import { lazy } from "react";


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
        <PatternDivider />
        <AboutSection />
        <ImpactSection />
      <PatternDivider2 />
        <HowToBreezo />
        <PricingSection />

        <Footer />
    </div>
  );
}
