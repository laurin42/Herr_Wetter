import { StyleSheet } from "react-native";
import { darkThemeColors as colors} from "@/theme/darkThemeColors";

export const locationListDark = StyleSheet.create({
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