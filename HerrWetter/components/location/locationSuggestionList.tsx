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
import { locationListLight } from "@/styles/locationListLight";
import { locationListDark } from "@/styles/locationListDark";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import Ionicons from "@expo/vector-icons/Ionicons";

type locSuggestionListProps = {
  suggestions: CitySuggestion[];
  onSelect: (city: string) => void;
  style?: ViewStyle;
};

export default function LocationSuggestionList({
  suggestions,
  onSelect,
  style,
}: locSuggestionListProps) {
  const colorScheme = useColorScheme();
  const styles = colorScheme === "dark" ? locationListDark : locationListLight;

  const { height: windowHeight } = useWindowDimensions();
  const maxHeight = Math.min(suggestions.length * 96, windowHeight * 0.7);

  return (
    <View style={[style, { maxHeight }]}>
      <FlatList
        scrollEnabled
        data={suggestions}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item, index }) => {
          const isLast = index === suggestions.length - 1;
          const isOnlyItem = suggestions.length === 1;

          return (
            <Pressable
              onPress={() => onSelect(item.city)}
              style={[
                styles.suggestionItem,
                (isLast || isOnlyItem) && { borderBottomWidth: 0 },
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
