import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { resolveLocation, Coordinates } from "../utils/resolveLocation";
import { darkThemeStyles } from "@/styles/darkThemeStyles";
import { lightThemeStyles } from "@/styles/lightThemeStyles";
import { darkThemeColors } from "@/theme/darkThemeColors";
import { lightThemeColors } from "@/theme/lightThemeColors";

export default function Index() {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const colorScheme = useColorScheme();
  const styles = colorScheme === "dark" ? darkThemeStyles : lightThemeStyles;
  const colors = colorScheme === "dark" ? darkThemeColors : lightThemeColors;
  const insets = useSafeAreaInsets();

  async function loadLocation(cityOverride?: string) {
    setLoading(true);
    const { location, error } = await resolveLocation(cityOverride);
    setLocation(location);
    setError(error);
    setLoading(false);
  }

  useEffect(() => {
    loadLocation();
  }, []);

  if (location) {
    return (
      <Redirect
        href={`/weather?latitude=${location.latitude}&longitude=${
          location.longitude
        }&error=${error || ""}`}
      />
    );
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: colors.background,
      }}
    >
      <View style={styles.container}>
        <Text style={styles.text}>
          {loading
            ? "Standort wird ermittelt..."
            : error || "Standort nicht verfügbar"}
        </Text>

        {!loading && (
          <>
            <TextInput
              placeholder="Stadt eingeben"
              value={city}
              onChangeText={setCity}
              style={styles.input}
            />
            <Button
              title="Stadt verwenden"
              onPress={() => {
                if (city.trim()) {
                  loadLocation(city.trim());
                }
              }}
            />
          </>
        )}
      </View>
    </View>
  );
}
