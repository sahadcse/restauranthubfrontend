"use client";

import React, { useState, useEffect } from "react";
import { HeroSlider } from "../lib/interfaces";

interface HeroSliderProps {
  sliders: HeroSlider[];
}

const HeroSliderComponent: React.FC<HeroSliderProps> = ({ sliders }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (sliders.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliders.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [sliders.length]);

  // Handle transition animation
  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300); // Match the transition duration

    return () => clearTimeout(timer);
  }, [currentSlide]);

  if (!sliders || sliders.length === 0) {
    return null;
  }

  const currentSlider = sliders[currentSlide];

  const goToSlide = (index: number) => {
    if (index !== currentSlide) {
      setCurrentSlide(index);
    }
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-3xl mb-8">
      {/* Background Images with Smooth Transition */}
      {sliders.map((slider, index) => (
        <div
          key={slider.id}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out ${
            index === currentSlide
              ? "opacity-100 scale-100"
              : "opacity-0 scale-110"
          }`}
          style={{
            backgroundImage: `url(${slider.imageUrl})`,
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      ))}

      {/* Content Overlay with Animation */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div
            className={`max-w-lg transition-all duration-700 ease-out ${
              isTransitioning
                ? "opacity-0 transform translate-y-8"
                : "opacity-100 transform translate-y-0"
            }`}
          >
            {/* Price Tag */}
            {currentSlider.price && (
              <div
                className={`inline-flex items-center mb-4 transition-all duration-500 delay-200 ${
                  isTransitioning
                    ? "opacity-0 transform translate-x-8"
                    : "opacity-100 transform translate-x-0"
                }`}
              >
                <span className="text-white text-lg font-medium bg-emerald-600 px-4 py-2 rounded-full animate-pulse">
                  Starting at ${currentSlider.price.toFixed(2)}
                </span>
              </div>
            )}

            {/* Main Heading */}
            <h1
              className={`text-5xl font-bold text-white leading-tight mb-6 drop-shadow-lg transition-all duration-700 delay-300 ${
                isTransitioning
                  ? "opacity-0 transform translate-y-12 scale-95"
                  : "opacity-100 transform translate-y-0 scale-100"
              }`}
            >
              {currentSlider.title}
            </h1>

            {/* Description */}
            {currentSlider.description && (
              <p
                className={`text-white text-lg mb-8 leading-relaxed drop-shadow-md transition-all duration-700 delay-500 ${
                  isTransitioning
                    ? "opacity-0 transform translate-y-8"
                    : "opacity-100 transform translate-y-0"
                }`}
              >
                {currentSlider.description}
              </p>
            )}

            {/* CTA Button */}
            {currentSlider.buttonText && (
              <button
                className={`bg-white hover:bg-gray-100 text-gray-800 font-semibold px-8 py-4 rounded-lg transition-all duration-700 delay-700 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 ${
                  isTransitioning
                    ? "opacity-0 transform translate-y-8 scale-90"
                    : "opacity-100 transform translate-y-0 scale-100"
                }`}
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

      {/* Pagination Dots with Hover and Click Animations */}
      {sliders.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {sliders.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-500 ease-out hover:scale-125 active:scale-90 ${
                index === currentSlide
                  ? "bg-white w-8 h-3 shadow-lg animate-pulse"
                  : "bg-white/60 hover:bg-white/80 w-3 h-3"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Loading Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-30">
        <div
          className="h-full bg-white transition-all duration-5000 ease-linear"
          style={{
            width: sliders.length > 1 ? "100%" : "0%",
            animation:
              sliders.length > 1 ? "progress 5s linear infinite" : "none",
          }}
        />
      </div>

      {/* CSS Animation Keyframes */}
      <style jsx>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSliderComponent;
