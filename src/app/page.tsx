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
import type { MenuItem } from "../lib/interfaces";

export default function Home() {
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
  } = useMenuItems({ featured: true, limit: 8 });

  const handleRetry = () => {
    window.location.reload();
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
    // TODO: Implement add to wishlist functionality
    console.log("Add to wishlist:", item);
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
