import { Button } from "@/components/ui/button";
import desktopHero from "/ebike_hero4.jpg";
import mobileHero from "/ebike_hero_mobile.png";

const Hero = () => {
  const handleFindBikes = () => {
    window.open("https://maps.google.com/?q=bike+rental+nairobi", "_blank");
  };

  return (
    <section className="relative h-screen overflow-hidden flex items-center justify-center">
      {/* ===== Background Images ===== */}
      <div className="absolute inset-0 -z-10">
        {/* Desktop & Tablet */}
        <img
          src={desktopHero}
          alt="Ebike Hero Background Desktop"
          className="hidden sm:block w-full h-full object-cover object-center transition-opacity duration-700"
        />
        {/* Mobile */}
        <img
          src={mobileHero}
          alt="Ebike Hero Background Mobile"
          className="block sm:hidden w-full h-full object-cover object-center transition-opacity duration-700"
        />

        {/* Gradient overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />
      </div>

      {/* ===== Hero Content ===== */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center text-white px-6 sm:px-8 md:px-12 space-y-6 sm:space-y-8 max-w-3xl pt-24 sm:pt-28 lg:pt-32">
        {/* Main Title */}
        <div className="flex flex-col items-center leading-none">
          <h1 className="font-monoton text-5xl sm:text-6xl lg:text-6xl font-extrabold text-white tracking-tight">
            BREEZO
          </h1>
          <h2 className="font-monoton text-4xl sm:text-4xl lg:text-4xl text-breezo-orange mt-2">
            Electric
          </h2>
        </div>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-[14px] text-grey drop-shadow-md  font-saira">
          Reimagining How You Move
        </p>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleFindBikes}
            className="bg-breezo-green hover:bg-breezo-green-dark text-[#404040] rounded-lg px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base transition duration-300 font-saira"
          >
            Ignite your Ride
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
