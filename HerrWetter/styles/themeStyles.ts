import { StyleSheet } from "react-native";
import { darkThemeColors, lightThemeColors } from "@/theme/themeColors";

export const getCurrentThemeStyles = (isDark: boolean) => {
  const colors = isDark ? darkThemeColors : lightThemeColors;

  return StyleSheet.create({
    container: {
        margin: 16,
        padding: 20,
        borderRadius: 12,
        backgroundColor: colors.cardTransparent,
        elevation: 10,
    },
    button: {
        color: colors.ui.buttonPrimary,
    },
    input: {
        backgroundColor: colors.cardTransparent,
        color: colors.text,
        padding: 10,
        borderRadius: 8,
        borderColor: colors.border,
        borderWidth: 1,
    },
    text: {
        fontSize: 14,
        color: colors.text,
    } 
})
}