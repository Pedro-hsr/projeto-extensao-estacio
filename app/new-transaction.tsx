// app/new-transaction.tsx this file allows creating and editing a transaction
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../constants/colors";
import {
  getCategories,
  getTransactions,
  saveTransaction,
  updateTransaction,
} from "../lib/storage";

export default function NewTransaction() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { index } = useLocalSearchParams();

  useEffect(() => {
    (async () => {
      setCategories(await getCategories());
      if (index !== undefined) {
        const data = await getTransactions();
        const tx = data[Number(index)];
        if (tx) {
          setDescription(tx.description);
          setAmount(tx.amount);
          setCategory(tx.category || "");
        }
      }
    })();
  }, [index]);

  async function handleSave() {
    if (!description.trim() || !amount.trim()) {
      Alert.alert("Atenção", "Preencha todos os campos");
      return;
    }
    const transactionData = { description, amount, category };
    if (index !== undefined) {
      await updateTransaction(Number(index), transactionData);
      Alert.alert("Sucesso", "Transação atualizada");
    } else {
      await saveTransaction(transactionData);
      Alert.alert("Sucesso", "Transação salva");
    }
    router.back();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {index !== undefined ? "Editar" : "Nova"} Transação
      </Text>
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
      <Picker
        selectedValue={category}
        onValueChange={setCategory}
        style={styles.input}
      >
        <Picker.Item label="Selecione uma categoria" value="" />
        {categories.length > 0 ? (
          categories.map((cat, idx) => (
            <Picker.Item key={idx} label={cat} value={cat} />
          ))
        ) : (
          <Picker.Item label="Sem categorias" value="" />
        )}
      </Picker>
      <Button title="Salvar" onPress={handleSave} color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
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
  },
});
