"use client";

import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export const PieChart = () => {
  const data = {
    labels: ["Logement", "Transport", "Alimentation", "Loisirs"],
    datasets: [
      {
        data: [40, 25, 20, 15],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0"],
      },
    ],
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg w-full md:w-3/4">
      <h2 className="text-3xl font-bold mb-8">Répartition des Dépenses</h2>
      <Pie data={data} width={400} height={400} />
    </div>
  );
};
