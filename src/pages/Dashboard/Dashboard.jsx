import React, { useState, useEffect, useRef } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
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
import PaymentSuccess from "../../components/Client_homepage/PaymentSuccess";
import Progress from "../ExistingUser/Progress";

import { useSubscribe } from "react-pwa-push-notifications";

function Dashboard({ authUser }) {
  const [collapsed, setCollapsed] = useState(false);
  const [vapidPublicKey, setVapidPublicKey] = useState(""); // State for VAPID public key
  const [pushId, setPushId] = useState(""); // State for Push ID
  const location = useLocation();
  const mainContentRef = useRef(null); // Reference to the scrollable container

  useEffect(() => {
    // Scroll the specific container to the top whenever the location (route) changes
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo(0, 0);
    }
  }, [location]);

  const subscribeToPushNotifications = async (publicKey) => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKey,
      });

      const endpoint = subscription?.endpoint;
      setPushId(endpoint);

      // Send the subscription to the server
      await axios.post(
        "http://localhost:5000/api/notifications/subscribe",
        { subscription, id: endpoint },
        { withCredentials: true }
      );

      toast.success("Notifications enabled!");
    } catch (error) {
      console.error("Failed to subscribe for notifications:", error);
    }
  };

  useEffect(() => {
    const fetchVapidKeyAndSubscribe = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/notifications/vapidKeys",
          { withCredentials: true }
        );
        const publicKey = response.data.publicKey;

        setVapidPublicKey(publicKey);

        // Request Notification Permission
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          await subscribeToPushNotifications(publicKey);
        } else {
          console.log("Notification permission denied.");
        }
      } catch (error) {
        console.error("Error fetching VAPID key or subscribing:", error);
        toast.error("Failed to retrieve VAPID key or subscribe.");
      }
    };

    fetchVapidKeyAndSubscribe();
  }, []);

  useEffect(() => {
    const requestNotificationPermission = async () => {
      if (!vapidPublicKey) return; // Ensure the public key is fetched
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        try {
          const subscription = await getSubscription({
            publicKey: vapidPublicKey,
          });
          const endpoint = subscription?.endpoint; // Use endpoint as pushId
          setPushId(endpoint);

          // Send the subscription to the server
          await axios.post(
            "http://localhost:5000/api/notifications/subscribe",
            {
              subscription,
              id: pushId,
            },
            {
              withCredentials: true,
            }
          );
          toast.success("Notifications enabled!");
        } catch (error) {
          console.error("Subscription failed:", error);
        }
      } else {
        toast.error("Notification permission denied.");
      }
    };

    requestNotificationPermission();
  }, [vapidPublicKey]); // Ensure dependencies are included

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
      <Navbar isExpanded={collapsed} user={authUser} />

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        {/* Toggle Button */}
        <ToggleButton collapsed={collapsed} toggleSidebar={toggleSidebar} />

        {/* Routes */}
        <div className="flex-grow overflow-y-auto" ref={mainContentRef}>
          <Routes>
            <Route
              path="/"
              element={
                authUser.status === "lead" ? (
                  <Consultation isExpanded={collapsed} user={authUser} />
                ) : (
                  <HomePage
                    isExpanded={collapsed}
                    user={authUser}
                    pushId={pushId}
                  />
                )
              }
            />
            <Route
              path="/packages"
              element={
                authUser.status === "lead" ? (
                  <CostEstimator1 isExpanded={collapsed} />
                ) : (
                  <ProjectDetails isExpanded={collapsed} />
                )
              }
            />
            <Route
              path="/projects"
              element={
                authUser.status === "lead" ? (
                  <Projects isExpanded={collapsed} />
                ) : null
              }
            />
            <Route
              path="/profile"
              element={
                authUser.status === "lead" ? (
                  <Profile isExpanded={collapsed} user={authUser} />
                ) : (
                  <Consultation isExpanded={collapsed} user={authUser} />
                )
              }
            />

            <Route
              path="/progress"
              element={
                authUser.status === "client" ? (
                  <Progress />
                ) : (
                  <Navigate to="/" replace />
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
              element={<Profile isExpanded={collapsed} user={authUser} />}
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

            <Route path="paymentSuccess" element={<PaymentSuccess />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
