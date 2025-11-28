import Image from 'next/image';
import Link from 'next/link';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import { destinations } from '@/lib/data';
import { FlightSearchWidget } from '@/components/flight-search-widget';
import { Card, CardContent } from '@/components/ui/card';

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

export default function Home() {
  return (
    <>
      <section className="relative w-full h-[60vh] md:h-[70vh] text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="relative container h-full flex flex-col items-center justify-center text-center">
            <div className="w-full max-w-4xl">
              <h1 className="font-headline text-4xl md:text-6xl font-bold drop-shadow-lg">
                Your Journey Begins Here
              </h1>
              <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
                Book flights, discover amazing tours, and get visa assistance with Sharafiya Travel Hub.
              </p>
              <div className="mt-8">
                <FlightSearchWidget />
              </div>
            </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container text-center">
          <h2 className="font-headline text-3xl md:text-4xl">Welcome to Sharafiya Tourism</h2>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
            From the serene backwaters of Kerala, "God's Own Country," to the bustling metropolises across the globe, Sharafiya Tourism is your trusted partner in travel. We specialize in crafting unforgettable journeys, whether you're seeking domestic tranquility or international adventure.
          </p>
        </div>
      </section>

      <section className="bg-secondary/50 py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl">Popular Destinations</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Explore trending destinations, from local getaways to international hotspots.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest) => (
              <Link href={`/flights/search?to=${dest.name.substring(0,3).toUpperCase()}`} key={dest.name}>
                <Card className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48">
                    <Image
                      src={dest.image.imageUrl}
                      alt={dest.image.description}
                      data-ai-hint={dest.image.imageHint}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-headline text-xl">{dest.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
