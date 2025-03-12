"use client";

import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip, ResponsiveContainer } from "recharts";
import { Layout } from "@/ui/components/layout/layout";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/design-system/typography/typography";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

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
  const [totalBudget, setTotalBudget] = useState<number>(0);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/expenses")
      .then((response) => response.json())
      .then((data) => setExpenses(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des dépenses", error)
      );
  }, []);

  const addExpense = async () => {
    if (
      !newExpense.description ||
      !newExpense.amount ||
      !newExpense.date ||
      !newExpense.category
    ) {
      toast.error("Veuillez remplir tous les champs !");
      return;
    }

    const expenseAmount = parseFloat(newExpense.amount);
    if (expenseAmount > totalBudget) {
      toast.error("Fonds insuffisants !");
      return;
    }

    const expenseData = {
      description: newExpense.description,
      amount: expenseAmount,
      category: newExpense.category,
      date: newExpense.date,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de la dépense");
      }

      const data = await response.json();
      setExpenses([...expenses, data]);
      setTotalBudget(totalBudget - expenseAmount);
      setNewExpense({ description: "", amount: "", category: "", date: "" });

      toast.success("Dépense ajoutée avec succès !");
    } catch (error) {
      toast.error("Erreur lors de l'ajout de la dépense");
      console.error(error);
    }
  };

  const deleteExpense = async (id: number, amount: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/expenses/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la dépense");
      }

      setExpenses(expenses.filter((expense) => expense.id !== id));
      setTotalBudget(totalBudget + amount);

      toast.info("Dépense supprimée avec succès !");
    } catch (error) {
      toast.error("Erreur lors de la suppression de la dépense");
      console.error(error);
    }
  };

  const editExpense = async (id: number) => {
    const expenseToEdit = expenses.find((expense) => expense.id === id);
    if (expenseToEdit) {
      setNewExpense({
        ...expenseToEdit,
        amount: expenseToEdit.amount.toString(),
      });

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/expenses/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(expenseToEdit),
          }
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la mise à jour de la dépense");
        }

        const updatedExpense = await response.json();
        setExpenses(
          expenses.map((exp) => (exp.id === id ? updatedExpense : exp))
        );

        toast.success("Dépense mise à jour avec succès !");
      } catch (error) {
        toast.error("Erreur lors de la mise à jour de la dépense");
        console.error(error);
      }
    }
  };

  const aggregatedData = categories
    .map((category) => ({
      name: category,
      value: expenses
        .filter((expense) => expense.category === category)
        .reduce((acc, curr) => acc + curr.amount, 0),
    }))
    .filter((data) => data.value > 0);
  return (
    <Layout>
      <Container className="mt-10">
        <div>
          <Typography theme="black" variant="h5">
            Dépenses
          </Typography>

          <div className="mt-6 bg-white p-5 rounded-lg shadow-md">
            <Typography variant="caption2" theme="black">
              Répartition des Dépenses
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={aggregatedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {aggregatedData.map((entry, index) => (
                  <Bar
                    key={entry.name}
                    dataKey="value"
                    fill={COLORS[categories.indexOf(entry.name)]}
                    radius={[5, 5, 0, 0]} // Coins arrondis pour un meilleur design
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center items-center">
            <div className="mt-6 bg-white p-5 rounded-lg shadow-md">
              <Typography theme="black" variant="caption2">
                Budget
              </Typography>

              <input
                type="number"
                placeholder="Budget (€)"
                className="p-4 rounded mt-3 bg-gray-500"
                value={totalBudget}
                onChange={(e) =>
                  setTotalBudget(parseFloat(e.target.value) || 0)
                }
              />
            </div>
          </div>

          <div className="mt-6 bg-white p-5 rounded-lg shadow-md">
            <Typography theme="black" variant="caption2">
              Ajouter une dépense
            </Typography>
            <div className="grid grid-cols-5 gap-4 mt-4">
              <input
                type="text"
                placeholder="Description"
                className="p-3  bg-gray-500 rounded"
                value={newExpense.description}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, description: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Montant (€)"
                className="p-3  bg-gray-500 rounded"
                value={newExpense.amount}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, amount: e.target.value })
                }
              />
              <select
                className="p-3  bg-gray-500 rounded"
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
                className="p-3  bg-gray-500 rounded"
                value={newExpense.date}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, date: e.target.value })
                }
              />
              <button
                className="bg-primary-400 text-black p-3 rounded"
                onClick={addExpense}
              >
                Ajouter
              </button>
            </div>
          </div>

          <div className="mt-6 bg-white p-5 rounded-lg shadow-lg">
            <Typography
              theme="black"
              variant="caption2"
              className="text-lg font-semibold"
            >
              Historique des Dépenses
            </Typography>
            <div className="overflow-x-auto mt-4">
              <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="p-4 text-left">Date</th>
                    <th className="p-4 text-left">Description</th>
                    <th className="p-4 text-left">Montant (€)</th>
                    <th className="p-4 text-left">Catégorie</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense) => (
                    <tr
                      key={expense.id}
                      className="border-b border-gray-300 hover:bg-gray-100 transition"
                    >
                      <td className="p-4">{expense.date}</td>
                      <td className="p-4">{expense.description}</td>
                      <td className="p-4 text-red-500 font-semibold">
                        -{expense.amount} €
                      </td>
                      <td className="p-4">{expense.category}</td>
                      <td className="p-4 flex justify-center space-x-2">
                        <button
                          className="bg-yellow-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-yellow-600 transition"
                          onClick={() => editExpense(expense.id)}
                        >
                          ✏️ Modifier
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-600 transition"
                          onClick={() =>
                            deleteExpense(expense.id, expense.amount)
                          }
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
        </div>
      </Container>
    </Layout>
  );
}
