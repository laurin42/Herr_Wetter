import { View, useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { lightSettingsScreen } from "@/styles/lightSettingsScreen";
import { darkSettingsScreen } from "@/styles/darkSettingsScreen";
import { lightThemeColors } from "@/theme/lightThemeColors";
import { darkThemeColors } from "@/theme/darkThemeColors";

export default function SettingsScreen() {
  let colorScheme = useColorScheme();
  const styles =
    colorScheme === "dark" ? darkSettingsScreen : lightSettingsScreen;

  const colors = colorScheme === "dark" ? darkThemeColors : lightThemeColors;

  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: colors.background,
      }}
    >
      <View></View>
    </View>
  );
}
