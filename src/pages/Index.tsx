import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PlatformUse from "@/components/PlatformUse";
import Principles from "@/components/Principles";
import DownloadApp from "@/components/DownloadApp";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <PlatformUse />
      <Principles />
      <DownloadApp />
      <Footer />
    </div>
  );
};

export default Index;
