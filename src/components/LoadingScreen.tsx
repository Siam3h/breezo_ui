// src/components/LoadingScreen.tsx
import React from "react";
import AnimatedIcon from "./AnimatedIcon";
import bikeAnimation from "@/assets/lottie/bike.json";

// We'll now accept an 'isExiting' prop to control the animation
export default function LoadingScreen({ isExiting }) {
  return (
    <div
      className={`flex flex-col items-center justify-center h-screen w-screen bg-white z-[9999] fixed top-0 left-0 transition-transform duration-700 ease-in-out ${
        isExiting ? "-translate-y-full" : "translate-y-0"
      }`}
      // The onTransitionEnd is less critical here since Hero will control the unmount
    >
      {/* Animated Bike Loader */}
      <AnimatedIcon animationData={bikeAnimation} size={150} />

      {/* Optional: Add a text message */}
      <p className="mt-4 text-gray-700 font-saira font-semibold">
        Igniting your ride...
      </p>
    </div>
  );
}
