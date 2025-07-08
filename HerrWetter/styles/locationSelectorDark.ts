import { StyleSheet } from "react-native";
import { darkThemeColors as colors } from "@/theme/darkThemeColors";

export const locationSelectorDark = StyleSheet.create({
    container: {
        margin: 16,
        padding: 20,
        borderRadius: 12,
        backgroundColor: colors.card,
        elevation: 10,
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
        justifyContent: "flex-start",
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
    },
    locationDetails: {
        fontSize: 12,
        color: colors.textSecondary,
    },
    addIcon: {
        color: colors.ui.buttonPrimary,
    },
    editIcon: {
        fontSize: 12,
        color: colors.ui.buttonPrimary,
        top: 0,
        right: -16,
        position: "absolute",
    },
    });