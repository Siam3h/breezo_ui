import { lazy, Suspense } from "react";

const Hero = lazy(() => import("@/components/Hero"));
const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <div className="min-h-screen">
        <Header />
        <Hero />
        <Footer />
      </div>
  );
};

export default Index;
