import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/habi_logo.png";
import meetIcon from "../../assets/svg/meet.svg";
import packagesIcon from "../../assets/svg/Packages.svg";
import profileIcon from "../../assets/svg/Profile.svg";
import projectsIcon from "../../assets/svg/Projects.svg";
import SelectionIndicator from "./SelectionIndicator";
import project from "../../assets/svg/Project.svg";
import meeting from "../../assets/svg/meeting.svg";
import live from "../../assets/svg/live.svg";
import progress from "../../assets/svg/progress.svg";

const Navbar = ({ isExpanded, user }) => {
  const location = useLocation();
  const [selected, setSelected] = useState(
    location.pathname.split("/")[2] || "meet"
  );

  const buttons = [
    {
      id: "meet",
      icon: meetIcon,
      alt: "Meet us",
      label: "Home",
      link: "/dashboard",
    },
    {
      id: "packages",
      icon: user == "client" ? project : packagesIcon,
      alt: "Packages",
      label: user == "client" ? "Project" : "Cost Estimator",
      link: "/dashboard/packages",
    },
    {
      id: "projects",
      icon: user == "client" ? live : projectsIcon,
      alt: "Projects",
      label: user == "client" ? "Live" : "Portfolio",
      link: "/dashboard/projects",
    },
    {
      id: "profile",
      icon: user == "client" ? meeting : profileIcon,
      alt: "Profile",
      label: user == "client" ? "Meet Us" : "Profile",
      link: "/dashboard/profile",
    },
  ];

  if (user === "client") {
    buttons.push({
      id: "progress",
      icon: progress,
      alt: "status",
      label: "Project status",
      link: "/dashboard/progress",
    });
  }

  return (
    <nav
      className={`fixed bottom-0 left-0 bg-layoutColor md:sticky ${
        isExpanded ? "md:w-[81px]" : "md:w-[200px]"
      } md:flex-shrink-0 h-14 md:h-full w-full border-r-2 z-20 md:z-10`}
    >
      <div className="flex flex-col justify-between relative h-auto">
        <div className={`hidden md:flex justify-center px-4 items-center py-4`}>
          <img
            src={logo}
            alt="Logo"
            className={`h-auto ml-3 ${isExpanded ? "w-[40px]" : "w-[80px]"}`}
          />
        </div>

        <div className="flex justify-around md:items-start md:flex-col md:space-y-5 w-full">
          {buttons.map((button) => (
            <div key={button.id} className="relative w-full">
              <Link
                to={button.link}
                className={`btn border-none flex flex-col md:flex-row md:items-center md:justify-start shadow-none md:space-x-3 md:hover:bg-primaryO hover:bg-inherit w-full rounded-none ${
                  selected === button.id
                    ? " md:bg-primaryO bg-inherit"
                    : "bg-inherit"
                }`}
                onClick={() => setSelected(button.id)}
              >
                <img
                  src={button.icon}
                  alt={button.alt}
                  className={`w-6 h-6 md:ml-4 ${
                    selected === button.id
                      ? "text-primary filter-primary fill-primary"
                      : "fill-default"
                  }`}
                />

                <span
                  className={`hidden md:inline font-[18px] ${
                    selected === button.id ? "text-primary" : "text-black"
                  } ${isExpanded ? "md:hidden" : ""}`}
                >
                  {button.label}
                </span>
              </Link>
              {selected === button.id && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary md:hidden rounded-b-lg mx-3" />
              )}
              <div>{selected === button.id && <SelectionIndicator />}</div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
