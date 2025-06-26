import { useEffect, useState } from "react";
import { Text, View, Image, useColorScheme } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getCurrentWeather, WeatherData } from "@/services/weatherService";
import { lightWeatherStyles } from "@/styles/lightWeatherScreen";
import { darkWeatherStyles } from "@/styles/darkWeatherScreen";

export default function WeatherScreen() {
  const params = useLocalSearchParams();
  const latitude = parseFloat(params.latitude as string);
  const longitude = parseFloat(params.longitude as string);
  const baseError = params.errorMsg as string;

  const [isLoading, setIsLoading] = useState(true);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  let colorScheme = useColorScheme();
  const styles =
    colorScheme === "dark" ? darkWeatherStyles : lightWeatherStyles;

  useEffect(() => {
    async function currentWeather() {
      if (baseError) {
        setWeatherError(baseError);
        setIsLoading(false);
        return;
      }

      try {
        const data = await getCurrentWeather(latitude, longitude);
        setWeather(data);
        setWeatherError(null);
      } catch (error: any) {
        setWeatherError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    currentWeather();
  }, [latitude, longitude, baseError]);

  if (isLoading) {
    return (
      <View>
        <Text>Wetterdaten werden geladen...</Text>
      </View>
    );
  }

  if (weatherError) {
    return (
      <View>
        <Text>Fehler: {weatherError}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https:${weather?.iconUrl}` }}
        style={styles.icon}
        resizeMode="contain"
      ></Image>
      <Text style={styles.location}>
        {weather?.city}, {weather?.region}, {weather?.country}
      </Text>
      <Text style={styles.condition}>{weather?.condition}</Text>
      <Text style={styles.detail}>
        aktuelle Temperatur: {weather?.temperature}°C
      </Text>
      <Text style={styles.details}>
        gefühlte Temperatur: {weather?.feelslikeC}°C
      </Text>
      <Text style={styles.details}>Niederschlag: {weather?.precipMm}mm</Text>
      <Text style={styles.details}>Windstärke: {weather?.windKph} kmh</Text>
      <Text style={styles.details}>
        Windrichtung: {weather?.windDegree}, {weather?.windDirection}
      </Text>
    </View>
  );
}
