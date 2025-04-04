"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { SAsessionInfo } from "@/lib/serverActions/session/sessionServerActions";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState({
    loading: true,
    isConnected: false,
    userId: null,
  });

  useEffect(() => {
    async function fetchSession() {
      const session = await SAsessionInfo();
      setIsAuthenticated({
        loading: false,
        isConnected: session.success,
        userId: session.userId,
      });
    }

    fetchSession();
  }, []);

  return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
