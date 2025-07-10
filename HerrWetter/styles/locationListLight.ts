import { StyleSheet } from "react-native";
import { lightThemeColors as colors } from "@/theme/lightThemeColors";


export const locationListLight = StyleSheet.create({
    container: {
      marginBottom: 8,
      backgroundColor: colors.card,
      borderRadius: 8,
      zIndex: 1000,
    },
    textContainer:{
        flexDirection: "column",
    },  
    headerText: {
      fontSize: 16,
      fontWeight: "bold",
      marginHorizontal: 20,
      paddingVertical: 16,
      color: colors.textSecondary,
    },      
    suggestionItem: {
      padding: 10,
    },
    suggestionText: {
      color: colors.text,
      position: "relative",
    },
    cityText: {
      color: colors.text,
      fontWeight: "bold",
      position: "relative",
      marginHorizontal: 16,
    },
    detailText: {
        color: colors.textSecondary,
    },
    locationIcon: {
        color: colors.ui.buttonSecondary,
        position: "absolute",
        marginHorizontal: 8,
    }
  });