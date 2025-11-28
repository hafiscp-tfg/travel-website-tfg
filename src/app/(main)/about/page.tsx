
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Flag,
  Globe,
  MonitorSmartphone,
  PartyPopper,
  Heart,
  UserCheck,
  Compass,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const aboutHeroImage = PlaceHolderImages.find((p) => p.id === 'about-hero');
const teamMember1 = PlaceHolderImages.find((p) => p.id === 'team-john-doe');
const teamMember2 = PlaceHolderImages.find((p) => p.id === 'team-jane-smith');
const teamMember3 = PlaceHolderImages.find((p) => p.id === 'team-alex-johnson');

const timelineItems = [
  {
    year: '2010',
    icon: Flag,
    title: 'Founded Sharafiya Tourism',
    description:
      "With a passion for travel and a vision to share the world's wonders, our journey began.",
    align: 'left',
  },
  {
    year: '2014',
    icon: Globe,
    title: 'Opened First International Office',
    description:
      'Expanding our horizons to bring global adventures closer to you.',
    align: 'right',
  },
  {
    year: '2018',
    icon: MonitorSmartphone,
    title: 'Launched Online Booking Platform',
    description:
      'Making travel planning seamless and accessible from anywhere, anytime.',
    align: 'left',
  },
  {
    year: '2023',
    icon: PartyPopper,
    title: 'Celebrated 100,000 Happy Travelers',
    description:
      'A milestone marking countless memories created and adventures shared.',
    align: 'right',
  },
];

const valuesItems = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Your needs and satisfaction are at the core of everything we do.',
    },
    {
      icon: UserCheck,
      title: 'Reliability',
      description: 'Count on us for safe, seamless, and dependable travel arrangements.',
    },
    {
      icon: Compass,
      title: 'Expert Guidance',
      description: 'Our team of seasoned experts is here to craft your perfect journey.',
    },
];

const teamMembers = [
    {
        name: 'John Doe',
        title: 'Founder & CEO',
        bio: 'John founded Sharafiya with a vision to create unique travel experiences that last a lifetime.',
        image: teamMember1
    },
    {
        name: 'Jane Smith',
        title: 'Head of Tours',
        bio: 'Jane is a globetrotter who curates our exclusive tour packages with an eye for detail and adventure.',
        image: teamMember2
    },
    {
        name: 'Alex Johnson',
        title: 'Visa & Flight Specialist',
        bio: 'Alex ensures your travel logistics are seamless, handling all visa and flight complexities with expertise.',
        image: teamMember3
    },
]


export default function AboutPage() {
  return (
    <div className="bg-background">
        <section className="relative w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {aboutHeroImage && (
                    <div 
                        className="flex min-h-[400px] md:min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4 text-center" 
                        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url('${aboutHeroImage.imageUrl}')` }}
                    >
                        <div className="flex flex-col gap-2">
                            <h1 className="text-white text-4xl font-black leading-tight tracking-tight md:text-5xl">
                                About Sharafiya Tourism
                            </h1>
                            <h2 className="text-white text-base md:text-lg font-normal leading-normal">
                                Your Gateway to Unforgettable Journeys.
                            </h2>
                        </div>
                    </div>
                )}
            </div>
        </section>

        <section className="py-16">
            <h2 className="text-slate-900 text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-8 pt-5 text-center">Our Story</h2>
            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-[auto_1fr] md:grid-cols-[1fr_auto_1fr] items-center gap-x-6 gap-y-8 px-4">
                    {timelineItems.map((item, index) => {
                        const Icon = item.icon;
                        const isLeft = item.align === 'left';
                        const content = (
                            <div className={cn(isLeft ? 'md:text-left' : 'md:text-right')}>
                                <p className="text-slate-900 text-base font-medium leading-normal">{item.title}</p>
                                <p className="text-slate-500 text-base font-normal leading-normal">{item.description}</p>
                            </div>
                        );

                        return (
                            <React.Fragment key={index}>
                                {isLeft ? <div className='hidden md:block'></div> : <div className="hidden md:flex flex-col items-end text-right">{content}</div>}
                                
                                <div className="flex flex-col items-center gap-1 self-stretch">
                                    <div className="text-primary text-lg font-bold">{item.year}</div>
                                    <div className="flex justify-center items-center size-8 rounded-full bg-primary text-white">
                                        <Icon className="size-4" />
                                    </div>
                                    {index < timelineItems.length -1 && <div className="w-[2px] bg-slate-200 grow"></div>}
                                </div>
                                
                                {isLeft ? <div className='md:text-left'>{content}</div> : <div className='hidden md:block'></div>}
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
        </section>

        <section className="max-w-4xl mx-auto w-full px-4 py-16">
             <div className="flex flex-col gap-10 p-4 sm:p-10 bg-white rounded-xl">
                <div className="flex flex-col gap-4 text-center items-center">
                    <h1 className="text-slate-900 tracking-tight text-3xl font-bold leading-tight md:text-4xl md:font-black md:leading-tight max-w-2xl">
                        Our Mission & Values
                    </h1>
                    <p className="text-slate-600 text-base font-normal leading-normal max-w-2xl">
                        We are dedicated to providing exceptional travel experiences with a focus on reliability, expert guidance, and putting our customers first. Our vision is to be the most trusted and innovative travel partner in the world.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {valuesItems.map(item => {
                        const Icon = item.icon;
                        return (
                             <div key={item.title} className="flex flex-1 gap-4 rounded-lg border border-slate-200 bg-background p-4 flex-col text-center items-center">
                                <div className="text-primary">
                                    <Icon className="size-7" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-slate-900 text-base font-bold leading-tight">{item.title}</h2>
                                    <p className="text-slate-500 text-sm font-normal leading-normal">{item.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>

        <section className="py-16 max-w-4xl mx-auto w-full px-4">
            <div className="flex flex-col gap-4 text-center items-center mb-10">
                <h2 className="text-slate-900 text-2xl font-bold leading-tight tracking-[-0.015em]">Meet the Team</h2>
                <p className="text-slate-600 text-base font-normal leading-normal max-w-2xl">The passionate experts behind your unforgettable journeys. We are dedicated to making your travel dreams a reality.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {teamMembers.map(member => (
                    <div key={member.name} className="flex flex-col items-center text-center">
                        {member.image && <Image alt={`Headshot of ${member.name}`} className="w-32 h-32 rounded-full object-cover mb-4" src={member.image.imageUrl} width={128} height={128} />}
                        <h3 className="text-slate-900 text-lg font-bold">{member.name}</h3>
                        <p className="text-primary text-sm font-medium">{member.title}</p>
                        <p className="text-slate-500 text-sm mt-2">{member.bio}</p>
                    </div>
                ))}
            </div>
        </section>

        <section className="my-16 max-w-4xl mx-auto w-full px-4">
            <div className="bg-primary/10 rounded-xl p-10 flex flex-col items-center text-center">
                <h2 className="text-slate-900 text-2xl font-bold leading-tight tracking-[-0.015em] mb-3">Ready to Start Your Adventure?</h2>
                <p className="text-slate-600 max-w-lg mb-6">Let us help you plan the trip of a lifetime. Explore our curated tours or get in touch with our experts for a custom itinerary.</p>
                <div className="flex-wrap gap-3 flex justify-center">
                    <Link href="/services/tours">
                        <Button size="lg">Explore Tours</Button>
                    </Link>
                    <Link href="/contact">
                        <Button size="lg" variant="outline" className="bg-white hover:bg-slate-50">Contact Us</Button>
                    </Link>
                </div>
            </div>
        </section>
    </div>
  );
}
