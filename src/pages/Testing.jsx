import React, { useState, useEffect, useRef } from "react";
import site from "../../assets/images/site.png";
import { apiRequest } from "../../services/api";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

function ProjectCards() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const { data: projectData, isLoading: isProjectLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      console.log("Fetching projects...");
      return await apiRequest("/projects/project", "GET");
    },
    retry: false,
  });

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="h-auto font-poppins">
      <div className="md:px-[8%] bg-layoutColor h-auto">
        <div>
          {isProjectLoading && <p>Loading project details...</p>}
          {projectData && projectData.length === 0 && (
            <p>No ongoing projects</p>
          )}
          {projectData && projectData.length > 0 && (
            <p className="text-center text-green-400 cursor-pointer my-4">
              Check completed Stages
            </p>
          )}
          {projectData &&
            projectData.length > 0 &&
            projectData[0].stages?.map((stage, index) => (
              <div
                key={index}
                onClick={() => toggleExpand(index)}
                className="relative bg-primaryO p-3 rounded-3xl border-2 mb-2 mx-4 md:mx-0"
              >
                <div className="flex flex-row">
                  <div className="rounded-xl w-[150px]">
                    <img src={site} alt="" className="w-[100px] h-[100px]" />
                  </div>
                  <div className="py-2 w-full">
                    <p className="text-black font-semibold ">
                      Design Presentation
                    </p>
                    <p className="text-black">Architectural Design</p>

                    <div className="flex justify-between mt-3">
                      <p>2 days</p>
                      <p>on going</p>
                    </div>
                  </div>
                </div>
                {/* <div className="flex justify-between items-center">
                  <h3 className="font-bold text-gray-800">{stage.name}</h3>
                  <p>
                    {stage?.subStages?.some(
                      (substage) => substage.status === "ongoing"
                    )
                      ? "Ongoing"
                      : "Pending"}
                  </p>
                </div> */}
                {/* {stage?.subStages?.map((substage) => (
                  <p className="text-sm text-black">{substage.name}</p>
                ))}
                <p className="text-sm text-gray-500 inline mr-2">
                  25 May 2024 - 26 May 2024
                </p>
                <p className="text-red-400 inline text-sm">2 days delay</p>
                <div className="bg-red-400 w-1 h-1 rounded inline-block mb-0.5 ml-0.5"></div> */}
                {/* <div className="flex justify-between items-center">
                  <div className="h-3 bg-gray-200 rounded-full mt-2 w-[80%] inline-block">
                    <div
                      className="h-3 bg-primary rounded-full"
                      style={{
                        width: `${
                          (stage?.subStages?.filter(
                            (substage) => substage.status === "completed"
                          ).length / stage?.subStages?.length || 0) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <p className="inline text-black text-sm mt-2">
                    {Math.round(
                      (stage?.subStages?.filter(
                        (substage) => substage.status === "completed"
                      ).length / stage?.subStages?.length || 0) * 100
                    )}
                    %
                  </p>
                </div> */}

                {/* {expandedIndex === index && (
                  <div>
                    <div>
                      <img
                        src={site}
                        alt="Site Photo 1"
                        className="w-[90px] h-[69px] object-cover rounded-lg inline-block"
                      />
                    </div>
                    <div className="mt-4">
                      <button className="px-4 py-2 border-red-400 border rounded-lg text-red-400 bg-red-50 w-[155px]">
                        Query
                      </button>
                      <button className="px-4 py-2 text-white bg-primary rounded-lg ml-3 w-[155px]">
                        Approve
                      </button>
                    </div>
                  </div>
                )} */}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectCards;
