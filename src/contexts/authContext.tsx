// frontend/lib/authContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import { User } from "../lib/interfaces";
import { authService } from "../lib/services/authService";
import { redirectManager } from "../lib/services/redirectManager";

interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loading: boolean; // Legacy compatibility
  login: (token: string, refreshToken?: string) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      if (typeof window !== "undefined") {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          const validation = await authService.validateToken(storedToken);
          if (validation.isValid && validation.user) {
            setTokenState(storedToken);
            setUserState(validation.user);
          } else {
            localStorage.removeItem("token");
          }
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (newToken: string, refreshToken?: string) => {
    setToken(newToken);
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("refreshToken");
    router.push(redirectManager.getRedirectPath("unauthenticated"));
  };

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
      const userData = authService.decodeTokenToUser(newToken);
      setUserState(userData);
    } else {
      localStorage.removeItem("token");
      setUserState(null);
    }
  };

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
  };

  const updateUser = (userData: Partial<User>) => {
    setUserState((prev) => (prev ? { ...prev, ...userData } : null));
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        isLoading: loading,
        loading, // Legacy compatibility
        login,
        logout,
        setUser,
        setToken,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
