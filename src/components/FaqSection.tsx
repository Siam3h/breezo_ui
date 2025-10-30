"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react"; // Assuming you have lucide-react for icons

export default function FaqSection() {
  const [activeTab, setActiveTab] = useState("Riding");
  const [activeIndex, setActiveIndex] = useState(0); // Default first question to be open

  const faqData = {
    Riding: [
      {
        question: "How do I start a ride?",
        answer:
          "Simply download the Breezo app, locate a nearby e-bike or scooter on the map, and scan the QR code on the vehicle to unlock it. Make sure to perform a quick safety check before you go.",
      },
      {
        question: "Where can I park my scooter or e-bike?",
        answer:
          "Please park in designated parking zones, which are clearly marked in the app. Avoid blocking sidewalks, ramps, or building entrances to ensure our cities remain accessible for everyone. Improper parking may result in a penalty fee.",
      },
      {
        question: "Do I need a driver's license to ride?",
        answer:
          "Yes, for our high-speed electric vehicles, a valid driver's license is required. This is to ensure all our riders are familiar with traffic laws and can ride safely. For standard e-bikes, requirements may vary by city, so please check local regulations in the app.",
      },
      {
        question: "Can I ride in the rain?",
        answer:
          "Our vehicles are designed to be water-resistant and can be ridden in light rain. However, for your safety, we advise against riding in heavy rain or stormy conditions as roads can become slippery.",
      },
    ],
    Pricing: [
      {
        question: "How much does it cost to use Breezo?",
        answer:
          "We offer a simple pay-per-ride model which includes a small fee to unlock the vehicle, plus a per-minute rate for your journey. Prices are always shown in the app before you begin your ride. For frequent riders, we also offer daily and monthly passes for better value.",
      },
      {
        question: "Are there subscription plans available?",
        answer:
          "Yes! Our subscription models are perfect for daily commuters. For a flat monthly fee, you get unlimited unlocks and a set number of riding minutes, which is more predictable and cost-effective than paying per ride.",
      },
      {
        question: "How do I pay for my rides?",
        answer:
          "You can easily add a credit or debit card to your account in the app. We also support convenient payment options like Apple Pay and Google Pay for a seamless experience. Rides are charged automatically after you end your trip.",
      },
      {
        question: "Can I rent more than one scooter with my account?",
        answer:
          "Yes, our app allows you to rent multiple vehicles from a single account. This feature is perfect for when you're riding with friends or family. Just follow the prompts in the app to unlock additional scooters.",
      },
    ],
    API: [
      {
        question: "Do you have a developer API?",
        answer:
          "Yes, we provide a REST API for developers and partners who wish to integrate Breezo's services into their own applications. Our API can provide real-time data on vehicle locations, availability, and more.",
      },
      {
        question: "How can I get access to the API?",
        answer:
          "To get an API key and access our documentation, please contact our partnership team through our website. We'll review your use case and provide you with the necessary credentials to get started.",
      },
      {
        question: "What kind of data can I access?",
        answer:
          "Our API provides access to a range of data points, including real-time scooter and e-bike locations, battery levels, and system information. You can query for available vehicles within a specific geographic area to integrate into mapping or transportation services.",
      },
      {
        question: "Is there API documentation available?",
        answer:
          "Absolutely. Once you are approved for API access, you will receive a link to our comprehensive API documentation. It includes detailed guides, examples, and endpoint references to help you with your integration.",
      },
    ],
  };

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const tabs = ["Riding", "Pricing", "API"];

  return (
    <section className="bg-white text-gray-900 font-lexend py-20 px-6 sm:px-12">
      <div className="max-w-3xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Frequently asked questions
          </h2>
          <p className="text-gray-600 text-lg">
            Everything you need to know. Can’t find what you’re looking for?{" "}
            <a
              href="#"
              className="text-breezo-green font-semibold hover:underline"
            >
              Chat to our friendly team!
            </a>
          </p>
        </motion.div>

        {/* CATEGORY TABS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex justify-center items-center gap-2 mb-12 p-1 bg-gray-100 rounded-full"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setActiveIndex(0); // Reset to open the first question of the new tab
              }}
              className={`w-full font-semibold px-4 py-2 rounded-full text-sm transition-colors duration-300 ${
                activeTab === tab
                  ? "bg-white text-gray-800 shadow"
                  : "bg-transparent text-gray-600 hover:bg-white/60"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* FAQ LIST */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {faqData[activeTab].map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center text-left py-6"
                  >
                    <span className="text-lg font-semibold text-gray-800">
                      {faq.question}
                    </span>
                    {activeIndex === index ? (
                      <Minus className="w-5 h-5 text-breezo-green flex-shrink-0" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-gray-600 leading-relaxed pr-8">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
