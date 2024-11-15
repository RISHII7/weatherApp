import { Coordinates } from "@/lib/types";
import { useEffect, useState } from "react";

interface GeoLocationState {
    coordinates: Coordinates | null;
    error: string | null;
    isLoading: boolean;
};

export function useGeoLocation() {
    const [locationData, setLocationData] = useState<GeoLocationState>({
        coordinates: null,
        error: null,
        isLoading: true,
    });

    const getLocation = () => {
        setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));

        if (!navigator.geolocation) {
            setLocationData({
                coordinates: null,
                error: "Geolocation is not supported by your browser",
                isLoading: false,
            });

            return;
        };

        navigator.geolocation.getCurrentPosition((position) => {
            setLocationData({
                coordinates: {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                },
                error: null,
                isLoading: false,
            });
        }, (error) => {
            let errorMessage: string;

            if (error.code === error.PERMISSION_DENIED) {
                errorMessage =
                    "Location permission denied. Please enable location access.";
            } else if (error.code === error.POSITION_UNAVAILABLE) {
                errorMessage = "Location information is unavailable.";
            } else if (error.code === error.TIMEOUT) {
                errorMessage = "Location request timed out.";
            } else {
                errorMessage = "An unknown error occurred.";
            }

            setLocationData({
                coordinates: null,
                error: errorMessage,
                isLoading: false,
            });
        }, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        });
    };

    useEffect(() => {
        getLocation();
    }, []);

    return { ...locationData, getLocation };
};