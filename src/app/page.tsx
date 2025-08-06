"use client";

import { useEffect, useState } from "react";
import { getRestaurants, Restaurant } from "../lib/api";
import Image from "next/image";
import Link from "next/link";
// import CartModal from "../components/CartModal";
import Header from "../components/layout/public/Header";
import Footer from "../components/layout/public/Footer";

import { useAuth } from "../contexts/authContext";

// Define the possible API response types
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

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setError(null);
        const data = (await getRestaurants()) as RestaurantResponse;

        // Handle different response formats
        if (Array.isArray(data)) {
          // Direct array response
          setRestaurants(data);
        } else if (
          data &&
          typeof data === "object" &&
          "data" in data &&
          Array.isArray(data.data)
        ) {
          // Paginated response
          setRestaurants(data.data);
        } else {
          console.warn("Unexpected data format:", data);
          setRestaurants([]);
        }
      } catch (err) {
        console.error("Error fetching restaurants:", err);
        setError("Failed to load restaurants");
        setRestaurants([]); // Ensure restaurants is always an array
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="max-w-4xl mx-auto p-6">
        {token && (
          <p className="text-lg text-gray-700 mb-4">
            Welcome back! Explore your favorite restaurants.
          </p>
        )}
        <h2 className="text-3xl font-semibold mb-6 text-black">
          Explore Restaurants
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : !Array.isArray(restaurants) || restaurants.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-6">
              <svg
                className="mx-auto h-16 w-16 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Restaurants Available
            </h3>
            <p className="text-gray-500 mb-6">
              We couldn&apos;t find any restaurants at the moment. Please check
              back later or contact support if this issue persists.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                {restaurant.logo_url ? (
                  <Image
                    src={restaurant.logo_url}
                    alt={restaurant.name}
                    width={300}
                    height={128}
                    className="w-full h-32 object-cover rounded-md mb-4"
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                <h3 className="text-xl font-medium text-black">
                  {restaurant.name}
                </h3>
                <p className="text-gray-600">{restaurant.location}</p>
                <Link href={`/restaurant/${restaurant.id}`}>
                  <button className="mt-2 bg-primary text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors cursor-pointer">
                    View Menu
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
      {/* <CartModal /> */}
    </div>
  );
}
