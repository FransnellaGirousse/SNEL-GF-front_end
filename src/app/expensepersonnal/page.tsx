"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Layout } from "@/ui/components/layout/layout";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/design-system/typography/typography";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";



interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}

const categories = [
  "Alimentation",
  "Transport",
  "Logement",
  "Loisirs",
  "Autre",
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BEA"];

export default function ExpensePersonnal() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
  });

  const addExpense = () => {
    if (
      !newExpense.description ||
      !newExpense.amount ||
      !newExpense.date ||
      !newExpense.category
    )
      return;
    setExpenses([
      ...expenses,
      {
        id: expenses.length + 1,
        ...newExpense,
        amount: parseFloat(newExpense.amount),
      },
    ]);
    setNewExpense({ description: "", amount: "", category: "", date: "" });
  };

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const editExpense = (id: number) => {
    const expenseToEdit = expenses.find((expense) => expense.id === id);
    if (expenseToEdit) {
      setNewExpense({
        ...expenseToEdit,
        amount: expenseToEdit.amount.toString(),
      });
      setExpenses(expenses.filter((expense) => expense.id !== id));
    }
  };

  const aggregatedData = categories
    .map((category) => {
      return {
        name: category,
        value: expenses
          .filter((expense) => expense.category === category)
          .reduce((acc, curr) => acc + curr.amount, 0),
      };
    })
    .filter((data) => data.value > 0);

  return (
    <Layout>
      <Container className="mt-10">
        <div>
          <Typography theme="black" variant="h5">
            Dépenses
          </Typography>
          <div className="mt-6 bg-white p-5 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Répartition des Dépenses</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={aggregatedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 bg-white p-5 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Ajouter une dépense</h2>
            <div className="grid grid-cols-5 gap-4 mt-4">
              <input
                type="text"
                placeholder="Description"
                className="p-2 border rounded"
                value={newExpense.description}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, description: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Montant (€)"
                className="p-2 border rounded"
                value={newExpense.amount}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, amount: e.target.value })
                }
              />
              <select
                className="p-2 border rounded"
                value={newExpense.category}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, category: e.target.value })
                }
              >
                <option value="">Choisir une catégorie</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <input
                type="date"
                className="p-2 border rounded"
                value={newExpense.date}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, date: e.target.value })
                }
              />
              <button
                className="bg-blue-500 text-black p-2 rounded"
                onClick={addExpense}
              >
                Ajouter
              </button>
            </div>
          </div>

          <div className="mt-6 bg-white p-5 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Historique des Dépenses</h2>
            <table className="w-full mt-4 border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Montant (€)</th>
                  <th className="border p-2">Catégorie</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id} className="border">
                    <td className="border p-2">{expense.date}</td>
                    <td className="border p-2">{expense.description}</td>
                    <td className="border p-2 text-red-500">
                      -{expense.amount} €
                    </td>
                    <td className="border p-2">{expense.category}</td>
                    <td className="border p-2">
                      <button
                        className="bg-yellow-500 text-white p-1 rounded mr-2"
                        onClick={() => editExpense(expense.id)}
                      >
                        ✏️ Modifier
                      </button>
                      <button
                        className="bg-red-500 text-white p-1 rounded"
                        onClick={() => deleteExpense(expense.id)}
                      >
                        🗑️ Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
