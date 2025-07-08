import React from "react";
import { Text, TextInput, View, Pressable, useColorScheme } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
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
            <View style={{ width: "100%" }}>
              <TextInput
                style={styles.location}
                value={city}
                onChangeText={setCity}
                placeholder="Stadt eingeben"
                placeholderTextColor="#aaa"
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
                autoFocus={true}
              />
              {suggestions.length > 0 && (
                <View style={{ marginTop: 6 }}>
                  <LocationSuggestionList
                    suggestions={suggestions}
                    onSelect={handleSelectSuggestion}
                  />
                </View>
              )}
            </View>
          ) : (
            <View style={styles.cityRow}>
              <Pressable
                onPress={() => {
                  setEditCity(true);
                  setTimeout(() => setCity(""), 10);
                }}
                style={styles.cityRow}
              >
                <Text style={styles.location}>{weather?.city}</Text>
                <FontAwesome name="pencil" style={styles.editIcon} />
              </Pressable>
            </View>
          )}
          <Text style={styles.locationDetails}>
            {editCity && suggestions.length > 0
              ? `${suggestions[0].city}, ${suggestions[0].region}, ${suggestions[0].country}`
              : `${weather?.city}, ${weather?.region}, ${weather?.country}`}
          </Text>
        </View>
        {!editCity ? (
          <Ionicons
            name="add-circle-outline"
            size={32}
            style={styles.addIcon}
          />
        ) : (
          <Ionicons name="add-circle-outline" size={32} color="transparent" />
        )}
      </View>
    </View>
  );
}
