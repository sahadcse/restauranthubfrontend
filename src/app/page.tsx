"use client";

import Header from "../components/layout/public/Header";
import Footer from "../components/layout/public/Footer";
import HeroSliderComponent from "../components/HeroSlider";
import CategoriesSection from "../components/CategoriesSection";
import RestaurantGrid from "../components/RestaurantGrid";
import { useAuth } from "../contexts/authContext";
import { useRestaurants } from "../hooks/useRestaurants";
import { useHeroSliders } from "../hooks/useHeroSliders";
import { useCategories } from "../hooks/useCategories";

export default function Home() {
  const { token } = useAuth();
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

  const handleRetry = () => {
    window.location.reload();
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
