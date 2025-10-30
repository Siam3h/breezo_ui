"use client";
import React from "react";
import { motion } from "framer-motion";

export default function HowToPartnerSection() {
  const steps = [
    {
      title: "Reach Out",
      description:
        "Contact our partnership team to discuss how we can collaborate for greener cities.",
    },
    {
      title: "Align Vision",
      description:
        "Together, we’ll identify how your goals align with Breezo’s mission for sustainable mobility.",
    },
    {
      title: "Launch Partnership",
      description:
        "Sign up, integrate, and start making an impact with Breezo’s network and technology.",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white font-lexend py-20 px-6 sm:px-12 overflow-hidden">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <p className="text-breezo-green uppercase tracking-[0.25em] text-sm font-semibold mb-3">
          Partner with Breezo
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">
          How to <span className="text-breezo-green">Partner</span>
        </h2>
        <p className="text-gray-300 text-sm sm:text-base">
          Whether you’re a business, institution, or city authority — partnering
          with Breezo is simple, scalable, and impactful.
        </p>
      </motion.div>

      {/* STEPS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 + index * 0.2, ease: "easeOut" }}
            className="bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur-sm shadow-lg hover:bg-white/20 transition-all duration-300 text-center"
          >
            <div className="w-12 h-12 mx-auto mb-5 bg-breezo-green rounded-md flex items-center justify-center text-white font-bold text-lg">
              {index + 1}
            </div>
            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mt-16"
      >
        <button className="bg-breezo-green hover:bg-green-600 text-white font-semibold px-10 py-3 rounded-full shadow-lg transition-all duration-300">
          Become a Partner
        </button>
      </motion.div>
    </section>
  );
}
