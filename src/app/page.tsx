"use client";

import Header from "../components/layout/public/Header";
import Footer from "../components/layout/public/Footer";
import HeroSliderComponent from "../components/HeroSlider";
import CategoriesSection from "../components/CategoriesSection";
import MenuItemsSection from "../components/MenuItemsSection";
import RestaurantGrid from "../components/RestaurantGrid";
import { useAuth } from "../contexts/authContext";
import { useCart } from "../contexts/cartContext";
import { useRestaurants } from "../hooks/useRestaurants";
import { useHeroSliders } from "../hooks/useHeroSliders";
import { useCategories } from "../hooks/useCategories";
import { useMenuItems } from "../hooks/useMenuItems";
import { useRouter } from "next/navigation";
import { useWishlist, WishlistItem } from "../contexts/wishlistContext";
import type { MenuItem } from "../lib/interfaces";

export default function Home() {
  const router = useRouter();
  const { token } = useAuth();
  const { addToCart } = useCart();
  const { restaurants, loading, error } = useRestaurants();
  const {
    heroSliders,
    loading: slidersLoading,
    error: slidersError,
  } = useHeroSliders();
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();
  const {
    menuItems: featuredMenuItems,
    loading: menuItemsLoading,
    error: menuItemsError,
  } = useMenuItems({ featured: true, limit: 4 });
  const { addToWishlist, removeFromWishlist, isItemInWishlist } = useWishlist();

  const handleRetry = () => {
    router.refresh();
  };

  const handleAddToCart = (item: MenuItem) => {
    try {
      addToCart(item);
      // Optional: Show success notification
      console.log("Added to cart:", item.title);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      // Optional: Show error notification
    }
  };

  const handleAddToWishlist = (item: MenuItem) => {
    try {
      const wishlistItem: WishlistItem = {
        id: parseInt(item.id),
        restaurant_id: parseInt(item.restaurantId),
        name: item.title,
        price: item.finalPrice,
        image_url: item.images?.[0]?.url || "/placeholder-food.jpg",
        description: item.description,
      };

      if (isItemInWishlist(parseInt(item.id))) {
        removeFromWishlist(parseInt(item.id));
      } else {
        addToWishlist(wishlistItem);
      }
    } catch (error) {
      console.error("Failed to toggle wishlist item:", error);
      // Optional: Show error notification
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Slider - Full Width */}
      <div className="w-full">
        {!slidersLoading && !slidersError && heroSliders.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <HeroSliderComponent sliders={heroSliders} />
          </div>
        )}
      </div>

      {/* Categories Section */}
      <CategoriesSection
        categories={categories}
        loading={categoriesLoading}
        error={categoriesError}
      />

      {/* Featured Menu Items Section */}
      <MenuItemsSection
        title="Featured Dishes"
        subtitle="Discover our chef's special recommendations"
        menuItems={featuredMenuItems}
        loading={menuItemsLoading}
        error={menuItemsError}
        showRestaurant={true}
        showViewAll={true}
        viewAllLink="/menu"
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Message for Authenticated Users */}
        {token && (
          <div className="mb-8">
            <p className="text-lg text-gray-700">
              Welcome back! Explore your favorite restaurants.
            </p>
          </div>
        )}

        {/* Restaurants Section */}
        <section className="pb-16">
          <h2 className="text-3xl font-semibold mb-8 text-black">
            Explore Restaurants
          </h2>

          <RestaurantGrid
            restaurants={restaurants}
            loading={loading}
            error={error}
            onRetry={handleRetry}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
