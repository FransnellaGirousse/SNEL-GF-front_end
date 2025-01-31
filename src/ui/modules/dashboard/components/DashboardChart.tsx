"use client";

import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export const DashboardChart = () => {
  const data = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
    datasets: [
      {
        label: "Dépenses",
        data: [500, 700, 400, 900, 1200, 800],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2">
      <h2 className="text-xl font-bold mb-4">Dépenses Mensuelles</h2>
      <Bar data={data} options={options} />
    </div>
  );
};
