import Link from "next/link";
import { Logo, LogoIcon } from "@/components/icons";

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
    ],
}

export function Footer() {
  return (
    <footer className="w-full bg-card border-t">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
                <LogoIcon className="size-6 text-primary" />
                <h4 className="font-bold text-lg text-foreground">Sharafiya Tourism</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Crafting your perfect journey.
            </p>
          </div>
          
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4 text-foreground">{title}</h4>
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

        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Sharafiya Tourism. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
