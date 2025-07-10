import { StyleSheet } from "react-native";
import { lightThemeColors as colors } from "@/theme/lightThemeColors";

export const locationSelectorLight = StyleSheet.create({
    container: {
        margin: 16,
        padding: 20,
        borderRadius: 12,
        backgroundColor: colors.card,
        elevation: 10,
        position: "absolute",
    },    
    locationContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 6,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    locationTextContainer: {
        flexDirection: "column",
    },
    location: {
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
        fontSize: 12,
        color: colors.textSecondary,
    },
        searchIcon: {
            color: colors.ui.buttonPrimary,
        },
        locationIcon: {
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