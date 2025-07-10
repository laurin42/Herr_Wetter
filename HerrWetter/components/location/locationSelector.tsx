import React from "react";
import {
  Text,
  TextInput,
  View,
  Pressable,
  useColorScheme,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import LocationSuggestionList from "./locationSuggestionList";
import { CitySuggestion } from "@/hooks/useCitySuggestions";
import { locationSelectorDark } from "@/styles/locationSelectorDark";
import { locationSelectorLight } from "@/styles/locationSelectorLight";

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
  const colorScheme = useColorScheme();
  const styles =
    colorScheme === "dark" ? locationSelectorDark : locationSelectorLight;

  const handleSubmit = () => {
    const bestMatch = suggestions[0]?.city || city;
    setSelectedCity(bestMatch);
    setCity(bestMatch);
    setEditCity(false);
  };
  const handleSelectSuggestion = (cityName: string) => {
    setCity(cityName);
    setSelectedCity(cityName);
    setEditCity(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.locationContainer}>
        <View style={styles.locationTextContainer}>
          {editCity ? (
            <View style={{ width: "100%", position: "relative" }}>
              <TextInput
                onFocus={(e) => {
                  if (Platform.OS === "web") {
                    e.preventDefault();
                  }
                }}
                style={styles.location}
                value={city}
                onChangeText={setCity}
                placeholder={weather.city}
                placeholderTextColor="#aaa"
                returnKeyType="done"
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
        <Pressable
          onPress={() => {
            setEditCity(true);
            setTimeout(() => setCity(""), 10);
          }}
        >
          <Ionicons name="search-sharp" size={32} style={styles.searchIcon} />
        </Pressable>
        <Pressable>
          <MaterialIcons
            name="gps-fixed"
            size={32}
            style={styles.locationIcon}
          />
        </Pressable>
      </View>
    </View>
  );
}
