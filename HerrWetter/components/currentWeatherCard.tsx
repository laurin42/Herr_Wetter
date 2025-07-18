import React from "react";
import { Text, Image, View, useColorScheme } from "react-native";
import { lightWeatherStyles } from "@/styles/currentWeatherLight";
import { darkWeatherStyles } from "@/styles/currentWeatherDark";
import { lightThemeColors } from "@/theme/lightThemeColors";
import { darkThemeColors } from "@/theme/darkThemeColors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { WeatherData } from "@/services/weatherService";

type CurrentWeatherCardProps = {
  weather: WeatherData | null;
  isLoading: boolean;
  error: string | null;
};

export default function CurrentWeatherCard({
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
          <Text style={styles.cardTitle}>Aktuell</Text>

          <View style={styles.topSection}>
            <Image
              source={{ uri: `https:${weather.current.condition.icon}` }}
              style={styles.weatherIcon}
              resizeMode="contain"
            />
            <View style={styles.conditionTextContainer}>
              <Text style={styles.temp}>{weather.current.temp_c}°C</Text>
              <Text style={styles.condition}>
                {weather.current.condition.text}
              </Text>
            </View>
          </View>

          <View style={styles.iconGrid}>
            <View style={styles.tile}>
              <FontAwesome6
                name="temperature-low"
                size={24}
                color={colors.ui.buttonSecondary}
              />
              <Text style={styles.tileText}>
                gefühlt: {weather.current.feelslike_c}°C
              </Text>
            </View>
            <View style={styles.tile}>
              <FontAwesome5
                name="tint"
                size={24}
                color={colors.ui.buttonSecondary}
              />
              <Text style={styles.tileText}>
                Niederschlag: {weather.current.precip_mm}mm
              </Text>
            </View>
            <View style={styles.tile}>
              <MaterialCommunityIcons
                name="sun-wireless-outline"
                size={24}
                color={colors.ui.buttonSecondary}
              />
              <Text style={styles.tileText}>
                UV-Index: {weather.current.uv}
              </Text>
            </View>
            <View style={styles.tile}>
              <FontAwesome6
                name="wind"
                size={24}
                color={colors.ui.buttonSecondary}
              />
              <Text style={styles.tileText}>
                Wind: {weather.current.wind_kph} km/h
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
