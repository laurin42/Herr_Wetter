import {
  View,
  useColorScheme,
  Appearance,
  Switch,
  ScrollView,
} from "react-native";
import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { lightThemeColors, darkThemeColors } from "@/theme/themeColors";
import LinearGradient from "react-native-linear-gradient";

export default function SettingsScreen() {
  let colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? darkThemeColors : lightThemeColors;

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={[colors.backgroundSecondary, colors.background]}
          start={{ x: 1, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
          }}
        />
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "transparent",
            paddingTop: insets.top,
          }}
        >
          <ScrollView>
            <Switch
              value={colorScheme === "dark"}
              onChange={() => {
                Appearance.setColorScheme(
                  colorScheme === "dark" ? "light" : "dark"
                );
              }}
            ></Switch>
          </ScrollView>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}
