import { Text, Image, View, useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WeatherData } from "@/services/weatherService";
import { lightWeatherStyles } from "@/styles/currentWeatherLight";
import { darkWeatherStyles } from "@/styles/currentWeatherDark";
import { lightThemeColors } from "@/theme/lightThemeColors";
import { darkThemeColors } from "@/theme/darkThemeColors";

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
        <Text style={styles.location}>
          {weather.city}, {weather.region}, {weather.country}
        </Text>
        <View style={styles.conditionContainer}>
          <Text style={styles.condition}>{weather.condition}</Text>

          <Image
            source={{ uri: `https:${weather.iconUrl}` }}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.detail}>
          aktuelle Temperatur: {weather.temperature}°C
        </Text>
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
