"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Analyse = () => {
  // Données simulées (remplace avec API backend)
  const [cashFlowData, setCashFlowData] = useState([
    { month: "Jan", income: 5000, expenses: 3200 },
    { month: "Feb", income: 5200, expenses: 3400 },
    { month: "Mar", income: 4800, expenses: 3100 },
    { month: "Apr", income: 5300, expenses: 3500 },
    { month: "May", income: 5500, expenses: 3600 },
  ]);

  const [forecastData, setForecastData] = useState([
    { month: "Jun", prediction: 5700 },
    { month: "Jul", prediction: 5900 },
    { month: "Aug", prediction: 6100 },
    { month: "Sep", prediction: 6300 },
    { month: "Oct", prediction: 6500 },
  ]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Planification Financière</h1>

      {/* Graphique des flux de trésorerie */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Flux de trésorerie</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={cashFlowData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="income" fill="#4CAF50" name="Revenus" />
            <Bar dataKey="expenses" fill="#F44336" name="Dépenses" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Graphique de prévision financière */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Prévisions Financières</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="prediction"
              stroke="#2196F3"
              name="Prévision"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analyse;
