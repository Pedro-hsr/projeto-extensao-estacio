import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <Drawer>
      <Drawer.Screen name="index" options={{ title: "Dashboard" }} />
      <Drawer.Screen name="transactions" options={{ title: "Transações" }} />
      <Drawer.Screen
        name="new-transaction"
        options={{ title: "Nova Transação" }}
      />
      <Drawer.Screen name="categories" options={{ title: "Categorias" }} />
      <Drawer.Screen name="goals" options={{ title: "Metas" }} />
    </Drawer>
  );
}
