import { StyleSheet } from "react-native";
import { darkThemeColors, lightThemeColors } from "@/theme/themeColors";

export const getForecastWeatherStyles = (isDark: boolean) => {
  const colors = isDark ? darkThemeColors : lightThemeColors;

  return StyleSheet.create({
  contentWrapper: {
    flexDirection: "column",
    gap: 16,
  },    
  container: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
    backgroundColor: colors.cardTransparent,
  },
  cardTitle: {
    fontSize: 18,
    color: colors.text,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  forecastItem: {
    width: 120,
    padding: 12,
    marginRight: 12,
    borderRadius: 10,
    backgroundColor: colors.backgroundSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  forecastDate: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  weatherIcon: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: colors.text,
    textAlign: "center",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
});
}