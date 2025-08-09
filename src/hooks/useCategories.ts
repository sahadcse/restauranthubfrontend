import { useState, useEffect } from "react";
import { getCategories } from "../lib/api";
import { Category, ApiErrorResponse } from "../lib/interfaces";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const categoryData = await getCategories();
      // Sort by order and filter active categories
      const sortedCategories = categoryData
        .filter((cat) => cat.isActive)
        .sort((a, b) => a.order - b.order);

      setCategories(sortedCategories);
    } catch (categoryError) {
      console.error("Failed to fetch categories:", categoryError);

      const error = categoryError as ApiErrorResponse;

      // Handle different types of errors with user-friendly messages
      if (error?.response?.status === 404) {
        setError(
          "No categories found at the moment. Check back later for exciting new categories!"
        );
      } else if (error?.response?.status === 500) {
        setError(
          "We're experiencing technical difficulties. Please try again in a moment."
        );
      } else if (error?.code === "NETWORK_ERROR" || !navigator.onLine) {
        setError("Please check your internet connection and try again.");
      } else {
        setError(
          "Unable to load categories right now. Please refresh the page or try again later."
        );
      }

      // Set empty array to prevent showing demo data when there's an actual error
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const refetch = () => {
    fetchCategories();
  };

  return {
    categories,
    loading,
    error,
    refetch,
  };
}