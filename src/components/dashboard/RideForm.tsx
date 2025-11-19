// RideForm.tsx
import {
  MapPin, // For location fields
  Bike, // For bike station fields
  Square,
  Clock,
  User,
  ChevronDown,
  Utensils,
  Zap,
} from "lucide-react";

const RideForm = () => {
  return (
    <div className="w-full md:w-[380px] p-4 md:p-6 bg-white md:shadow-xl md:rounded-lg h-fit z-10 space-y-3">
      {/* 
        The component is updated with icons for each input field and has reduced padding
        on inputs and the button for a more compact appearance.
      */}

      {/* Pickup location */}
      <div className="flex items-center bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition duration-150 px-4">
        <MapPin className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
        <input
          type="text"
          value="My Location"
          className="flex-grow bg-transparent focus:outline-none text-gray-800 font-medium"
          readOnly
        />
      </div>

      {/* Destination Input Field */}
      <div className="flex items-center bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition duration-150 px-4">
        <MapPin className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
        <input
          type="text"
          placeholder="Destination"
          className="w-full bg-transparent focus:outline-none text-gray-800 placeholder-gray-500 font-medium"
        />
      </div>

      {/* Docking Station Destination Input Field */}
      <div className="flex items-center bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition duration-150 px-4">
        <Bike className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
        <input
          type="text"
          placeholder="Docking Station Destination"
          className="w-full bg-transparent focus:outline-none text-gray-800 placeholder-gray-500 font-medium"
        />
      </div>

      {/* Nearest Docking Station Input Field */}
      <div className="flex items-center bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition duration-150 px-4">
        <Bike className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
        <input
          type="text"
          placeholder="Nearest Docking Station"
          className="w-full bg-transparent focus:outline-none text-gray-800 placeholder-gray-500 font-medium"
        />
      </div>

      {/* Scan and Ride Button */}
      <button className="w-full bg-breezo-green text-white p-2 rounded-sm font-semibold hover:bg-breezo-orange transition duration-150 mt-2">
        Scan and Ride
      </button>
    </div>
  );
};

export default RideForm;
