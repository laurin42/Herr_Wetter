import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { resolveLocation, Coordinates } from "../utils/resolveLocation";

export default function Index() {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#0A1A2F",
  },
  text: { color: "#AFC6E0", fontSize: 16, marginBottom: 16 },
  input: {
    height: 48,
    backgroundColor: "#102840",
    color: "#FFFFFF",
    paddingHorizontal: 12,
    borderRadius: 8,
    borderColor: "#335577",
    borderWidth: 1,
    marginBottom: 16,
  },
});
