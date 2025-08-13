"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MenuItem } from "../lib/interfaces";
import { useCart } from "../contexts/cartContext";

interface MenuItemCardProps {
  menuItem: MenuItem;
  showRestaurant?: boolean;
  onAddToCart?: (item: MenuItem) => void;
  onAddToWishlist?: (item: MenuItem) => void;
}

export default function MenuItemCard({
  menuItem,
  showRestaurant = false,
  onAddToCart,
  onAddToWishlist,
}: MenuItemCardProps) {
  const { addToCart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const primaryImage =
    menuItem.images?.find((img) => img.isPrimary)?.url ||
    "/placeholder-food.jpg";
  const discountPercentage = Math.round(menuItem.discountPercentage);
  const hasDiscount = discountPercentage > 0;

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case "IN_STOCK":
        return "text-green-600 bg-green-100";
      case "LOW_STOCK":
        return "text-yellow-600 bg-yellow-100";
      case "OUT_OF_STOCK":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStockStatusText = (status: string) => {
    switch (status) {
      case "IN_STOCK":
        return "In Stock";
      case "LOW_STOCK":
        return "Low Stock";
      case "OUT_OF_STOCK":
        return "Out of Stock";
      case "DISCONTINUED":
        return "Discontinued";
      default:
        return status;
    }
  };

  const handleAddToCart = async () => {
    if (isAddingToCart) return;

    setIsAddingToCart(true);
    try {
      if (onAddToCart) {
        onAddToCart(menuItem);
      } else {
        // Fallback to cart context
        addToCart(menuItem);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
        <Link href={`/menu-items/${menuItem.id}`}>
          <Image
            src={primaryImage}
            alt={menuItem.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {menuItem.isFeatured && (
            <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              Featured
            </span>
          )}
          {hasDiscount && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        {onAddToWishlist && (
          <button
            onClick={() => onAddToWishlist(menuItem)}
            className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors duration-200"
            aria-label="Add to wishlist"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        )}

        {/* Rating */}
        <div className="absolute bottom-3 left-3 bg-white/90 rounded-lg px-2 py-1 flex items-center">
          <svg
            className="w-4 h-4 text-yellow-400 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm font-medium text-gray-800">
            {menuItem.rating.toFixed(1)} ({menuItem.ratingCount})
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <Link href={`/menu-items/${menuItem.id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
            {menuItem.title}
          </h3>
        </Link>

        {/* Description */}
        {menuItem.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {menuItem.description}
          </p>
        )}

        {/* Tags */}
        {menuItem.tags && menuItem.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {menuItem.tags.slice(0, 2).map((tag) => (
              <span
                key={tag.id}
                className="text-xs px-2 py-1 rounded-full"
                style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Restaurant Name */}
        {showRestaurant && menuItem.restaurant && (
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span>{menuItem.restaurant.name}</span>
          </div>
        )}

        {/* Stock Status */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${getStockStatusColor(
              menuItem.stockStatus
            )}`}
          >
            {getStockStatusText(menuItem.stockStatus)}
          </span>

          {menuItem.prepTime && (
            <div className="flex items-center text-xs text-gray-500">
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {menuItem.prepTime} min
            </div>
          )}
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              ${menuItem.finalPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                ${menuItem.mrp.toFixed(2)}
              </span>
            )}
          </div>

          {menuItem.stockStatus === "IN_STOCK" && (
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className={`${
                isAddingToCart
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center`}
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5m0 0L17 21H7l2.5-2.5z"
                />
              </svg>
              {isAddingToCart ? "Adding..." : "Add"}
            </button>
          )}
        </div>

        {/* Dietary Labels */}
        {menuItem.dietaryLabel && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
              {menuItem.dietaryLabel}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
