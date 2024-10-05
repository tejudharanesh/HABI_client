import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register components for Chart.js
ChartJS.register(ArcElement, Tooltip);

const PieChart1 = ({ costs }) => {
  const data = {
    labels: [
      "Design Fees",
      "Excavation",
      "Sand",
      "Steel Reinforcement",
      "Cement",
      "Solid Blocks",
      "Stones",
      "RMC",
      "Formwork",
      "Painting",
      "Plumbing",
      "Electrical Work",
      "Exterior Flooring",
      "Compound Wall",
      "Doors/Windows",
      "Miscellaneous",
      "Internal Flooring",
      "Floor Height Cost",
      "Sump Cost",
      "Additional Cost",
    ],
    datasets: [
      {
        data: Object.values(costs),
        backgroundColor: [
          "#bbe3f6",
          "#8ed1f1",
          "#61bfeb",
          "#61bfeb",
          "#c5edd2",
          "#9ee1b4",
          "#77d496",
          "#50c878",
          "#e5dccd",
          "#d3c5ab",
          "#c2ae89",
          "#b19768",
          "#f2c0d0",
          "#e996b1",
          "#e06b92",
          "#d74172",
          "#f6ecbc",
          "#f0e08f",
          "#ead362",
          "#e4c635",
        ],
        hoverOffset: 20,
        // Add inner radius to create a doughnut chart
        cutout: "60%", // This value sets the inner radius; increase it to make the inner hole larger
      },
    ],
  };

  return (
    <div className="h-auto mb-4 p-2">
      <Doughnut data={data} />
    </div>
  );
};

export default PieChart1;
