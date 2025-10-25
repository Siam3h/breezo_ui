import pattern from "@/assets/PaPatternDesigns1.jpg";

export default function PatternDivider() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <img
        src={pattern}
        alt="About Us Pattern"
        className="absolute inset-0 w-full h-2/4 object-cover object-center"
      />
 
      {/* Text Overlay */}
      <div
        className="
          relative flex 
          text-white 
          px-6 sm:px-10 lg:px-20
          h-[50vh] sm:h-[45vh] lg:h-[35vh]
        "
      >
        <h1
          className="
            text-4xl sm:text-5xl lg:text-6xl
            font-bold tracking-tight drop-shadow-lg
          "
        >
          About Us
        </h1>
      </div>
    </section>
  );
}
