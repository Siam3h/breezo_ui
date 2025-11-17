import React from "react";
import { Button } from "@/components/ui/button";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const impactsData = [
  {
    id: "impact-climate",
    title: "Climate Impact",
    image: "/climate_impact.png",
    description:
      "Each e-bike or scooter ride replaces a fuel-powered trip, directly cutting CO₂ emissions and improving air quality.",
    link: "/impact/climate",
  },
  {
    id: "impact-traffic",
    title: "Reducing Traffic Congestion",
    image: "/reduce_traffic.jpg",
    description:
      "Compact electric transport options help decongest roads, reclaim space, and make commutes smoother.",
    link: "/impact/traffic",
  },
  {
    id: "impact-health",
    title: "Healthy Living",
    image: "/healthy_living.png",
    description:
      "Frequent e-bike and scooter use promotes outdoor activity and better cardiovascular health.",
    link: "/impact/health",
  },
  {
    id: "impact-community",
    title: "Stronger Communities",
    image: "/community.jpeg",
    description:
      "Cleaner, quieter streets build connections and create more livable, people-friendly cities.",
    link: "/impact/community",
  },
];

export default function ImpactSection() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);

  // Slider + Auto Play Plugin
  function AutoSlidePlugin(slider) {
    let timeout;
    let delay = 5000; // 5 seconds

    function clearNextTimeout() {
      clearTimeout(timeout);
    }

    function nextTimeout() {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        slider.next();
      }, delay);
    }

    slider.on("created", () => {
      nextTimeout();
    });

    slider.on("dragStarted", clearNextTimeout);
    slider.on("animationEnded", nextTimeout);
    slider.on("updated", nextTimeout);
  }

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      mode: "snap",
      slides: { perView: 1.2, spacing: 20 },
      created: (slider) => {
        setLoaded(true);
        slider.on("slideChanged", () =>
          setCurrentSlide(slider.track.details.rel)
        );
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
    [AutoSlidePlugin]
  );

  return (
    <section className="bg-[#0F0F0F] text-white py-16 px-6 sm:px-10 lg:px-20 text-center relative">
      <p className="text-breezo-green uppercase tracking-[0.25em] text-sm sm:text-base font-semibold mb-4 font-lexend">
        Driving a cleaner, healthier, connected future
      </p>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-lexend leading-tight mb-10 uppercase">
        The <span className="text-breezo-green font-extrabold">Impact</span> of Our Rides
      </h2>

      {/* Slider */}
      <div ref={sliderRef} className="keen-slider relative overflow-visible">
        {impactsData.map((item) => (
          <a
            key={item.id}
            href={item.link}
            className="keen-slider__slide block rounded-none bg-white text-left shadow-md overflow-hidden transform transition hover:-translate-y-1 cursor-pointer"
          >
            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[250px] object-cover"
            />

            {/* CONTENT */}
            <div className="p-5 text-black">
              <h3 className="text-xl sm:text-2xl font-bold font-lexend uppercase mb-3">
                {item.title}
              </h3>

              <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-lexend">
                {item.description}
              </p>

              <span className="mt-4 inline-block text-breezo-green font-semibold font-lexend">
                Read More →
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* DOTS */}
      {loaded && instanceRef.current && (
        <div className="flex justify-center gap-2 mt-6">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === idx
                  ? "bg-breezo-green scale-125"
                  : "bg-gray-500/50"
              }`}
            />
          ))}
        </div>
      )}

      {/* CTA Button */}
      <div className="flex justify-center mt-12">
        <Button className="bg-breezo-green hover:bg-breezo-green/90 text-white text-base sm:text-lg px-10 py-6 rounded-none shadow-md font-lexend">
          Learn More
        </Button>
      </div>
    </section>
  );
}

