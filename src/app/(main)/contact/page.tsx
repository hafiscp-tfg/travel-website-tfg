
'use client';

import Image from 'next/image';
import { Mail, MapPin, Phone, MessageSquare } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WhatsAppIcon } from "@/components/icons";
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const mapImage = PlaceHolderImages.find(p => p.id === 'contact-map');

const contactItems = [
    {
        icon: MapPin,
        title: "Our Office",
        lines: ["Ground Floor, Skytower Business Center, Bank Rd, Mavoor Rd Junction, Calicut, Kerala 673001"]
    },
    {
        icon: Phone,
        title: "Phone",
        lines: [{ text: "+91 123 456 7890", href: "tel:+911234567890" }]
    },
    {
        icon: MessageSquare,
        title: "WhatsApp",
        lines: ["Connect with us for instant support."],
        button: {
            href: "https://wa.me/911234567890",
            text: "Chat on WhatsApp",
            icon: WhatsAppIcon
        }
    }
];


export default function ContactPage() {
  return (
    <div className="bg-background">
        <div className="container mx-auto max-w-6xl px-4 py-12 sm:py-16 md:py-20">
            <div className="mb-12 text-center md:mb-16">
                <h1 className="text-slate-900 text-4xl font-black leading-tight tracking-tight sm:text-5xl">Contact Us</h1>
                <p className="text-slate-600 text-lg font-normal leading-normal mt-4 max-w-2xl mx-auto">We're here to help. Reach out to us for any inquiries about flights, tours, or visa services.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
                <div className="flex flex-col gap-8">
                    {contactItems.map(item => {
                        const Icon = item.icon;
                        return (
                            <div key={item.title} className="flex items-start gap-4">
                                <div className="text-primary flex items-center justify-center rounded-lg bg-primary/20 shrink-0 size-12">
                                    <Icon className="size-6" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className="text-slate-900 text-lg font-medium leading-normal">{item.title}</p>
                                    {item.lines.map((line, index) => {
                                        if (typeof line === 'string') {
                                            return <p key={index} className="text-slate-600 text-base font-normal leading-relaxed mt-1">{line}</p>;
                                        }
                                        return <a key={index} href={line.href} className="text-slate-600 text-base font-normal leading-relaxed mt-1 hover:text-primary transition-colors">{line.text}</a>
                                    })}
                                    {item.button && (
                                        <Link href={item.button.href}>
                                            <Button className="mt-4 w-fit">
                                                <item.button.icon className="mr-2" />
                                                {item.button.text}
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                <div className="relative overflow-hidden rounded-xl h-96 md:h-full">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.116933560249!2d75.78018287481267!3d11.2529949889417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba6593623975a23%3A0x77c2957e8417c49b!2sMavoor%20Road%20Junction!5e0!3m2!1sen!2sin!4v1709123456789!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Office Location Map"
                        data-location="Calicut"
                    ></iframe>
                </div>
            </div>
        </div>
    </div>
  );
}
