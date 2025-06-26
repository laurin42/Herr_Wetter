import { StyleSheet } from "react-native";
import { darkThemeColors as colors } from "@/theme/darkThemeColors";

export const darkWeatherStyles = StyleSheet.create({
    container: {
        margin: 16,
        padding: 20,
        borderRadius: 12,
        backgroundColor: colors.card,
        elevation: 4,
    },
    icon: {
        width: 64,
        height: 64,
        marginRight: 12,
    },
    temp: {
        fontSize: 32,
        fontWeight: "bold",
        color: colors.text,
    },
    condition: {
        fontSize: 18,
        color: colors.text,
    },
    location: {
        fontSize: 16,
        marginBottom: 12,
        color: colors.text,
    },
    details: {
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: 12,
        color: colors.text,
    },
    detail: {
        fontSize: 14,
        color: colors.text,
        marginBottom: 4,
    },
});