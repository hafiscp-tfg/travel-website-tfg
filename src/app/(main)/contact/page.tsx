import Image from 'next/image';
import { Mail, MapPin, Phone } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WhatsAppIcon } from "@/components/icons";
import { PlaceHolderImages } from '@/lib/placeholder-images';

const mapImage = PlaceHolderImages.find(p => p.id === 'contact-map');

const contactDetails = [
  { icon: MapPin, text: "Sharafiya Tourism, Calicut, Kerala, India" },
  { icon: Phone, text: "+91 123 456 7890", href: "tel:+911234567890" },
  { icon: Mail, text: "contact@sharafiya.com", href: "mailto:contact@sharafiya.com" },
  { icon: WhatsAppIcon, text: "Chat with us on WhatsApp", href: "https://wa.me/911234567890", target: "_blank" },
];

export default function ContactPage() {
  return (
    <div className="bg-secondary/30">
        <div className="container py-16 md:py-24">
            <div className="text-center">
                <h1 className="font-headline text-4xl md:text-5xl">Get in Touch</h1>
                <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                    Have questions or need assistance? Our team is here to help. Reach out to us through any of the channels below.
                </p>
            </div>
            
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {contactDetails.map((item, index) => {
                            const Icon = item.icon;
                            const isLink = !!item.href;
                            const content = (
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-primary/10 rounded-full">
                                        <Icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <span className="text-lg pt-1">{item.text}</span>
                                </div>
                            );

                            if (isLink) {
                                return <a key={index} href={item.href} target={item.target} rel="noopener noreferrer" className="block hover:bg-secondary/50 rounded-lg p-2 -m-2">{content}</a>
                            }
                            return <div key={index} className="p-2 -m-2">{content}</div>
                        })}
                    </CardContent>
                </Card>
                
                <div className="overflow-hidden rounded-lg shadow-lg">
                    {mapImage && (
                        <Image
                            src={mapImage.imageUrl}
                            alt={mapImage.description}
                            data-ai-hint={mapImage.imageHint}
                            width={800}
                            height={600}
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>
            </div>
        </div>
    </div>
  );
}
