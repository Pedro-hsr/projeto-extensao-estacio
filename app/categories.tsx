// app/categories.tsx this file manages transaction categories (adding, editing, removing)
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import colors from "../constants/colors";
import {
  getCategories,
  removeCategory,
  saveCategory,
  updateCategory,
} from "../lib/storage";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  async function loadCategories() {
    setCategories(await getCategories());
  }

  useFocusEffect(
    useCallback(() => {
      loadCategories();
    }, [])
  );

  async function handleSave() {
    if (!newCategory.trim()) {
      Alert.alert("Atenção", "Digite o nome da categoria");
      return;
    }
    if (editingIndex !== null) {
      await updateCategory(editingIndex, newCategory);
      Alert.alert("Sucesso", "Categoria atualizada");
    } else {
      await saveCategory(newCategory);
      Alert.alert("Sucesso", "Categoria adicionada");
    }
    setNewCategory("");
    setEditingIndex(null);
    loadCategories();
  }

  async function handleRemove(index) {
    Alert.alert("Confirmar", "Remover esta categoria?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: async () => {
          await removeCategory(index);
          loadCategories();
          Alert.alert("Sucesso", "Categoria removida");
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorias</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da categoria"
        value={newCategory}
        onChangeText={setNewCategory}
      />
      <Button
        title={editingIndex !== null ? "Atualizar" : "Adicionar"}
        onPress={handleSave}
        color={colors.primary}
      />
      <FlatList
        data={categories}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text>{item}</Text>
            <View style={styles.actions}>
              <Button
                title="Editar"
                color={colors.primary}
                onPress={() => {
                  setNewCategory(item);
                  setEditingIndex(index);
                }}
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
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
    color: colors.text,
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
});
