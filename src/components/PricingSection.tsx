import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

function AutoplayPlugin({ interval = 3000 } = {}) {
  return (slider) => {
    let timeout;
    let mouseOver = false;

    function clearNextTimeout() {
      clearTimeout(timeout);
    }

    function nextTimeout() {
      clearTimeout(timeout);
      if (mouseOver) return;
      timeout = setTimeout(() => slider.next(), interval);
    }

    slider.on("created", () => {
      slider.container.addEventListener("mouseover", () => {
        mouseOver = true;
        clearNextTimeout();
      });
      slider.container.addEventListener("mouseout", () => {
        mouseOver = false;
        nextTimeout();
      });
      nextTimeout();
    });

    slider.on("dragStarted", clearNextTimeout);
    slider.on("animationEnded", nextTimeout);
    slider.on("updated", nextTimeout);
  };
}

function AutoplayPlugin({ interval = 3000 } = {}) {
  return (slider) => {
    let timeout;
    let mouseOver = false;

    function clearNextTimeout() {
      clearTimeout(timeout);
    }

    function nextTimeout() {
      clearTimeout(timeout);
      if (mouseOver) return;
      timeout = setTimeout(() => slider.next(), interval);
    }

    slider.on("created", () => {
      slider.container.addEventListener("mouseover", () => {
        mouseOver = true;
        clearNextTimeout();
      });
      slider.container.addEventListener("mouseout", () => {
        mouseOver = false;
        nextTimeout();
      });
      nextTimeout();
    });

    slider.on("dragStarted", clearNextTimeout);
    slider.on("animationEnded", nextTimeout);
    slider.on("updated", nextTimeout);
  };
}

export default function PricingSection() {
  const plans = [
    {
      title: "Subscriptions",
      subtitle: "Unlimited unlocks + optional minutes",
      price: "From $15 / month",
      details: ["Unlimited unlocks", "Option to include ride minutes", "Cancel anytime"],
      gradient: "from-blue-500 to-indigo-700",
    },
    {
      title: "Minute Bundles",
      subtitle: "Prepaid discounted minutes",
      price: "Save up to 30%",
      details: ["Unlimited unlocks included", "Pay once, ride anytime", "Track usage in the app"],
      gradient: "from-emerald-500 to-green-700",
    },
    {
      title: "Pay-as-You-Go",
      subtitle: "Standard ride rates",
      price: "Unlock + per-minute fare",
      details: ["No commitments", "Perfect for casual riders", "Pay only when you ride"],
      gradient: "from-amber-500 to-orange-700",
    },
    {
      title: "Unlimited Unlocks",
      subtitle: "POPULAR CHOICE",
      price: "Low monthly fee",
      details: ["Unlimited unlocks", "Pay per trip or use bundles", "Best value for frequent riders"],
      gradient: "from-pink-500 to-rose-700",
    },
  ];

  const [current, setCurrent] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      slideChanged(slider) {
        setCurrent(slider.track.details.rel);
      },
      slides: { perView: 1, spacing: 20 },
      breakpoints: {
        "(min-width: 640px)": { slides: { perView: 2, spacing: 20 } },
        "(min-width: 1024px)": { slides: { perView: 3, spacing: 25 } },
      },
    },
    [AutoplayPlugin({ interval: 3000 })]
  );

  return (
    <section className="bg-white text-gray-900 px-6 py-10 font-lexend">
      {/* Header */}
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <p className="text-breezo-green uppercase tracking-[0.25em] text-sm sm:text-base font-semibold mb-4">
          moving smarter while spending less
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-lexend text-breezo-green leading-tight mb-6 uppercase">
          payment plans
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          There are many ways to ride and save! Scroll to explore your options or check the app.
          Never overpay for a ride.
        </p>
      </div>

      {/* Carousel */}
      <div ref={sliderRef} className="keen-slider max-w-7xl mx-auto">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`keen-slider__slide font-lexend p-8 shadow-lg text-white bg-gradient-to-br ${plan.gradient}`}
          >
            <h3 className="text-2xl font-semibold uppercase mb-2">{plan.title}</h3>
            <p className="text-sm text-white/90 mb-1">{plan.subtitle}</p>
            <hr className="border-dotted border-white/60 my-3" />
            <div className="text-3xl font-bold mb-6">{plan.price}</div>
            <ul className="space-y-2 text-sm text-white/90">
              {plan.details.map((d, j) => (
                <li key={j} className="flex gap-2 items-start">
                  <span className="w-2 h-2 bg-white rounded-full mt-1"></span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {plans.map((_, i) => (
          <button
            key={i}
            onClick={() => instanceRef.current?.moveToIdx(i)}
            className={`w-3 h-3 rounded-full ${
              current === i ? "bg-breezo-green scale-125" : "bg-breezo-green/40"
            }`}
          />
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {plans.map((_, i) => (
          <button
            key={i}
            onClick={() => instanceRef.current?.moveToIdx(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === i
                ? "bg-breezo-green scale-150"
                : "bg-breezo-green/40 hover:bg-breezo-green"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}
