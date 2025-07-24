import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  useColorScheme,
  RefreshControl,
  ActivityIndicator,
  Text,
} from "react-native";
import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { darkThemeColors, lightThemeColors } from "@/theme/themeColors";
import CurrentWeatherCard from "@/components/CurrentWeatherCard";
import ForecastWeatherCard from "@/components/ForecastWeatherCard";
import { useCitySuggestions } from "@/hooks/useCitySuggestions";
import LocationSelector from "@/components/location/LocationSelector";
import LocationSuggestionList from "@/components/location/LocationSuggestionList";
import { useWeather } from "@/hooks/useWeather";
import LinearGradient from "react-native-linear-gradient";
import { Coordinates, resolveLocation } from "@/utils/resolveLocation";

export default function WeatherScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [city, setCity] = useState("");
  const [editCity, setEditCity] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState<Coordinates | null>(
    null
  );
  const [displayName, setDisplayName] = useState("");

  const { suggestions } = useCitySuggestions(city);

  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? darkThemeColors : lightThemeColors;

  const insets = useSafeAreaInsets();

  const { weather, forecast, isLoading, error, loadWeatherByCoords } =
    useWeather();

  useEffect(() => {
    if (!selectedCoords) {
      (async () => {
        const { location } = await resolveLocation();
        if (location) setSelectedCoords(location);
      })();
    }
  }, [selectedCoords]);

  useEffect(() => {
    if (selectedCoords) {
      loadWeatherByCoords(selectedCoords);
    }
  }, [selectedCoords, loadWeatherByCoords]);

  const onRefresh = useCallback(() => {
    if (selectedCoords) {
      setRefreshing(true);
      loadWeatherByCoords(selectedCoords).finally(() => setRefreshing(false));
    }
  }, [selectedCoords, loadWeatherByCoords]);

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={[colors.backgroundSecondary, colors.background]}
          start={{ x: 1, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
          }}
        />

        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "transparent",
            paddingTop: insets.top,
          }}
        >
          {isLoading && !weather && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color={colors.text} />
              <Text style={{ marginTop: 10, color: colors.text }}>
                Lade Wetterdaten...
              </Text>
            </View>
          )}

          {!isLoading && error && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "red" }}>{error}</Text>
            </View>
          )}

          {!error && (
            <ScrollView
              contentContainerStyle={{ paddingBottom: 32 }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <LocationSelector
                city={city}
                setCity={setCity}
                editCity={editCity}
                setEditCity={setEditCity}
                setSelectedCoords={setSelectedCoords}
                setDisplayName={setDisplayName}
                displayName={displayName}
                suggestions={suggestions}
                weather={weather}
                containerStyle={{
                  backgroundColor: colors.cardTransparent,
                }}
              />
              <CurrentWeatherCard
                weather={weather}
                isLoading={isLoading}
                error={error}
              />
              <ForecastWeatherCard
                forecast={forecast}
                isLoading={isLoading}
                error={error}
              />
            </ScrollView>
          )}

          {editCity && suggestions.length > 0 && (
            <LocationSuggestionList
              suggestions={suggestions}
              onSelect={(coords, displayName) => {
                setSelectedCoords(coords);
                setDisplayName(displayName);
                setEditCity(false);
              }}
              style={{
                position: "absolute",
                top: insets.top + 140,
                left: 16,
                right: 16,
                zIndex: 20,
                backgroundColor: colors.card,
                borderRadius: 8,
                elevation: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
              }}
            />
          )}
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}
