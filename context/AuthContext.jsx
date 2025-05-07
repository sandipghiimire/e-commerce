"use client"

import { createContext, useContext, useEffect, useState } from "react";

// 1. Create context with default values
const AuthContext = createContext({
  user: null,
  isLoading: true,
});

// 2. Provider component
export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const res = await fetch("/api/currentuser");
        if (!res.ok) {
          setUser(null);
        } else {
          const { data } = await res.json();
          setUser(data);
          console.log("The auth context data", data)
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Custom hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
}
