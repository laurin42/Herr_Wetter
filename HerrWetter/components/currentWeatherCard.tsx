import { Text, Image, View, useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WeatherData } from "@/services/weatherService";
import { lightWeatherStyles } from "@/styles/currentWeatherLight";
import { darkWeatherStyles } from "@/styles/currentWeatherDark";
import { lightThemeColors } from "@/theme/lightThemeColors";
import { darkThemeColors } from "@/theme/darkThemeColors";
import { Ionicons } from "@expo/vector-icons";

type CurrentWeatherCardProps = {
  weather: WeatherData | null;
  isLoading: boolean;
  error?: string;
};

export default function CurrentWeatherCard({
  weather,
  isLoading,
  error,
}: CurrentWeatherCardProps) {
  let colorScheme = useColorScheme();
  const styles =
    colorScheme === "dark" ? darkWeatherStyles : lightWeatherStyles;
  const colors = colorScheme === "dark" ? darkThemeColors : lightThemeColors;
  const insets = useSafeAreaInsets();

  if (isLoading) {
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: colors.background,
      }}
    >
      <View style={styles.container}>
        <View style={styles.locationContainer}>
          <View style={styles.locationTextContainer}>
            <Text style={styles.location}>{weather.city}, </Text>
            <Text style={styles.locationDetails}>
              {weather.region}, {weather.country}
            </Text>
          </View>
          <Ionicons
            name="add-circle-outline"
            size={32}
            style={styles.addIcon}
          />
        </View>
        <View style={styles.conditionContainer}>
          <Image
            source={{ uri: `https:${weather.iconUrl}` }}
            style={styles.icon}
            resizeMode="contain"
          />
          <View style={styles.conditionTextContainer}>
            <Text style={styles.temp}>{weather.temperature}°C</Text>
            <Text style={styles.condition}>{weather.condition}</Text>
          </View>
        </View>

        <Text style={styles.details}>
          gefühlte Temperatur: {weather.feelslikeC}°C
        </Text>
        <Text style={styles.details}>Niederschlag: {weather.precipMm}mm</Text>
        <Text style={styles.details}>Windstärke: {weather.windKph} km/h</Text>
        <Text style={styles.details}>
          Windrichtung: {weather.windDegree}, {weather.windDirection}
        </Text>
        <Text style={styles.details}>UV-Index: {weather.uv}</Text>
      </View>
    </View>
  );
}
