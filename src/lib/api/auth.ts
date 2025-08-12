import { apiClient } from "./client";
import {
  UserRegistrationData,
  RegisterResponse,
  EmailVerificationResponse,
  ResendVerificationResponse,
} from "../interfaces";

export const authApi = {
  // Register user (customer or restaurant owner)
  register: async (
    userData: UserRegistrationData,
    role: "customer" | "restaurant-owner"
  ): Promise<RegisterResponse> => {
    const endpoint =
      role === "customer"
        ? "/users/register/customer"
        : "/users/register/restaurant-owner";

    return apiClient.post<RegisterResponse>(endpoint, userData);
  },

  async verifyEmail(token: string): Promise<EmailVerificationResponse> {
    return apiClient.get<EmailVerificationResponse>(
      `/users/verify-email/${token}`
    );
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
};

// Legacy exports for backward compatibility
export const registerUser = authApi.register;
