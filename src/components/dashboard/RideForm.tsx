"use client";

import { MapPin, Bike } from "lucide-react";
import { useRide } from "@/context/RideContext";
import { useState } from "react";

const RideForm = () => {
  const {
    userLocation,
    nearestStation,
    destinationText,
    setDestinationText,
    destinationSuggestions,
    setSelectedDestination,
    destinationDock,
    setDestinationSuggestions,
  } = useRide();

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="w-full md:w-[380px] p-4 md:p-6 bg-white md:shadow-xl md:rounded-lg h-fit z-10 space-y-4 font-lexend relative">
      {/* MY LOCATION */}
      <div className="flex flex-col">
        <span className="text-gray-500 text-sm mb-1">
          Your Current Location
        </span>
        <div className="flex items-center bg-gray-100 p-2 px-4 rounded">
          <MapPin className="w-5 h-5 text-gray-500 mr-3" />
          <input
            type="text"
            value={userLocation || "Locating..."}
            className="flex-grow bg-transparent focus:outline-none text-gray-800 font-medium"
            readOnly
          />
        </div>
      </div>

      {/* DESTINATION INPUT */}
      <div className="relative flex flex-col">
        <span className="text-gray-500 text-sm mb-1">Destination</span>
        <div className="flex items-center bg-gray-100 p-2 px-4 rounded">
          <MapPin className="w-5 h-5 text-gray-500 mr-3" />
          <input
            type="text"
            placeholder="Destination"
            value={destinationText}
            onFocus={() => setDropdownOpen(true)}
            onChange={(e) => {
              setDestinationText(e.target.value);
              setDropdownOpen(true);
            }}
            className="w-full bg-transparent focus:outline-none text-gray-800 placeholder-gray-500 font-medium"
          />
        </div>

        {/* AUTOCOMPLETE DROPDOWN */}
        {isDropdownOpen && destinationSuggestions.length > 0 && (
          <div className="absolute w-full bg-white shadow-lg border z-20 max-h-52 overflow-y-auto">
            {destinationSuggestions.map((s, i) => (
              <div
                key={i}
                className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => {
                  setDestinationText(s.display_name);
                  setSelectedDestination(s);
                  setDropdownOpen(false);
                  setDestinationSuggestions([]);
                }}
              >
                {s.display_name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DOCKING STATION NEAR DESTINATION */}
      <div className="flex flex-col">
        <span className="text-gray-500 text-sm mb-1">
          Docking Station Near Destination
        </span>
        <div className="flex items-center bg-gray-100 p-2 px-4 rounded">
          <Bike className="w-5 h-5 text-gray-500 mr-3" />
          <input
            type="text"
            value={
              destinationDock
                ? destinationDock.name
                : "Docking Station Destination"
            }
            readOnly
            className="w-full bg-transparent text-gray-800 font-medium"
          />
        </div>
      </div>

      {/* NEAREST DOCKING STATION TO USER */}
      <div className="flex flex-col">
        <span className="text-gray-500 text-sm mb-1">
          Nearest Docking Station To You
        </span>
        <div className="flex items-center bg-gray-100 p-2 px-4 rounded">
          <Bike className="w-5 h-5 text-gray-500 mr-3" />
          <input
            type="text"
            value={
              nearestStation ? nearestStation.name : "Nearest Docking Station"
            }
            readOnly
            className="w-full bg-transparent text-gray-800 font-medium"
          />
        </div>
      </div>

      <button className="w-full bg-breezo-green text-white p-2 font-semibold hover:bg-breezo-orange transition">
        Scan and Ride
      </button>
    </div>
  );
};

export default RideForm;
