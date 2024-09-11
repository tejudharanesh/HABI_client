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
import Testing from "./pages/Testing";
import Faqs from "./pages/FAQ's/Faqs";
import AddFamilyMembers from "./components/Client_profile/AddFamilyMembers";
import Notifications from "./components/Client_homepage/Notifications";
import Consultation from "./pages/NewUser/Consultation";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Testing />} />
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
