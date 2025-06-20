import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "index", headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="weather"
        options={{ title: "weather", headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="settings"
        options={{ title: "settings" }}
      ></Stack.Screen>
    </Stack>
  );
}
