import { apiClient } from "./client";
import { HeroSlider, ApiErrorResponse } from "../interfaces";
import { demoHeroSliders } from "../../data";

export const contentApi = {
  // Hero Sliders
  heroSliders: {
    getAll: async (): Promise<HeroSlider[]> => {
      try {
        const response = await apiClient.get<
          HeroSlider[] | { data: HeroSlider[] }
        >("/content/hero-sliders");

        // Handle different response formats
        if (Array.isArray(response)) {
          return response;
        } else if (
          response &&
          typeof response === "object" &&
          "data" in response
        ) {
          return response.data;
        } else {
          console.warn("Unexpected hero sliders data format:", response);
          return [];
        }
      } catch (error) {
        const apiError = error as ApiErrorResponse;

        // Only return demo data if explicitly needed for development
        if (
          process.env.NODE_ENV === "development" &&
          apiError?.response?.status === 404
        ) {
          console.info(
            "Hero sliders endpoint not found, using demo data for development"
          );
          return demoHeroSliders;
        }
        throw error;
      }
    },

    getById: async (id: string): Promise<HeroSlider> => {
      return apiClient.get<HeroSlider>(`/content/hero-sliders/${id}`);
    },

    create: async (
      data: Omit<HeroSlider, "id" | "createdAt" | "updatedAt">,
      token: string
    ): Promise<HeroSlider> => {
      const config = apiClient.createAuthenticatedConfig(token);
      return apiClient.post<HeroSlider>("/content/hero-sliders", data, config);
    },

    update: async (
      id: string,
      data: Partial<HeroSlider>,
      token: string
    ): Promise<HeroSlider> => {
      const config = apiClient.createAuthenticatedConfig(token);
      return apiClient.put<HeroSlider>(
        `/content/hero-sliders/${id}`,
        data,
        config
      );
    },

    delete: async (id: string, token: string): Promise<void> => {
      const config = apiClient.createAuthenticatedConfig(token);
      return apiClient.delete(`/content/hero-sliders/${id}`, config);
    },
  },
};

// Legacy exports for backward compatibility
export const getHeroSliders = contentApi.heroSliders.getAll;
