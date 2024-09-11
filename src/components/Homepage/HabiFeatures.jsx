import React from "react";
import UniqueDesign from "../../assets/svg/UniqueDesign.svg";
import EfficientPlan from "../../assets/svg/EfficientPlan.svg";
import HomeSafety from "../../assets/svg/HomeSafety.svg";
import Warranty from "../../assets/svg/Guarantee.svg";
import Tracking from "../../assets/svg/Tracking.svg";
import BestPrice from "../../assets/svg/bestPrice.svg";
import Gurantee from "../../assets/svg/Gurantee.svg";
import Structure from "../../assets/svg/Structure.svg";

function FeatureItem({ icon, smallText, fullText }) {
  return (
    <div className="flex flex-col items-center justify-center font-poppins">
      <div className="bg-primary rounded-full w-12 h-12 mb-1 flex-center">
        <img className="m-auto" src={icon} alt={fullText} />
      </div>
      <span className="block md:hidden text-xs text-center text-black">
        {smallText[0]}
      </span>
      <span className="block md:hidden text-xs text-center text-black">
        {smallText[1]}
      </span>
      <span className="hidden md:block text-xs text-center text-black">
        {fullText}
      </span>
    </div>
  );
}

function HabiFeatures({ isExpanded }) {
  const features = [
    {
      icon: UniqueDesign,
      smallText: ["Unique", "Design"],
      fullText: "Unique Design",
    },
    {
      icon: EfficientPlan,
      smallText: ["Efficient", "Planning"],
      fullText: "Efficient Planning",
    },
    {
      icon: HomeSafety,
      smallText: ["Disaster", "Resilient"],
      fullText: "Disaster Resilient",
    },
    {
      icon: Warranty,
      smallText: ["1 Year", "Warranty"],
      fullText: "1 Year Warranty",
    },
    {
      icon: Tracking,
      smallText: ["Project", "Tracking"],
      fullText: "Project Tracking",
    },
    {
      icon: Gurantee,
      smallText: ["50 Year", "Guarantee"],
      fullText: "50 Year Guarantee",
    },
    {
      icon: Structure,
      smallText: ["Structure as", "per NBC"],
      fullText: "Structure as per NBC",
    },
    {
      icon: BestPrice,
      smallText: ["Transparent", "Pricing"],
      fullText: "Transparent Pricing",
    },
  ];

  return (
    <div
        className={`flex flex-col items-center w-full bg-layoutColor shadow p-4 h-auto mb-3 ${
          isExpanded ? "md:px-14 lg:px-40" : "md:px-3 lg:px-28"
        }`}
      >
      <div className="rounded-xl py-5 w-full">
        <h2 className="text-[16px] md:text-[18px] mb-4 text-center text-black">
          Constructing Dreams with Precision and Care
        </h2>

        <div className="grid grid-cols-4 gap-4 mb-1">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              smallText={feature.smallText}
              fullText={feature.fullText}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HabiFeatures;
