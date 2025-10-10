import { useRef, useState, useEffect } from "react";
import app_img from "/app_img.webp";
import app_img2 from "/ebike_hero2.jpg"
import app_img3 from "/ebike_hero3.jpg"

const slides = [
  {
    img: app_img2,
    title: "Get the app and create an account.",
    text: "Download the Breezo Electric app for free, create your account and learn about pricing & ride safety in your area.",
  },
  {
    img: app_img2,
    title: "Start your ride with a Breezo nearby.",
    text: "Starting a ride is easy - scan the QR code on an e-scooter or e-bike to get on your way.",
  },
  {
    img: app_img3,
    title: "Breezo Responsibly.",
    text: "Follow local traffic rules, stick to bike lanes whenever possible and of course, enjoy the ride!",
  },
  {
    img: app_img3,
    title: "Park like a Pro and end your ride.",
    text: "Follow instructions in the app for how to park out of the way of pedestrians, doorways and sidewalks. Once you’ve ended the ride, we’ll charge the card on file with your account.",
  },
];

export default function PlatformUse() {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(slides.length);

  const scrollHandler = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    const slideWidth = slider.firstElementChild.getBoundingClientRect().width;
    const newIndex = Math.round(slider.scrollLeft / slideWidth);
    setCurrentSlide(newIndex);
  };

  const goTo = (i) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const slideWidth = slider.firstElementChild.getBoundingClientRect().width;
    slider.scrollTo({ left: slideWidth * i, behavior: "smooth" });
  };

  const handleKey = (e) => {
    if (e.key === "ArrowRight") goTo(Math.min(currentSlide + 1, totalSlides - 1));
    if (e.key === "ArrowLeft") goTo(Math.max(currentSlide - 1, 0));
  };

  useEffect(() => {
    const slider = sliderRef.current;
    slider?.addEventListener("scroll", scrollHandler);
    window.addEventListener("keydown", handleKey);
    return () => {
      slider?.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("keydown", handleKey);
    };
  }, [currentSlide]);

  return (
    <div className="overflow-x-hidden py-12 lg:py-20 bg-black text-white" id="carousel-lime">
      {/* Header */}
      <div className="mx-auto max-w-screen-xl px-6 mb-8">
        <h2 className="text-3xl font-bold lg:text-4xl">How to Breezo</h2>
      </div>

      {/* Carousel */}
      <div className="mx-auto max-w-screen-xl px-6">
        <div
          ref={sliderRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
          role="listbox"
          tabIndex={0}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="min-w-full sm:min-w-[75%] md:min-w-[55%] lg:min-w-[40%] px-2 snap-center"
              role="option"
            >
              <figure className="space-y-8">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="rounded-2xl w-full h-auto object-cover"
                  loading="lazy"
                />
                <div className="space-y-2">
                  <h4 className="text-blue-400 font-semibold text-lg">
                    {slide.title}
                  </h4>
                  <p className="text-gray-200 leading-relaxed">{slide.text}</p>
                </div>
              </figure>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center items-center mt-8">
          <ul className="flex space-x-3">
            {slides.map((_, i) => (
              <li key={i}>
                <button
                  onClick={() => goTo(i)}
                  className={`w-3 h-3 rounded-full transition-all outline-none ${
                    i === currentSlide
                      ? "bg-blue-400 scale-110"
                      : "bg-gray-400 hover:bg-gray-500"
                  }`}
                ></button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
