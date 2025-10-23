import { lazy, Suspense } from "react";
import LoadingScreen from "@/components/LoadingScreen";

const Hero = lazy(() => import("@/components/Hero"));
const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<LoadingScreen />}>
        <Header />
        <Hero />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
