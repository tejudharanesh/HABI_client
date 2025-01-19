import React, { useState } from "react";
import { apiRequest } from "../../services/api";
import { useQuery } from "@tanstack/react-query";
import design from "../../assets/images/design.png";
import preparation from "../../assets/images/preparation.png";
import civil from "../../assets/images/civil.png";
import electrical from "../../assets/images/electical.png";
import plumbing from "../../assets/images/plumbing.png";
import grill from "../../assets/images/grill.png";
import flooring from "../../assets/images/floring.png";
import doors from "../../assets/images/doors.png";
import finishing from "../../assets/images/finishing.png";
import painting from "../../assets/images/painting.png";

const Progress = () => {
  const { data: projectData, isLoading: isProjectLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      console.log("Fetching projects...");
      return await apiRequest("/projects/project", "GET");
    },
    retry: false,
  });

  const [selectedStage, setSelectedStage] = useState(null);
  const [subStages, setSubStages] = useState([]);
  if (isProjectLoading) {
    return <div>Loading...</div>;
  }

  const stages = [
    { name: "Design Stage", category: "design", design: design },
    {
      name: "Preparation Stage",
      category: "preparation",
      preparation: preparation,
    },
    { name: "Civil Stage", category: "civil", civil: civil },
    {
      name: "Electrical Stage",
      category: "electrical",
      electrical: electrical,
    },
    { name: "Plumbing Stage", category: "plumbing", plumbing: plumbing },
    { name: "Doors & Windows Stage", category: "doors", doors: doors },
    { name: "Flooring Stage", category: "flooring", flooring: flooring },
    { name: "Grill Install Stage", category: "grill", grill: grill },
    { name: "Painting Stage", category: "painting", painting: painting },
    { name: "Finishing Stage", category: "finishing", finishing: finishing },
  ];

  const calculateStageProgress = (subStages) => {
    if (!subStages || subStages.length === 0) return 0;
    const completedSubStages = subStages.filter(
      (subStage) => subStage.status === "completed"
    ).length;
    return Math.round((completedSubStages / subStages.length) * 100);
  };

  const updatedStages = stages.map((stage) => {
    // Collect all stages matching the current category
    const categoryStages = projectData[0]?.stages?.filter(
      (projStage) => projStage.category === stage.category
    );

    // Calculate the overall progress for the category
    const totalSubStages = categoryStages.flatMap(
      (categoryStage) => categoryStage.subStages || []
    );
    const progress = calculateStageProgress(totalSubStages);

    return { ...stage, progress };
  });

  const Card = ({ stageIndex, subStageIndex, stage, subStage }) => {
    // Determine the card's styles based on the subStage status
    const getStatusStyles = (status) => {
      switch (status) {
        case "ongoing":
          return "bg-[#E1F2F9] border-primary text-primary";
        case "completed":
          return "bg-[#ECF5F1] border-[#7AD06D] text-[#7AD06D]";
        case "pending":
          return "bg-[#f3f3f9] border-[#c0c0c0] text-[#7c7c7c]";
        default:
          return "bg-gray-100 border-gray-300 text-primary"; // Fallback styles
      }
    };

    return (
      <div
        key={`${stageIndex}-${subStageIndex}`} // Unique key for each subStage
        className={`relative p-3 rounded-xl border mb-2 mx-4 md:mx-0 ${getStatusStyles(
          subStage.status
        )}`}
      >
        <div className="flex flex-row">
          <div className="rounded-lg w-[160px] relative">
            <img
              src={stage[stage.category]}
              alt=""
              className="w-[100px] h-[100px] rounded-lg"
            />
            <div className="flex items-center justify-center absolute bottom-0 left-0 w-[100px] h-[40px] bg-black/40 backdrop-blur-sm rounded-b-xl">
              <p className="text-white">{stage.category}</p>
            </div>
          </div>
          <div className="w-full">
            <p className="text-black font-semibold ">
              {subStage.name || "Design Presentation"}
            </p>
            <p className="text-black">{stage.name || "Architectural Design"}</p>
            <div className="flex justify-between mt-3">
              <p className="text-[#c0c0c0]">
                {subStage.duration || "2 days"} Days
              </p>
              <p
                className={`bg-transparent ${getStatusStyles(subStage.status)}`}
              >
                {subStage.status || "on going"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleStageClick = (stage) => {
    // Filter substages under the selected category
    const categoryStages = projectData[0]?.stages?.filter(
      (projStage) => projStage.category === stage.category
    );

    const totalSubStages = categoryStages.flatMap(
      (categoryStage) => categoryStage.subStages || []
    );

    setSelectedStage(stage); // Set the selected stage
    setSubStages(totalSubStages); // Set substages for the selected category
  };

  return (
    <div className="relative flex flex-col items-center bg-layoutColor min-h-screen h-auto">
      {/* Wrapper for blurring */}
      <div
        className={`w-full h-full transition-all ${
          selectedStage ? "blur-sm inset-0 bg-opacity-50" : ""
        }`}
      >
        <p className="text-black font-semibold text-lg my-2 text-center">
          Stage Progress
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
          {updatedStages.map((stage) => (
            <div
              key={stage.name}
              className="relative rounded-2xl p-3 cursor-pointer h-[170px] flex flex-col justify-between items-center text-white"
              onClick={() => handleStageClick(stage)}
              style={{
                backgroundImage: `url(${stage[stage.category]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute top-0 left-0 z-10 bg-black/40 inset-0 backdrop-blur-[2px] rounded-2xl"></div>
              <h3 className="text-lg font-semibold z-10 text-center">
                {stage.name}
              </h3>
              <p className="text-center text-3xl font-larken my-2 z-10">
                {stage.progress}%
              </p>
              <div className="w-full px-4 z-10">
                {/* Progress Bar */}
                <div className="bg-white rounded-full h-4 w-full">
                  <div
                    className="bg-primary rounded-full h-4"
                    style={{ width: `${stage.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedStage && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40"></div>
      )}

      {/* Modal for Selected Stage */}
      {selectedStage && (
        <div
          className={`fixed bottom-0 left-0 md:left-24 lg:left-60 right-0 md:right-4 lg:right-11 bg-layoutColor rounded-t-xl border transform transition-transform duration-[4s] ease-in-out ${
            selectedStage ? "translate-y-0" : "translate-y-full"
          }`}
          style={{
            zIndex: 50,
          }}
        >
          <button
            onClick={() => setSelectedStage(null)}
            className="text-gray-600 text-lg absolute right-2"
          >
            ✕
          </button>
          <div className="flex px-4 py-2">
            <h3 className="text-lg font-semibold text-black mx-auto">
              {selectedStage.name}
            </h3>
          </div>
          <p className="text-center text-2xl font-larken text-black mb-2">
            {selectedStage.progress}%
          </p>
          <div className="bg-gray-200 h-2 mx-4 rounded-full">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${selectedStage.progress}%` }}
            />
          </div>
          <div className="mt-4 overflow-y-auto max-h-[70vh] px-4">
            {subStages?.map((subStage, index) => (
              <Card
                key={index}
                stageIndex={index}
                subStageIndex={index}
                stage={selectedStage}
                subStage={subStage}
              />
            ))}
            <br />
          </div>
        </div>
      )}
      <br />
      <br />
      <br />
    </div>
  );
};

export default Progress;
