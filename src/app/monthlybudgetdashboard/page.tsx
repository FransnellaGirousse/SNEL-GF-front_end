"use client";

import { useState, useEffect } from "react";
import { Layout } from "@/ui/components/layout/layout";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/design-system/typography/typography";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#4CAF50", "#F44336"];

export default function MonthlyBudgetDashboard({ expenses, totalBudget }) {
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);

  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1;
    const filteredExpenses = expenses.filter((expense) => {
      const expenseMonth = new Date(expense.date).getMonth() + 1;
      return expenseMonth === currentMonth;
    });
    const totalSpent = filteredExpenses.reduce(
      (acc, curr) => acc + curr.amount,
      0
    );
    setMonthlyExpenses(totalSpent);
  }, [expenses]);

  const budgetData = [
    { name: "Restant", value: totalBudget - monthlyExpenses },
    { name: "Dépensé", value: monthlyExpenses },
  ];

  return (
    <Layout>
      <Container className="mt-10">
        <Typography theme="black" variant="h5">
          Tableau de Bord du Mois
        </Typography>
        <div className="mt-6 bg-white p-5 rounded-lg shadow-md">
          <Typography variant="caption2" theme="black">
            Budget et Dépenses du Mois
          </Typography>
          <div className="flex flex-col items-center mt-4">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={budgetData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {budgetData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4">
              <Typography theme="black" variant="caption2">
                Budget Total: {totalBudget} €
              </Typography>
              <Typography theme="danger" variant="caption2">
                Dépensé ce Mois: {monthlyExpenses} €
              </Typography>
              <Typography theme="success" variant="caption2">
                Restant: {totalBudget - monthlyExpenses} €
              </Typography>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
