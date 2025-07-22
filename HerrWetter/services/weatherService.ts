import { resolveLocation, Coordinates } from "@/utils/resolveLocation";

//type definitions are named identical to response fields from forecast/WeatherAPI.com
export type WeatherData = {
  current: {
    temp_c: number;
    feelslike_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    precip_mm: number;
    wind_degree: number;
    wind_dir: string;
    wind_kph: number;
    uv: number;
  };
  location: {
    name: string;
    region: string;
    country: string;
  };
};

export type ForecastDay = {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
};

export type ForecastData = {
  location: WeatherData["location"];
  forecast: ForecastDay[];
};





export async function fetchWeatherByCoords(coords: Coordinates): Promise<WeatherData> {
  const response = await fetch(
    `http://192.168.178.67:3000/api/currentWeather?latitude=${coords.latitude}&longitude=${coords.longitude}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Fehler beim Abrufen der Wetterdaten.");
  }

  const weatherData: WeatherData = await response.json();
  return weatherData;
}


export async function getCurrentWeatherByLocation(latitude?: number, longitude?: number): Promise<{
  loading: boolean;
  error: string | null;
  data: WeatherData | null;
}> {


  try {
    let coords: Coordinates | null;
    let error: string | null;
    
    if (latitude !== undefined && longitude !== undefined)  {
      coords = {latitude, longitude};
      error = null;
    } else {
      const resolved = await resolveLocation();
      coords = resolved.location;
      error = resolved.error;
    }

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

export async function fetchForecastByCoords(coords: Coordinates): Promise<ForecastData> {
  const response = await fetch(
    `http://192.168.178.67:3000/api/forecastWeather?latitude=${coords.latitude}&longitude=${coords.longitude}`,
    { cache: "no-store" }
  );

  const data = await response.json();
  console.log("RAW forecast data:", data);

  if (!response.ok) throw new Error("Fehler beim Abrufen der Vorhersage.");

  return {
    location: data.location,
    forecast: data.forecast || [], 
  };
}
