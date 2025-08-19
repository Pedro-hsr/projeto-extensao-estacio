// lib/analytics.ts
// This module provides functions to analyze financial transactions and goals.
export type CategorySpending = {
  name: string;
  value: number;
};

export type MonthlySpending = {
  name: string;
  value: number;
};

/**
 * Agrupa transações por categoria
 */
export function getSpendingByCategory(transactions: any[]): CategorySpending[] {
  const totals: Record<string, number> = {};
  transactions.forEach((t) => {
    const category = t.category || "Outros";
    const amount = parseFloat(t.amount) || 0;
    totals[category] = (totals[category] || 0) + amount;
  });

  return Object.entries(totals).map(([name, value]) => ({
    name,
    value: value as number,
  }));
}

/**
 * Agrupa transações por mês (simplificado: sem data real no modelo ainda)
 */
export function getSpendingByMonth(transactions: any[]): MonthlySpending[] {
  const totals: Record<string, number> = {};
  transactions.forEach((t) => {
    const date = new Date(); // ⚠️ Placeholder (usar campo `date` depois)
    const month = `${date.getMonth() + 1}/${date.getFullYear()}`;
    const amount = parseFloat(t.amount) || 0;
    totals[month] = (totals[month] || 0) + amount;
  });

  return Object.entries(totals).map(([name, value]) => ({
    name,
    value: value as number,
  }));
}

/**
 * Calcula progresso da meta mensal
 */
export function getGoalProgress(
  transactions: any[],
  goal: number | null
): number {
  if (!goal) return 0;
  const total = transactions.reduce(
    (sum, t) => sum + (parseFloat(t.amount) || 0),
    0
  );
  return Math.min(total / goal, 1);
}
