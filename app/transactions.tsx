// app/transactions.tsx this file displays a list of transactions
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, Button, FlatList, StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";
import { getTransactions, removeTransaction } from "../lib/storage";

type Transaction = {
  description: string;
  amount: number;
  category?: string;
};

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      (async () => setTransactions(await getTransactions()))();
    }, [])
  );

  async function handleRemove(index) {
    Alert.alert("Confirmar", "Remover esta transação?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: async () => {
          await removeTransaction(index);
          setTransactions(await getTransactions());
          Alert.alert("Sucesso", "Transação removida");
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transações</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <View>
              <Text>{item.description}</Text>
              <Text>{item.amount}</Text>
              {item.category ? (
                <Text style={styles.category}>Categoria: {item.category}</Text>
              ) : null}
            </View>
            <View style={styles.actions}>
              <Button
                title="Editar"
                color={colors.primary}
                onPress={() =>
                  router.push({
                    pathname: "/new-transaction",
                    params: { index },
                  })
                }
              />
              <Button
                title="Remover"
                color={colors.secondary}
                onPress={() => handleRemove(index)}
              />
            </View>
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
    alignItems: "center",
  },
  actions: { flexDirection: "row", gap: 8 },
  category: { fontSize: 12, color: colors.text },
});
