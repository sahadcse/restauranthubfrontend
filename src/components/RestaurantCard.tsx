import Link from "next/link";
import Image from "next/image";
import { Restaurant } from "../lib/interfaces";
import { formatRestaurantLocation } from "../lib/api";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link href={`/restaurants/${restaurant.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        {/* Restaurant Image */}
        <div className="relative h-48 w-full">
          <Image
            src={
              restaurant.logo_url ||
              restaurant.imageUrl ||
              "/placeholder-restaurant.jpg"
            }
            alt={restaurant.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {!restaurant.approved && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
              Pending Approval
            </div>
          )}
        </div>

        {/* Restaurant Info */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
            {restaurant.name}
          </h3>

          {restaurant.description && (
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {restaurant.description}
            </p>
          )}

          <div className="flex items-center text-gray-500 text-sm mb-2">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="truncate">
              {formatRestaurantLocation(restaurant)}
            </span>
          </div>

          {restaurant.phone && (
            <div className="flex items-center text-gray-500 text-sm mb-2">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>{restaurant.phone}</span>
            </div>
          )}

          <div className="flex justify-between items-center mt-4">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                restaurant.approved
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {restaurant.approved ? "Open" : "Pending"}
            </span>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors duration-200">
              View Menu
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
