import { Tabs } from "expo-router";
import { PlatformPressable } from "@react-navigation/elements";
import { useColorScheme } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { lightThemeColors } from "@/theme/lightThemeColors";
import { darkThemeColors } from "@/theme/darkThemeColors";

export default function TabLayout() {
  let colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? darkThemeColors : lightThemeColors;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.ui.active,
        tabBarButton: (props) => (
          <PlatformPressable
            {...props}
            android_ripple={{ color: "transparent" }}
          />
        ),
        headerPressOpacity: 0,
      }}
    >
      <Tabs.Screen
        name="weather"
        options={{
          headerShown: false,
          title: "Wetter",
          animation: "none",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cloud" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: "Einstellungen",
          animation: "none",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
