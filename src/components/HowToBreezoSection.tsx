import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

// --- Register the GSAP ScrollTrigger plugin ---
gsap.registerPlugin(ScrollTrigger);

export default function HowToBreezo() {
  const sectionRef = useRef(null); // The main section to be pinned
  const [activeIndex, setActiveIndex] = useState(0);

  const steps = [
    {
      title: "Get the app and create an account",
      description:
        "Download the Breezo app and sign up in minutes. Create your account and verify your details to get started.",
      image: "/app.jpg",
    },
    {
      title: "Start your ride with a nearby vehicle",
      description:
        "Locate an e-bike or scooter, scan the QR code, and unlock instant mobility. Every ride is fast, safe, and 100% electric.",
      image: "/ebike_hero2.jpeg",
    },
    {
      title: "Breezo responsibly",
      description:
        "Park in designated areas, follow city rules, and charge responsibly to help keep our communities clean and traffic-free.",
      image: "/breezo_responsibly.jpg",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;

    // Set up the pinning and animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        start: "top top",
        end: `+=${(steps.length - 1) * 100}%`,
        scrub: 1,
        onUpdate: (self) => {
          // Determine the active step based on scroll progress
          const newIndex = Math.min(
            steps.length - 1,
            Math.floor(self.progress * steps.length)
          );
          setActiveIndex(newIndex);
        },
      },
    });

    // Animate the progress line fill
    tl.to(".progress-line-fill", { height: "100%", ease: "none" }, 0);

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      tl.kill();
    };
  }, [steps.length]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative flex flex-col justify-center bg-white text-gray-900 h-screen py-1 px-6 sm:px-10 lg:px-20 overflow-hidden"
      >
        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl mx-auto lg:gap-x-20">
          {/* CORRECTED Left Side: Steps section now takes up half the screen */}
          <div className="relative w-full lg:w-1/2 flex flex-col justify-center space-y-12">
            {/* Connecting Line */}
            <div className="absolute left-[12px] top-[24px] bottom-[24px] w-0.5 bg-gray-200">
              <div
                className="progress-line-fill w-full bg-breezo-green"
                style={{ height: "0%" }}
              ></div>
            </div>

            {/* Steps Content */}
            {steps.map((step, i) => (
              <div
                key={i}
                className={`relative pl-10 transition-opacity duration-300 ${
                  i === activeIndex ? "opacity-100" : "opacity-30"
                }`}
              >
                {/* Bullet */}
                <div className="absolute left-0 top-0 w-6 h-6 bg-breezo-green rounded-md z-10"></div>

                {/* Text Content */}
                <div>
                  <h3 className="text-xl font-bold font-lexend mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CORRECTED Right Side: Image section now takes up the other half */}
          <div className="relative w-full lg:w-1/2 flex justify-center items-center mt-12 lg:mt-0 h-[70vh] max-h-[550px]">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-full flex justify-center items-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: i === activeIndex ? 1 : 0,
                  scale: i === activeIndex ? 1 : 0.95,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-auto h-full max-w-full object-cover rounded-2xl shadow-xl"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
