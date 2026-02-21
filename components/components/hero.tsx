"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { SearchContainer } from "./search-container";

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
    <div className="relative w-full h-[500px] md:h-[600px] bg-slate-900 overflow-hidden">
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

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-40 rounded-full bg-white/90 hover:bg-white h-10 w-10 md:h-12 md:w-12"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-40 rounded-full bg-white/90 hover:bg-white h-10 w-10 md:h-12 md:w-12"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </Button>

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-16 md:pt-20 z-30 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-white mb-6 md:mb-8"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2 md:mb-3 drop-shadow-lg">
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-base md:text-lg text-gray-200 drop-shadow-md max-w-2xl">
            {heroSlides[currentSlide].subtitle}
          </p>
        </motion.div>

        {/* Search Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full flex justify-center"
        >
          <div className="w-full max-w-3xl">
            <SearchContainer />
          </div>
        </motion.div>
      </div>

      {/* Slide Indicators - At the very bottom of hero */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-8 bg-orange-500" : "w-2 bg-white/70 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
