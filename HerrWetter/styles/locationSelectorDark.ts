import { StyleSheet } from "react-native";
import { darkThemeColors as colors } from "@/theme/darkThemeColors";

export const locationSelectorDark = StyleSheet.create({
    container: {
        margin: 16,
        padding: 20,
        borderRadius: 12,
        backgroundColor: colors.cardTransparent,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        maxHeight: 200,
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
        fontSize: 14,
        color: colors.textSecondary,
    },
    searchIcon: {
        fontSize: 42,
        color: colors.ui.buttonPrimary,
    },
    locationIcon: {
        fontSize: 42,
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