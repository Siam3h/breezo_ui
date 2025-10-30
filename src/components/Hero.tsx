import { Button } from "@/components/ui/button";
import desktopHero from "/ebike_hero41.webp";
import mobileHero from "/ebike_hero_mobile.webp";
import LoadingScreen from "./LoadingScreen";
import { useState, useEffect } from "react";
import AlternatingTagline from "./AlternatingTagline";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    // Set initial mobile state and preload appropriate image
    const imageSrc = isMobile ? mobileHero : desktopHero;

    // Check if image is already cached
    const img = new Image();
    img.src = imageSrc;

    if (img.complete) {
      setIsLoaded(true);
    } else {
      img.onload = () => setIsLoaded(true);
    }

    // Handle resize with debounce
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setIsMobile(window.innerWidth < 640);
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Only run once on mount

  const handleFindBikes = () => {
    window.open("https://maps.google.com/?q=bike+rental+nairobi", "_blank");
  };

  return (
    <>
      {/* Show loading screen until image is loaded */}
      {!isLoaded && <LoadingScreen />}

      <section
        className={`relative h-[100dvh] overflow-hidden flex items-center justify-center transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Background Images */}
        <div className="fixed inset-0 -z-10 ">
          <picture>
            <source media="(max-width: 639px)" srcSet={mobileHero} />
            <img
              src={desktopHero}
              alt="Ebike Hero"
              className="w-full h-full object-cover object-center"
              loading="eager"
              fetchpriority="high"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center text-white px-6 sm:px-8 md:px-12 space-y-6 max-w-3xl pt-24 sm:pt-28 lg:pt-32">
          <div className="flex flex-col items-center leading-none">
            <h1 className="font-monoton text-5xl sm:text-6xl lg:text-6xl font-extrabold tracking-tight">
              BREEZO
            </h1>
            <h2 className="font-monoton text-4xl sm:text-4xl lg:text-4xl text-breezo-orange mt-2">
              Electric
            </h2>
          </div>
          <div className="text-base text-left sm:text-[14px] md:text-[16px] text-gray-200 drop-shadow-md font-saira">
            <AlternatingTagline />
          </div>
          <div className="flex justify-center">
            <Button
              onClick={handleFindBikes}
              className="bg-breezo-green hover:bg-breezo-green-dark text-[#404040] rounded-lg px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base transition duration-300 font-saira"
            >
              Ignite your Ride
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
