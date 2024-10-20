import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
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
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/" element={<Dashboard />} /> */}
          <Route path="/dashboard/*" element={<Dashboard />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/home" element={<CompleteProfile />} />
          {/* <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Route> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
