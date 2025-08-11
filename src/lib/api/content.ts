import { apiClient } from "./client";
import type { HeroSlider } from "../interfaces";
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
        let result: HeroSlider[] = [];
        if (Array.isArray(response)) {
          result = response;
        } else if (
          response &&
          typeof response === "object" &&
          "data" in response
        ) {
          result = response.data;
        }

        // If we get an empty result in development, use demo data
        if (
          process.env.NODE_ENV === "development" &&
          (!result || result.length === 0)
        ) {
          console.info(
            "API returned empty results, using demo data for development"
          );
          return demoHeroSliders;
        }

        return result;
      } catch (error) {
        // const apiError = error as ApiErrorResponse;

        // Always return demo data in development if API fails
        if (process.env.NODE_ENV === "development") {
          console.info(
            "Hero sliders endpoint failed, using demo data for development"
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
