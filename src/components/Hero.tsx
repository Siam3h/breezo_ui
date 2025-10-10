import ebike_hero from "/ebike_hero1.jpg";

const Hero = () => {
  const handleFindBikes = () => {
    window.open("https://maps.google.com/?q=bike+rental+nairobi", "_blank");
  };

  const handleDownloadApp = () => {
    window.open("https://play.google.com/store", "_blank");
  };

  return (
    <section className="relative h-[100vh] overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <img
          src={ebike_hero}
          alt="Ebike hero background"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Hero content */}
      <div className="sticky top-1/4 z-20 flex flex-col items-center justify-center text-center text-white space-y-8 max-h-[calc(100vh-14rem)]">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">
          Ride Breezo
        </h1>

        {/* Buttons */}
      <div className="flex justify-center gap-4">
        {/* Locations button */}
        <button
          onClick={handleFindBikes}
          className="px-6 py-2 rounded-full border-2 border-white text-white font-semibold transition duration-300 hover:bg-white hover:text-blue-600"
        >
          Locations
        </button>

        {/* Download App button */}
        <button
          onClick={handleDownloadApp}
          className="px-6 py-2 rounded-full bg-blue-500 text-white font-semibold transition duration-300 hover:bg-white hover:text-blue-600"
        >
          Download the App
        </button>
      </div>
    </div>
    </section >
  );
};

export default Hero;
