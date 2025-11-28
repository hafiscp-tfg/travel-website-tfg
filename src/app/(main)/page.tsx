import Image from 'next/image';
import Link from 'next/link';
import { Plane, Ship, FileText } from 'lucide-react';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import { destinations } from '@/lib/data';
import { FlightSearchWidget } from '@/components/flight-search-widget';
import { Card, CardContent } from '@/components/ui/card';

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');
const serviceCards = [
    { title: "Book Flights", description: "Find the best deals on flights to destinations worldwide with our easy-to-use search engine.", icon: Plane },
    { title: "Explore Tours", description: "Discover curated tour packages that offer unique experiences and unforgettable memories.", icon: Ship },
    { title: "Visa Assistance", description: "We provide expert guidance and support to make your visa application process smooth and simple.", icon: FileText },
]

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
        <div className="relative container h-full flex flex-col items-start justify-center">
            <div className="w-full max-w-2xl text-left">
              <h1 className="font-headline text-4xl md:text-6xl font-bold drop-shadow-lg">
                Find and Book Your Next Adventure
              </h1>
              <p className="mt-4 text-lg md:text-xl max-w-xl drop-shadow-md">
                Effortless flights, tours, and visa services at your fingertips.
              </p>
            </div>
        </div>
      </section>

      <div className="container -mt-32 relative z-10">
          <FlightSearchWidget />
      </div>

      <section className="py-16 md:py-24">
        <div className="container text-center">
          <h2 className="font-headline text-3xl md:text-4xl">Welcome to Sharafiya Tourism</h2>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
            Your trusted partner in crafting unforgettable travel experiences. From seamless flight bookings to curated tours and hassle-free visa assistance, we are dedicated to making your journey as remarkable as the destination.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceCards.map((service) => {
              const Icon = service.icon
              return (
                <Card key={service.title}>
                  <CardContent className="p-8 text-center">
                    <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-headline text-2xl">{service.title}</h3>
                    <p className="mt-2 text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-secondary/30 py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl">Explore Our Popular Destinations</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Get inspired for your next journey with our most-loved travel spots.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.slice(0,3).map((dest) => (
              <Link href={`/flights/search?to=${dest.name.substring(0,3).toUpperCase()}`} key={dest.name}>
                <Card className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-96">
                    <Image
                      src={dest.image.imageUrl}
                      alt={dest.image.description}
                      data-ai-hint={dest.image.imageHint}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                     <div className="absolute bottom-0 left-0 p-6 text-white">
                        <h3 className="font-headline text-3xl">{dest.name}</h3>
                        <p className="text-sm">{dest.country}</p>
                        <p className="text-lg font-semibold mt-2">Tours from ${dest.price}</p>
                     </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
