import { StyleSheet } from "react-native";
import { lightThemeColors as colors } from "@/theme/lightThemeColors";

export const lightThemeStyles = StyleSheet.create({
    container: {
        margin: 16,
        padding: 20,
        borderRadius: 12,
        backgroundColor: colors.cardTransparent,
        elevation: 10,
    },
    button: {
        color: colors.ui.buttonPrimary,
    },
    input: {
        backgroundColor: colors.cardTransparent,
        color: colors.text,
        padding: 10,
        borderRadius: 8,
        borderColor: colors.border,
        borderWidth: 1,
    },
    text: {
        fontSize: 14,
        color: colors.text,
    } 
})