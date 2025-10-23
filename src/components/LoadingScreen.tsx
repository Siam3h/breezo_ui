import AnimatedIcon from "./AnimatedIcon";
import bikeAnimation from "@/assets/lottie/bike.json";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-[9999] transition-opacity duration-500">
      <AnimatedIcon animationData={bikeAnimation} size={150} />
      <p className="mt-4 text-gray-700 font-saira font-semibold">
        Igniting your ride...
      </p>
    </div>
  );
}
