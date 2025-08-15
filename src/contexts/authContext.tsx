// frontend/lib/authContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
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

  // Memoized auth check to prevent unnecessary re-renders
  const isAuthenticated = token !== null && user !== null;

  // Initialize auth state only once on mount
  useEffect(() => {
    const initializeAuth = async () => {
      if (typeof window === "undefined") {
        setLoading(false);
        return;
      }

      const storedToken = localStorage.getItem("token");
      const storedUserData = localStorage.getItem("userData");

      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          setTokenState(storedToken);
          setUserState(parsedUserData);
        } else {
          // Fallback to token validation
          const validation = await authService.validateToken(storedToken);
          if (validation.isValid && validation.user) {
            setTokenState(storedToken);
            setUserState(validation.user);
            localStorage.setItem("userData", JSON.stringify(validation.user));
          } else {
            localStorage.removeItem("token");
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        setLoading(true);
        const response = await authApi.login(
          credentials.email,
          credentials.password
        );

        if (!response.user || !response.tokens) {
          throw new Error("Invalid response format from server");
        }

        const { user: User, tokens } = response;

        if (!tokens.accessToken || typeof tokens.accessToken !== "string") {
          throw new Error("Invalid access token received from server");
        }

        // Update state atomically
        setTokenState(tokens.accessToken);
        setUserState(User);

        // Update localStorage
        localStorage.setItem("token", tokens.accessToken);
        localStorage.setItem("userData", JSON.stringify(User));
        if (tokens.refreshToken) {
          localStorage.setItem("refreshToken", tokens.refreshToken);
        }

        // Navigate without page reload
        const redirectPath = redirectManager.getPostLoginPath(User.role);
        router.push(redirectPath);
      } catch (error) {
        console.error("Login error:", error);

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
    },
    [router]
  );

  const logout = useCallback(() => {
    // Clear state immediately
    setTokenState(null);
    setUserState(null);

    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("refreshToken");

    // Navigate without page reload
    router.push("/auth/login");
  }, [router]);

  const register = useCallback(
    async (
      userData: UserRegistrationData,
      role: UserRole.CUSTOMER | UserRole.RESTAURANT_OWNER = UserRole.CUSTOMER
    ) => {
      try {
        setLoading(true);
        const response = await authApi.register(userData, role);

        if (response.success && response.data) {
          setTokenState(response.data.token);
          setUserState(response.data.user);

          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userData", JSON.stringify(response.data.user));

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
    },
    [router]
  );

  const setToken = useCallback((newToken: string | null) => {
    if (newToken && typeof newToken === "string") {
      const userData = authService.decodeTokenToUser(newToken);
      if (userData) {
        setTokenState(newToken);
        setUserState(userData);
        localStorage.setItem("token", newToken);
        localStorage.setItem("userData", JSON.stringify(userData));
      } else {
        console.error("Failed to decode user data from token");
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        setTokenState(null);
        setUserState(null);
      }
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      setTokenState(null);
      setUserState(null);
    }
  }, []);

  const setUser = useCallback((newUser: User | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem("userData", JSON.stringify(newUser));
    }
  }, []);

  const updateUser = useCallback((userData: Partial<User>) => {
    setUserState((prev) => {
      if (prev) {
        const updatedUser = { ...prev, ...userData };
        localStorage.setItem("userData", JSON.stringify(updatedUser));
        return updatedUser;
      }
      return null;
    });
  }, []);

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
