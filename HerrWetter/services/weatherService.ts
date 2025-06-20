export type WeatherData = {
    temperature: number; 
    condition: string;
    iconUrl: string;
    city: string;
}


export async function currentWeather(latitude: number, longitude: number): Promise<WeatherData> {
    const response = await fetch(
        "/api/weather"
    );
    if (!response.ok) {
        throw new Error("Fehler beim Vorhersagen!");
    }

    const weatherData = await response.json();
    return {
        temperature: weatherData.temperature,
        condition: weatherData.condition,
        iconUrl: weatherData.iconUrl,
        city: weatherData.city,
    }
}

