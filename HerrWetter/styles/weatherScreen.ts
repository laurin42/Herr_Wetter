import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#f0f4f8",
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
    color: "#222",
  },
  condition: {
    fontSize: 18,
    color: "#555",
  },
  location: {
    fontSize: 16,
    marginBottom: 12,
    color: "#333",
  },
    details: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 12,
  },
  detail: {
    fontSize: 14,
    color: "#444",
    marginBottom: 4,
  },
})