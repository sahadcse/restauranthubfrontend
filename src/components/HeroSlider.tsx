"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeroSlider as HeroSliderType } from "../lib/api";

interface HeroSliderProps {
  sliders: HeroSliderType[];
}

export default function HeroSlider({ sliders }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Filter active sliders and sort by display order
  const activeSliders = sliders
    .filter((slider) => {
      if (!slider.isActive) return false;

      const now = new Date();
      if (slider.startDate && new Date(slider.startDate) > now) return false;
      if (slider.endDate && new Date(slider.endDate) < now) return false;

      return true;
    })
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const nextSlide = useCallback(() => {
    if (activeSliders.length > 1) {
      setCurrentSlide((prev) => (prev + 1) % activeSliders.length);
    }
  }, [activeSliders.length]);

  const prevSlide = useCallback(() => {
    if (activeSliders.length > 1) {
      setCurrentSlide(
        (prev) => (prev - 1 + activeSliders.length) % activeSliders.length
      );
    }
  }, [activeSliders.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || activeSliders.length <= 1) return;

    const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, activeSliders.length]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  if (activeSliders.length === 0) {
    return null; // Don't render if no active sliders
  }

  const getCurrentSlider = () => activeSliders[currentSlide];

  const renderSlideContent = (slider: HeroSliderType) => {
    const content = (
      <div className="relative w-full h-[500px] md:h-[600px] bg-gradient-to-r from-blue-50 to-green-50 overflow-hidden rounded-2xl">
        <div className="flex h-full items-center">
          {/* Left content */}
          <div className="flex-1 px-8 md:px-16 z-10">
            <div className="max-w-lg">
              {slider.price && (
                <p className="text-primary font-medium mb-4 text-lg">
                  Starting at $ {slider.price.toFixed(2)}
                </p>
              )}
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                {slider.title}
              </h1>
              {slider.description && (
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  {slider.description}
                </p>
              )}
              {slider.buttonText && (
                <button className="bg-gray-800 text-white px-8 py-4 rounded-md hover:bg-gray-700 transition-colors duration-300 font-medium text-lg inline-flex items-center">
                  {slider.buttonText}
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Right image */}
          <div className="flex-1 relative h-full">
            <div className="absolute top-1/2 right-8 transform -translate-y-1/2">
              <div className="relative">
                <Image
                  src={slider.imageUrl}
                  alt={slider.title}
                  width={600}
                  height={400}
                  className="object-contain max-h-[400px] w-auto"
                  priority={currentSlide === 0}
                />
                {/* Settings icon in top-right */}
                <div className="absolute top-4 right-4">
                  <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    // Wrap with appropriate link if provided
    if (slider.linkUrl) {
      if (slider.linkType === "EXTERNAL") {
        return (
          <a
            href={slider.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            {content}
          </a>
        );
      } else {
        return (
          <Link href={slider.linkUrl} className="block">
            {content}
          </Link>
        );
      }
    }

    return content;
  };

  return (
    <div
      className="relative w-full mb-12"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main slider content */}
      <div className="relative overflow-hidden">
        {renderSlideContent(getCurrentSlider())}
      </div>

      {/* Navigation arrows */}
      {activeSliders.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors duration-200 z-20"
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors duration-200 z-20"
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Dot indicators */}
      {activeSliders.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {activeSliders.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentSlide
                  ? "bg-gray-800"
                  : "bg-gray-400 hover:bg-gray-600"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
