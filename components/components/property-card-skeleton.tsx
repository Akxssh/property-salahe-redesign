"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function PropertyCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {/* Image Skeleton */}
        <div className="relative h-48 w-full bg-gray-100">
          <Skeleton className="absolute inset-0 h-full w-full" />
        </div>

        <div className="p-4 space-y-3">
          {/* Title */}
          <Skeleton className="h-5 w-3/4" />
          
          {/* Location */}
          <Skeleton className="h-4 w-1/2" />
          
          {/* Amenities */}
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
          </div>

          {/* Contact Buttons */}
          <div className="flex gap-2">
            <Skeleton className="h-9 flex-1" />
            <Skeleton className="h-9 flex-1" />
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-3 border-t">
            <div className="flex gap-2">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
