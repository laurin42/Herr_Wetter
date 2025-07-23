import React from "react";
import { Text, Image, View, useColorScheme, FlatList } from "react-native";
import { darkThemeColors, lightThemeColors } from "@/theme/themeColors";
import { getForecastWeatherStyles } from "@/styles/forecastWeatherStyles";
import { ForecastData } from "@/services/weatherService";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

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
        <View style={styles.contentWrapper}>
          <Text style={styles.cardTitle}>Vorhersage</Text>

          <FlatList
            horizontal
            data={forecast.forecast}
            keyExtractor={(item) => item.date}
            renderItem={({ item }) => (
              <View style={styles.forecastItem}>
                <Text style={styles.forecastDate}>{item.date}</Text>
                <Image
                  source={{ uri: `https:${item.day.condition.icon}` }}
                  style={styles.weatherIcon}
                  resizeMode="contain"
                />
                <Text style={styles.detailText}>{item.day.condition.text}</Text>
                <View style={styles.detailItem}>
                  <FontAwesome6
                    name="temperature-high"
                    size={18}
                    color={colors.ui.buttonSecondary}
                  />
                  <Text style={styles.detailText}>{item.day.maxtemp_c}°C</Text>
                </View>
                <View style={styles.detailItem}>
                  <FontAwesome6
                    name="temperature-low"
                    size={18}
                    color={colors.ui.buttonSecondary}
                  />
                  <Text style={styles.detailText}>{item.day.mintemp_c}°C</Text>
                </View>
              </View>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
}
