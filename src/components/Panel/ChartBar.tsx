import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Ventas",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [40, 50, 60],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const ChartBar = () => {
  return <Bar options={options} data={data} />;
};

export default ChartBar;

/* 

import React from 'react';

export function App() {
  return <Bar options={options} data={data} />;
}

*/
