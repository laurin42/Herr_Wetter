import React, { useState } from "react";
import { RefreshControl, ScrollView, useColorScheme } from "react-native";
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
import { useWeather } from "@/hooks/useWeather";

export default function WeatherScreen() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [city, setCity] = useState("");
  const [editCity, setEditCity] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const { suggestions, isLoading: isLoadingSuggestions } =
    useCitySuggestions(city);

  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? darkThemeColors : lightThemeColors;
  const insets = useSafeAreaInsets();

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
          <LocationSelector
            city={city}
            setCity={setCity}
            editCity={editCity}
            setEditCity={setEditCity}
            suggestions={suggestions}
            setSelectedCity={setSelectedCity}
            weather={weather}
          />

          <CurrentWeatherCard
            selectedCity={selectedCity}
            weather={weather}
            isLoading={isLoading}
            error={error}
          />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
