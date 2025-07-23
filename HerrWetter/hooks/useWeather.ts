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
      if (!coords) return; 

      setIsLoading(true);
      setError(null); 

      try {
        const [weatherResult, forecastResult] = await Promise.all([
          getCurrentWeatherByLocation(coords.latitude, coords.longitude),
          fetchForecastByCoords(coords),
        ]);
        
        const { data: weatherData, error: weatherError } = weatherResult;
        
        setWeather(weatherData);
        setForecast(forecastResult);

        if (weatherError) {
          setError(weatherError);
        }
      } catch (e: any) {
        console.error("Fehler beim Laden der Wetterdaten:", e.message);
        setError(e.message || "Fehler beim Laden der Wetterdaten")
      } finally {
        setIsLoading(false);
      }
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
