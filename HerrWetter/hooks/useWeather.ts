import { useState, useCallback } from "react";
import {
  getCurrentWeatherByLocation,
  WeatherData,
} from "@/services/weatherService";
import { Coordinates } from "@/utils/resolveLocation";

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadWeatherByCoords = useCallback(
    async (coords?: Coordinates) => {
      setIsLoading(true);
      const { data, error } = await getCurrentWeatherByLocation(
        coords?.latitude,
        coords?.longitude
      );
      setWeather(data);
      setError(error);
      setIsLoading(false);
    },
    []
  );

  return {
    weather,
    isLoading,
    error,
    loadWeatherByCoords,
  };
}
