"use client";

import { useState } from 'react';
import { tourPackages } from '@/lib/data';
import { TourPackageCard } from '@/components/tour-package-card';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = ["All", "Kerala Packages", "International", "Honeymoon"];

export default function ToursPage() {
  const [filter, setFilter] = useState("All");

  const filteredTours = filter === "All"
    ? tourPackages
    : tourPackages.filter(tour => tour.category === filter);

  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl">Our Tour Packages</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Discover curated experiences in God's Own Country and beyond. Each journey is designed to be unforgettable.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <Tabs defaultValue="All" onValueChange={setFilter}>
          <TabsList>
            {categories.map(category => (
              <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTours.map(tour => (
          <TourPackageCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
}
