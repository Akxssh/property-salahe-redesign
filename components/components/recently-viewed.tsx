"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { properties, type Property } from "@/lib/property-data";

interface RecentlyViewedProps {
  onViewProperty?: (id: string) => void;
}

const STORAGE_KEY = "property_salahe_recently_viewed";

export function RecentlyViewed({ onViewProperty }: RecentlyViewedProps) {
  const [recentlyViewed, setRecentlyViewed] = useState<Property[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const ids: string[] = JSON.parse(stored);
        const viewedProperties = ids
          .map((id) => properties.find((p) => p.id === id))
          .filter((p): p is Property => p !== undefined);
        setRecentlyViewed(viewedProperties);
        setIsVisible(viewedProperties.length > 0);
      } catch (e) {
        console.error("Error loading recently viewed:", e);
      }
    }
  }, []);

  const removeProperty = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = recentlyViewed.filter((p) => p.id !== id);
    setRecentlyViewed(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated.map((p) => p.id)));
    if (updated.length === 0) {
      setIsVisible(false);
    }
  };

  const clearAll = () => {
    setRecentlyViewed([]);
    localStorage.removeItem(STORAGE_KEY);
    setIsVisible(false);
  };

  if (!isVisible || recentlyViewed.length === 0) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">👁️ Recently Viewed</span>
            <span className="text-xs text-gray-500">
              ({recentlyViewed.length} properties)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="text-xs text-gray-500 hover:text-gray-700 h-7"
            >
              Clear All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="h-7 w-7 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {recentlyViewed.map((property) => (
            <motion.div
              key={property.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex-shrink-0 w-48 cursor-pointer"
              onClick={() => onViewProperty?.(property.id)}
            >
              <div className="relative h-24 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => removeProperty(property.id, e)}
                  className="absolute top-1 right-1 p-1 bg-black/50 hover:bg-black/70 rounded-full text-white"
                >
                  <X className="w-3 h-3" />
                </button>
                <div className="absolute bottom-1 left-1 bg-black/60 backdrop-blur-sm rounded px-1.5 py-0.5 text-xs text-white font-medium">
                  {property.price}
                </div>
              </div>
              <p className="text-xs font-medium text-gray-900 truncate mt-1">
                {property.title}
              </p>
              <p className="text-xs text-gray-500 truncate">{property.locality}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Helper function to add property to recently viewed
export function addToRecentlyViewed(propertyId: string) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    let ids: string[] = stored ? JSON.parse(stored) : [];
    
    // Remove if already exists (to move to end)
    ids = ids.filter((id) => id !== propertyId);
    
    // Add to end
    ids.push(propertyId);
    
    // Keep only last 10
    if (ids.length > 10) {
      ids = ids.slice(-10);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    
    // Dispatch custom event to update component
    window.dispatchEvent(new CustomEvent("recently-viewed-updated"));
  } catch (e) {
    console.error("Error saving recently viewed:", e);
  }
}
