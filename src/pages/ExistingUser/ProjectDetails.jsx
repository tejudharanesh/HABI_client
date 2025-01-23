import React, { useEffect } from "react";
import Documents from "../../components/ProjectDetails/Docments";
import Details from "../../components/ProjectDetails/Details";
import DVisualize from "../../components/ProjectDetails/3DVisualize";
import Materials from "../../components/ProjectDetails/Materials";
import Gallery from "../../components/ProjectDetails/Gallery";
import { apiRequest } from "../../services/api";
import { useQuery } from "@tanstack/react-query";

function ProjectDetails({ isExpanded }) {
  const { data: projectData, isLoading: isProjectLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      console.log("Fetching projects...");
      return await apiRequest("/projects/project", "GET");
    },
  });

  if (isProjectLoading) {
    return <div>Loading...</div>;
  }
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, );
  return (
    <div className="min-h-screen flex flex-col font-poppins w-full bg-background h-auto ">
      <Details isExpanded={isExpanded} data={projectData} />
      <div
        className={`flex flex-col w-full bg-layoutColor shadow h-auto p-2 mb-2 ${
          isExpanded
            ? "md:px-32 lg:px-52 xl:px-[20%]"
            : "md:px-20 lg:px-48 xl:px-[20%]"
        }`}
      >
        <header className="text-center m-2 ">
          <h1 className="text-xl font-semibold text-black">
            Design & documents
          </h1>
        </header>
        <Documents isExpanded={isExpanded} data={projectData} />
      </div>
      <DVisualize isExpanded={isExpanded} data={projectData} />
      <Materials isExpanded={isExpanded} data={projectData} />
      <Gallery isExpanded={isExpanded} data={projectData} />
      <br className="md:hidden" />
      <br className="md:hidden" />
    </div>
  );
}

export default ProjectDetails;
