import React from "react";
import Documents from "../../components/ProjectDetails/Docments";
import Details from "../../components/ProjectDetails/Details";
import DVisualize from "../../components/ProjectDetails/3DVisualize";
import Materials from "../../components/ProjectDetails/Materials";
import Gallery from "../../components/ProjectDetails/Gallery";
function ProjectDetails({ isExpanded }) {
  return (
    <div className="min-h-screen flex flex-col font-poppins w-full bg-background h-auto">
      <Details isExpanded={isExpanded} />
      <div
        className={`flex flex-col w-full bg-layoutColor shadow h-auto p-2 mb-2 ${
          isExpanded
            ? "md:px-32 lg:px-52 xl:px-[300px]"
            : "md:px-20 lg:px-48 xl:px-[300px]"
        }`}
      >
        <header className="text-center m-2 ">
          <h1 className="text-xl font-semibold text-black">Design & documents</h1>
        </header>
        <Documents isExpanded={isExpanded} />
      </div>
      <DVisualize isExpanded={isExpanded} />
      <Materials isExpanded={isExpanded} />
      <Gallery isExpanded={isExpanded} />
      <br className="md:hidden" />
      <br className="md:hidden" />
    </div>
  );
}

export default ProjectDetails;
