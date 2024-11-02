import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateSession = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/authenticate",
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Save to local storage
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
