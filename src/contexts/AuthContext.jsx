import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create a context object
export const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to check if the user is authenticated via API (on initial load or page refresh)
  const validateSession = async () => {
    try {
      const response = await axios.get("/api/auth/validate-session", {
        withCredentials: true, // Important to send HTTP-only cookies
      });
      setUser(response.data.user); // Assuming the user data is returned in response.data.user
      setLoading(false);
    } catch (err) {
      setUser(null);
      setLoading(false);
      setError(
        err.response ? err.response.data.message : "Failed to authenticate"
      );
    }
  };

  // On component mount, check if there's an active session
  useEffect(() => {
    validateSession();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      const response = await axios.post("/api/auth/login", credentials, {
        withCredentials: true, // To store the HTTP-only cookie
      });
      setUser(response.data.user); // Store the user info after successful login
    } catch (err) {
      setError(err.response ? err.response.data.message : "Login failed");
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      setUser(null); // Clear the user from state
    } catch (err) {
      setError(err.response ? err.response.data.message : "Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
