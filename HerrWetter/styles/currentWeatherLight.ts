import { StyleSheet } from "react-native";
import { lightThemeColors as colors } from "@/theme/lightThemeColors";


export const lightWeatherStyles = StyleSheet.create({
        container: {
        margin: 16,
        padding: 20,
        borderRadius: 12,
        backgroundColor: colors.card,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
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
    cardTitle: {
        fontSize: 24,
        color: colors.text
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
    contentWrapper: {
        flexDirection: "column",
        gap: 16,
    },
    topSection: {
        flexDirection: "row",
        alignItems: "center",
    },
    detailGrid: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
    },
    detailColumn: {
        flex: 1,
        flexDirection: "column",
        gap: 6,
    },
    iconGrid : {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 16,
    },
    tile: {
        width: "48%",
        backgroundColor: "rgba(19, 126, 158, 0.8)",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        alignItems: "center",
    },
    tileText: {
        color: "white",
        marginTop: 8,
        fontSize: 14,
        textAlign: "center",
    },
    });