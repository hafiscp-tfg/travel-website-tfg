import Link from "next/link";
import { Logo, LogoIcon } from "@/components/icons";

const footerLinks = {
    "Quick Links": [
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact Us" },
        { href: "#", label: "Terms & Conditions" },
    ],
    Services: [
        { href: "/", label: "Flights" },
        { href: "/services/tours", label: "Tours" },
        { href: "/services/visa", label: "Visa Assistance" },
    ],
}

export function Footer() {
  return (
    <footer className="w-full bg-secondary/30 dark:bg-background border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
                <LogoIcon className="size-6 text-primary" />
                <h4 className="font-bold text-foreground">Sharafiya Tourism</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted partner in creating unforgettable travel memories.
            </p>
          </div>
          
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold mb-4 text-foreground">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            {link.label}
                        </Link>
                    </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
              <h4 className="font-bold mb-4 text-foreground">Follow Us</h4>
              <div className="flex space-x-4">
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="m20.665 3.717-17.73 6.837c-1.21.48-1.201 1.16.24 1.54l4.73 1.28 11.55-7.18c.55-.34.98-.14.54.18l-9.3 8.34-0.42 4.92c.53 0 .73-.24 1.01-0.51l2.21-2.15 4.76 3.54c.91.56 1.56.28 1.8-0.87l3.15-14.94c.41-1.92-.5-2.58-1.54-2.1z"/></svg>
                  </a>
              </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Sharafiya Tourism. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
