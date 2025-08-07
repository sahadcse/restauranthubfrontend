"use client";

import Header from "../components/layout/public/Header";
import Footer from "../components/layout/public/Footer";
import HeroSliderComponent from "../components/HeroSlider";
import RestaurantGrid from "../components/RestaurantGrid";
import { useAuth } from "../contexts/authContext";
import { useRestaurants } from "../hooks/useRestaurants";
import { useHeroSliders } from "../hooks/useHeroSliders";

export default function Home() {
  const { token } = useAuth();
  const { restaurants, loading, error } = useRestaurants();
  const { heroSliders } = useHeroSliders();

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto p-6">
        {/* Hero Slider */}
        {heroSliders.length > 0 && (
          <HeroSliderComponent sliders={heroSliders} />
        )}

        {/* Welcome Message for Authenticated Users */}
        {token && (
          <p className="text-lg text-gray-700 mb-4">
            Welcome back! Explore your favorite restaurants.
          </p>
        )}

        {/* Restaurants Section */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 text-black">
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