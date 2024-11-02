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

      if (response.data.success) {
        setUser(response.data.user);
      } else {
        setError("Failed to authenticate");
      }
    } catch (err) {
      setError(
        err.response ? err.response.data.message : "Failed to authenticate"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    validateSession();
  }, []);

  const login1 = (userData) => {
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
