import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { resolveLocation, Coordinates } from "../utils/resolveLocation";
import { getCurrentThemeStyles } from "@/styles/themeStyles";
import { lightThemeColors, darkThemeColors } from "@/theme/themeColors";

export default function Index() {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const styles = getCurrentThemeStyles(isDark);
  const colors = colorScheme === "dark" ? darkThemeColors : lightThemeColors;

  useEffect(() => {
    (async () => {
      const { location, error } = await resolveLocation();
      setLocation(location);
      setError(error);
      setLoading(false);
    })();
  }, []);

  if (location || error) {
    return (
      <Redirect
        href={`/weather?latitude=${location?.latitude || ""}&longitude=${
          location?.longitude || ""
        }&error=${error || ""}`}
      />
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: insets.top,
        backgroundColor: colors.background,
      }}
    >
      {loading ? (
        <>
          <ActivityIndicator size="large" color={colors.text} />
          <Text style={{ color: colors.text, marginTop: 10 }}>
            Standort wird ermittelt...
          </Text>
        </>
      ) : (
        <Text style={{ color: "red" }}>
          Standort konnte nicht ermittelt werden
        </Text>
      )}
    </View>
  );
}
