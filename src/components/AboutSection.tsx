import { Button } from "@/components/ui/button";

const AboutSection = () => {
  return (
    <section className="bg-[#FFFEFE] border-t-2 border-breezo-orange py-8 px-6 sm:px-8 lg:px-20 text-center">
      {/* Tagline */}
      <p className="text-breezo-blue uppercase tracking-[0.25em] text-sm sm:text-base font-semibold mb-4">
        Solving your last mile connectivity gap
      </p>

      {/* Main Heading */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-lexend text-gray-900 leading-tight mb-6 uppercase">
        Reimagine How{" "} <br />
        <span className="text-breezo-green font-extrabold drop-shadow-sm">You Move</span>
      </h2>

      {/* Body Text */}
      <p className="max-w-3xl mx-auto text-base sm:text-lg text-gray-700 leading-relaxed text-justify font-lexend">
        <span className="font-semibold text-gray-900">Breezo Electric</span> is a
        Micro Mobility Sharing Platform transforming urban mobility in Kenya.
        We make getting around the city easier and cleaner with our shared
        electric bikes and scooters. Whether commuting, running errands, or
        connecting to public transport, Breezo Electric helps you move faster,
        glide past traffic, and reduce pollution — reimagining sustainable
        mobility for everyone.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 py-8">
        <Button className="bg-breezo-green hover:bg-breezo-green/90 text-white text-base sm:text-lg px-8 py-6 rounded-full shadow-md transition-all duration-300">
          Read More
        </Button>
        <Button
          variant="outline"
          className="border-breezo-green text-breezo-green hover:bg-breezo-green hover:text-white text-base sm:text-lg px-8 py-6 rounded-full transition-all duration-300"
        >
          Download App
        </Button>
      </div>
    </section>
  );
};

export default AboutSection;
