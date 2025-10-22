import { Button } from "@/components/ui/button";
import desktopHero from "/ebike_hero4.webp";
import mobileHero from "/ebike_hero_mobile.webp";
import LoadingScreen from "@/components/LoadingScreen";
import React, { useState, useEffect } from "react";

const MINIMUM_DISPLAY_TIME = 2000; // 2 seconds

const Hero = () => {
  const [isHeroImageLoaded, setIsHeroImageLoaded] = useState(false);
  const [isMinimumTimeElapsed, setIsMinimumTimeElapsed] = useState(false);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false); // New state to control the upwards animation

  // Check if both conditions are met to begin the exit animation
  const isReadyToAnimateOut = isHeroImageLoaded && isMinimumTimeElapsed;

  useEffect(() => {
    // 1. Minimum Time Timer
    const timer = setTimeout(() => {
      setIsMinimumTimeElapsed(true);
    }, MINIMUM_DISPLAY_TIME);

    // 2. Image Pre-loading Logic
    const desktopImg = new Image();
    const mobileImg = new Image();
    desktopImg.src = desktopHero;
    mobileImg.src = mobileHero;

    let loadedCount = 0;
    const totalImages = 2;

    const checkLoadStatus = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        setIsHeroImageLoaded(true);
      }
    };

    desktopImg.onload = checkLoadStatus;
    desktopImg.onerror = checkLoadStatus;
    mobileImg.onload = checkLoadStatus;
    mobileImg.onerror = checkLoadStatus;

    // Cleanup function
    return () => {
      clearTimeout(timer);
      desktopImg.onload = null;
      desktopImg.onerror = null;
      mobileImg.onload = null;
      mobileImg.onerror = null;
    };
  }, []);

  // 3. Control Exit Animation and Unmounting
  useEffect(() => {
    if (isReadyToAnimateOut && isLoaderVisible) {
      setIsExiting(true); // Trigger the upwards animation

      // Wait for the CSS transition to finish (700ms from LoadingScreen.tsx)
      const animationEndTimer = setTimeout(() => {
        setIsLoaderVisible(false); // Unmount the LoadingScreen after animation
        setIsExiting(false); // Reset exiting state
      }, 700); // This must match the duration in LoadingScreen's CSS transition

      return () => clearTimeout(animationEndTimer);
    }
  }, [isReadyToAnimateOut, isLoaderVisible]);

  const handleFindBikes = () => {
    window.open("https://maps.google.com/?q=bike+rental+nairobi", "_blank");
  };

  return (
    <React.Fragment>
      {/* Conditionally render the LoadingScreen */}
      {isLoaderVisible && <LoadingScreen isExiting={isExiting} />}

      {/* Render the Hero content */}
      <section className="relative h-[100dvh]  overflow-hidden flex items-center justify-center">
        {/* ===== Background Images ===== */}
        <div className="fixed inset-0 -z-10">
          {/* Desktop & Tablet */}
          <img
            src={desktopHero}
            alt="Ebike Hero Background Desktop"
            className="hidden sm:block w-full h-full object-cover object-center transition-opacity duration-700"
          />
          {/* Mobile */}
          <img
            src={mobileHero}
            alt="Ebike Hero Background Mobile"
            className="block sm:hidden w-full h-full object-cover object-center transition-opacity duration-700"
          />

          {/* Gradient overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />
        </div>

        {/* ===== Hero Content ===== */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center text-white px-6 sm:px-8 md:px-12 space-y-6 sm:space-y-8 max-w-3xl pt-24 sm:pt-28 lg:pt-32">
          {/* Main Title */}
          <div className="flex flex-col items-center leading-none">
            <h1 className="font-monoton text-5xl sm:text-6xl lg:text-6xl font-extrabold text-white tracking-tight">
              BREEZO
            </h1>
            <h2 className="font-monoton text-4xl sm:text-4xl lg:text-4xl text-breezo-orange mt-2">
              Electric
            </h2>
          </div>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-[14px] text-grey drop-shadow-md  font-saira">
            Reimagining How You Move
          </p>

          {/* CTA Button */}
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
    </React.Fragment>
  );
};

export default Hero;
