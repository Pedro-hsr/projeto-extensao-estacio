// app/new-transaction.tsx this file allows users to create a new transaction
import colors from "@/constants/colors";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function NewTransaction() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Transação</Text>
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Valor"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <Button title="Salvar" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: colors.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
    color: colors.text,
  },
});
