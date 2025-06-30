import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { getCurrentWeather, WeatherData } from "@/services/weatherService";
import CurrentWeatherCard from "@/components/currentWeatherCard";

export default function WeatherScreen() {
  const params = useLocalSearchParams();
  const latitude = parseFloat(params.latitude as string);
  const longitude = parseFloat(params.longitude as string);
  const baseError = params.errorMsg as string;

  const [isLoading, setIsLoading] = useState(true);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function currentWeather() {
      if (baseError) {
        setError(baseError);
        setIsLoading(false);
        return;
      }

      try {
        const data = await getCurrentWeather(latitude, longitude);
        setWeather(data);
        setError(null);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    currentWeather();
  }, [latitude, longitude, baseError]);

  return (
    <CurrentWeatherCard
      weather={weather}
      isLoading={isLoading}
      error={error ?? undefined}
    />
  );
}
