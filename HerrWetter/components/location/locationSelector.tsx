import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  Pressable,
  useColorScheme,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CitySuggestion } from "@/hooks/useCitySuggestions";
import { locationSelectorDark } from "@/styles/locationSelectorDark";
import { locationSelectorLight } from "@/styles/locationSelectorLight";
import { Coordinates, resolveLocation } from "@/utils/resolveLocation";
import { WeatherData } from "@/services/weatherService";

type LocationSelectorProps = {
  city: string;
  setCity: (c: string) => void;
  editCity: boolean;
  setEditCity: (v: boolean) => void;
  setSelectedCoords: (coords: Coordinates) => void;
  setDisplayName: (name: string) => void;
  displayName: string;
  suggestions: CitySuggestion[];
  weather: WeatherData | null;
  containerStyle?: any;
};

export default function LocationSelector({
  city,
  setCity,
  editCity,
  setEditCity,
  setSelectedCoords,
  setDisplayName,
  displayName,
  suggestions,
  weather,
  containerStyle,
}: LocationSelectorProps) {
  const [loadingLocation, setLoadingLocation] = useState(false);
  const colorScheme = useColorScheme();
  const styles =
    colorScheme === "dark" ? locationSelectorDark : locationSelectorLight;

  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (editCity) {
      const timer = setTimeout(() => {
        textInputRef.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    } else {
      Keyboard.dismiss();
    }
  }, [editCity]);

  const handleSubmit = async () => {
    if (!city.trim()) return;
    const {
      location,
      displayName: resolvedDisplayName,
      error,
    } = await resolveLocation(city);
    if (error || !location) {
      console.error(error);
      return;
    }
    if (resolvedDisplayName) {
      setDisplayName(resolvedDisplayName);
    }
    setSelectedCoords(location);
    setEditCity(false);
  };

  const handleUseCurrentLocation = async () => {
    if (loadingLocation) return;
    setLoadingLocation(true);
    const {
      location,
      displayName: resolvedDisplayName,
      error,
    } = await resolveLocation();
    if (location && !error) {
      if (resolvedDisplayName) {
        setDisplayName(resolvedDisplayName);
      }
      setSelectedCoords(location);
      setEditCity(false);
    } else {
      console.warn(error);
    }
    setLoadingLocation(false);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.locationContainer}>
        <View style={styles.locationTextContainer}>
          <View style={{ width: "100%", position: "relative" }}>
            {!editCity ? (
              <Pressable
                onPress={() => {
                  setEditCity(true);
                  setCity("");
                }}
              >
                <Text style={styles.location}>
                  {weather?.location.name || displayName || "Standort wählen"}
                </Text>
              </Pressable>
            ) : (
              <TextInput
                ref={textInputRef}
                style={styles.location}
                value={city}
                onChangeText={setCity}
                placeholder={"Ort eingeben..."}
                placeholderTextColor="#aaa"
                returnKeyType="search"
                onSubmitEditing={handleSubmit}
                editable={true}
                onFocus={() => {
                  if (city !== "") {
                    setCity("");
                  }
                }}
                cursorColor={colorScheme === "dark" ? "white" : "#16396d"}
              />
            )}

            <Text style={styles.locationDetails}>
              {`${weather?.location.region ?? ""}, ${
                weather?.location.country ?? ""
              }`}
            </Text>
          </View>
        </View>

        {!editCity ? (
          <Pressable
            onPress={() => {
              setEditCity(true);
              setCity("");
            }}
          >
            <Ionicons name="search-sharp" size={32} style={styles.searchIcon} />
          </Pressable>
        ) : (
          <Pressable onPress={handleUseCurrentLocation}>
            {loadingLocation ? (
              <ActivityIndicator
                size={32}
                color={colorScheme === "dark" ? "#fff" : "#16396d"}
              />
            ) : (
              <MaterialIcons
                name="gps-fixed"
                size={32}
                style={styles.locationIcon}
              />
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
}
