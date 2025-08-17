import { UserRole } from "@/src/lib/interfaces/enums";
import { apiClient } from "./client";
import {
  UserRegistrationData,
  RegisterResponse,
  EmailVerificationResponse,
  ResendVerificationResponse,
  LoginResponse,
} from "../interfaces";

export const authApi = {
  // Register user (customer or restaurant owner)
  register: async (
    userData: UserRegistrationData,
    role: UserRole.CUSTOMER | UserRole.RESTAURANT_OWNER
  ): Promise<RegisterResponse> => {
    const endpoint =
      role === UserRole.CUSTOMER
        ? "/users/register/customer"
        : "/users/register/restaurant-owner";

    return apiClient.post<RegisterResponse>(endpoint, userData);
  },

  async verifyEmail(token: string): Promise<EmailVerificationResponse> {
    try {
      const response = await apiClient.get<EmailVerificationResponse>(
        `/users/verify-email/${token}`
      );

      // The backend returns the format:
      // { status: "success", message: "...", data: user }
      return response;
    } catch (error) {
      console.error("Email verification error:", error);
      throw new Error("Email verification failed. Please try again.");
    }
  },

  async resendVerificationEmail(
    email: string
  ): Promise<ResendVerificationResponse> {
    return apiClient.post<ResendVerificationResponse>(
      "/users/resend-verification",
      {
        email,
      }
    );
  },
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      console.log("Making login request to API...");

      const response = await apiClient.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      console.log("Raw API response:", response);

      // Validate response structure matches the expected LoginResponse interface
      if (!response || typeof response !== "object") {
        throw new Error("Invalid response from server");
      }

      if (!response.user) {
        throw new Error("User data missing from server response");
      }

      if (!response.tokens) {
        throw new Error("Token data missing from server response");
      }

      if (!response.tokens.accessToken) {
        throw new Error("Access token missing from server response");
      }

      return response;
    } catch (error) {
      console.error("Login API error:", error);

      // Re-throw with more specific error information
      if (error instanceof Error) {
        throw error;
      }

      throw new Error("Network error during login");
    }
  },
};

// Legacy exports for backward compatibility
export const registerUser = authApi.register;
