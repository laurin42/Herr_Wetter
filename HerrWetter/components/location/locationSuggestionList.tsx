import React from "react";
import { FlatList, Pressable, Text, useColorScheme } from "react-native";
import { CitySuggestion } from "@/hooks/useCitySuggestions";
import { darkThemeColors } from "@/theme/darkThemeColors";
import { lightThemeColors } from "@/theme/lightThemeColors";

type locSuggestionListProps = {
  suggestions: CitySuggestion[];
  onSelect: (city: string) => void;
};

export default function LocationSuggestionList({
  suggestions,
  onSelect,
}: locSuggestionListProps) {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? darkThemeColors : lightThemeColors;

  return (
    <FlatList
      scrollEnabled={false}
      data={suggestions}
      keyExtractor={(item, index) =>
        item.id ? item.id.toString() : index.toString()
      }
      style={{
        marginBottom: 8,
        backgroundColor: colors.card,
        borderRadius: 8,
        zIndex: 1000,
      }}
      keyboardShouldPersistTaps="handled"
      renderItem={({ item }) => (
        <Pressable
          onPress={() => onSelect(item.city)}
          style={{
            padding: 10,
          }}
        >
          <Text>
            {[item.city, item.region, item.country].filter(Boolean).join(",")}
          </Text>
        </Pressable>
      )}
    />
  );
}
