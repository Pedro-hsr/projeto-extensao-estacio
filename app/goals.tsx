// app/goals.tsx this file allows users to set monthly financial goals
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../constants/colors";
import { getGoal, saveGoal } from "../lib/storage";

export default function Goals() {
  const [goal, setGoal] = useState("");
  const [error, setError] = useState(false);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const storedGoal = await getGoal();
          if (storedGoal) setGoal(storedGoal.toString());
        } catch {
          Alert.alert("Erro", "Não foi possível carregar a meta");
        }
      })();
    }, [])
  );

  async function handleSave() {
    const isInvalid = !goal.trim();
    setError(isInvalid);
    if (isInvalid) {
      Alert.alert("Atenção", "Digite um valor válido para a meta");
      return;
    }

    try {
      await saveGoal(goal);
      Alert.alert("Sucesso", "Meta salva com sucesso");
    } catch {
      Alert.alert("Erro", "Não foi possível salvar a meta");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meta de Gastos</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholder="Valor da meta"
        value={goal}
        onChangeText={setGoal}
        keyboardType="numeric"
        placeholderTextColor={colors.placeholder}
      />
      <Button title="Salvar Meta" onPress={handleSave} color={colors.primary} />
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
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
    width: "100%",
    color: colors.text,
  },
  inputError: {
    borderColor: "red",
  },
});
