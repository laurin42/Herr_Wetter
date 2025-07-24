import { StyleSheet } from "react-native";
import { darkThemeColors, lightThemeColors } from "@/theme/themeColors";

export const getForecastWeatherStyles = (isDark: boolean) => {
  const colors = isDark ? darkThemeColors : lightThemeColors;

  return StyleSheet.create({
    contentWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 8,
    },
    container: {
      marginVertical: 2,
      marginHorizontal: 8,
      padding: 20,
      backgroundColor: colors.cardTransparent,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
    },
    cardTitle: {
      fontSize: 18,
      color: colors.text,
      marginBottom: 16,
      paddingBottom: 5,
      borderBottomWidth: 1,
      borderColor: colors.border,
    },
    forecastItem: {
      flex: 1,
      maxWidth: "30%",
      paddingVertical: 4,
      margin: 2,
      borderRadius: 10,
      backgroundColor: colors.cardTransparent,
      alignItems: "center",
      justifyContent: "space-between",
      minHeight: 160,
    },
    weekdayLabel: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 8,
    },
    weatherIcon: {
      width: 50,
      height: 50,
      marginBottom: 6,
    },
    detailText: {
      fontSize: 14,
      color: colors.text,
      textAlign: "center",
      marginBottom: 4,
    },
    tempRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 2,
    },
    tempIcon: {
      paddingLeft: 12,
    },
    tempValue: {
      flex: 1,
      fontSize: 14,
      right: 8,
      color: colors.text,
      textAlign: "center",
    },
  });
};
