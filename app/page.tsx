"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import {
  Navbar,
  Hero,
  PropertyCard,
  PropertyCardSkeleton,
  Sidebar,
  RecentlyViewed,
  addToRecentlyViewed,
  GradientBlob,
} from "@/components/components";
import { properties } from "@/lib/property-data";
import { motion } from "framer-motion";

export default function Home() {
  const [shortlisted, setShortlisted] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState("recommended");
  const [isLoading, setIsLoading] = useState(true);
  const [displayedProperties, setDisplayedProperties] = useState(properties);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter properties based on tab
    const filtered = activeTab === "top-projects"
      ? properties.filter((p) => p.featured)
      : properties;
    setDisplayedProperties(filtered);
  }, [activeTab]);

  const handleShortlist = (id: string) => {
    setShortlisted((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleViewProperty = (id: string) => {
    addToRecentlyViewed(id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-6">
        {/* Left Column - Properties */}
        <div className="flex-1 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Discover Properties
                </h2>
                <p className="text-gray-500">Find your perfect home</p>
              </div>

              {/* Tabs for filtering */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-white border">
                  <TabsTrigger value="recommended" className="gap-1 text-sm">
                    🏠 Recommended
                  </TabsTrigger>
                  <TabsTrigger value="top-projects" className="gap-1 text-sm">
                    ⭐ Top Projects
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </motion.div>

          {/* Property Grid - 1 col mobile, 2 col tablet, 3 col desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div key={index}>
                    <PropertyCardSkeleton />
                  </div>
                ))
              : displayedProperties.map((property) => (
                  <div key={property.id}>
                    <PropertyCard
                      property={property}
                      onShortlist={handleShortlist}
                      isShortlisted={shortlisted.has(property.id)}
                    />
                  </div>
                ))}
          </div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-500 mb-4">
              Showing {displayedProperties.length} of {properties.length} properties
            </p>
            <button className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-4">
              View All Properties →
            </button>
          </motion.div>
        </div>

        {/* Right Sidebar - Hidden on mobile, shown on lg screens */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <Sidebar />
        </div>
      </div>

      {/* Footer CTA */}
      <div className="relative bg-slate-900 text-white py-16 mt-12 overflow-hidden">
        {/* Animated Gradient Blobs */}
        <GradientBlob className="w-96 h-96 -top-48 -left-48" />
        <GradientBlob className="w-80 h-80 -bottom-40 -right-40" style={{ animationDelay: '-10s' } as any} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Ready to Find Your Perfect Home?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg"
          >
            Browse thousands of properties across India. Get personalized
            recommendations and expert guidance.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center gap-4 flex-wrap"
          >
            <button className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg font-medium transition-all hover:scale-105 shadow-lg hover:shadow-orange-500/25">
              Browse Properties
            </button>
            <button className="border border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium transition-all hover:scale-105 backdrop-blur-sm">
              Contact Us
            </button>
            <button className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg font-medium transition-all hover:scale-105 shadow-lg hover:shadow-green-500/25">
              Post Property FREE
            </button>
          </motion.div>
        </div>
      </div>

      {/* Simple Footer */}
      <footer className="bg-slate-950 text-gray-400 py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Buy Property</a></li>
                <li><a href="#" className="hover:text-white">Rent Property</a></li>
                <li><a href="#" className="hover:text-white">Post Property</a></li>
                <li><a href="#" className="hover:text-white">Home Loans</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Cities</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Bangalore</a></li>
                <li><a href="#" className="hover:text-white">Mumbai</a></li>
                <li><a href="#" className="hover:text-white">Delhi NCR</a></li>
                <li><a href="#" className="hover:text-white">Pune</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>© 2026 PropertySalahe.com. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Recently Viewed Strip */}
      <RecentlyViewed onViewProperty={handleViewProperty} />
    </div>
  );
}
