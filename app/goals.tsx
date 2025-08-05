// app/goals.tsx this file allows users to set monthly financial goals
import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

export default function Goals() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Metas Mensais</Text>
      <Text>Defina quanto você quer gastar ou economizar neste mês.</Text>
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
