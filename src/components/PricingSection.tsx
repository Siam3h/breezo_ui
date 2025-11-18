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

export default function PricingSection() {
  const plans = [
    {
      title: "Pay Per Ride",
      subtitle: "Unlock fee: KES 150",
      price: "KES 10 / minute",
      details: [
        "First 10 minutes free",
        "Best for: Occasional riders, short errands, or first-time users who want flexibility",
        "Includes: Access to any Breezo e-bike or scooter, simple payment via app or e-wallet",
      ],
      gradient: "from-blue-500 to-indigo-700",
    },
    {
      title: "Daily Pass",
      subtitle: "Price: KES 500",
      price: "Unlimited Rides",
      details: [
        "Unlimited rides for 12 hours",
        "Best for: A user who needs mobility for a full day—work, meetings, errands",
        "Includes: As many rides as needed within that 12-hour window.",
      ],
      gradient: "from-blue-500 to-indigo-700",
    },
    {
      title: "Weekly Pass",
      subtitle: "Price: KES 2,350",
      price: "Unlimited Rides",
      details: [
        "Unlimited rides each day for 5 consecutive working days",
        "Best for: Frequent riders (e.g., daily commuters), university students during a busy week, or short-term stay users",
        "Includes: Active for 5 working days",
      ],
      gradient:  "from-blue-500 to-indigo-700",
    },
    {
      title: "Monthly Pass",
      subtitle: "Price: KES 8,500",
      price: "Unlimited Rides",
      details: [
        "Unlimited rides each day for 23 working days",
        "Best for: Regular commuters with a predictable daily schedule—business professionals, campus residents, gig economy workers",
        "Includes: Full month access",
      ],
      gradient: "from-blue-500 to-indigo-700",
    },
    {
      title: "Student Pass",
      subtitle: "Price: KES 5,500 /month",
      price: "Unlimited Rides",
      details: [
        "Same structure as the Monthly Pass",
        "Best for: University and college students with tighter budgets who need daily mobility",
        "Includes: Discounted monthly rate, access to student-only promo periods, possibly campus-located docking stations",
      ],
      gradient: "from-blue-500 to-indigo-700",

    },
    {
      title: "Corporate & Fleet Plans (B2B)",
      subtitle: "Starting from KES 6,000",
      price: "Custom Pricing",
      details: [
        "Corporate Package: KES 8,550 per employee per month",
        "Delivery Rider Plan: KES 7,500 per month",
        "Fleet Leasing: KES 12,000 – KES 15,000 per bike per month",
      ],
      gradient: "from-blue-500 to-indigo-700",
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
        <p className="text-breezo-orange uppercase tracking-[0.25em] text-sm sm:text-base font-lexend font-semibold mb-4">
          moving smarter while spending less
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-lexend text-black leading-tight mb-6 uppercase">
          payment plans
        </h2>
        <p className="text-gray-600 text-sm font-lexend sm:text-base">
          There are many ways to ride and save! Scroll to explore your options
          or check the app. Never overpay for a ride.
        </p>
      </div>

      {/* Carousel */}
      <div ref={sliderRef} className="keen-slider max-w-7xl mx-auto">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`keen-slider__slide font-lexend p-8 shadow-lg text-white bg-gradient-to-br ${plan.gradient}`}
          >
            <h3 className="text-2xl font-lexend font-semibold uppercase mb-2">
              {plan.title}
            </h3>
            <p className="text-sm text-white/90 mb-1 uppercase font-lexend">{plan.subtitle}</p>
            <hr className="border-dotted border-white/60 my-3" />
            <div className="text-3xl font-bold mb-6 uppercase font-lexend">{plan.price}</div>
            <ul className="space-y-4 text-sm text-white/90 font-lexend">
              {plan.details.map((d, j) => (
                <li key={j} className="flex gap-3 items-start">
                  <svg
                    className="w-5 h-5 text-white flex-shrink-0 mt-0.5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {[
          ...Array(instanceRef.current?.track.details.slides.length).keys(),
        ].map((idx) => {
          return (
            <button
              key={idx}
              onClick={() => {
                instanceRef.current?.moveToIdx(idx);
              }}
              className={`w-3 h-3 rounded-full ${
                current === idx
                  ? "bg-breezo-blue scale-125"
                  : "bg-breezo-blue/40"
              }`}
            ></button>
          );
        })}
      </div>
    </section>
  );
}
