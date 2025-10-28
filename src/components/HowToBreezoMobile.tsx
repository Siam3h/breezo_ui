import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HowToBreezoMobile() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  // NEW: State to track the exact scroll progress (0.0 to 1.0)
  const [scrollProgress, setScrollProgress] = useState(0);

  const steps = [
    {
      title: "Get the app and create an account",
      description:
        "Download the Breezo app and register in minutes. Verify your details to start your eco-friendly journeys anytime.",
      image: "/app.jpg",
    },
    {
      title: "Start your ride with a nearby vehicle",
      description:
        "Find a Breezo e-bike or scooter near you using the map. Scan, unlock, and enjoy fast, electric rides across the city.",
      image: "/ebike_hero2.jpeg",
    },
    {
      title: "Breezo responsibly",
      description:
        "Park at designated spots, obey local rules, and help keep your city greener, cleaner, and less congested.",
      image: "/breezo_responsibly.jpg",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${steps.length * 100}%`,
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          // UPDATE: Set the precise scroll progress on every scroll update
          setScrollProgress(self.progress);

          // This logic remains for swapping the text and images
          const newIndex = Math.min(
            steps.length - 1,
            Math.floor(self.progress * steps.length)
          );
          setActiveIndex(newIndex);
        },
      },
    });

    // Animate the progress bar fill based on the timeline's progress
    tl.to(".progress-line-fill", { width: "100%", ease: "none" }, 0);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
    };
  }, [steps.length]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white text-gray-900 p-6 h-screen flex flex-col font-lexend"
    >
      {/* Header */}
      <div className="text-center pt-8">
        <p className="text-breezo-green uppercase tracking-[0.2em] text-xs font-semibold mb-2">
          Step-by-step guide
        </p>
        <h2 className="text-3xl font-bold">
          How to <span className="text-breezo-green">Breezo</span>
        </h2>
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-grow py-8">
        {/* Progress Bar and Step Markers */}
        <div className="relative w-full h-2 bg-gray-200 rounded-full mb-8">
          <div className="progress-line-fill absolute left-0 top-0 h-full bg-breezo-green rounded-full"></div>
          <div className="absolute inset-0 flex justify-between items-center px-0.5">
            {steps.map((_, i) => {
              // Calculate the exact progress point (0, 0.5, 1 for 3 steps) for each marker
              const markerThreshold =
                steps.length > 1 ? i / (steps.length - 1) : 0;

              return (
                <div
                  key={i}
                  // CORRECTED LOGIC: Check against precise scroll progress
                  className={`w-4 h-4 rounded-md transition-colors duration-200 ${
                    scrollProgress >= markerThreshold
                      ? "bg-breezo-green"
                      : "bg-gray-300"
                  }`}
                ></div>
              );
            })}
          </div>
        </div>

        {/* Animated Step Text */}
        <div className="flex flex-col items-center text-center px-2">
          <motion.h3
            key={`${activeIndex}-title`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-lg font-bold mb-3 h-14" // Fixed height prevents layout shifts
          >
            {steps[activeIndex].title}
          </motion.h3>
          <motion.p
            key={`${activeIndex}-desc`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-gray-600 text-base leading-relaxed h-24" // Fixed height
          >
            {steps[activeIndex].description}
          </motion.p>
        </div>

        {/* Image Display */}
        <div className="relative w-full flex-grow mt-auto flex justify-center items-center overflow-hidden min-h-[250px]">
          {steps.map((step, i) => (
            <motion.img
              key={i}
              src={step.image}
              alt={step.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: i === activeIndex ? 1 : 0,
                scale: i === activeIndex ? 1 : 0.95,
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute w-full h-full object-cover rounded-2xl shadow-lg"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
