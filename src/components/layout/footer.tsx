import Link from "next/link";
import { Mail, Phone } from "lucide-react";

import { Logo, WhatsAppIcon } from "@/components/icons";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Logo />
            <p className="text-muted-foreground mt-4 text-sm">
              Your gateway to the world from God's Own Country.
            </p>
          </div>
          <div className="md:col-span-1">
            <h4 className="font-headline font-semibold">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/services/tours" className="text-muted-foreground hover:text-primary">Tour Packages</Link></li>
              <li><Link href="/services/visa" className="text-muted-foreground hover:text-primary">Visa Assistance</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-headline font-semibold">Contact Us</h4>
            <div className="mt-4 space-y-3 text-sm">
              <p className="text-muted-foreground">Sharafiya Tourism & Travel Consultant<br/>Calicut, Kerala, India</p>
              <a href="tel:+911234567890" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                <Phone className="h-4 w-4" />
                <span>+91 123 456 7890</span>
              </a>
              <a href="mailto:contact@sharafiya.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                <Mail className="h-4 w-4" />
                <span>contact@sharafiya.com</span>
              </a>
              <a href="https://wa.me/911234567890" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                <WhatsAppIcon className="h-4 w-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Sharafiya Travel Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
