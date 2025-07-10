import { StyleSheet } from "react-native";
import { lightThemeColors as colors } from "@/theme/lightThemeColors";


export const locationListLight = StyleSheet.create({
    container: {
      marginBottom: 8,
      backgroundColor: colors.card,
      borderRadius: 8,
      zIndex: 1000,
      position: "relative",
    },
    suggestionItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerText: {
      fontSize: 16,
      fontWeight: "bold",
      marginHorizontal: 20,
      paddingVertical: 16,
      color: colors.textSecondary,
    },
    textContainer:{
        flexDirection: "column",
    },    
    cityText: {
      color: colors.text,
      fontWeight: "bold",
      position: "relative",
      marginBottom: 4,
    },
    detailText: {
        color: colors.textSecondary,
    },
    locationIcon: {
        color: colors.ui.buttonSecondary,
        marginRight: 12,
    }
  });