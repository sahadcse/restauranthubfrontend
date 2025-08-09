import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { ApiConfig, PaginatedResponse } from "../types/api";
import { ApiError } from "../errors/ApiError";

class ApiClient {
  private instance: AxiosInstance;

  constructor(config: ApiConfig) {
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Add timestamp for cache busting if needed
        if (config.method === "get") {
          config.params = {
            ...config.params,
            _t: Date.now(),
          };
        }

        return config;
      },
      (error) => {
        return Promise.reject(ApiError.fromAxiosError(error));
      }
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        const apiError = ApiError.fromAxiosError(error);

        // Handle specific status codes
        if (apiError.status === 401) {
          // Redirect to login or refresh token
          window.dispatchEvent(new CustomEvent("auth:unauthorized"));
        }

        return Promise.reject(apiError);
      }
    );
  }

  // Generic request methods
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.instance.get<T>(url, config);
      return response.data;
    } catch (error) {
      throw ApiError.fromAxiosError(error);
    }
  }

  async post<T>(
    url: string,
    data?: Record<string, unknown> | FormData | string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.instance.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw ApiError.fromAxiosError(error);
    }
  }

  async put<T>(
    url: string,
    data?: Record<string, unknown> | FormData | string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.instance.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw ApiError.fromAxiosError(error);
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.instance.delete<T>(url, config);
      return response.data;
    } catch (error) {
      throw ApiError.fromAxiosError(error);
    }
  }

  async patch<T>(
    url: string,
    data?: Record<string, unknown> | FormData | string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.instance.patch<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw ApiError.fromAxiosError(error);
    }
  }

  // Utility methods for common patterns
  async getPaginated<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T[]> {
    try {
      const response = await this.get<T[] | PaginatedResponse<T>>(url, config);

      // Handle different response formats
      if (Array.isArray(response)) {
        return response;
      }

      if (response && typeof response === "object" && "data" in response) {
        return (response as PaginatedResponse<T>).data;
      }

      return [];
    } catch (error) {
      throw ApiError.fromAxiosError(error);
    }
  }

  // Helper to create authenticated requests
  createAuthenticatedConfig(
    token: string,
    config?: AxiosRequestConfig
  ): AxiosRequestConfig {
    return {
      ...config,
      headers: {
        ...config?.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }

  // Upload method for file uploads
  async upload<T>(
    url: string,
    formData: FormData,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.instance.post<T>(url, formData, {
        ...config,
        headers: {
          ...config?.headers,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw ApiError.fromAxiosError(error);
    }
  }

  // Download method for file downloads
  async download(url: string, config?: AxiosRequestConfig): Promise<Blob> {
    try {
      const response = await this.instance.get(url, {
        ...config,
        responseType: "blob",
      });
      return response.data;
    } catch (error) {
      throw ApiError.fromAxiosError(error);
    }
  }
}

// Create and export the API client instance
const apiConfig: ApiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  timeout: 10000,
};

export const apiClient = new ApiClient(apiConfig);
export { ApiClient };
