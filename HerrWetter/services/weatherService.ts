import { resolveLocation, Coordinates } from "@/utils/resolveLocation";

export type WeatherData = {
  temperature: number;
  feelslikeC: number;
  condition: string;
  humidity: number;
  precipMm: number;
  windDegree: number;
  windDirection: string;
  windKph: number;
  uv: number;
  iconUrl: string;
  city: string;
  region: string;
  country: string;
};


async function fetchWeatherByCoords(coords: Coordinates) {
  const response = await fetch(
    `http://192.168.178.67:3000/api/currentWeather?latitude=${coords.latitude}&longitude=${coords.longitude}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Fehler beim Abrufen der Wetterdaten.");
  }

  const weatherData = await response.json();

  const data: WeatherData = {
    temperature: weatherData.current.temp_c,
    feelslikeC: weatherData.current.feelslike_c,
    condition: weatherData.current.condition.text,
    humidity: weatherData.current.humidity,
    precipMm: weatherData.current.precip_mm,
    windDegree: weatherData.current.wind_degree,
    windDirection: weatherData.current.wind_dir,
    windKph: weatherData.current.wind_kph,
    uv: weatherData.current.uv,
    iconUrl: weatherData.current.condition.icon,
    city: weatherData.location.name,
    region: weatherData.location.region,
    country: weatherData.location.country,
  };

  return data;
}


export async function getCurrentWeatherByLocation(): Promise<{
  loading: boolean;
  error: string | null;
  data: WeatherData | null;
}> {
  try {
    const resolved = await resolveLocation();
    const coords = resolved.location;
    const error = resolved.error;

    if (!coords) {
      return { loading: false, error: error || "Standort nicht verfügbar", data: null };
    }

    const data = await fetchWeatherByCoords(coords);

    return { loading: false, error: null, data };
  } catch (err: any) {
    return { loading: false, error: err.message || "Unbekannter Fehler", data: null };
  }
}

export async function getCurrentWeatherByCity(city: string): Promise<{
  loading: boolean;
  error: string | null;
  data: WeatherData | null;
}> {
  try {
    const resolved = await resolveLocation(city);
    const coords = resolved.location;
    const error = resolved.error;

    if (!coords) {
      return { loading: false, error: error || "Stadt nicht gefunden", data: null };
    }

    const data = await fetchWeatherByCoords(coords);

    return { loading: false, error: null, data };
  } catch (err: any) {
    return { loading: false, error: err.message || "Unbekannter Fehler", data: null };
  }
}
