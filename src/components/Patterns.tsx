import pattern from "@/assets/PatternDesigns1.jpg";


export default function PatternDivider() {
  return (
    <div className="relative w-full overflow-hidden flex items-center justify-center px-6 sm:px-10 lg:px-20 py-6 sm:py-8 lg:py-10 border-t-2 border-breezo-orange">
      {/* Pattern Background (repeating horizontally) */}
      <div
        className="absolute inset-0 bg-repeat-x bg-top opacity-90"
        style={{
          backgroundImage: `url(${pattern})`,
          backgroundSize: "auto 100%", // keeps original height, stretches only horizontally
        }}
      />

          </div>
  );
}
