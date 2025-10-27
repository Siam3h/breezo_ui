import PatternDivider from "@/components/Patterns";
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
        <Footer />
      </Suspense>
    </div>
  );
}
