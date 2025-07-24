import React from "react";
import { Text, Image, View, useColorScheme } from "react-native";
import { darkThemeColors, lightThemeColors } from "@/theme/themeColors";
import { getForecastWeatherStyles } from "@/styles/forecastWeatherStyles";
import { ForecastData } from "@/services/weatherService";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { formatToWeekday } from "@/utils/dateUtils";

type ForecastWeatherCardProps = {
  forecast: ForecastData | null;
  isLoading: boolean;
  error: string | null;
};

export default function ForecastWeatherCard({
  forecast,
  isLoading,
  error,
}: ForecastWeatherCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const styles = getForecastWeatherStyles(isDark);
  const colors = colorScheme === "dark" ? darkThemeColors : lightThemeColors;

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={{ padding: 16 }}>
          <Text style={{ color: colors.text }}>Lade Vorhersage...</Text>
        </View>
      )}

      {error && (
        <View style={{ padding: 16 }}>
          <Text style={{ color: "red" }}>{error}</Text>
        </View>
      )}

      {forecast && (
        <View>
          <Text style={styles.cardTitle}>3 Tage Vorschau</Text>

          <View style={styles.contentWrapper}>
            {forecast.forecast.slice(0, 3).map((item) => (
              <View key={item.date} style={styles.forecastItem}>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.weekdayLabel}>
                    {formatToWeekday(item.date)}
                  </Text>

                  <Image
                    source={{ uri: `https:${item.day.condition.icon}` }}
                    style={styles.weatherIcon}
                    resizeMode="contain"
                  />

                  <Text
                    style={styles.detailText}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {item.day.condition.text}
                  </Text>
                </View>

                <View style={{ alignItems: "center" }}>
                  <View style={styles.tempRow}>
                    <FontAwesome6
                      name="temperature-arrow-up"
                      size={18}
                      color={colors.ui.buttonSecondary}
                      style={styles.tempIcon}
                    />
                    <Text style={styles.tempValue}>{item.day.maxtemp_c}°C</Text>
                  </View>

                  <View style={styles.tempRow}>
                    <FontAwesome6
                      name="temperature-arrow-down"
                      size={18}
                      color={colors.ui.buttonSecondary}
                      style={styles.tempIcon}
                    />
                    <Text style={styles.tempValue}>{item.day.mintemp_c}°C</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
