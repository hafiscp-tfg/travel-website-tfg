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
      <section className="relative w-full h-[70vh] md:h-[80vh] text-white">
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
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container h-full flex flex-col items-center justify-center text-center">
            <div className="w-full max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
                Find and Book Your Next Adventure
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                Effortless flights, tours, and visa services at your fingertips.
              </p>
              <div className="mt-10">
                <FlightSearchWidget />
              </div>
            </div>
        </div>
      </section>


      <section className="py-20 md:py-28 bg-background">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Welcome to Sharafiya Tourism</h2>
          <p className="mt-4 max-w-3xl mx-auto text-base md:text-lg text-muted-foreground">
            Your trusted partner in crafting unforgettable travel experiences. From seamless flight bookings to curated tours and hassle-free visa assistance, we are dedicated to making your journey as remarkable as the destination.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceCards.map((service) => {
              const Icon = service.icon
              return (
                <div key={service.title} className="flex flex-col items-center p-8 bg-secondary/30 dark:bg-secondary rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-center size-16 rounded-full bg-primary/10 text-primary mb-5">
                        <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    <p className="mt-2 text-muted-foreground">{service.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-secondary/30 dark:bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Explore Our Popular Destinations</h2>
            <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground">
              Get inspired for your next journey with our most-loved travel spots.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.slice(0,3).map((dest) => (
              <Link href={`/flights/search?to=${dest.name.substring(0,3).toUpperCase()}`} key={dest.name}>
                <div className="group overflow-hidden rounded-xl shadow-lg relative cursor-pointer">
                    <Image
                      src={dest.image.imageUrl}
                      alt={dest.image.description}
                      data-ai-hint={dest.image.imageHint}
                      height={384}
                      width={500}
                      className="w-full h-96 object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                     <div className="absolute bottom-0 left-0 p-6 text-white">
                        <h3 className="text-2xl font-bold">{dest.name}</h3>
                        <p className="text-sm opacity-90">{dest.country}</p>
                        <p className="mt-2 text-sm font-medium text-orange-400">Tours from ${dest.price}</p>
                     </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
