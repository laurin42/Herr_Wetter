import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  useColorScheme,
  useWindowDimensions,
  Pressable,
  RefreshControl,
} from "react-native";
import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { darkThemeColors } from "@/theme/darkThemeColors";
import { lightThemeColors } from "@/theme/lightThemeColors";
import CurrentWeatherCard from "@/components/currentWeatherCard";
import { useCitySuggestions } from "@/hooks/useCitySuggestions";
import LocationSelector from "@/components/location/locationSelector";
import LocationSuggestionList from "@/components/location/locationSuggestionList";
import { useWeather } from "@/hooks/useWeather";
import { getLocationSelectorHeight } from "@/utils/layout";
import LinearGradient from "react-native-linear-gradient";
import { Coordinates } from "@/utils/resolveLocation";

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

  const { height: windowHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const LOCATION_SELECTOR_HEIGHT = getLocationSelectorHeight();

  const { weather, isLoading, error, loadWeatherByCoords } = useWeather();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    loadWeatherByCoords(selectedCoords || undefined);
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
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={{ height: LOCATION_SELECTOR_HEIGHT }}>
              {!editCity && (
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
                  containerStyle={{ backgroundColor: colors.cardTransparent }}
                />
              )}
            </View>

            <CurrentWeatherCard
              weather={weather}
              isLoading={isLoading}
              error={error}
            />
          </ScrollView>

          {editCity && (
            <Pressable
              onPress={() => setEditCity(false)}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "transparent",
                zIndex: 10,
              }}
            >
              <View
                style={{
                  flex: 1,
                  position: "absolute",
                  width: "100%",
                  height: LOCATION_SELECTOR_HEIGHT,
                  top: insets.top + windowHeight * 0.036,
                }}
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
                  containerStyle={{ backgroundColor: colors.card }}
                />
              </View>
              {suggestions.length > 0 && (
                <LocationSuggestionList
                  suggestions={suggestions}
                  onSelect={(coords, displayName) => {
                    console.log("onSelect received:", coords, displayName);
                    setSelectedCoords(coords);
                    setDisplayName(displayName);
                    setEditCity(false);
                  }}
                  style={{
                    position: "absolute",
                    top: insets.top + windowHeight * 0.204,
                    left: 16,
                    right: 16,
                    zIndex: 11,
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
            </Pressable>
          )}
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}
