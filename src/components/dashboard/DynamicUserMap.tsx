"use client";

import React, { useEffect, useState } from "react";
import Map, { Marker, Source, Layer } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import apiClient from "@/lib/apiClient";
import { useRide } from "@/context/RideContext";

const DEFAULT_CENTER: [number, number] = [36.817223, -1.286389]; // Nairobi fallback
const DEFAULT_ZOOM = 16;
const MAPLIBRE_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

const DynamicMap: React.FC = () => {
  const { coords, stations, nearestStation } = useRide();
  const [locationError, setLocationError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>(
    []
  );

  // Fetch stations if not in context
  useEffect(() => {
    if (stations.length === 0) {
      apiClient
        .get("/docks/stations")
        .then((res) => {
          // Do nothing, stations are already in context
        })
        .catch(() => {
          setLocationError("Failed to load stations");
        });
    }
  }, [stations]);

  // Watch for route changes when user or nearest station updates
  useEffect(() => {
    const fetchRoute = async () => {
      if (!coords.lat || !coords.lng || !nearestStation) return;

      try {
        const from = `${coords.lng},${coords.lat}`;
        const to = `${nearestStation.longitude},${nearestStation.latitude}`;
        const res = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${from};${to}?overview=full&geometries=geojson`
        );
        const data = await res.json();
        if (data.routes && data.routes.length > 0) {
          setRouteCoordinates(data.routes[0].geometry.coordinates);
        }
      } catch (err) {
        console.error("Failed to fetch route:", err);
      }
    };

    fetchRoute();
  }, [coords, nearestStation]);

  // User geolocation
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        coords.lat = position.coords.latitude;
        coords.lng = position.coords.longitude;
        setLoading(false);
      },
      (error) => {
        console.warn(
          "Geolocation Error → using default center:",
          error.message
        );
        setLocationError(error.message);
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
      {/* STATUS */}
      <div className="text-breezo-orange p-2 text-sm">
        {loading && <p>Getting your location...</p>}
        {locationError && (
          <p className="text-breezo-orange">
            Location unavailable — showing default location
          </p>
        )}
        {!loading && coords.lat && coords.lng && (
          <p className="text-breezo-blue">
            Lat: {coords.lat.toFixed(6)}, Lng: {coords.lng.toFixed(6)}
          </p>
        )}
      </div>

      {/* MAP */}
      <div className="flex-1 relative">
        <Map
          initialViewState={{
            latitude: coords.lat || DEFAULT_CENTER[1],
            longitude: coords.lng || DEFAULT_CENTER[0],
            zoom: DEFAULT_ZOOM,
          }}
          mapStyle={MAPLIBRE_STYLE}
          style={{ width: "100%", height: "100%" }}
        >
          {/* USER MARKER */}
          {coords.lat && coords.lng && (
            <Marker latitude={coords.lat} longitude={coords.lng}>
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
            </Marker>
          )}

          {/* NEAREST DOCK MARKER */}
          {nearestStation && (
            <Marker
              latitude={nearestStation.latitude}
              longitude={nearestStation.longitude}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  background: "#22C55E",
                  borderRadius: "50%",
                  border: "2px solid #10B981",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                }}
              />
            </Marker>
          )}

          {/* ALL DOCK STATIONS */}
          {stations.map((s) => (
            <Marker
              key={s.id}
              latitude={s.latitude}
              longitude={s.longitude}
              anchor="bottom"
            >
              <div className="flex flex-col items-center">
                <span className="text-white text-xs bg-black/70 px-2 py-0.5 rounded mb-1">
                  {s.name}
                </span>
                <img
                  src="/bicycle.png"
                  alt="eBike Station"
                  style={{ width: 32, height: 32 }}
                />
              </div>
            </Marker>
          ))}

          {/* ROUTE FROM USER TO NEAREST DOCK */}
          {routeCoordinates.length > 0 && (
            <Source
              id="route"
              type="geojson"
              data={{
                type: "Feature",
                geometry: { type: "LineString", coordinates: routeCoordinates },
              }}
            >
              <Layer
                id="routeLine"
                type="line"
                paint={{
                  "line-color": "#F46524",
                  "line-width": 4,
                  "line-opacity": 0.8,
                }}
              />
            </Source>
          )}
        </Map>
      </div>
    </div>
  );
};

export default DynamicMap;
