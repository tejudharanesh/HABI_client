import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const validateSession = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/verify",
        {
          withCredentials: true,
        }
      );
      setUser(response.data.user);
      setLoading(false);
    } catch (err) {
      setUser(null);
      setLoading(false);
      setError(
        err.response ? err.response.data.message : "Failed to authenticate"
      );
    }
  };

  useEffect(() => {
    validateSession();
  }, []);

  const login1 = (userData) => {
    console.log(userData);

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Save to local storage
    setLoading(false);
  };

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      setUser(null);
      localStorage.removeItem("user"); // Clear from local storage
    } catch (err) {
      setError(err.response ? err.response.data.message : "Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login1, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
