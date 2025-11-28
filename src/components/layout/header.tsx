"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo, LogoIcon } from "@/components/icons";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services/tours", label: "Tours" },
  { href: "/services/visa", label: "Visa Services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-background/80 dark:border-background/20 dark:bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 max-w-7xl items-center">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <LogoIcon className="size-7" />
          <h2 className="hidden sm:block text-lg font-bold leading-tight tracking-[-0.015em]">
            Sharafiya Tourism
          </h2>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden md:flex gap-9">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "text-sm font-medium leading-normal transition-colors hover:text-primary",
                  pathname === href ? "text-primary font-bold" : "text-slate-700 dark:text-slate-300"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <Button variant="secondary" className="font-bold">Login</Button>
            <Button className="font-bold">Sign Up</Button>
          </div>
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
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      pathname === href
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
