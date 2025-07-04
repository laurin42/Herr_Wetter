import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  View,
  TextInput,
  Button,
  useColorScheme,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  getCurrentWeatherByCity,
  getCurrentWeatherByLocation,
  WeatherData,
} from "@/services/weatherService";
import { lightWeatherStyles } from "@/styles/currentWeatherLight";
import { darkWeatherStyles } from "@/styles/currentWeatherDark";
import { lightThemeColors } from "@/theme/lightThemeColors";
import { darkThemeColors } from "@/theme/darkThemeColors";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function CurrentWeatherCard() {
  const [city, setCity] = useState("");
  const [citySearchVisible, setCitySearchVisible] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const colorScheme = useColorScheme();
  const styles =
    colorScheme === "dark" ? darkWeatherStyles : lightWeatherStyles;
  const colors = colorScheme === "dark" ? darkThemeColors : lightThemeColors;
  const insets = useSafeAreaInsets();

  async function handleSearch() {
    if (!city.trim()) return;
    setIsLoading(true);
    const { data, error } = await getCurrentWeatherByCity(city.trim());
    setWeather(data);
    setError(error);
    setIsLoading(false);
    if (data) setCitySearchVisible(false);
  }

  async function loadWeatherByLocation() {
    setIsLoading(true);
    const { data, error } = await getCurrentWeatherByLocation();
    setWeather(data);
    setError(error);
    setIsLoading(false);
  }

  useEffect(() => {
    loadWeatherByLocation();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: colors.background,
      }}
    >
      {citySearchVisible && (
        <View style={{ padding: 16 }}>
          <TextInput
            placeholder="Stadt eingeben"
            value={city}
            onChangeText={setCity}
            placeholderTextColor="#aaa"
            style={{
              backgroundColor: colors.card,
              color: colors.text,
              padding: 10,
              borderRadius: 8,
              marginBottom: 8,
              borderColor: colors.border,
              borderWidth: 1,
            }}
          />
          <Button title="Suchen" onPress={handleSearch} />
        </View>
      )}

      {isLoading && (
        <View style={{ padding: 16 }}>
          <Text style={{ color: colors.text }}>loading...</Text>
        </View>
      )}

      {error && (
        <View style={{ padding: 16 }}>
          <Text style={{ color: "red" }}>{error}</Text>
        </View>
      )}

      {weather && (
        <View style={styles.container}>
          <View style={styles.locationContainer}>
            <View style={styles.locationTextContainer}>
              <Pressable onPress={() => setCitySearchVisible(true)}>
                <View style={styles.cityRow}>
                  <Text style={styles.location}>{weather.city}</Text>
                  <FontAwesome name="pencil" style={styles.editIcon} />
                </View>

                <Text style={styles.locationDetails}>
                  {weather.region}, {weather.country}
                </Text>
              </Pressable>
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
              style={styles.weatherIcon}
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
      )}
    </View>
  );
}
