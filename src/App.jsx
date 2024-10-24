import React from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext"; // Ensure useAuth is imported correctly
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
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer pauseOnFocusLoss={false} autoClose={900} />

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/completeProfile" element={<CompleteProfile />} />

          {/* Handle / route: Redirect if user is logged in */}
          <Route path="/" element={<RedirectBasedOnAuth />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Catch-all route: Redirect to dashboard or login based on auth status */}
          <Route path="*" element={<RedirectBasedOnAuth />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function RedirectBasedOnAuth() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Loading state while session is being validated
  }

  if (user) {
    // If user is authenticated, redirect to dashboard
    return <Navigate to="/dashboard" />;
  } else {
    // If not authenticated, redirect to login
    return <Navigate to="/dashboard" />;
  }
}

export default App;
