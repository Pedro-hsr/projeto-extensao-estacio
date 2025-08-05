// app/categories.tsx this file displays a list of categories
import colors from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

export default function Categories() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorias</Text>
      <Text>Aqui você poderá gerenciar suas categorias de gastos.</Text>
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
