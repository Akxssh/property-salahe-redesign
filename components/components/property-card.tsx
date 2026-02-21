"use client";

import Image from "next/image";
import { Heart, Share2, Phone, MessageCircle, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import type { Property } from "@/lib/property-data";

interface PropertyCardProps {
  property: Property;
  onShortlist?: (id: string) => void;
  isShortlisted?: boolean;
}

export function PropertyCard({ property, onShortlist, isShortlisted = false }: PropertyCardProps) {
  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in ${property.title} at ${property.location}. Price: ${property.price}`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
        <CardContent className="p-0">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={property.image}
              alt={property.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Verified Badge */}
            {property.verified && (
              <Badge className="absolute top-2 left-2 bg-green-500/90 backdrop-blur-sm text-white gap-1">
                <CheckCircle className="w-3 h-3" />
                Verified
              </Badge>
            )}
            
            {/* Featured Badge */}
            {property.featured && (
              <Badge className="absolute top-2 left-2 bg-orange-500/90 backdrop-blur-sm text-white">
                ⭐ Featured
              </Badge>
            )}

            {/* Action Buttons */}
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 rounded-full backdrop-blur-md ${
                  isShortlisted 
                    ? "bg-red-500/80 text-white hover:bg-red-600/80" 
                    : "bg-black/40 text-white hover:bg-black/60"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onShortlist?.(property.id);
                }}
              >
                <Heart className={`w-4 h-4 ${isShortlisted ? "fill-current" : ""}`} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Price Badge with blur */}
            <Badge className="absolute bottom-2 left-2 bg-black/60 text-white hover:bg-black/60 backdrop-blur-md font-semibold text-sm">
              {property.price}
            </Badge>

            {/* Ready to Move Badge */}
            {property.readyToMove && (
              <Badge className="absolute bottom-2 right-2 bg-blue-500/90 backdrop-blur-sm text-white text-xs">
                Ready to Move
              </Badge>
            )}
          </div>

          <div className="p-4">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-gray-900 truncate flex-1">
                {property.title}
              </h3>
              {property.verified && (
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              )}
            </div>
            
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
              <span className="truncate">{property.location}</span>
            </p>

            {/* Amenities */}
            <div className="flex flex-wrap gap-1 mt-3">
              {property.amenities.slice(0, 3).map((amenity, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="text-xs text-gray-500 bg-gray-50"
                >
                  {amenity}
                </Badge>
              ))}
              {property.amenities.length > 3 && (
                <Badge variant="outline" className="text-xs text-gray-500 bg-gray-50">
                  +{property.amenities.length - 3}
                </Badge>
              )}
            </div>

            {/* Contact Actions */}
            <div className="flex gap-2 mt-4">
              <Button 
                className="flex-1 bg-green-500 hover:bg-green-600 h-9 text-sm"
                onClick={handleWhatsApp}
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                WhatsApp
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 h-9 text-sm"
              >
                <Phone className="w-4 h-4 mr-1" />
                Call
              </Button>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {property.postedBy}
                </Badge>
                <span className="text-xs text-gray-400">{property.time}</span>
              </div>
              <span className="text-xs text-gray-500">{property.area}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
