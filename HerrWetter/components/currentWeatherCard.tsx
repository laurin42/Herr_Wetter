import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  View,
  TextInput,
  Button,
  useColorScheme,
  Pressable,
  FlatList,
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

type CitySuggestion = {
  city: string;
  region: string;
  country: string;
  id: number;
};

export default function CurrentWeatherCard() {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState<CitySuggestion | null>(null);
  const [citySearchVisible, setCitySearchVisible] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [citySuggestion, setCitySuggestions] = useState<CitySuggestion[]>([]);
  const [fetchCitySuggestions, setFetchCitySuggestions] = useState(false);

  const colorScheme = useColorScheme();
  const styles =
    colorScheme === "dark" ? darkWeatherStyles : lightWeatherStyles;
  const colors = colorScheme === "dark" ? darkThemeColors : lightThemeColors;
  const insets = useSafeAreaInsets();

  async function handleSearch(cityName?: string) {
    const name = cityName ?? city.trim();
    if (!name) return;
    setIsLoading(true);
    const { data, error } = await getCurrentWeatherByCity(name);
    setWeather(data);
    setError(error);
    setIsLoading(false);
    if (data) setCitySearchVisible(false);
  }

  const handleCitySelect = async (city: CitySuggestion) => {
    setSelectedCity(city);
    setCitySuggestions([]);
    setCitySearchVisible(false);

    const fullName = [city.city, city.region, city.country]
      .filter(Boolean)
      .join(", ");
    setCity(fullName);

    setIsLoading(true);
    const { data, error } = await getCurrentWeatherByCity(fullName);
    setWeather(data);
    setError(error);
    setIsLoading(false);
  };

  async function loadWeatherByLocation() {
    setIsLoading(true);
    const { data, error } = await getCurrentWeatherByLocation();
    setWeather(data);
    setError(error);
    setIsLoading(false);
  }

  useEffect(() => {
    if (city.length < 2) {
      setCitySuggestions([]);
      return;
    }

    const handler = setTimeout(() => {
      const fetchSuggestions = async () => {
        setFetchCitySuggestions(true);
        try {
          const response = await fetch(
            `http://192.168.178.67:3000/api/cities?q=${encodeURIComponent(
              city
            )}`
          );
          if (!response.ok) throw new Error("Fehler beim Laden der Vorschläge");
          const data: CitySuggestion[] = await response.json();
          setCitySuggestions(data);
        } catch (e) {
          setCitySuggestions([]);
        } finally {
          setFetchCitySuggestions(false);
        }
      };

      fetchSuggestions();
    }, 300);

    return () => clearTimeout(handler);
  }, [city]);

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
            onFocus={() => {
              if (city.length > 0) {
                setCity("");
              }
            }}
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

          {fetchCitySuggestions && (
            <Text style={{ color: colors.text, marginBottom: 8 }}>
              Lade Vorschläge...
            </Text>
          )}
          {!fetchCitySuggestions && citySuggestion.length > 0 && (
            <FlatList
              data={citySuggestion}
              keyExtractor={(item, index) =>
                item.id ? item.id.toString() : index.toString()
              }
              style={{
                maxHeight: 200,
                marginBottom: 8,
                backgroundColor: colors.card,
                borderRadius: 8,
              }}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => handleCitySelect(item)}
                  style={{
                    padding: 10,
                    borderBottomColor: colors.border,
                    borderBottomWidth: 1,
                  }}
                >
                  <Text style={styles.detail}>
                    {[item.city, item.region, item.country]
                      .filter(Boolean)
                      .join(", ")}
                  </Text>
                </Pressable>
              )}
            />
          )}

          <Button title="Suchen" onPress={() => handleSearch()} />
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
                  <Text style={styles.location}>
                    {selectedCity?.city ?? weather.city}
                  </Text>

                  <FontAwesome name="pencil" style={styles.editIcon} />
                </View>

                <Text style={styles.locationDetails}>
                  {(selectedCity?.region ?? weather.region) +
                    ", " +
                    (selectedCity?.country ?? weather.country)}
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
