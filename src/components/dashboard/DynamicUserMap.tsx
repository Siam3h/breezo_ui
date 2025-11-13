// DynamicUserMap.tsx (MODIFIED)
import React, { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// Import Marker icon images for correct rendering (Leaflet default)
import L from "leaflet";

// Fix for default Leaflet marker icons not appearing in Webpack/Vite setups
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Default center (e.g., Nairobi, Kenya) in case geolocation fails
const DEFAULT_CENTER: [number, number] = [-1.286389, 36.817223];
const DEFAULT_ZOOM = 13;

interface DynamicUserMapProps {
  // You can pass the user's selected pickup/dropoff here later
  // E.g., pickupLocation: [number, number] | null;
}

// --- Map Recenter Component ---
// This is a custom hook component to pan/recenter the map programmatically
const RecenterMap = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, map.getZoom());
    // CRITICAL: Force map to redraw/recalculate size after recentering.
    // This is often needed in React components when the container size changes dynamically.
    const resizeTimeout = setTimeout(() => {
      map.invalidateSize();
    }, 50);
    return () => clearTimeout(resizeTimeout);
  }, [center, map]);
  return null;
};

const DynamicUserMap: React.FC<DynamicUserMapProps> = () => {
  const [position, setPosition] = useState<[number, number]>(DEFAULT_CENTER);
  const [hasLocation, setHasLocation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ... (omitted useEffect for geolocation)

  // Use memo to ensure map container doesn't re-render unnecessarily
  const displayMap = useMemo(
    () => (
      <MapContainer
        center={position}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Recenter the map when the user's location is found */}
        {hasLocation && <RecenterMap center={position} />}

        {/* Place a marker at the user's current or default location */}
        <Marker position={position} title="Your Location">
          {/* You could add a Popup here later */}
        </Marker>
      </MapContainer>
    ),
    [position, hasLocation]
  );

  return (
    // --- START: MODIFIED CONTAINER STYLES ---
    <div
      // Removed mt-6 to reduce space and keep map higher up on mobile
      className="flex-1 relative overflow-hidden md:ml-6 rounded-lg shadow-inner border border-gray-200"
      // FIX: Use a responsive height solution for the scrolling page.
      // On mobile (no md), set a guaranteed height relative to viewport (e.g., 80vh).
      // On desktop (md:), allow flex-1 to take over the remaining space.
      style={{ height: "80vh" }} // Default to 80vh on all screens for simpler implementation.
      // OR: Use TailWind utilities for responsiveness if possible:
      // className="flex-1 relative overflow-hidden h-[80vh] md:h-full md:ml-6 rounded-lg shadow-inner border border-gray-200"
    >
      {/* --- END: MODIFIED CONTAINER STYLES --- */}
      {error && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 p-2 bg-red-100 text-red-700 text-xs rounded shadow z-40">
          {error}
        </div>
      )}
      {/* Render the MapContainer */}
      {displayMap}
    </div>
  );
};

export default DynamicUserMap;
