import React from "react";
import { Text, Image, View, useColorScheme } from "react-native";
import { lightWeatherStyles } from "@/styles/currentWeatherLight";
import { darkWeatherStyles } from "@/styles/currentWeatherDark";
import { lightThemeColors } from "@/theme/lightThemeColors";
import { darkThemeColors } from "@/theme/darkThemeColors";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

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
    <LinearGradient
      colors={[colors.backgroundSecondary, colors.background]}
      start={{ x: 0.9, y: 0 }}
      end={{ x: 0.9, y: 1 }}
      style={styles.container}
    >
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
          <Text style={styles.cardTitle}>Aktuell:</Text>
          <View style={styles.topSection}>
            <Image
              source={{ uri: `https:${weather.iconUrl}` }}
              style={styles.weatherIcon}
              resizeMode="contain"
            />
            <View style={styles.conditionTextContainer}>
              <Text style={styles.temp}>{weather.temperature}°C</Text>
              <Text style={styles.condition}>{weather.condition}</Text>
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
                gefühlt: {weather.feelslikeC}°C
              </Text>
            </View>
            <View style={styles.tile}>
              <FontAwesome5
                name="tint"
                size={24}
                color={colors.ui.buttonSecondary}
              />
              <Text style={styles.tileText}>
                Niederschlag: {weather.precipMm}mm
              </Text>
            </View>
            <View style={styles.tile}>
              <MaterialCommunityIcons
                name="sun-wireless-outline"
                size={24}
                color={colors.ui.buttonSecondary}
              />
              <Text style={styles.tileText}>UV-Index: {weather.uv}</Text>
            </View>
            <View style={styles.tile}>
              <FontAwesome6
                name="wind"
                size={24}
                color={colors.ui.buttonSecondary}
              />
              <Text style={styles.tileText}>Wind: {weather.windKph} km/h</Text>
            </View>
          </View>
        </View>
      )}
    </LinearGradient>
  );
}
