import React from "react";
import { motion } from "framer-motion";

export default function PricingSection() {
  const plans = [
    {
      title: "UNLIMITED UNLOCKS",
      subtitle: "Daily, weekly, or monthly options for regular commuters.",
      details: [

        "Save the unlock fee – every time. Enjoy unlimited unlocks with our most popular Voi Pass subscription, cancel anytime."],
      gradient: "from-emerald-400 to-green-600",
    },
    {
      title: "SUBSCRIPTION MODEL",
      subtitle: "Daily, weekly, or monthly options for regular commuters.",
      price: "From KES 650 / day",
      details: [
        "Unlimited rides",
        "Discounts and perks",
        "Convenient and budget-friendly",
      ],
      gradient: "from-blue-400 to-indigo-600",
    },
    {
      title: "FLEET RENTALS",
      subtitle: "Custom packages for businesses and institutions.",
      price: "Flexible pricing",
      details: [
        "Tailored packages",
        "Reduce transportation costs",
        "Ideal for companies or campuses",
      ],
      gradient: "from-amber-400 to-orange-600",
    },
  ];

  return (
    <section className="bg-white text-gray-900 px-6 py-16 font-lexend">
      {/* Heading */}
      <div className="text-center mb-12">
        <p className="text-breezo-green uppercase tracking-[0.2em] text-xs font-semibold mb-2">
          moving smart while spending less
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-black uppercase">
          Travel your city on a budget
        </h2>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
            className={`rounded-2xl shadow-lg p-8 text-white bg-breezo-blue hover:scale-[1.03] transition-transform duration-300`}
          >
            <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
            <p className="text-sm text-white/90 mb-4">{plan.subtitle}</p>
            <div className="text-3xl font-extrabold mb-6">{plan.price}</div>
            <ul className="space-y-2 text-sm text-white/90">
              {plan.details.map((d, j) => (
                <li key={j} className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-white rounded-full mt-2"></span>
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
