import React from "react";
import { motion } from "framer-motion";

export default function PricingSection() {
  const plans = [
    {

      title: "Subscriptions",
      subtitle: "Unlimited unlocks + optional minutes",
      price: "From $15 / month",
      details: [
        "Unlimited unlocks",
        "Option to include ride minutes",
        "Cancel anytime",
      ],
      gradient: "from-blue-500 to-indigo-700",
    },
    {
      title: "Minute Bundles",
      subtitle: "Prepaid discounted minutes",
      price: "Save up to 30%",
      details: [
        "Unlimited unlocks included",
        "Pay once, ride anytime",
        "Track usage in the app",
      ],
      gradient: "from-emerald-500 to-green-700",
    },
    {
      title: "Pay-as-You-Go",
      subtitle: "Standard ride rates",
      price: "Unlock + per-minute fare",
      details: [
        "No commitments",
        "Perfect for casual riders",
        "Pay only when you ride",
      ],
      gradient: "from-amber-500 to-orange-700",
    },
    {
      title: "Unlimited Unlocks",
      subtitle: "POPULAR CHOICE",
      price: "Low monthly fee",
      details: [
        "Unlimited unlocks",
        "Pay per trip or use bundles",
        "Best value for frequent riders",
      ],
      gradient: "from-pink-500 to-rose-700",

    },
  ];

  return (
    <section className="bg-white text-gray-900 px-6 py-10 font-lexend">
      {/* Header */}
      <div className="text-center mb-12 max-w-2xl mx-auto">
         <p className="text-breezo-green uppercase tracking-[0.25em] text-sm sm:text-base font-semibold mb-4 font-lexend">
        moving smarter while spending less
      </p>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-lexend text-breezo-green leading-tight mb-6 uppercase">
        payment plans
      </h2>        <p className="text-gray-600 text-sm sm:text-base">
          There are many ways to ride and save! Scroll to explore your options
          or check the app. Never overpay for a ride. Pick a plan that suits you.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            viewport={{ once: true }}
            className={`rounded-2xl shadow-lg p-8 text-white bg-gradient-to-br ${plan.gradient} hover:scale-[1.03] transition-transform duration-300`}
          >
            <h3 className="text-2xl font-semibold mb-2">{plan.title}</h3>
            <p className="text-sm text-white/90 mb-1">{plan.subtitle}</p>
            <hr className="border-white/30 my-3" />
            <div className="text-3xl font-bold mb-6">{plan.price}</div>
            <ul className="space-y-2 text-sm text-white/90">
              {plan.details.map((d, j) => (
                <li key={j} className="flex gap-2 items-start">
                  <span className="w-2 h-2 bg-white rounded-full mt-1"></span>
                  {d}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
