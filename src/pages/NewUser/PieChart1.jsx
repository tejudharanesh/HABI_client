import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

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
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF5733",
          "#33FF57",
          "#5733FF",
          "#FFC300",
          "#C70039",
          "#900C3F",
          "#581845",
          "#DAF7A6",
          "#FFC300",
          "#FF5733",
          "#C70039",
          "#900C3F",
          "#581845",
          "#EAA1A1",
          "#111111",
          "#E0E5B6",
          "#ff0000",
          "#ff0000",
        ],
        hoverOffset: 13,
        // Add inner radius to create a doughnut chart
        cutout: "70%", // This value sets the inner radius; increase it to make the inner hole larger
      },
    ],
  };

  return (
    <div className=" md:h-[500px]">
      <Doughnut data={data} />
    </div>
  );
};

export default PieChart1;
