"use client";

import React, { useState } from "react";
import Link from "next/link";
import MenuItemCard from "./MenuItemCard";
import { MenuItem, MenuItemFilters } from "../lib/interfaces";
import { useCart } from "../contexts/cartContext";

interface MenuItemsSectionProps {
  title: string;
  subtitle?: string;
  menuItems: MenuItem[];
  loading: boolean;
  error: string | null;
  showFilters?: boolean;
  showRestaurant?: boolean;
  showViewAll?: boolean;
  viewAllLink?: string;
  onFiltersChange?: (filters: MenuItemFilters) => void;
  onAddToCart?: (item: MenuItem) => void;
  onAddToWishlist?: (item: MenuItem) => void;
}

export default function MenuItemsSection({
  title,
  subtitle,
  menuItems,
  loading,
  error,
  showFilters = false,
  showRestaurant = false,
  showViewAll = true,
  viewAllLink = "/menu",
  onFiltersChange,
  onAddToCart,
  onAddToWishlist,
}: MenuItemsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { addToCart } = useCart();

  const filterOptions = [
    { key: "all", label: "All Items" },
    { key: "featured", label: "Featured" },
    { key: "popular", label: "Popular" },
    { key: "healthy", label: "Healthy" },
    { key: "quick", label: "Quick" },
  ];

  const handleFilterChange = (filterKey: string) => {
    setActiveFilter(filterKey);

    if (onFiltersChange) {
      let filters: MenuItemFilters = {};

      switch (filterKey) {
        case "featured":
          filters.isFeatured = true;
          break;
        case "popular":
          filters.rating = 4.5;
          break;
        case "healthy":
          filters.tags = ["healthy"];
          break;
        case "quick":
          filters.tags = ["quick"];
          break;
        default:
          filters = {};
      }

      onFiltersChange(filters);
    }
  };

  const handleAddToCart = (item: MenuItem) => {
    try {
      if (onAddToCart) {
        onAddToCart(item);
      } else {
        addToCart(item);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md animate-pulse"
              >
                <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-3 w-2/3"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                    <div className="h-8 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Menu Items Coming Soon
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">{error}</p>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Try Again
              </button>
              <Link
                href="/restaurants"
                className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-300"
              >
                Browse Restaurants
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!menuItems || menuItems.length === 0) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                New Menu Items Coming Soon
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Our chefs are working on exciting new dishes. Check back soon
                for delicious new options!
              </p>
            </div>
            <Link
              href="/restaurants"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
            >
              Explore Restaurants
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
          </div>

          {showViewAll && (
            <Link
              href={viewAllLink}
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              View All
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          )}
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="flex flex-wrap gap-2 mb-8">
            {filterOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => handleFilterChange(option.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  activeFilter === option.key
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menuItems.map((menuItem) => (
            <MenuItemCard
              key={menuItem.id}
              menuItem={menuItem}
              showRestaurant={showRestaurant}
              onAddToCart={handleAddToCart}
              onAddToWishlist={onAddToWishlist}
            />
          ))}
        </div>

        {/* Load More Button (optional) */}
        {menuItems.length >= 8 && showViewAll && (
          <div className="text-center mt-8">
            <Link
              href={viewAllLink}
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
            >
              View All Menu Items
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
