"use client";
import { useEffect, useState } from "react";
import MenuItemCard from "../MenuItemCard";
import { useWishlist, WishlistItem } from "../../contexts/wishlistContext";
import { useCart } from "../../contexts/cartContext";
import { MenuItem } from "../../lib/interfaces";
import { demoMenuItems } from "../../data/menuItems";

const NewArrivals: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToWishlist, removeFromWishlist, isItemInWishlist, isHydrated } =
    useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    const loadNewArrivals = async () => {
      try {
        setLoading(true);

        // Filter demo menu items to show only featured items or recent items as "new arrivals"
        const newArrivalItems = demoMenuItems
          .filter(
            (item) =>
              item.isFeatured ||
              item.flags.includes("popular") ||
              item.discountPercentage > 10
          )
          .slice(0, 6); // Limit to 6 items

        setMenuItems(newArrivalItems);
        setError(null);
      } catch (err) {
        console.error("Error loading new arrivals:", err);
        setError("Failed to load new arrivals");
        setMenuItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadNewArrivals();
  }, []);

  const handleWishlistToggle = (menuItem: MenuItem) => {
    const wishlistItem: WishlistItem = {
      id: parseInt(menuItem.id),
      restaurant_id: parseInt(menuItem.restaurantId),
      name: menuItem.title,
      price: menuItem.finalPrice,
      image_url: menuItem.images?.[0]?.url || "/placeholder-food.jpg",
      description: menuItem.description,
    };

    if (isItemInWishlist(parseInt(menuItem.id))) {
      removeFromWishlist(parseInt(menuItem.id));
    } else {
      addToWishlist(wishlistItem);
    }
  };

  const handleAddToCart = (menuItem: MenuItem) => {
    addToCart(menuItem);
  };

  if (loading) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-700">
              New <span className="text-teal-500">Arrivals</span>
            </h2>
            <p className="text-gray-400 mt-2">
              Browse The Collection of Top Products
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(5)].map((_, index) => (
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

  if (error && menuItems.length === 0) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-700">
              New <span className="text-teal-500">Arrivals</span>
            </h2>
            <p className="text-gray-400 mt-2">
              Browse The Collection of Top Products
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-700">
            New <span className="text-teal-500">Arrivals</span>
          </h2>
          <p className="text-gray-400 mt-2">
            Browse The Collection of Top Products
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {menuItems.map((menuItem) => (
            <MenuItemCard
              key={menuItem.id}
              menuItem={menuItem}
              showRestaurant={false}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleWishlistToggle}
              isInWishlist={
                isHydrated ? isItemInWishlist(parseInt(menuItem.id)) : false
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
