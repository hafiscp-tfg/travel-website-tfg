import Link from "next/link";
import { Logo } from "@/components/icons";

const footerLinks = {
    Company: [
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact Us" },
        { href: "#", label: "Careers" },
    ],
    Services: [
        { href: "/", label: "Flights" },
        { href: "/services/tours", label: "Tours" },
        { href: "/services/visa", label: "Visa Assistance" },
    ],
    Legal: [
        { href: "#", label: "Terms of Service" },
        { href: "#", label: "Privacy Policy" },
    ]
}

export function Footer() {
  return (
    <footer className="bg-secondary/30 border-t">
      <div className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="text-muted-foreground mt-4 text-sm">
              Crafting your perfect journey.
            </p>
          </div>
          
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-headline font-semibold">{title}</h4>
              <ul className="mt-4 space-y-2 text-sm">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link href={link.href} className="text-muted-foreground hover:text-primary">
                            {link.label}
                        </Link>
                    </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Sharafiya Tourism. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
