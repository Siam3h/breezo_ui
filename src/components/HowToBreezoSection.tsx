<<<<<<< HEAD
import { Button } from "@/components/ui/button";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const impactsData = [
  {
    id: "step-download",
    title: "1. Get the Breezo App",
    image: "/breezo_app.webp",
    description:
      "Download the Breezo mobile app, install our PWA from the web, or dial our USSD code to access Breezo services instantly.",
    link: "/start",
  },
  {
    id: "step-find-station",
    title: "2. Locate a Bike Station",
    image: "/bike_station.jpg",
    description:
      "Open the app or use USSD to find the nearest Breezo bike station. Head to the location shown to access available bikes or scooters.",
    link: "/locations",
  },
  {
    id: "step-scan-unlock",
    title: "3. Scan & Unlock",
    image: "/scan_ride.jpg",
    description:
      "Once at the bike station, scan QR to unlock. Ensure you have at least 150 Breezos in your account to begin your ride.",
    link: "/wallet",
  },
  {
    id: "step-ride-return",
    title: "4. Ride & Return",
    image: "/ride_return.jpg",
    description:
      "Enjoy your ride! When done, return the bike to any Breezo station. Scan again, pay for your ride, and lock to complete the trip.",
    link: "/how-it-works",
  },
  {
    id: "step-business",
    title: "For Corporates & Business Fleets",
    image: "/corporate_fleet.jpg",
    description:
      "Looking to power your business fleet with Breezo bikes? Contact our support team for corporate and enterprise fleet solutions.",
    link: "/business",
  },
];

export default function ImpactSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: false,
      mode: "snap",
      slides: { perView: 1.2, spacing: 20 },
      created: (slider) => {
        setLoaded(true);
        slider.on("slideChanged", () => {
          setCurrentSlide(slider.track.details.rel);
        });
      },
      slideChanged: (slider) => {
        setCurrentSlide(slider.track.details.rel);
      },
      breakpoints: {
        "(min-width: 640px)": {
          slides: { perView: 2, spacing: 24 },
        },
        "(min-width: 1024px)": {
          slides: { perView: 3, spacing: 28 },
        },
      },
    },
    []
  );

  const isAtStart = currentSlide === 0;
  const isAtEnd =
    loaded &&
    instanceRef.current &&
    currentSlide === instanceRef.current.track.details.slides.length - 1;

  return (
    <section className="bg-[#0F0F0F] text-white py-16 px-6 sm:px-10 lg:px-20 text-center relative">
      <p className="text-breezo-green uppercase tracking-[0.25em] text-sm sm:text-base font-semibold mb-4 font-lexend">
        unlock freedom on two wheels      </p>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-lexend text-white leading-tight mb-10 uppercase">
        Ride the  <span className="text-breezo-green font-extrabold">Breezo</span>
        <br />    way</h2>

      {/* Carousel Container - relative for arrow positioning */}
      <div ref={sliderRef} className="keen-slider relative">
        {impactsData.map((item) => (
          // FIX: Wrap the slide content in an anchor tag
          <a
            key={item.id}
            href={item.link} // Use the new link property
            className="keen-slider__slide relative cursor-pointer block" // Added block for link to fill container
            aria-label={`Read more about ${item.title}`}
          >
            {/* The slide div content is now inside the link */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[420px] object-cover"
            />
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6 text-left">
              <h3 className="text-xl sm:text-2xl font-bold font-lexend uppercase mb-3 leading-tight">
                {item.title}
              </h3>
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-lexend">
                {item.description}
              </p>
            </div>
          </a>
        ))}

        {/* Floating Arrows */}
        {loaded && instanceRef.current && (
          <>
            <button
              onClick={(e) => {
                // Prevent click from bubbling up to the anchor tag
                e.preventDefault();
                e.stopPropagation();
                instanceRef.current?.prev();
              }}
              disabled={isAtStart}
              aria-label="Previous impact slide"
              className={`absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full 
                         bg-white/10 opacity-30 focus:opacity-100 transition-opacity duration-300 z-10 ml-2 
                         ${isAtStart
                  ? "opacity-10 cursor-not-allowed"
                  : "hover:opacity-100"
                }`}
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={(e) => {
                // Prevent click from bubbling up to the anchor tag
                e.preventDefault();
                e.stopPropagation();
                instanceRef.current?.next();
              }}
              disabled={isAtEnd}
              aria-label="Next impact slide"
              className={`absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full 
                         bg-white/10 opacity-30 focus:opacity-100 transition-opacity duration-300 z-10 mr-2 
                         ${isAtEnd
                  ? "opacity-10 cursor-not-allowed"
                  : "hover:opacity-100"
                }`}
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </>
        )}
      </div>

      {/* Button */}
      <div className="flex justify-center mt-12">
        <Button className="bg-breezo-green hover:bg-breezo-green/90 text-white text-base sm:text-lg px-10 py-6 rounded-none shadow-md transition-all duration-300 font-lexend">
          Download Breezo
        </Button>
      </div>
    </section>
  );
}
