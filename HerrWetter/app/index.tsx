import { Redirect } from "expo-router";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import * as Location from "expo-location";

export default function Index() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLocationLoaded, setIsLocationLoaded] = useState(false);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setIsLocationLoaded(true);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setIsLocationLoaded(true);
    }
    getCurrentLocation();
  }, []);

  if (!isLocationLoaded) {
    return (
      <View>
        <Text>Standort wird ermittelt...</Text>
      </View>
    );
  }

  if (location && location.coords) {
    const { latitude, longitude } = location.coords;
    return (
      <Redirect
        href={`/weather?latitude=${latitude}&longitude=${longitude}&error=${
          errorMsg || ""
        }`}
      />
    );
  }
}
