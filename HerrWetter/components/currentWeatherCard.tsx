import React from "react";
import { Text, Image, View, useColorScheme } from "react-native";
import { lightWeatherStyles } from "@/styles/currentWeatherLight";
import { darkWeatherStyles } from "@/styles/currentWeatherDark";
import { lightThemeColors } from "@/theme/lightThemeColors";
import { darkThemeColors } from "@/theme/darkThemeColors";
import LinearGradient from "react-native-linear-gradient";

type CurrentWeatherCardProps = {
  selectedCity: string | null;
  weather: any;
  isLoading: boolean;
  error: string | null;
};

export default function CurrentWeatherCard({
  selectedCity,
  weather,
  isLoading,
  error,
}: CurrentWeatherCardProps) {
  const colorScheme = useColorScheme();
  const styles =
    colorScheme === "dark" ? darkWeatherStyles : lightWeatherStyles;
  const colors = colorScheme === "dark" ? darkThemeColors : lightThemeColors;

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={{ padding: 16 }}>
          <Text style={{ color: colors.text }}>Lade Wetterdaten...</Text>
        </View>
      )}

      {error && (
        <View style={{ padding: 16 }}>
          <Text style={{ color: "red" }}>{error}</Text>
        </View>
      )}

      {weather && (
        <View style={styles.contentWrapper}>
          <LinearGradient
            colors={["#102840", "#0A1A2F"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.topSection}
          >
            <Image
              source={{ uri: `https:${weather.iconUrl}` }}
              style={styles.weatherIcon}
              resizeMode="contain"
            />
            <View style={styles.conditionTextContainer}>
              <Text style={styles.temp}>{weather.temperature}°C</Text>
              <Text style={styles.condition}>{weather.condition}</Text>
            </View>
          </LinearGradient>

          <View style={styles.detailGrid}>
            <View style={styles.detailColumn}>
              <Text style={styles.detail}>gefühlt: {weather.feelslikeC}°C</Text>
              <Text style={styles.detail}>
                Niederschlag: {weather.precipMm}mm
              </Text>
              <Text style={styles.detail}>UV-Index: {weather.uv}</Text>
            </View>
            <View style={styles.detailColumn}>
              <Text style={styles.detail}>Wind: {weather.windKph} km/h</Text>
              <Text style={styles.detail}>
                Richtung: {weather.windDegree}, {weather.windDirection}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
