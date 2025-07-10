import React, { useState } from "react";
import {
  View,
  ScrollView,
  useColorScheme,
  useWindowDimensions,
  Pressable,
  RefreshControl,
  Platform,
  PixelRatio,
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

export default function WeatherScreen() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [city, setCity] = useState("");
  const [editCity, setEditCity] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const { suggestions, isLoading: isLoadingSuggestions } =
    useCitySuggestions(city);

  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? darkThemeColors : lightThemeColors;

  const { height: windowHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const LOCATION_SELECTOR_HEIGHT = getLocationSelectorHeight();

  const {
    weather,
    isLoading,
    error,
    loadWeatherByCity,
    loadWeatherByLocation,
  } = useWeather();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  React.useEffect(() => {
    if (selectedCity) {
      loadWeatherByCity(selectedCity);
    } else {
      loadWeatherByLocation();
    }
  }, [selectedCity]);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.background,
          paddingTop: insets.top,
        }}
      >
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View
            style={{
              height: LOCATION_SELECTOR_HEIGHT,
            }}
          >
            {!editCity && (
              <LocationSelector
                city={city}
                setCity={setCity}
                editCity={editCity}
                setEditCity={setEditCity}
                suggestions={suggestions}
                setSelectedCity={setSelectedCity}
                weather={weather}
              />
            )}
          </View>

          <CurrentWeatherCard
            selectedCity={selectedCity}
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
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 998,
            }}
          >
            <View
              style={{
                flex: 1,
                position: "absolute",
                width: "100%",
                marginTop: insets.top + windowHeight * 0.036,
              }}
            >
              <LocationSelector
                city={city}
                setCity={setCity}
                editCity={editCity}
                setEditCity={setEditCity}
                suggestions={suggestions}
                setSelectedCity={setSelectedCity}
                weather={weather}
              />
            </View>
            {suggestions.length > 0 && (
              <LocationSuggestionList
                suggestions={suggestions}
                onSelect={(cityName: string) => {
                  setCity(cityName);
                  setSelectedCity(cityName);
                  setEditCity(false);
                }}
                style={{
                  position: "absolute",
                  top: insets.top + windowHeight * 0.22,
                  left: 16,
                  right: 16,
                  zIndex: 999,
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
    </SafeAreaProvider>
  );
}
