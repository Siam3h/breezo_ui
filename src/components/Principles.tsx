
import { useRef, useState, useEffect } from "react";
import app_img2 from "/ebike_hero3.jpg"

const slides = [
  {
    title: "Safety",
    href: "https://www.breezoelectric.com/why/safety",
    img: "https://img.li.me/content/uploads/SAFETY.png?auto=compress&crop=focalpoint&fit=crop&fp-x=0.4786&fp-y=0.3006&h=760&q=80&w=976&s=36a92e78b6c2d82c8c5b31d3d4d29db5",
  },
  {
    title: "Sustainability",
    href: "https://www.breezoelectric.com/why/sustainability",
    img: "https://img.li.me/content/uploads/SUSTAINABILITY_2022-04-21-201141_havc.png?auto=compress&crop=focalpoint&fit=crop&fp-x=0.5&fp-y=0.5&h=760&q=80&w=976&s=d75dd5b22ea51129bb5ce7adb1972947",
  },
  {
    title: "Community",
    href: "https://www.breezoelectric.com/why/community",
    img: "https://img.li.me/content/uploads/COMMUNITY.png?auto=compress&crop=focalpoint&fit=crop&fp-x=0.6178&fp-y=0.3302&h=760&q=80&w=976&s=22d85019581bb5370053b19b11a5a595",
  },
  {
    title: "Innovation",
    href: "https://www.breezoelectric.com/why/innovation",
    img: app_img2,
  },
];

export default function CustomerSegments() {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    const slideWidth = slider.firstElementChild.getBoundingClientRect().width;
    const index = Math.round(slider.scrollLeft / slideWidth);
    setCurrentSlide(index);
  };

  const goTo = (index) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const slideWidth = slider.firstElementChild.getBoundingClientRect().width;
    slider.scrollTo({
      left: slideWidth * index,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) slider.addEventListener("scroll", handleScroll);
    return () => slider?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="space-y-10 lg:space-y-16 bg-slate-50 text-black py-12 lg:py-20" id="core-principles">
      {/* Heading */}
      <div className="box-content mx-auto max-w-screen-xl px-6 text-center space-y-1">
        <div className="text-blue-400 text-lg font-semibold">Why Breezo</div>
        <h2 className="text-3xl lg:text-5xl font-bold leading-tight">Our Core Principles</h2>
      </div>

      {/* Carousel */}
      <div className="box-content mx-auto max-w-screen-xl px-6">
        <div
          ref={sliderRef}
          className="flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth scrollbar-hide"
          tabIndex={0}
          role="listbox"
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="min-w-full sm:min-w-[75%] md:min-w-[55%] lg:min-w-[40%] px-2 snap-center"
              role="option"
            >
              <figure>
                <a href={slide.href} target="_blank" rel="noopener noreferrer">
                  <img
                    src={slide.img}
                    alt={slide.title}
                    className="rounded-2xl w-full h-auto object-cover transition-transform hover:scale-[1.02]"
                    loading="lazy"
                  />
                </a>
                <figcaption className="mt-4 text-center text-lg md:text-xl font-medium">
                  <a
                    href={slide.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {slide.title}
                  </a>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-8">
          <ul className="flex items-center space-x-3">
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
