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

type UserRole = "admin" | "customer" | "restaurant" | "superAdmin";

interface User {
  id: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  name?: string;
  // Add other properties as needed
}

interface AuthContextType {
  token: string | null;
  login: (token: string, refreshToken?: string) => void;
  logout: () => void;
  user: User | null;
  // New properties for ProtectedRoute compatibility
  isAuthenticated: boolean;
  loading: boolean;
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

  // Initialize token from localStorage and validate
  useEffect(() => {
    const initializeAuth = async () => {
      if (typeof window !== "undefined") {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          try {
            const isValid = await validateToken(storedToken);
            if (isValid) {
              setTokenState(storedToken);
              const userData = decodeToken(storedToken);
              setUserState(userData);
            } else {
              localStorage.removeItem("token");
            }
          } catch (error) {
            console.error("Token validation error:", error);
            localStorage.removeItem("token");
          }
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const validateToken = async (tokenToValidate: string): Promise<boolean> => {
    try {
      // Check if token is expired
      const payload = JSON.parse(atob(tokenToValidate.split(".")[1]));
      const currentTime = Date.now() / 1000;

      if (payload.exp && payload.exp < currentTime) {
        return false;
      }

      // Optional: Validate with backend
      const response = await fetch("/api/auth/validate", {
        headers: {
          Authorization: `Bearer ${tokenToValidate}`,
        },
      });

      return response.ok;
    } catch (error) {
      console.error("Token validation error:", error);
      return false;
    }
  };

  const decodeToken = (tokenToDecode: string): User | null => {
    try {
      const payload = JSON.parse(atob(tokenToDecode.split(".")[1]));
      return {
        id: payload.userId || payload.id,
        email: payload.email,
        role: payload.role as UserRole,
        firstName: payload.firstName,
        lastName: payload.lastName,
        name:
          payload.name ||
          `${payload.firstName || ""} ${payload.lastName || ""}`.trim(),
      };
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const login = (newToken: string, refreshToken?: string) => {
    localStorage.setItem("authToken", newToken);
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }

    try {
      const payload = JSON.parse(atob(newToken.split(".")[1]));
      setUserState({
        id: payload.userId,
        email: payload.email,
        role: payload.role,
      });
    } catch (error) {
      console.error("Error parsing token:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    setUserState(null);
    router.push("/auth/login");
  };

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
      const userData = decodeToken(newToken);
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
        login,
        logout,
        user,
        isAuthenticated,
        loading,
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
