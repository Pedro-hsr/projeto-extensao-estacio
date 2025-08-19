// app/index.tsx (Dashboard)
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import PieChart from "react-native-pie-chart";
import {
  Circle,
  Line,
  Polyline,
  Rect,
  Svg,
  Text as SvgText,
} from "react-native-svg";
import colors from "../constants/colors";
import {
  getGoalProgress,
  getSpendingByCategory,
  getSpendingByMonth,
} from "../lib/analytics";
import { getGoal, getTransactions } from "../lib/storage";

const screenWidth = Dimensions.get("window").width - 32;

export default function Dashboard() {
  const [transactions, setTransactions] = useState<{ amount: number }[]>([]);
  const [goal, setGoal] = useState(null);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setTransactions(await getTransactions());
        setGoal(await getGoal());
      })();
    }, [])
  );

  const spendingByCategory = getSpendingByCategory(transactions);
  const spendingByMonth = getSpendingByMonth(transactions);
  const progress = getGoalProgress(transactions, goal);

  // Dados do PieChart
  const colorsPie = chartColors.slice(0, spendingByCategory.length);
  const values = spendingByCategory.map((c, i) => ({
    value: Number(c.value) || 0,
    name: c.name,
    color: colorsPie[i] || chartColors[0],
  }));

  // Dados para gráfico mensal
  const valuesLine = spendingByMonth.map((c) => Number(c.value) || 0);
  const labelsLine = spendingByMonth.map((c) => c.name);

  const chartHeight = 200;
  const chartWidth = screenWidth;
  const maxValue = Math.max(...valuesLine, 1);

  const points = valuesLine.map((val, i) => {
    const x = (i / (valuesLine.length - 1 || 1)) * chartWidth;
    const y = chartHeight - (val / maxValue) * chartHeight;
    return { x, y };
  });

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      <Text style={styles.title}>Dashboard</Text>

      {/* Card: Gastos por Categoria */}
      <View style={styles.card}>
        <Text style={styles.subtitle}>Gastos por Categoria</Text>
        {values.length > 0 ? (
          <PieChart widthAndHeight={180} series={values} />
        ) : (
          <Text>Nenhum dado</Text>
        )}
        <View style={{ marginTop: 8 }}>
          {values.map((item, i) => (
            <View
              key={i}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 4,
              }}
            >
              <View
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: item.color,
                  marginRight: 6,
                  borderRadius: 2,
                }}
              />
              <Text style={{ fontSize: 12, color: colors.text }}>
                {item.name}: R${item.value.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Card: Gastos por Mês */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.subtitle}>Gastos por Mês</Text>
          <Text style={styles.totalText}>
            Total: R${valuesLine.reduce((sum, val) => sum + val, 0).toFixed(2)}
          </Text>
        </View>
        {valuesLine.length > 0 ? (
          valuesLine.length === 1 ? (
            // ✅ Se houver só 1 mês, mostra barra
            <Svg height={chartHeight} width={chartWidth}>
              <Rect
                x={chartWidth / 4}
                y={chartHeight - (valuesLine[0] / maxValue) * chartHeight}
                width={chartWidth / 2}
                height={(valuesLine[0] / maxValue) * chartHeight}
                fill={colors.primary}
                rx="6"
              />
              <SvgText
                x={chartWidth / 2}
                y={chartHeight - (valuesLine[0] / maxValue) * chartHeight - 8}
                fontSize="12"
                fill={colors.text}
                textAnchor="middle"
              >
                {`R$${valuesLine[0].toFixed(2)}`}
              </SvgText>
            </Svg>
          ) : (
            // ✅ Se houver 2+ meses, mantém o gráfico de linha
            <Svg height={chartHeight} width={chartWidth}>
              {/* Grid de fundo */}
              <Line
                x1="0"
                y1={chartHeight}
                x2={chartWidth}
                y2={chartHeight}
                stroke={colors.border}
                strokeWidth="1"
                opacity={0.5}
              />
              <Polyline
                points={polylinePoints}
                fill="none"
                stroke={colors.primary}
                strokeWidth="2"
                opacity={0.7}
              />
              {points.map((p, i) => (
                <React.Fragment key={i}>
                  <Circle
                    cx={p.x}
                    cy={p.y}
                    r="4"
                    fill={colors.primary}
                    stroke="#fff"
                    strokeWidth="1.5"
                  />
                  <SvgText
                    x={p.x}
                    y={p.y - 12}
                    fontSize="11"
                    fill={colors.text}
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    {`R$${valuesLine[i].toFixed(2)}`}
                  </SvgText>
                </React.Fragment>
              ))}
            </Svg>
          )
        ) : (
          <Text style={styles.emptyText}>Nenhum gasto registrado</Text>
        )}
        {/* Labels dos meses */}
        <View style={styles.monthLabels}>
          {labelsLine.map((lbl, i) => (
            <View key={i} style={styles.monthLabel}>
              <Text style={styles.monthText}>{lbl}</Text>
              <Text style={styles.monthValue}>
                R${valuesLine[i].toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Card: Meta de Gastos */}
      <View style={styles.card}>
        <Text style={styles.subtitle}>Meta de Gastos</Text>
        {goal ? (
          <>
            <Text style={{ fontSize: 12, marginBottom: 4, color: colors.text }}>
              R${transactions.reduce((s, t) => s + Number(t.amount), 0)} / R$
              {goal}
            </Text>
            <View style={styles.progressContainer}>
              <View
                style={[styles.progressBar, { width: `${progress * 100}%` }]}
              />
            </View>
          </>
        ) : (
          <Text>Nenhuma meta definida</Text>
        )}
      </View>
    </ScrollView>
  );
}

const chartColors = ["#4CAF50", "#FFC107", "#2196F3", "#FF5722", "#9C27B0"];

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: colors.background },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: colors.primary,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: colors.text,
  },
  progressContainer: {
    width: "100%",
    height: 20,
    backgroundColor: colors.border,
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBar: { height: "100%", backgroundColor: colors.primary },
  labelsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  labelText: { fontSize: 10, color: colors.text },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  totalText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "600",
  },
  monthLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingHorizontal: 8,
  },
  monthLabel: {
    alignItems: "center",
  },
  monthText: {
    fontSize: 12,
    color: colors.text,
    marginBottom: 4,
  },
  monthValue: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: "600",
  },
  emptyText: {
    textAlign: "center",
    color: colors.text,
    marginVertical: 32,
  },
});
