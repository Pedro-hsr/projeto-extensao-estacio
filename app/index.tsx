// app/index.tsx
// This file serves as the main entry point for the app, displaying the dashboard.
import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text>Resumo financeiro e gráficos virão aqui.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: colors.primary,
  },
});
