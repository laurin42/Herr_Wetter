import * as Location from "expo-location";

export type Coordinates = {
    latitude: number;
    longitude: number;
};


export async function resolveLocation(city?: string): Promise<{
  location: Coordinates | null;
  displayName: string | null;
  error: string | null;
}> {
  try {
    if (city) {
      const position = await Location.geocodeAsync(city);
      if (position.length > 0) {
        const coords = position[0];
        const geocodeReverse = await Location.reverseGeocodeAsync(coords);
        const location = geocodeReverse[0];
        const displayName = location.city || location.region || location.country || city;

        return { location: { latitude: coords.latitude, longitude: coords.longitude }, displayName, error: null };
      } else {
        return { location: null, displayName: null, error: `${city}Stadt nicht gefunden` };
      }
    } else {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return { location: null, displayName: null, error: "Standortberechtigung verweigert" };
      }
      const position = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      const geocodeReverse = await Location.reverseGeocodeAsync(coords);
      const location = geocodeReverse[0];
      const displayName = location.city ||location.region || location.country ||"";
      return {
        location: coords,
        displayName,
        error: null,
      };
    }
  } catch (e) {
    return ({ location: null, displayName: null, error: "Fehler beim Ermitteln der Position" }) ;
  }
}
