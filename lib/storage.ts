// lib/storage.ts
// This module handles the storage of transactions, categories, and goals using AsyncStorage.
import AsyncStorage from "@react-native-async-storage/async-storage";

const TRANSACTIONS_KEY = "transactions";
const CATEGORIES_KEY = "categories";
const GOALS_KEY = "goals";

export async function saveTransaction(transaction) {
  const existing = await AsyncStorage.getItem(TRANSACTIONS_KEY);
  const transactions = existing ? JSON.parse(existing) : [];
  transactions.push(transaction);
  await AsyncStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
}

export async function getTransactions() {
  const stored = await AsyncStorage.getItem(TRANSACTIONS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export async function removeTransaction(index) {
  const existing = await AsyncStorage.getItem(TRANSACTIONS_KEY);
  let transactions = existing ? JSON.parse(existing) : [];
  transactions.splice(index, 1);
  await AsyncStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
}

export async function updateTransaction(index, updatedTransaction) {
  const existing = await AsyncStorage.getItem(TRANSACTIONS_KEY);
  let transactions = existing ? JSON.parse(existing) : [];
  transactions[index] = updatedTransaction;
  await AsyncStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
}

export async function saveCategory(category) {
  const existing = await AsyncStorage.getItem(CATEGORIES_KEY);
  const categories = existing ? JSON.parse(existing) : [];
  categories.push(category);
  await AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
}

export async function getCategories() {
  const stored = await AsyncStorage.getItem(CATEGORIES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export async function removeCategory(index) {
  const existing = await AsyncStorage.getItem(CATEGORIES_KEY);
  let categories = existing ? JSON.parse(existing) : [];
  categories.splice(index, 1);
  await AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
}

export async function updateCategory(index, updatedCategory) {
  const existing = await AsyncStorage.getItem(CATEGORIES_KEY);
  let categories = existing ? JSON.parse(existing) : [];
  categories[index] = updatedCategory;
  await AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
}

export async function saveGoal(goal) {
  await AsyncStorage.setItem(GOALS_KEY, JSON.stringify(goal));
}

export async function getGoal() {
  const stored = await AsyncStorage.getItem(GOALS_KEY);
  return stored ? JSON.parse(stored) : null;
}
