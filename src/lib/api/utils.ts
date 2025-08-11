import { Restaurant, LocationData, Coordinates } from "../interfaces";

// # General helpers

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility functions
export const formatRestaurantLocation = (restaurant: Restaurant): string => {
  if (typeof restaurant.location === "string") {
    return restaurant.location;
  }

  if (restaurant.address) {
    return restaurant.address;
  }

  if (restaurant.location && typeof restaurant.location === "object") {
    const { latitude, longitude } = restaurant.location;
    if (latitude && longitude) {
      return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    }
  }

  return "Location not available";
};

export const isValidCoordinates = (
  location: LocationData
): location is Coordinates => {
  return (
    typeof location === "object" &&
    "latitude" in location &&
    "longitude" in location &&
    typeof location.latitude === "number" &&
    typeof location.longitude === "number" &&
    !isNaN(location.latitude) &&
    !isNaN(location.longitude)
  );
};

export const formatPrice = (
  price: number,
  currency: string = "USD"
): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price);
};

export const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};







