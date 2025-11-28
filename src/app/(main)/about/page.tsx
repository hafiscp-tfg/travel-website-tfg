import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us-image');

export default function AboutPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="font-headline text-4xl md:text-5xl">About Sharafiya Travel Hub</h1>
          <div className="prose prose-lg max-w-none mt-6 text-muted-foreground">
            <p>
              Founded in the vibrant city of Calicut, Kerala, Sharafiya Tourism & Travel Consultant began with a simple mission: to make travel accessible, enjoyable, and seamless for everyone. We are a team of passionate travel experts with deep roots in "God's Own Country" and a wide-reaching perspective on global travel.
            </p>
            <p>
              Our journey started with providing expert visa consultancy, helping countless individuals from Kerala connect with the world, especially the Gulf region. As our reputation for reliability and personalized service grew, so did our ambition.
            </p>
            <p>
              Today, Sharafiya Travel Hub is evolving into a full-fledged online travel platform. While we continue to offer our renowned visa assistance, we are excited to bring you a comprehensive suite of services, including real-time flight bookings and curated tour packages. Our goal is to be your one-stop shop for all your travel needs, blending local expertise with world-class technology.
            </p>
          </div>
        </div>
        <div>
          {aboutImage && (
            <Image
              src={aboutImage.imageUrl}
              alt={aboutImage.description}
              data-ai-hint={aboutImage.imageHint}
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          )}
        </div>
      </div>
    </div>
  );
}
