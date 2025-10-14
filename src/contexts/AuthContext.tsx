import React, { createContext, useContext, useState, useEffect } from "react";
import { validateLogin } from "../data/userCredentials";

interface User {
  id: string;
  email: string;
  name?: string;
  role?: "hospital" | "dentist" | "pharmacy";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string,
    role: "hospital" | "dentist" | "pharmacy"
  ) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    // const storedToken = localStorage.getItem("authToken");

    // if (storedUser && storedToken) {
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string,
    role: "hospital" | "dentist" | "pharmacy"
  ): Promise<boolean> => {
    try {
      const validation = await validateLogin(email, password, role);

      if (validation.isValid) {
        const userData: User = {
          id: `${role}-${email}`,
          email,
          role: role as User["role"],
          name: email.split("@")[0],
        };

        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("authUser", JSON.stringify(userData));
        localStorage.setItem("authToken", `token-${Date.now()}`);

        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
