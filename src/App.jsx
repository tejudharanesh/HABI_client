// import React, { useContext } from "react";
// import { AuthProvider, AuthContext } from "./contexts/AuthContext"; // Ensure useAuth is imported correctly
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import LoginPage from "./pages/Authentication/LoginPage";
// import Otp from "./pages/Authentication/Otp";
// import CompleteProfile from "./pages/Authentication/CompleteProfile";
// import Dashboard from "./pages/Dashboard/Dashboard";
// import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Loading from "./components/Loading/Loading";

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <ToastContainer pauseOnFocusLoss={false} autoClose={900} />

//         <Routes>
//           {/* Public Routes */}
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/otp" element={<Otp />} />
//           <Route path="/completeProfile" element={<CompleteProfile />} />

//           {/* Handle / route: Redirect if user is logged in */}
//           <Route path="/" element={<RedirectBasedOnAuth />} />

//           {/* Protected Routes */}
//           <Route
//             path="/dashboard/*"
//             element={
//               <PrivateRoute>
//                 <Dashboard />
//               </PrivateRoute>
//             }
//           />

//           {/* Catch-all route: Redirect to dashboard or login based on auth status */}
//           <Route path="*" element={<RedirectBasedOnAuth />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// // function for  redirecting based on auth status
// function RedirectBasedOnAuth() {
//   const { user, loading } = useContext(AuthContext);

//   if (loading) {
//     return <Loading />; // Loading state while session is being validated
//   }

//   if (user) {
//     // If user is authenticated, redirect to dashboard
//     return <Navigate to="/dashboard/" />;
//   } else {
//     // If not authenticated, redirect to login
//     return <Navigate to="/login" />;
//   }
// }

// export default App;

import React from "react";
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

function App() {
  return (
    <Router>
      <ToastContainer pauseOnFocusLoss={false} autoClose={900} />

      <Routes>
        {/* Redirect the home route to the dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/completeProfile" element={<CompleteProfile />} />

        {/* Dashboard Route */}
        <Route path="/dashboard/*" element={<Dashboard />} />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
