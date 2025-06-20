export type WeatherData = {
    temperature: number; 
    feelslikeC: number;
    condition: string;
    humidity: number;
    precipMm: number;
    windDegree: number,
    windDirection: string,
    windKph: number,
    iconUrl: string;
    city: string;
    region: string; 
    country: string;
}


export async function getCurrentWeather(latitude: number, longitude: number): Promise<WeatherData> {
    const response = await fetch(
        `http://192.168.178.67:3000/api/currentWeather?latitude=${latitude}&longitude=${longitude}`
    );

    if (!response.ok) {
        throw new Error("Fehler beim Vorhersagen!");
    }

    const weatherData = await response.json();
    return {
        temperature: weatherData.current.temp_c,
        feelslikeC: weatherData.current.feelslike_c,
        condition: weatherData.current.condition.text,
        humidity: weatherData.current.humidity,
        precipMm: weatherData.current.precip_mm,
        windDegree: weatherData.current.wind_degree,
        windDirection: weatherData.current.wind_dir,
        windKph: weatherData.current.wind_kph,
        iconUrl: weatherData.current.condition.icon,
        city: weatherData.location.name,
        region: weatherData.location.region,
        country: weatherData.location.country,
    }
}

