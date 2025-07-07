import { StyleSheet } from "react-native";
import { darkThemeColors as colors } from "@/theme/darkThemeColors";

export const darkWeatherStyles = StyleSheet.create({
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
        flexDirection: "column",
    },
    location: {
        display: "flex",
        fontSize: 24,
        color: colors.text,
    },
    cityRow: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    locationDetails: {
        flexDirection: "row",
        fontSize: 12,
        color: colors.textSecondary,
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
    },
    details: {
         fontSize: 14,
         color: colors.text,
         borderTopWidth: 1,
         borderTopColor: colors.border,
         paddingVertical: 12,
    },
    detail: {
        fontSize: 14,
        color: colors.text,
        marginBottom: 4,
    },
    textInput: {
        backgroundColor: colors.card,
        color: colors.text,
        padding: 10,
        borderRadius: 8,
        borderColor: colors.border,
        borderWidth: 1,
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
});