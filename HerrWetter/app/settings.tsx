import { Text, View, StyleSheet } from "react-native";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Einstellungen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F7FA",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "222222",
  },
});
