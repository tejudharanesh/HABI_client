import React from "react";
import { apiRequest } from "../../services/api";
import { useQuery } from "@tanstack/react-query";
const Progress = () => {
  const { data: projectData, isLoading: isProjectLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      console.log("Fetching projects...");
      return await apiRequest("/projects/project", "GET");
    },
    retry: false,
  });
  const stages = [
    { name: "Design Stage", progress: 25 },
    { name: "Preparation Stage", progress: 5 },
    { name: "Civil Stage", progress: 0 },
    { name: "Electrical Stage", progress: 0 },
    { name: "Plumbing Stage", progress: 0 },
    { name: "Doors & Windows Stage", progress: 0 },
    { name: "Flooring Stage", progress: 0 },
    { name: "Grill Install Stage", progress: 0 },
    { name: "Painting Stage", progress: 0 },
    { name: "Finishing Stage", progress: 0 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      {stages.map((stage) => (
        <div key={stage.name} className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">{stage.name}</h3>
          <div className="bg-gray-200 rounded-full h-4">
            <div
              className={`bg-blue-500 rounded-full h-4 transition-all duration-300 ease-in-out`}
              style={{ width: `${stage.progress}%` }}
            />
          </div>
          <p className="text-center mt-2">{stage.progress}%</p>
        </div>
      ))}
    </div>
  );
};

export default Progress;
