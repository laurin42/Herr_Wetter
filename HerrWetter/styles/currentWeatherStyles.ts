import { StyleSheet } from "react-native";
import { darkThemeColors, lightThemeColors } from "@/theme/themeColors";

export const getCurrentWeatherStyles = (isDark: boolean) => {
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
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rightSideContainer: {
    flexShrink: 1,
    flexGrow: 1,
    alignItems: "center",
  },
  conditionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 32,
  
  },
  conditionTextContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 12,
    position: "relative",
    flexShrink: 1,
  },
  condition: {
    fontSize: 16,
    color: colors.text,
    paddingBottom: 12,
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginRight: 12,
  },
  addIcon: {
    color: colors.ui.buttonPrimary,
  },
  editIcon: {
    fontSize: 12,
    color: colors.ui.buttonPrimary,
    marginTop: 2,
    right: -16,
    position: "absolute",
  },
  temp: {
    fontSize: 40,
    color: colors.text,
  },
  detailsList: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
    gap: 8,
  },
  detailIconWrapper: {
    width: 28,          
    alignItems: "flex-start",
    justifyContent: "center",
},
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
},
  detailText: {
    fontSize: 14,
    color: colors.textSecondary,
    flexShrink: 1,
},
});
}