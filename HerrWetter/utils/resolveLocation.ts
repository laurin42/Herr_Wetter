import * as Location from "expo-location";

export type Coordinates = {
    latitude: number;
    longitude: number;
};


export async function resolveLocation(city?: string): Promise<{
  location: Coordinates | null;
  error: string | null;
}> {
  try {
    if (city) {
      const position = await Location.geocodeAsync(city);
      if (position.length > 0) {
        const { latitude, longitude } = position[0];
        return { location: { latitude, longitude }, error: null };
      } else {
        return { location: null, error: "Stadt nicht gefunden" };
      }
    } else {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return { location: null, error: "Standortberechtigung verweigert" };
      }
      const position = await Location.getCurrentPositionAsync({});
      return {
        location: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        error: null,
      };
    }
  } catch (e) {
    return { location: null, error: "Fehler beim Ermitteln der Position" };
  }
}
