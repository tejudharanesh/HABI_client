import { createContext, useState, useEffect } from "react";
import { validateSession } from "../services/api";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateSessionHandler = async () => {
    setLoading(true);
    try {
      const response = await validateSession();

      if (response.success) {
        setUser(response.user);
        localStorage.setItem("user", JSON.stringify(response.user)); // Save to local storage
        setError(null);
      } else {
        setUser(null);
        localStorage.removeItem("user");
        setError("Failed to authenticate");
      }
    } catch (err) {
      setUser(null);
      setError(err.message || "Failed to authenticate");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    validateSessionHandler();
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
