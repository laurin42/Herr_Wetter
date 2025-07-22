import { useState, useCallback } from "react";
import {
  getCurrentWeatherByLocation,
  fetchForecastByCoords,
  WeatherData,
  ForecastData,
} from "@/services/weatherService";
import { Coordinates } from "@/utils/resolveLocation";

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadWeatherByCoords = useCallback(
    async (coords?: Coordinates) => {
      setIsLoading(true);
      setError(null); 

      const { data, error: weatherError } = await getCurrentWeatherByLocation(
        coords?.latitude,
        coords?.longitude
      );
      setWeather(data);
      if (weatherError) setError(weatherError);

      if (data && coords) {
        try {
          console.log("Lade Forecast mit coords:", coords);
          const forecastData = await fetchForecastByCoords(coords);
          console.log("Forecast Daten:", forecastData);
          setForecast(forecastData);
        } catch (e: any) {
          console.error("Fehler bei der Vorhersage:", e.message);
          setError(e.message || "Fehler bei der Vorhersage");
        }
      }
      setIsLoading(false);
    },
    []
  );

  return {
    weather,
    forecast,
    isLoading,
    error,
    loadWeatherByCoords,
  };
}
