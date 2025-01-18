import React, { useState } from "react";
import site from "../../assets/images/site.png";
import { apiRequest } from "../../services/api";
import { useQuery } from "@tanstack/react-query";

function ProjectCards() {
  const [expandedCompleted, setExpandedCompleted] = useState(false);
  const [expandedPending, setExpandedPending] = useState(false);

  const { data: projectData, isLoading: isProjectLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      console.log("Fetching projects...");
      return await apiRequest("/projects/project", "GET");
    },
    retry: false,
  });

  const toggleExpandCompleted = () => {
    setExpandedCompleted((prev) => !prev);
  };

  const toggleExpandPending = () => {
    setExpandedPending((prev) => !prev);
  };

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
          <div className="rounded-xl w-[160px] relative">
            <img src={site} alt="" className="w-[100px] h-[100px] " />
            <div className="flex items-center justify-center absolute bottom-0 left-0 w-[100px] h-[40px] bg-black/40 backdrop-blur-sm rounded-b-xl">
              <p className="text-white">Design</p>
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

  return (
    <div className="font-poppins">
      <div className="md:px-[8%] bg-layoutColor">
        <div>
          {isProjectLoading && <p>Loading project details...</p>}
          {projectData && projectData.length === 0 && (
            <p>No ongoing projects</p>
          )}

          {/* Toggle completed subStages */}
          {projectData && projectData.length > 0 && (
            <div>
              <p
                className={`text-center text-[#7AD06D] p-3 rounded-xl border border-[#7AD06D] mb-2 mx-4 md:mx-0 cursor-pointer ${
                  expandedCompleted ? "" : "relative"
                }`}
                onClick={toggleExpandCompleted}
              >
                {expandedCompleted
                  ? "Hide completed stages"
                  : "Check completed stages"}
              </p>
              {expandedCompleted &&
                projectData[0].stages?.map((stage, stageIndex) =>
                  stage?.subStages
                    ?.filter((subStage) => subStage.status === "completed")
                    .map((subStage, subStageIndex) => (
                      <Card
                        key={`completed-${stageIndex}-${subStageIndex}`}
                        stageIndex={stageIndex}
                        subStageIndex={subStageIndex}
                        stage={stage}
                        subStage={subStage}
                      />
                    ))
                )}
            </div>
          )}

          {/* Ongoing subStages */}
          {projectData &&
            projectData.length > 0 &&
            projectData[0].stages?.map((stage, stageIndex) =>
              stage?.subStages?.map(
                (subStage, subStageIndex) =>
                  subStage.status === "ongoing" && (
                    <Card
                      key={`ongoing-${stageIndex}-${subStageIndex}`}
                      stageIndex={stageIndex}
                      subStageIndex={subStageIndex}
                      stage={stage}
                      subStage={subStage}
                    />
                  )
              )
            )}

          {/* Display only one pending subStage, toggle to show all pending */}
          {projectData && projectData.length > 0 && (
            <div>
              {expandedPending
                ? projectData[0].stages?.map((stage, stageIndex) =>
                    stage?.subStages
                      ?.filter((subStage) => subStage.status === "pending")
                      .map((subStage, subStageIndex) => (
                        <Card
                          key={`pending-${stageIndex}-${subStageIndex}`}
                          stageIndex={stageIndex}
                          subStageIndex={subStageIndex}
                          stage={stage}
                          subStage={subStage}
                        />
                      ))
                  )
                : (() => {
                    const firstPendingStage = projectData[0].stages?.find(
                      (stage) =>
                        stage?.subStages?.some(
                          (subStage) => subStage.status === "pending"
                        )
                    );
                    if (firstPendingStage) {
                      const firstPendingSubStage =
                        firstPendingStage.subStages.find(
                          (subStage) => subStage.status === "pending"
                        );
                      return (
                        <Card
                          key="first-pending"
                          stageIndex={projectData[0].stages.indexOf(
                            firstPendingStage
                          )}
                          subStageIndex={0}
                          stage={firstPendingStage}
                          subStage={firstPendingSubStage}
                        />
                      );
                    }
                    return null;
                  })()}
              <p
                className={`relative text-center text-primary p-3 rounded-xl border border-primary mb-2 mx-4 md:mx-0 cursor-pointer ${
                  expandedPending ? "" : ""
                }`}
                onClick={toggleExpandPending}
              >
                {expandedPending
                  ? "Hide upcoming stages"
                  : "Show more upcoming stages"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCards;
