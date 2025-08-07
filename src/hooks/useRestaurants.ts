import { useState, useEffect } from "react";
import { getRestaurants, Restaurant } from "../lib/api";

interface PaginatedResponse {
  data: Restaurant[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

type RestaurantResponse = Restaurant[] | PaginatedResponse;

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      setError(null);

      const restaurantData = (await getRestaurants()) as RestaurantResponse;

      // Handle restaurants data
      if (Array.isArray(restaurantData)) {
        setRestaurants(restaurantData);
      } else if (
        restaurantData &&
        typeof restaurantData === "object" &&
        "data" in restaurantData &&
        Array.isArray(restaurantData.data)
      ) {
        setRestaurants(restaurantData.data);
      } else {
        console.warn("Unexpected restaurant data format:", restaurantData);
        setRestaurants([]);
      }
    } catch (err) {
      console.error("Error fetching restaurants:", err);
      setError("Failed to load restaurants");
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const refetch = () => {
    fetchRestaurants();
  };

  return {
    restaurants,
    loading,
    error,
    refetch,
  };
}
