import { apiClient } from "./client";
import { UserRegistrationData, RegisterResponse } from "../interfaces";

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
};

// Legacy exports for backward compatibility
export const registerUser = authApi.register;
