import React, { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

const DEFAULT_CENTER: [number, number] = [36.817223, -1.286389]; // lng, lat
const DEFAULT_ZOOM = 16;

const MAPLIBRE_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

const DynamicUserMap: React.FC = () => {
  const [coords, setCoords] = useState({
    lat: DEFAULT_CENTER[1],
    lng: DEFAULT_CENTER[0],
  });

  const [locationError, setLocationError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      (error) => {
        console.warn("Geolocation Error → using default center:", error.message);

        // Handle gracefully: use DEFAULT_CENTER
        setLocationError(error.message);
        setCoords({
          lat: DEFAULT_CENTER[1],
          lng: DEFAULT_CENTER[0],
        });
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  }, []);

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold">Your Location</h1>

        {loading && (
          <p className="text-sm text-gray-300">Getting your location...</p>
        )}

        {locationError && (
          <p className="text-sm text-breezo-orange">
            Location unavailable — showing default map
          </p>
        )}

        {!loading && (
          <p className="text-sm text-gray-300">
            Lat: {coords.lat.toFixed(6)}, Lng: {coords.lng.toFixed(6)}
          </p>
        )}
      </div>

      <div className="flex-1 relative">
        <Map
          initialViewState={{
            latitude: coords.lat,
            longitude: coords.lng,
            zoom: DEFAULT_ZOOM,
          }}
          mapStyle={MAPLIBRE_STYLE}
          style={{ width: "100%", height: "100%" }}
        >
          <Marker latitude={coords.lat} longitude={coords.lng}>
            <div className="relative">
              <div
                style={{
                  width: 20,
                  height: 20,
                  background: "#F46524",
                  borderRadius: "50%",
                  border: "3px solid #60E24D",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 40,
                  height: 40,
                  background: "rgba(59, 130, 246, 0.2)",
                  borderRadius: "50%",
                  animation: "pulse 2s infinite",
                }}
              />
            </div>
          </Marker>
        </Map>
      </div>

      <style>{`
        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default DynamicUserMap;
