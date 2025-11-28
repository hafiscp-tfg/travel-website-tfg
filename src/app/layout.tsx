
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { Plus_Jakarta_Sans } from 'next/font/google';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'Sharafiya Tourism',
  description: "Your gateway to the world from God's Own Country.",
  icons: {
    icon: 'https://i.ibb.co/BVmTKW25/cropped-Whats-App-Image-2025-01-06-at-16-53-10-4633dede-removebg-preview-13-1.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className={cn(
        "min-h-screen bg-background font-display text-foreground antialiased",
        jakarta.variable
      )}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
