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

import { UserRole } from "../lib/interfaces/enums";

import {
  User,
  LoginCredentials,
  UserRegistrationData,
} from "../lib/interfaces";
import { authApi } from "../lib/api/auth";
import { authService } from "../lib/services/authService";
import { redirectManager } from "../lib/services/redirectManager";

interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loading: boolean; // Legacy compatibility
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (
    userData: UserRegistrationData,
    role?: UserRole.CUSTOMER | UserRole.RESTAURANT_OWNER
  ) => Promise<void>;
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
        const storedUserData = localStorage.getItem("userData");

        if (storedToken) {
          // First try to restore from stored user data
          if (storedUserData) {
            try {
              const parsedUserData = JSON.parse(storedUserData);
              setTokenState(storedToken);
              setUserState(parsedUserData);
              console.log(
                "Restored user data from localStorage:",
                parsedUserData
              );
            } catch (error) {
              console.error("Error parsing stored user data:", error);
              // Fallback to token validation
              const validation = await authService.validateToken(storedToken);
              if (validation.isValid && validation.user) {
                setTokenState(storedToken);
                setUserState(validation.user);
                localStorage.setItem(
                  "userData",
                  JSON.stringify(validation.user)
                );
              } else {
                localStorage.removeItem("token");
                localStorage.removeItem("userData");
              }
            }
          } else {
            // Fallback to token validation if no stored user data
            const validation = await authService.validateToken(storedToken);
            if (validation.isValid && validation.user) {
              setTokenState(storedToken);
              setUserState(validation.user);
              localStorage.setItem("userData", JSON.stringify(validation.user));
            } else {
              localStorage.removeItem("token");
            }
          }
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      const response = await authApi.login(
        credentials.email,
        credentials.password
      );

      // Log the response to debug
      console.log("Login response:", response);

      // Handle the API response structure - check if it matches expected format
      if (!response.user || !response.tokens) {
        throw new Error("Invalid response format from server");
      }

      const { user: User, tokens } = response;

      // Validate token before setting it
      if (!tokens.accessToken || typeof tokens.accessToken !== "string") {
        throw new Error("Invalid access token received from server");
      }

      // Set token and user state directly
      setTokenState(tokens.accessToken);
      setUserState(User);
      console.log("User data:", User);

      // Store tokens AND complete user data in localStorage
      localStorage.setItem("token", tokens.accessToken);
      localStorage.setItem("userData", JSON.stringify(User));
      if (tokens.refreshToken) {
        localStorage.setItem("refreshToken", tokens.refreshToken);
      }

      // Redirect based on user role
      const redirectPath = redirectManager.getPostLoginPath(User.role);
      console.log("Redirecting to:", redirectPath);
      router.push(redirectPath);
    } catch (error) {
      console.error("Login error:", error);

      // Enhanced error handling
      let errorMessage = "Login failed. Please try again.";

      if (error instanceof Error) {
        if (error.message.includes("Invalid response")) {
          errorMessage = "Server response error. Please contact support.";
        } else if (
          error.message.includes("401") ||
          error.message.includes("Unauthorized")
        ) {
          errorMessage = "Invalid email or password.";
        } else if (error.message.includes("400")) {
          errorMessage = "Please check your email and password.";
        } else {
          errorMessage = error.message;
        }
      }

      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    userData: UserRegistrationData,
    role: UserRole.CUSTOMER | UserRole.RESTAURANT_OWNER = UserRole.CUSTOMER
  ) => {
    try {
      setLoading(true);
      const response = await authApi.register(userData, role);

      // Handle successful registration
      if (response.success && response.data) {
        setTokenState(response.data.token);
        setUserState(response.data.user);

        localStorage.setItem("token", response.data.token);

        // Redirect based on user role
        const redirectPath = redirectManager.getPostRegistrationPath(
          response.data.user.role
        );
        router.push(redirectPath);
      }
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setTokenState(null);
    setUserState(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("refreshToken");
    router.push(redirectManager.getRedirectPath("unauthenticated"));
  };

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
    if (newToken && typeof newToken === "string") {
      localStorage.setItem("token", newToken);
      const userData = authService.decodeTokenToUser(newToken);
      if (userData) {
        setUserState(userData);
        localStorage.setItem("userData", JSON.stringify(userData));
      } else {
        console.error("Failed to decode user data from token");
        // Clear invalid token
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        setTokenState(null);
      }
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      setUserState(null);
    }
  };

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
  };

  const updateUser = (userData: Partial<User>) => {
    setUserState((prev) => {
      if (prev) {
        const updatedUser = { ...prev, ...userData };
        // Update localStorage with the new user data
        localStorage.setItem("userData", JSON.stringify(updatedUser));
        return updatedUser;
      }
      return null;
    });
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
        register,
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
