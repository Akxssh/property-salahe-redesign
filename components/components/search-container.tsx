"use client";

import { useState, useEffect } from "react";
import { Search, Crosshair, Mic, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { trendingLocalities, localityZones, type Property } from "@/lib/property-data";

interface SearchContainerProps {
  onSearch?: (query: string) => void;
}

const quickFilters = [
  { id: "ready", label: "Ready to Move", icon: "🏠" },
  { id: "owner", label: "Owner Properties", icon: "👤" },
  { id: "verified", label: "Verified Listings", icon: "✓" },
  { id: "new", label: "New Launches", icon: "🆕" },
];

// Search Input Component
function SearchInput({
  searchQuery,
  setSearchQuery,
  showSuggestions,
  setShowSuggestions,
  filteredLocalities,
  handleLocalityClick,
  onSearch,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  filteredLocalities: typeof trendingLocalities;
  handleLocalityClick: (locality: string) => void;
  onSearch?: (query: string) => void;
}) {
  return (
    <>
      {/* Desktop Layout - Horizontal */}
      <div className="hidden md:block relative w-full">
        <div className="flex items-center gap-2 bg-white rounded-full shadow-lg border border-gray-200 p-2 pr-3 flex-nowrap">
          <Search className="w-5 h-5 text-gray-400 ml-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by city, area, or landmark..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="flex-1 h-10 px-2 outline-none text-sm min-w-0 focus:outline-orange-500 focus:ring-2 focus:ring-orange-500/20 rounded-full"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-1 hover:bg-gray-100 rounded-full flex-shrink-0"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
          <div className="flex items-center gap-1 border-l pl-2 flex-shrink-0">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600 flex-shrink-0">
              <Crosshair className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600 flex-shrink-0">
              <Mic className="w-4 h-4" />
            </Button>
          </div>
          <Button className="h-10 px-6 bg-orange-500 hover:bg-orange-600 rounded-full font-medium flex-shrink-0 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
            Search
          </Button>
        </div>
      </div>

      {/* Mobile Layout - Vertical Stack */}
      <div className="md:hidden flex flex-col gap-3 w-full px-4">
        <div className="flex items-center gap-2 bg-white rounded-2xl shadow-lg border border-gray-200 p-3">
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by city, area..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onSearch?.(searchQuery);
              }
            }}
            className="flex-1 h-10 px-2 outline-none text-base min-w-0 focus:outline-orange-500 focus:ring-2 focus:ring-orange-500/20"
            style={{ fontSize: '16px' }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-2 hover:bg-gray-100 rounded-full flex-shrink-0"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* Predictive Suggestions Dropdown - Desktop */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="hidden md:block absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50"
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

      {/* Predictive Suggestions Dropdown - Mobile */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.15)] border-t border-gray-200 z-50 mx-4 mb-4"
          >
            <div className="p-4">
              <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3" />
              <p className="text-xs text-gray-500 font-medium mb-2">
                📍 Trending Localities
              </p>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {filteredLocalities.map((locality) => (
                  <button
                    key={locality.name}
                    onClick={() => handleLocalityClick(locality.name)}
                    className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors text-left"
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
    </>
  );
}

// Filters Component
function Filters({
  activeFilters,
  toggleFilter,
}: {
  activeFilters: string[];
  toggleFilter: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-white font-medium drop-shadow-md">Quick filters:</span>
      {quickFilters.map((filter) => (
        <Badge
          key={filter.id}
          variant={activeFilters.includes(filter.id) ? "default" : "outline"}
          className={`cursor-pointer transition-all ${
            activeFilters.includes(filter.id)
              ? "bg-orange-500 hover:bg-orange-600 text-white"
              : "bg-white/90 text-gray-800 hover:bg-white border-white/50"
          }`}
          onClick={() => toggleFilter(filter.id)}
        >
          <span className="mr-1">{filter.icon}</span>
          {filter.label}
        </Badge>
      ))}
    </div>
  );
}

// Popular Localities Component
function PopularLocalities({
  handleLocalityClick,
}: {
  handleLocalityClick: (locality: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
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
  );
}

// Main Search Container
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
    <div className="w-full max-w-3xl mx-auto">
      {/* Property Type Tabs - Desktop only */}
      <div className="hidden md:block mb-4">
        <Tabs defaultValue="buy">
          <div className="flex justify-center">
            <TabsList className="bg-white/95 backdrop-blur-sm rounded-full p-1.5 shadow-lg border border-white/50 flex flex-wrap justify-center gap-1">
              <TabsTrigger
                value="buy"
                className="rounded-full px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100 whitespace-nowrap"
              >
                🏠 Buy
              </TabsTrigger>
              <TabsTrigger
                value="rent"
                className="rounded-full px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100 whitespace-nowrap"
              >
                🏢 Rent
              </TabsTrigger>
              <TabsTrigger
                value="new-launch"
                className="rounded-full px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100 whitespace-nowrap"
              >
                ✨ New Launch
              </TabsTrigger>
              <TabsTrigger
                value="commercial"
                className="rounded-full px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100 whitespace-nowrap"
              >
                🏬 Commercial
              </TabsTrigger>
              <TabsTrigger
                value="plots"
                className="rounded-full px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100 whitespace-nowrap"
              >
                🌳 Plots
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>

      {/* Search Input - Always visible */}
      <div className="w-full">
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
          filteredLocalities={filteredLocalities}
          handleLocalityClick={handleLocalityClick}
          onSearch={onSearch}
        />
      </div>

      {/* Filters and Popular - Hidden on mobile */}
      <div className="hidden md:flex flex-col gap-3 mt-4 w-full">
        <Filters activeFilters={activeFilters} toggleFilter={toggleFilter} />
        <PopularLocalities handleLocalityClick={handleLocalityClick} />
      </div>
    </div>
  );
}

// Mobile Search - Compact version for mobile
export function MobileSearchContainer({ onSearch }: SearchContainerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
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

  const handleLocalityClick = (locality: string) => {
    setSearchQuery(locality);
    setShowSuggestions(false);
    onSearch?.(locality);
  };

  return (
    <div className="w-full px-4">
      {/* Compact Search Input */}
      <div className="flex items-center gap-2 bg-white rounded-full shadow-lg border border-gray-200 p-2">
        <Search className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search by city, area..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="flex-1 h-9 px-2 outline-none text-sm focus:outline-orange-500 focus:ring-2 focus:ring-orange-500/20 rounded-full"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-3.5 h-3.5 text-gray-400" />
          </button>
        )}
        <Button className="h-9 px-4 bg-orange-500 hover:bg-orange-600 rounded-full font-medium text-sm transition-all duration-200">
          Search
        </Button>
      </div>

      {/* Suggestions */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50 mx-4"
          >
            <div className="p-3">
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
  );
}
