"use client";
import React from "react";
import { ParallaxProvider, ParallaxBanner } from "react-scroll-parallax";
import { motion } from "framer-motion";

export default function GoalsSection({
  backgroundImage = "/eco_friendly_bikes1.png", // 👈 Replaceable background
}) {
  const goals = [
    {
      title: "Sustainable Urban Mobility",
      description:
        "Empowering cities to reduce emissions by making electric transportation accessible, affordable, and stylish.",
    },
    {
      title: "Community Connection",
      description:
        "Building a strong community of riders who share a passion for greener cities and smarter commutes.",
    },
    {
      title: "Innovation in Motion",
      description:
        "Constantly improving our tech and design to make every Breezo ride smoother, safer, and more enjoyable.",
    },
    {
      title: "Eco-Friendly Growth",
      description:
        "Scaling responsibly — ensuring that as Breezo grows, we continue to care for our planet and future generations.",
    },
  ];

  return (
    <ParallaxProvider>
      <ParallaxBanner
        layers={[
          {
            image: backgroundImage,
            speed: -20,
            scale: [1.05, 1.1],
            opacity: [0.9, 1],
          },
          {
            speed: 0,
            children: (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
            ),
          },
        ]}
        style={{ minHeight: "520px" }}
        className="relative overflow-hidden"
      >
        {/* ---------- DESKTOP ---------- */}
        <section className="hidden sm:block relative z-10 w-full max-w-5xl mx-auto px-10 py-20 text-center text-white">
          <div className="mb-12">
            <p className="text-breezo-green uppercase tracking-[0.25em] text-sm font-semibold mb-3 font-lexend">
              Our Vision in Motion
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold font-lexend uppercase">
              OUR <span className="text-breezo-green">Goals</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {goals.map((goal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex flex-col items-center text-center hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-10 h-10 mb-4 bg-breezo-green rounded-md flex items-center justify-center text-white font-bold text-lg">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold mb-2 font-lexend">
                  {goal.title}
                </h3>
                <p className="text-gray-200 text-sm leading-relaxed">
                  {goal.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
        {/* ---------- MOBILE ---------- */}
        <section className="sm:hidden relative z-10 w-full px-6 pt-10 text-white font-lexend">
          <div className="text-center mb-10">
            <p className="text-breezo-green uppercase tracking-[0.2em] text-xs font-semibold mb-2">
              Our Vision in Motion
            </p>
            <h2 className="text-3xl font-bold">
              Our <span className="text-breezo-green">Goals</span>
            </h2>
          </div>

          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-2">
            {goals.map((goal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                whileTap={{ scale: 0.97 }}
                className="snap-center flex-shrink-0 w-[85%] min-h-[320px] bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-lg flex flex-col justify-center"
              >
                <div className="w-8 h-8 mb-3 bg-breezo-green rounded-md flex items-center justify-center text-white font-semibold">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold mb-2">{goal.title}</h3>
                <p className="text-gray-200 text-sm leading-relaxed">
                  {goal.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </ParallaxBanner>
    </ParallaxProvider>
  );
}
