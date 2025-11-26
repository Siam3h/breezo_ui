import React, { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import apiClient from "@/lib/apiClient";

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

  const [stations, setStations] = useState<any[]>([]);
  const [stationError, setStationError] = useState<string | null>(null);

  // Fetch stations
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const res = await apiClient.get("/docks/stations");
        console.log(res);
        const items = res.data?.data || [];
        setStations(items);
      } catch (error: any) {
        setStationError("Failed to load stations");
      }
    };

    fetchStations();
  }, []);

  // User geolocation logic
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
    <div className="w-full h-screen flex flex-col font-lexend">
      {/* STATUS TEXT */}
      <div className="text-breezo-orange p-2 text-sm">
        {loading && <p>Getting your location...</p>}

        {locationError && (
          <p className="text-breezo-orange">
            Location unavailable — showing default location
          </p>
        )}

        {!loading && (
          <p className="text-breezo-blue">
            Lat: {coords.lat.toFixed(6)}, Lng: {coords.lng.toFixed(6)}
          </p>
        )}

        {stationError && <p className="text-red-400">{stationError}</p>}
      </div>

      {/* MAP */}
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
          {/* USER MARKER */}
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

          {/* STATION MARKERS */}
          {stations.map((s) => (
            <Marker
              key={s.id}
              latitude={s.latitude}
              longitude={s.longitude}
              anchor="bottom"
            >
              <div className="flex flex-col items-center">
                {/* Station Name */}
                <span className="text-white text-xs bg-black/70 px-2 py-0.5 rounded mb-1">
                  {s.name}
                </span>

                {/* Glowing Green eBike Icon */}
                <div className="relative">
                  <img
                    src="/bicycle.png"
                    alt="eBike Station"
                    style={{ width: 32, height: 32 }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 50,
                      height: 50,
            
                      filter: "blur(6px)",
                      animation: "pulse 2s infinite",
                    }}
                  />
                </div>
              </div>
            </Marker>
          ))}
        </Map>
      </div>

         </div>
  );
};

export default DynamicUserMap;
