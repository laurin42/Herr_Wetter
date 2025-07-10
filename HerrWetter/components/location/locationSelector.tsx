import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  Pressable,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CitySuggestion } from "@/hooks/useCitySuggestions";
import { locationSelectorDark } from "@/styles/locationSelectorDark";
import { locationSelectorLight } from "@/styles/locationSelectorLight";
import { resolveLocation } from "@/utils/resolveLocation";

type locationSelectorProps = {
  city: string;
  setCity: (c: string) => void;
  editCity: boolean;
  setEditCity: (v: boolean) => void;
  suggestions: CitySuggestion[];
  setSelectedCity: (c: string) => void;
  weather: any;
};

export default function LocationSelector({
  city,
  setCity,
  editCity,
  setEditCity,
  suggestions,
  setSelectedCity,
  weather,
}: locationSelectorProps) {
  const [loadingLocation, setLoadingLocation] = useState(false);

  const colorScheme = useColorScheme();
  const styles =
    colorScheme === "dark" ? locationSelectorDark : locationSelectorLight;

  const handleSubmit = () => {
    const bestMatch = suggestions[0]?.city || city;
    setSelectedCity(bestMatch);
    setCity(bestMatch);
    setEditCity(false);
  };

  const handleUseCurrentLocation = async () => {
    if (loadingLocation) return;
    setLoadingLocation(true);
    const { location, error } = await resolveLocation();
    if (location && !error) {
      const reverseGeocode = await Location.reverseGeocodeAsync(location);
      if (reverseGeocode.length > 0) {
        const geoData = reverseGeocode[0];
        const locationCity =
          geoData.city || geoData.region || geoData.country || "";
        setCity(locationCity);
      }
    } else {
      console.warn(error);
    }
    setLoadingLocation(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.locationContainer}>
        <View style={styles.locationTextContainer}>
          {editCity ? (
            <View style={{ width: "100%", position: "relative" }}>
              <TextInput
                style={styles.location}
                value={city}
                onChangeText={setCity}
                placeholder={weather.city}
                placeholderTextColor="#aaa"
                returnKeyType="search"
                onSubmitEditing={handleSubmit}
                autoFocus={true}
              />
              <Text style={styles.locationDetails}>
                {`${weather?.region}, ${weather?.country}`}
              </Text>
            </View>
          ) : (
            <View style={styles.cityRow}>
              <Pressable
                onPress={() => {
                  setEditCity(true);
                  setTimeout(() => setCity(""), 10);
                }}
              >
                <Text style={styles.location}>{weather?.city}</Text>
              </Pressable>
            </View>
          )}
          {!editCity && (
            <Text style={styles.locationDetails}>
              {`${weather?.region}, ${weather?.country}`}
            </Text>
          )}
        </View>
        {!editCity && (
          <Pressable
            onPress={() => {
              setEditCity(true);
              setTimeout(() => setCity(""), 10);
            }}
          >
            <Ionicons name="search-sharp" size={32} style={styles.searchIcon} />
          </Pressable>
        )}
        {editCity && (
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
