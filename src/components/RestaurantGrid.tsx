import { Restaurant } from "../lib/api";
import RestaurantCard from "./RestaurantCard";
import LoadingSpinner from "./ui/LoadingSpinner";
import ErrorState from "./ui/ErrorState";
import EmptyState from "./ui/EmptyState";

interface RestaurantGridProps {
  restaurants: Restaurant[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

export default function RestaurantGrid({
  restaurants,
  loading,
  error,
  onRetry,
}: RestaurantGridProps) {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (!Array.isArray(restaurants) || restaurants.length === 0) {
    return (
      <EmptyState
        title="No Restaurants Available"
        description="We couldn't find any restaurants at the moment. Please check back later or contact support if this issue persists."
        onRetry={onRetry}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}
