import { useState } from "react";
import { AuthContext } from "./context"; 

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("user"),
  );
  const [loading, setLoading] = useState(false);

  const dummyUsers = [
    {
      email: "guest",
      name: "Guest User",
      role: "guest",
    },
    {
      email: "reader@example.com",
      name: "Book Reader",
      role: "reader",
    },
    {
      email: "admin@example.com",
      name: "Admin User",
      role: "admin",
    },
  ];

  const login = async (email) => {
    setLoading(true);
    const foundUser = await dummyUsers.find((user) => user.email === email);

    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      // ✅ Save to localStorage
      localStorage.setItem("user", JSON.stringify(foundUser));
      setLoading(false);
      return true;
    }


    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // ✅ Remove from localStorage
    localStorage.removeItem("user");
  };

  // ✅ Show loading while checking
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
