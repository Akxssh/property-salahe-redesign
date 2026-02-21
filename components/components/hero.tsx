"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { SearchContainer, MobileSearchContainer } from "./search-container";

const heroSlides = [
  {
    image: "https://loremflickr.com/1920/600/architecture,building?lock=1",
    title: "Find Your Dream Home",
    subtitle: "Discover properties in top localities across India",
  },
  {
    image: "https://loremflickr.com/1920/600/apartment,modern?lock=2",
    title: "Premium Apartments",
    subtitle: "Luxury living in prime locations",
  },
  {
    image: "https://loremflickr.com/1920/600/villa,luxury?lock=3",
    title: "Exclusive Villas",
    subtitle: "Spacious homes for your family",
  },
  {
    image: "https://loremflickr.com/1920/600/office,commercial?lock=4",
    title: "Commercial Spaces",
    subtitle: "Perfect offices for your business",
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="relative w-full h-[60vh] sm:h-[500px] md:h-[550px] lg:h-[600px] min-h-[500px] bg-slate-900 overflow-hidden">
      {/* Background with fallback */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          {/* Fallback gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-black ${
            imageLoaded ? 'opacity-0' : 'opacity-100'
          } transition-opacity duration-500`} />

          {/* Background Image */}
          <Image
            src={heroSlides[currentSlide].image}
            alt={heroSlides[currentSlide].title}
            fill
            className="object-cover"
            priority
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(false)}
            style={{ opacity: imageLoaded ? 0.7 : 0 }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlay - Lighter for better visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-slate-900/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />

      {/* Navigation Arrows - Hidden on mobile, shown on md+ */}
      <Button
        variant="outline"
        size="icon"
        onClick={prevSlide}
        className="hidden sm:flex absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-40 rounded-full bg-white/90 hover:bg-white h-10 w-10 md:h-12 md:w-12"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={nextSlide}
        className="hidden sm:flex absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-40 rounded-full bg-white/90 hover:bg-white h-10 w-10 md:h-12 md:w-12"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </Button>

      {/* Hero Content - Centered on all screens */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 z-30 py-8 sm:py-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-white w-full max-w-5xl mx-auto"
        >
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 drop-shadow-lg leading-tight">
            {heroSlides[currentSlide].title}
          </h1>

          {/* Subtitle - Hidden on mobile for minimal UI */}
          <p className="hidden md:block text-base md:text-lg lg:text-xl text-gray-200 drop-shadow-md max-w-2xl mx-auto">
            {heroSlides[currentSlide].subtitle}
          </p>
        </motion.div>

        {/* Search Container - Mobile version */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:hidden w-full mt-4"
        >
          <MobileSearchContainer />
        </motion.div>

        {/* Search Container - Desktop version */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="hidden md:block w-full mt-6 md:mt-8"
        >
          <SearchContainer />
        </motion.div>
      </div>

      {/* Slide Indicators - At the very bottom of hero */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 sm:gap-2.5 bg-black/30 backdrop-blur-sm px-4 py-2.5 rounded-full">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1} of ${heroSlides.length}`}
            className="group flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 hover:bg-white/10 active:scale-95"
          >
            <div
              className={`rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 h-2.5 bg-orange-500"
                  : "w-2.5 h-2.5 bg-white/50 group-hover:bg-white/80"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
