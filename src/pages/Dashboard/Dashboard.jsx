import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ToggleButton from "../../components/Navbar/ToggleButton";
import Navbar from "../../components/Navbar/Navbar";
import Consultation from "../NewUser/Consultation";
import Projects from "../NewUser/Projects";
import Profile from "../NewUser/Profile";
import HomePage from "../ExistingUser/HomePage";
import PaymentsPage from "../ExistingUser/PaymentsPage";
import ProjectDetails from "../ExistingUser/ProjectDetails";
import Materials from "../ExistingUser/Materials";
import Gallery from "../ExistingUser/Gallery";
import Faqs from "../FAQ's/Faqs";
import CostEstimator1 from "../NewUser/CostEstimator1";
import DetailedReport from "../NewUser/DetailedReport";

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("userType") || "client";
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // lg and above
        setCollapsed(false);
      } else {
        // md and below
        setCollapsed(true);
      }
    };

    // Run handleResize on initial load
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Navbar */}
      <Navbar isExpanded={collapsed} user={user} />

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        {/* Toggle Button */}
        <ToggleButton collapsed={collapsed} toggleSidebar={toggleSidebar} />

        {/* Routes */}
        <div className="flex-grow overflow-y-auto">
          <Routes>
            <Route
              path="/"
              element={
                user === "new" ? (
                  <Consultation isExpanded={collapsed} user={user} />
                ) : (
                  <HomePage isExpanded={collapsed} />
                )
              }
            />
            <Route
              path="/packages"
              element={
                user === "new" ? (
                  <CostEstimator1 isExpanded={collapsed} />
                ) : (
                  <ProjectDetails isExpanded={collapsed} />
                )
              }
            />
            <Route
              path="/projects"
              element={
                user === "new" ? <Projects isExpanded={collapsed} /> : null
              }
            />
            <Route
              path="/profile"
              element={
                user === "new" ? (
                  <Profile isExpanded={collapsed} user={user} />
                ) : (
                  <Consultation isExpanded={collapsed} user={user} />
                )
              }
            />
            <Route
              path="/materials"
              element={<Materials isExpanded={collapsed} />}
            />
            <Route
              path="/payment"
              element={<PaymentsPage isExpanded={collapsed} />}
            />
            <Route
              path="/profile1"
              element={<Profile isExpanded={collapsed} user={user} />}
            />
            <Route
              path="/gallery"
              element={<Gallery isExpanded={collapsed} />}
            />
            <Route
              path="/profile1/faq"
              element={<Faqs isExpanded={collapsed} />}
            />
            <Route
              path="/detailedCost"
              element={<DetailedReport isExpanded={collapsed} />}
            />
            <Route path="/faq" element={<Faqs isExpanded={collapsed} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
