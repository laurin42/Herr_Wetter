import { useState } from "react";
import { getCurrentWeatherByCity, getCurrentWeatherByLocation, WeatherData } from "@/services/weatherService";

export function useWeather() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    async function loadWeatherByLocation() {
        setIsLoading(true);
        const { data, error } = await getCurrentWeatherByLocation();
        setWeather(data);
        setError(error);
        setIsLoading(false);
    }

        async function loadWeatherByCity(city: string) {
        setIsLoading(true);
        const { data, error } = await getCurrentWeatherByCity(city);
        setWeather(data);
        setError(error);
        setIsLoading(false);
    }

    return {
        weather,
        isLoading,
        error,
        loadWeatherByLocation,
        loadWeatherByCity
    }
}