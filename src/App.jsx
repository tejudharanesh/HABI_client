import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/Authentication/LoginPage";
import Otp from "./pages/Authentication/Otp";
import CompleteProfile from "./pages/Authentication/CompleteProfile";
import Dashboard from "./pages/Dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "@tanstack/react-query";
import Loading from "./components/Loading/Loading";
import { apiRequest } from "./services/api.js";

function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      console.log("Fetching authUser...");
      return await apiRequest("/auth/me", "GET");
    },
    retry: false,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );

  return (
    <Router>
      <ToastContainer pauseOnFocusLoss={false} autoClose={900} />
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            authUser ? (
              authUser.isCompletedProfile ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/completeProfile" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Login Route */}
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />

        {/* OTP Route */}
        <Route
          path="/otp"
          element={!authUser ? <Otp /> : <Navigate to="/" />}
        />

        {/* Complete Profile Route */}
        <Route
          path="/completeProfile"
          element={
            authUser ? (
              authUser.isCompletedProfile ? (
                <Navigate to="/dashboard" />
              ) : (
                <CompleteProfile />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Dashboard Route */}
        <Route
          path="/dashboard/*"
          element={
            authUser ? (
              authUser.isCompletedProfile ? (
                <Dashboard authUser={authUser} />
              ) : (
                <Navigate to="/completeProfile" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
