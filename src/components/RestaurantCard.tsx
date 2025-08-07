import Image from "next/image";
import Link from "next/link";
import { Restaurant } from "../lib/api";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
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
      <h3 className="text-xl font-medium text-black">{restaurant.name}</h3>
      <p className="text-gray-600">{restaurant.location}</p>
      <Link href={`/restaurant/${restaurant.id}`}>
        <button className="mt-2 bg-primary text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors cursor-pointer">
          View Menu
        </button>
      </Link>
    </div>
  );
}
