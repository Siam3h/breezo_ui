// src/components/AboutSection.tsx
import React from "react";
import { Button } from "@/components/ui/button";

const AboutSection = () => {
  return (
    <section className="bg-breezo-orange text-white py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-16">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="font-monoton text-2xl sm:text-2xl lg:text-3xl font-bold mb-6 leading-tight">
            Reimagining How You Move
          </h2>
          <p className="font-saira text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-8">
            Breezo Electric is a Micro Mobility Sharing Platform transforming
            Urban mobility in Kenya. We make getting around the city easier and
            cleaner with our shared electric bikes and scooters. Whether
            commuting, running errands or connecting to public transport, Breezo
            Electric helps you get to your destination faster, glide past the
            traffic while cutting down on pollution.
          </p>

          {/* Single Button */}
          <Button className="bg-breezo-green hover:bg-breezo-green-dark text-[#404040] rounded-lg px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base transition duration-300 font-saira">
            Read More
          </Button>
        </div>

        {/* Landscape Image */}
        <div className="flex-1 flex justify-center md:justify-end">
          <img
            src="/ebike_hero2.jpeg" // ✅ put your landscape image here
            alt="Electric bike landscape"
            className="w-full max-w-[550px] md:max-w-[550px] h-auto object-cover rounded-2xl shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
