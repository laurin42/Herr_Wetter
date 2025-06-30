import { StyleSheet } from "react-native";
import { lightThemeColors as colors } from "@/theme/lightThemeColors";


export const lightWeatherStyles = StyleSheet.create({
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
        fontSize: 12,
        marginBottom: 12,
        color: colors.text,
    },
    details: {
        fontSize: 14,
        color: colors.text,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    detail: {
        fontSize: 14,
        color: colors.text,
        marginBottom: 4,
    },
});