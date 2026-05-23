import { useState } from "react";
import { AuthContext } from "./context";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setisAuthenticated] = useState(false);

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

  const login = (email) => {
    // Find matching dummy user
    const foundUser = dummyUsers.find((user) => user.email === email);

    if (foundUser) {
      setUser(foundUser);
      setisAuthenticated(true);
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    setisAuthenticated(false);
  };
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
