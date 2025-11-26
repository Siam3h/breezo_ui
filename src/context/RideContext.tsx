"use client";

import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";

const RideContext = createContext(null);

export function RideProvider({ children }) {
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [userLocation, setUserLocation] = useState(""); // human-readable
  const [stations, setStations] = useState([]);
  const [nearestStation, setNearestStation] = useState(null);

  const [destinationText, setDestinationText] = useState("");
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [destinationDock, setDestinationDock] = useState(null);

  // ---------------- Geolocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => {
        setCoords({ lat: -1.286389, lng: 36.817223 }); // fallback Nairobi
      },
      { enableHighAccuracy: true }
    );
  }, []);

  // ---------------- Reverse geocode user location
  useEffect(() => {
    if (!coords.lat || !coords.lng) return;

    const fetchAddress = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}`
        );
        const data = await res.json();
        setUserLocation(data.display_name || "");
      } catch (err) {
        console.error("Failed to reverse geocode:", err);
        setUserLocation("");
      }
    };

    fetchAddress();
  }, [coords.lat, coords.lng]);

  // ---------------- Fetch stations
  useEffect(() => {
    apiClient.get("/docks/stations").then((res) => {
      setStations(res.data?.data || []);
    });
  }, []);

  // ---------------- Compute nearest station to user
  useEffect(() => {
    if (!coords.lat || stations.length === 0) return;

    const nearest = stations.reduce(
      (closest, s) => {
        const dist = Math.sqrt(
          Math.pow(coords.lat - s.latitude, 2) +
            Math.pow(coords.lng - s.longitude, 2)
        );
        return dist < closest.dist ? { s, dist } : closest;
      },
      { s: null, dist: Infinity }
    );

    setNearestStation(nearest.s);
  }, [coords, stations]);

  // ---------------- Destination autocomplete
  useEffect(() => {
    if (destinationText.length < 2) {
      setDestinationSuggestions([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${destinationText}`
        );
        const data = await res.json();
        setDestinationSuggestions(data.slice(0, 6));
      } catch (err) {
        console.error("Failed to fetch destination suggestions:", err);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [destinationText]);

  // ---------------- Compute nearest dock to destination
  useEffect(() => {
    if (!selectedDestination || stations.length === 0) return;

    const destLat = parseFloat(selectedDestination.lat);
    const destLng = parseFloat(selectedDestination.lon);

    const nearest = stations.reduce(
      (closest, s) => {
        const dist = Math.sqrt(
          Math.pow(destLat - s.latitude, 2) + Math.pow(destLng - s.longitude, 2)
        );
        return dist < closest.dist ? { s, dist } : closest;
      },
      { s: null, dist: Infinity }
    );

    setDestinationDock(nearest.s);
  }, [selectedDestination, stations]);

  return (
    <RideContext.Provider
      value={{
        coords,
        userLocation,
        stations,
        nearestStation,
        destinationText,
        setDestinationText,
        destinationSuggestions,
        setSelectedDestination,
        destinationDock,
        setDestinationSuggestions,
      }}
    >
      {children}
    </RideContext.Provider>
  );
}

export function useRide() {
  return useContext(RideContext);
}
