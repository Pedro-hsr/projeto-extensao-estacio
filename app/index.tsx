// app/index.tsx
// This file serves as the main entry point for the app, displaying the dashboard.
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";
import { getGoal, getTransactions } from "../lib/storage";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [goal, setGoal] = useState(null);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          setTransactions(await getTransactions());
          setGoal(await getGoal());
        } catch {
          Alert.alert("Erro", "Não foi possível carregar os dados");
        }
      })();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text>Transações registradas: {transactions.length}</Text>
      <Text>Meta atual: {goal ? `R$ ${goal}` : "Nenhuma definida"}</Text>
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
