import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  View,
  TextInput,
  useColorScheme,
  Pressable,
  FlatList,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { lightWeatherStyles } from "@/styles/currentWeatherLight";
import { darkWeatherStyles } from "@/styles/currentWeatherDark";
import { lightThemeColors } from "@/theme/lightThemeColors";
import { darkThemeColors } from "@/theme/darkThemeColors";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useWeather } from "@/hooks/useWeather";
import { useCitySuggestions } from "@/hooks/useCitySuggestions";

export default function CurrentWeatherCard() {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [editCity, setEditCity] = useState(false);
  const { suggestions, isLoading: isLoadingSuggestions } =
    useCitySuggestions(city);
  const {
    weather,
    isLoading,
    error,
    loadWeatherByCity,
    loadWeatherByLocation,
  } = useWeather();

  const colorScheme = useColorScheme();
  const styles =
    colorScheme === "dark" ? darkWeatherStyles : lightWeatherStyles;
  const colors = colorScheme === "dark" ? darkThemeColors : lightThemeColors;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (selectedCity) {
      loadWeatherByCity(selectedCity);
    } else {
      loadWeatherByLocation();
    }
  }, [selectedCity]);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: colors.background,
      }}
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
        <View style={styles.container}>
          <View style={styles.locationContainer}>
            <View style={styles.locationTextContainer}>
              <View style={styles.cityRow}>
                {editCity ? (
                  <View style={{ position: "relative" }}>
                    <TextInput
                      style={{
                        fontSize: 24,
                        color: colors.text,
                        width: "100%",
                      }}
                      value={city}
                      onChangeText={setCity}
                      placeholder={weather.city}
                      placeholderTextColor="#aaa"
                      autoFocus
                      returnKeyType="done"
                      onSubmitEditing={() => {
                        const bestMatch = suggestions[0]?.city || city;
                        setSelectedCity(bestMatch);
                        setCity(bestMatch);
                        setEditCity(false);
                      }}
                    />
                    <FlatList
                      scrollEnabled={false}
                      data={suggestions}
                      keyExtractor={(item, index) =>
                        item.id ? item.id.toString() : index.toString()
                      }
                      style={{
                        marginBottom: 8,
                        backgroundColor: colors.card,
                        borderRadius: 8,
                        zIndex: 1000,
                      }}
                      keyboardShouldPersistTaps="handled"
                      renderItem={({ item }) => (
                        <Pressable
                          onPress={() => {
                            setCity(item.city);
                            setSelectedCity(item.city);
                            setEditCity(false);
                          }}
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
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      setCity("");
                      setEditCity(true);
                    }}
                    style={styles.cityRow}
                  >
                    <Text style={styles.location}>{weather?.city}</Text>
                    <FontAwesome name="pencil" style={styles.editIcon} />
                  </Pressable>
                )}
              </View>
              <Text style={styles.locationDetails}>
                {[weather.region, weather.country].filter(Boolean).join(", ")}
              </Text>
            </View>
            {!editCity ? (
              <Ionicons
                name="add-circle-outline"
                size={32}
                style={styles.addIcon}
              />
            ) : (
              <Ionicons
                name="add-circle-outline"
                size={32}
                color="transparent"
              />
            )}
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
