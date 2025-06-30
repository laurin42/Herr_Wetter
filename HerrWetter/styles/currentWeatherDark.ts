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
    conditionContainer: {
        
    },
    icon: {
        width: 100,
        height: 100,
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
        marginBottom: 24,
        borderBottomWidth: 1,
         borderBottomColor: colors.border,
         paddingVertical: 4,

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
});