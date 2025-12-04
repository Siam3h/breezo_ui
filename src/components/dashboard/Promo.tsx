// components/Promo.tsx

import Lottie from "lottie-react";
// ✅ IMPORTANT: Replace 'empty-box.json' with the actual name of your Lottie file.
import noPromoAnimation from "@/assets/lottie/Promo.json";

/**
 * A component to display when there are no active promotions.
 * It shows a message and a playful Lottie animation.
 */
const Promo = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-gray-50 rounded-lg">
      <div className="w-full max-w-xs md:max-w-sm">
        {/* Lottie Animation Player */}
        <Lottie
          animationData={noPromoAnimation}
          loop={true} // Makes the animation play continuously
          className="w-full h-auto"
        />
      </div>

      {/* Message Text */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800">
          No promos at the moment
        </h2>
        <p className="mt-2 text-gray-600">Please check back later!</p>
      </div>
    </div>
  );
};

export default Promo;
