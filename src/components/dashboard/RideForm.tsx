// RideForm.tsx
import {
  MapPin,
  Square,
  Clock,
  User,
  ChevronDown,
  // --- START: ADDED MISSING IMPORTS ---
  Bike, // For the 'Trip' suggestion
  Utensils, // For the 'Eat' suggestion
  Zap, // For the 'Courier' suggestion
  // --- END: ADDED MISSING IMPORTS ---
} from "lucide-react";

const RideForm = () => {
  return (
    // On desktop, it takes a fixed width (md:w-[380px]); on mobile, it takes full width (w-full)
    // Removed shadow and rounded-lg on mobile to match the first image's full-width fields
    <div className="w-full md:w-[380px] p-0 md:p-6 bg-white md:shadow-xl md:rounded-lg h-fit z-10 space-y-2 md:space-y-4">
      {/* 
        NOTE: The original Uber app has a "Pick-up location" text above the input. 
        We use the input placeholder/content itself to match the image structure. 
      */}

      <div className="space-y-2 px-4 pt-4 md:p-0">
        {" "}
        {/* Adjusted padding for mobile */}
        {/* Pickup location */}
        <div className="flex items-center bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition duration-150">
          <MapPin className="w-5 h-5 text-gray-500 mr-3 hidden" />{" "}
          {/* Hidden icon on mobile */}
          <input
            type="text"
            placeholder="Pick-up location"
            className="flex-grow bg-transparent focus:outline-none text-gray-800 placeholder-gray-800 font-medium"
            readOnly
          />
        </div>
        {/* Dropoff location */}
        <div className="flex items-center bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition duration-150">
          <Square className="w-5 h-5 text-gray-500 mr-3 hidden" />{" "}
          {/* Hidden icon on mobile */}
          <input
            type="text"
            placeholder="Drop-off location"
            className="flex-grow bg-transparent focus:outline-none text-gray-800 placeholder-gray-800 font-medium"
            readOnly
          />
        </div>
      </div>

      {/* Pickup now & For me (Side-by-side on mobile) */}
      <div className="flex space-x-2 px-4 md:px-0 pb-4 md:pb-0">
        <div className="flex items-center justify-between w-1/2 bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition duration-150">
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-gray-800 text-sm">Pick up now</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>

        <div className="flex items-center justify-between w-1/2 bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition duration-150">
          <div className="flex items-center">
            <User className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-gray-800 text-sm">For me</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>

      {/* Search Button (Hidden on mobile home page) */}
      <button
        disabled
        className="hidden md:block mt-6 w-full py-3 bg-gray-200 text-gray-500 font-semibold rounded-lg cursor-not-allowed"
      >
        Search
      </button>
    </div>
  );
};

export default RideForm;
