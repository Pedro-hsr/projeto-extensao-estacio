// app/transactions.tsx this file displays a list of transactions

import { FlatList, StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

const dummyData = [
  { id: "1", description: "Compra no mercado", amount: "-R$ 150,00" },
  { id: "2", description: "Salário", amount: "+R$ 3.200,00" },
];

export default function Transactions() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transações</Text>
      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.description}</Text>
            <Text>{item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: colors.primary,
  },
  item: {
    padding: 12,
    backgroundColor: colors.surface,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
