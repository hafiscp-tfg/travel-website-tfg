"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LogoIcon } from "@/components/icons";

const navLinks = [
  { href: "/services/tours", label: "Tours" },
  { href: "/services/visa", label: "Visa Services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-4 text-foreground">
          <LogoIcon className="size-6 text-primary" />
          <h2 className="hidden text-xl font-bold tracking-tight sm:block">
            Sharafiya Tourism
          </h2>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
            <Link
                href="/"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/" ? "text-primary" : "text-foreground"
                )}
            >
                Home
            </Link>
            {navLinks.map(({ href, label }) => (
            <Link
                key={href}
                href={href}
                className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname.startsWith(href) ? "text-primary" : "text-foreground"
                )}
            >
                {label}
            </Link>
            ))}
        </nav>
        <div className="flex items-center gap-3">
            <Button variant="outline" className="hidden md:flex">Login</Button>
            <Button className="hidden md:flex">Sign Up</Button>
            <Sheet>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Navigation</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="left">
                <Link href="/" className="mb-6 flex items-center gap-2">
                    <LogoIcon className="size-7" />
                    <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
                        Sharafiya Tourism
                    </h2>
                </Link>
                <div className="flex flex-col gap-4">
                    <Link
                        href="/"
                        className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        pathname === "/" ? "text-primary" : "text-foreground"
                        )}
                    >
                        Home
                    </Link>
                    {navLinks.map(({ href, label }) => (
                    <Link
                        key={href}
                        href={href}
                        className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        pathname.startsWith(href)
                            ? "text-primary"
                            : "text-foreground"
                        )}
                    >
                        {label}
                    </Link>
                    ))}
                </div>
                <div className="mt-6 flex flex-col gap-2">
                    <Button variant="secondary">Login</Button>
                    <Button>Sign Up</Button>
                </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
