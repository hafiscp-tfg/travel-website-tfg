import { notFound } from 'next/navigation';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

import { tourPackages } from '@/lib/data';
import { QuoteRequestForm } from '@/components/forms/quote-request-form';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function TourDetailPage({ params }: { params: { slug: string } }) {
  const tour = tourPackages.find(p => p.slug === params.slug);

  if (!tour) {
    notFound();
  }

  return (
    <div className="bg-secondary/30">
        <div className="container py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                <div className="lg:col-span-2">
                    <Card className="overflow-hidden mb-8">
                        <div className="relative w-full h-64 md:h-96">
                        <Image
                            src={tour.image.imageUrl}
                            alt={tour.image.description}
                            data-ai-hint={tour.image.imageHint}
                            fill
                            className="object-cover"
                            priority
                        />
                        </div>
                    </Card>

                    <Badge variant="default" className="bg-accent text-accent-foreground mb-4">{tour.category}</Badge>
                    <h1 className="font-headline text-4xl md:text-5xl">{tour.title}</h1>
                    <p className="text-lg text-muted-foreground mt-2">{tour.duration}</p>
                    
                    <div className="prose prose-lg max-w-none mt-8 text-foreground/80">
                        <p>{tour.description}</p>
                    </div>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-headline text-2xl mb-4">Inclusions</h3>
                            <ul className="space-y-3">
                                {tour.inclusions.map(item => (
                                    <li key={item} className="flex items-center gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-headline text-2xl mb-4">Exclusions</h3>
                            <ul className="space-y-3 text-muted-foreground">
                                {tour.exclusions.map(item => (
                                    <li key={item} className="flex items-center gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-red-500/70 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        <QuoteRequestForm tourName={tour.title} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
