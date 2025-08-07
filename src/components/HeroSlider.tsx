"use client";

import React, { useState, useEffect } from "react";
import { HeroSlider } from "../lib/api";

interface HeroSliderProps {
  sliders: HeroSlider[];
}

const HeroSliderComponent: React.FC<HeroSliderProps> = ({ sliders }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    if (sliders.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliders.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [sliders.length]);

  if (!sliders || sliders.length === 0) {
    return null;
  }

  const currentSlider = sliders[currentSlide];

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-3xl mb-8">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${currentSlider.imageUrl})`,
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-lg">
            {/* Price Tag */}
            {currentSlider.price && (
              <div className="inline-flex items-center mb-4">
                <span className="text-white text-lg font-medium bg-emerald-600 px-4 py-2 rounded-full">
                  Starting at ${currentSlider.price.toFixed(2)}
                </span>
              </div>
            )}

            {/* Main Heading */}
            <h1 className="text-5xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
              {currentSlider.title}
            </h1>

            {/* Description */}
            {currentSlider.description && (
              <p className="text-white text-lg mb-8 leading-relaxed drop-shadow-md">
                {currentSlider.description}
              </p>
            )}

            {/* CTA Button */}
            {currentSlider.buttonText && (
              <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold px-8 py-4 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
                onClick={() => {
                  if (currentSlider.linkUrl) {
                    window.open(currentSlider.linkUrl, "_blank");
                  }
                }}
              >
                {currentSlider.buttonText} &rarr;
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      {sliders.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {sliders.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/60 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSliderComponent;
