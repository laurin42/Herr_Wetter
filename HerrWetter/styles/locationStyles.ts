import { StyleSheet } from "react-native";
import { darkThemeColors, lightThemeColors } from "@/theme/themeColors";

export const getLocationStyles = (isDark: boolean) => {
  const colors = isDark ? darkThemeColors : lightThemeColors;
  return StyleSheet.create({
    container: {
        margin: 16,
        padding: 20,
        borderRadius: 12,
        backgroundColor: colors.cardTransparent,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        maxHeight: 120,
        position: "relative",

    },       
    locationContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 6,

    },
    locationTextContainer: {
        flexShrink: 1,
        justifyContent: "flex-start",
        flexDirection: "column",
    },
    location: {
        minHeight: 40,
        paddingVertical: 8,
        display: "flex",
        fontSize: 24,
        color: colors.text,
    },
    cityRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    locationDetails: {
        flexShrink: 1,
        fontSize: 14,
        color: colors.textSecondary,
    },
    searchIcon: {
        fontSize: 32,
        color: colors.ui.buttonPrimary,
    },
    locationIcon: {
        fontSize: 32,
        color: colors.ui.buttonPrimary,
    },
    locationIcons: {
        position: "absolute",
        top: -8,
        right: 0,
        flexDirection: "row",
        gap: 12,
    },
    suggestionOverlay: {
        position: "absolute",
        top: 50,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: colors.card,
        borderRadius: 8,
        elevation: 8, 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        },
    });
}