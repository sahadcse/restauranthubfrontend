import { useState, useEffect } from "react";
import { getHeroSliders, HeroSlider } from "../lib/api";

export function useHeroSliders() {
  const [heroSliders, setHeroSliders] = useState<HeroSlider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHeroSliders = async () => {
    try {
      setLoading(true);
      setError(null);

      const sliderData = await getHeroSliders();
      setHeroSliders(sliderData);
    } catch (sliderError) {
      console.error("Failed to fetch hero sliders:", sliderError);
      setError("Failed to load hero sliders");
      setHeroSliders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroSliders();
  }, []);

  const refetch = () => {
    fetchHeroSliders();
  };

  return {
    heroSliders,
    loading,
    error,
    refetch,
  };
}