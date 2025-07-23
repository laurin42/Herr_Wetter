import React from "react";
import {
  View,
  FlatList,
  Pressable,
  Text,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import { CitySuggestion } from "@/hooks/useCitySuggestions";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { resolveLocation, Coordinates } from "@/utils/resolveLocation";
import { getCitySuggestionStyles } from "@/styles/citySuggestionStyles";

type locSuggestionListProps = {
  suggestions: CitySuggestion[];
  onSelect: (coords: Coordinates, displayName: string) => void;
  style?: ViewStyle;
};

export default function LocationSuggestionList({
  suggestions,
  onSelect,
  style,
}: locSuggestionListProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const styles = getCitySuggestionStyles(isDark);

  const { height: windowHeight } = useWindowDimensions();
  const maxHeight = Math.min(suggestions.length * 96, windowHeight * 0.7);
  return (
    <View style={[style, { maxHeight, minHeight: 140 }]}>
      <FlatList
        scrollEnabled
        data={suggestions}
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={() => (
          <Text style={styles.headerText}>Vorgeschlagene Orte:</Text>
        )}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        renderItem={({ item, index }) => {
          const isLast = index === suggestions.length - 1;
          const isOnlyItem = suggestions.length === 1;

          return (
            <Pressable
              onPress={async () => {
                const suggestionQuery = [item.city, item.region, item.country]
                  .filter(Boolean)
                  .join(", ");
                const { location, displayName, error } = await resolveLocation(
                  suggestionQuery
                );
                console.log(
                  "ResolveLocation Ergebnis:",
                  location,
                  displayName,
                  error
                );
                if (location && displayName) {
                  onSelect(location, displayName);
                } else {
                  console.warn(error);
                }
              }}
              style={[
                styles.suggestionItem,
                (isLast || isOnlyItem) && {
                  borderBottomWidth: 0,
                },
              ]}
            >
              <Ionicons name="location" size={16} style={styles.locationIcon} />
              <View style={styles.textContainer}>
                <Text style={styles.cityText}>{item.city}</Text>
                <Text style={styles.detailText}>
                  {[item.region, item.country].filter(Boolean).join(", ")}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
