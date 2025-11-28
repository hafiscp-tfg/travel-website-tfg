import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { tourPackages } from '@/lib/data';

type TourPackage = typeof tourPackages[0];

interface TourPackageCardProps {
  tour: TourPackage;
}

export function TourPackageCard({ tour }: TourPackageCardProps) {
  return (
    <Link href={`/services/tours/${tour.slug}`}>
      <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <div className="relative h-56 w-full">
          <Image
            src={tour.image.imageUrl}
            alt={tour.image.description}
            data-ai-hint={tour.image.imageHint}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <Badge variant="secondary" className="mb-2">{tour.category}</Badge>
            <h3 className="font-headline text-xl leading-tight">{tour.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{tour.duration}</p>
          </div>
          <div className="mt-4 text-right">
            <p className="text-sm text-muted-foreground">Starts from</p>
            <p className="text-2xl font-bold text-primary">₹{tour.price.toLocaleString('en-IN')}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
