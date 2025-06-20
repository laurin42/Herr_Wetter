import { Text, View, StyleSheet } from "react-native";

export default function WeatherScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Wetter</Text>
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
