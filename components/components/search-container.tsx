"use client";

import { useState, useEffect } from "react";
import { Search, Crosshair, Mic, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { trendingLocalities } from "@/lib/property-data";

interface SearchContainerProps {
  onSearch?: (query: string) => void;
}

const quickFilters = [
  { id: "ready", label: "Ready to Move", icon: "🏠" },
  { id: "owner", label: "Owner Properties", icon: "👤" },
  { id: "verified", label: "Verified Listings", icon: "✓" },
  { id: "new", label: "New Launches", icon: "🆕" },
];

export function SearchContainer({ onSearch }: SearchContainerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [filteredLocalities, setFilteredLocalities] = useState<typeof trendingLocalities>([]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = trendingLocalities.filter(locality =>
        locality.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLocalities(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setFilteredLocalities([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  const handleLocalityClick = (locality: string) => {
    setSearchQuery(locality);
    setShowSuggestions(false);
    onSearch?.(locality);
  };

  return (
    <div className="w-full max-w-3xl">
      {/* Tabs - Pill Style */}
      <Tabs defaultValue="buy" className="mb-4">
        <TabsList className="bg-white/95 backdrop-blur-sm rounded-full p-1.5 shadow-lg border border-white/50 inline-flex">
          <TabsTrigger
            value="buy"
            className="rounded-full px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100"
          >
            🏠 Buy
          </TabsTrigger>
          <TabsTrigger
            value="rent"
            className="rounded-full px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100"
          >
            🏢 Rent
          </TabsTrigger>
          <TabsTrigger
            value="new-launch"
            className="rounded-full px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100"
          >
            ✨ New Launch
          </TabsTrigger>
          <TabsTrigger
            value="commercial"
            className="rounded-full px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100"
          >
            🏬 Commercial
          </TabsTrigger>
          <TabsTrigger
            value="plots"
            className="rounded-full px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100"
          >
            🌳 Plots/Land
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Search Input - Housing.com Style */}
      <div className="relative">
        <div className="flex items-center gap-2 bg-white rounded-full shadow-lg border border-gray-200 p-2 pr-3">
          <Search className="w-5 h-5 text-gray-400 ml-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search for localities, landmarks, or projects"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="flex-1 h-10 px-2 outline-none text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
          <div className="flex items-center gap-1 border-l pl-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600">
              <Crosshair className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600">
              <Mic className="w-4 h-4" />
            </Button>
          </div>
          <Button className="h-10 px-6 bg-blue-600 hover:bg-blue-700 rounded-full font-medium">
            Search
          </Button>
        </div>

        {/* Predictive Suggestions Dropdown */}
        <AnimatePresence>
          {showSuggestions && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50"
            >
              <div className="p-3">
                <p className="text-xs text-gray-500 font-medium mb-2">
                  📍 Trending Localities
                </p>
                <div className="space-y-1">
                  {filteredLocalities.map((locality) => (
                    <button
                      key={locality.name}
                      onClick={() => handleLocalityClick(locality.name)}
                      className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-md transition-colors text-left"
                    >
                      <div className="flex items-center gap-2">
                        <Search className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium">{locality.name}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{locality.avgPrice}</span>
                        <Badge className="bg-green-100 text-green-700">
                          {locality.growth}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Action Filters */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <span className="text-sm text-white font-medium drop-shadow-md">Quick filters:</span>
        {quickFilters.map((filter) => (
          <Badge
            key={filter.id}
            variant={activeFilters.includes(filter.id) ? "default" : "outline"}
            className={`cursor-pointer transition-all ${
              activeFilters.includes(filter.id)
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-white/90 text-gray-800 hover:bg-white border-white/50"
            }`}
            onClick={() => toggleFilter(filter.id)}
          >
            <span className="mr-1">{filter.icon}</span>
            {filter.label}
          </Badge>
        ))}
      </div>

      {/* Popular Localities */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <span className="text-sm text-white font-medium drop-shadow-md">Popular:</span>
        <div className="flex flex-wrap gap-2">
          {trendingLocalities.slice(0, 5).map((locality) => (
            <Badge
              key={locality.name}
              variant="secondary"
              className="bg-white text-gray-800 hover:bg-gray-100 cursor-pointer whitespace-nowrap backdrop-blur-sm shadow-md border border-white/50 transition-all font-medium"
              onClick={() => handleLocalityClick(locality.name)}
            >
              {locality.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
