
'use client';

import Image from 'next/image';
import {
  Users,
  Rocket,
  Headset,
} from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { VisaInquiryForm } from '@/components/forms/visa-inquiry-form';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

const visaHeroImage = PlaceHolderImages.find(
  (p) => p.id === 'visa-hero-background'
);

const visaTypes = [
  { name: 'Saudi Arabia', active: true },
  { name: 'UAE', active: false },
  { name: 'United Kingdom', active: false },
];

const whyChooseUsItems = [
  {
    icon: Users,
    title: 'Expert Guidance',
    description:
      'Our experienced team provides step-by-step assistance to ensure your application is perfect.',
  },
  {
    icon: Rocket,
    title: 'Fast Processing',
    description:
      'We prioritize your application to minimize waiting times and get your visa approved quickly.',
  },
  {
    icon: Headset,
    title: 'Dedicated Support',
    description:
      'Have questions? Our support team is available around the clock to assist you at every stage.',
  },
];

export default function VisaPage() {
  return (
    <>
      <section className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
            {visaHeroImage && (
                <div 
                    className="flex min-h-[400px] md:min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-start justify-end p-6 md:p-10" 
                    style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.5) 100%), url('${visaHeroImage.imageUrl}')` }}
                >
                    <div className="flex flex-col gap-4 text-left max-w-2xl">
                        <h1 className="text-white text-4xl font-black leading-tight tracking-tight md:text-5xl">
                            Simplified Visa Services for Your Global Travels
                        </h1>
                        <h2 className="text-slate-100 text-base font-normal leading-normal md:text-lg">
                            Let us make your visa application process seamless and hassle-free, so you can focus on your journey.
                        </h2>
                    </div>
                </div>
            )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="pb-3">
              <div className="flex border-b border-border gap-8">
                {visaTypes.map((visa) => (
                  <Link
                    key={visa.name}
                    href="#"
                    className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 transition-colors ${
                      visa.active
                        ? 'border-b-primary text-foreground'
                        : 'border-b-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <p className="text-sm font-bold">{visa.name}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col pt-4">
              <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Required Documents</AccordionTrigger>
                  <AccordionContent>
                    Passport copy with at least 6 months validity. Recent
                    passport-sized photograph with a white background. Completed
                    visa application form. Proof of accommodation and flight
                    bookings.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Processing Time &amp; Fees</AccordionTrigger>
                  <AccordionContent>
                    Standard processing takes 5-7 business days. Expedited
                    options are available for an additional fee. Please contact
                    us for a detailed quote based on your specific needs and
                    nationality.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Eligibility Criteria</AccordionTrigger>
                  <AccordionContent>
                    Applicants must have a valid reason for travel, sufficient
                    funds to cover their stay, and no history of visa
                    violations. Specific criteria may vary based on the
                    purpose of your visit (tourism, business, etc.).
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 h-fit">
            <VisaInquiryForm />
          </aside>
        </div>
      </div>

      <section className="bg-card py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why Choose Us?
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Your trusted partner in navigating the complexities of global
              travel.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {whyChooseUsItems.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 text-primary mb-4">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-base text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
