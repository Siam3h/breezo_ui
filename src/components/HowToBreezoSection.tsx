import { Button } from "@/components/ui/button";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useState } from "react";

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
    image: "/ride_scan.jpg",
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
      loop: true,
      mode: "snap",
      slides: { perView: 1.1, spacing: 20 },
      created: (slider) => {
        setLoaded(true);
        slider.on("slideChanged", () =>
          setCurrentSlide(slider.track.details.rel)
        );
      },
      slideChanged: (slider) =>
        setCurrentSlide(slider.track.details.rel),
      breakpoints: {
        "(min-width: 640px)": {
          slides: { perView: 2, spacing: 24 },
        },
        "(min-width: 1024px)": {
          slides: { perView: 3, spacing: 30 },
        },
      },
    },
    []
  );

  // 🔄 Auto-slide every 5 seconds
  useEffect(() => {
    if (!instanceRef.current) return;

    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 5000);

    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <section className="bg-[#0F0F0F] text-white py-16 px-6 sm:px-10 lg:px-20 text-center">

      <p className="text-breezo-green uppercase tracking-[0.25em] text-sm sm:text-base font-semibold mb-4 font-lexend">
        unlock freedom on two wheels
      </p>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-lexend text-white leading-tight mb-10 uppercase">
        Ride the <span className="text-breezo-green font-extrabold">Breezo</span>
        <br /> way
      </h2>

      {/* Slider */}
      <div ref={sliderRef} className="keen-slider">
        {impactsData.map((item) => (
          <a
            key={item.id}
            href={item.link}
            className="keen-slider__slide block"
          >
            {/* Card container */}
            <div className="bg-white rounded-none shadow-md overflow-hidden text-left">

              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[350px] object-cover"
              />

              {/* Text Section */}
              <div className="p-5">
                <h3 className="text-xl font-semibold font-lexend text-black mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-sm sm:text-base font-lexend leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* 🔘 Dots */}
      {loaded && instanceRef.current && (
        <div className="flex justify-center mt-6 space-x-3">
          {impactsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === idx
                  ? "bg-breezo-green scale-110"
                  : "bg-gray-500/50 hover:bg-white"
              }`}
            ></button>
          ))}
        </div>
      )}

      {/* CTA Button */}
      <div className="flex justify-center mt-12">
        <Button className="bg-breezo-green hover:bg-breezo-green/90 text-white text-base sm:text-lg px-10 py-6 rounded-none shadow-md font-lexend">
          Download Breezo
        </Button>
      </div>
    </section>
  );
}

