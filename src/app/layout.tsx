"use client"

import type { Metadata } from "next";
import "./globals.css";
import 'primereact/resources/themes/saga-blue/theme.css'; // Or any other PrimeReact theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { ClerkProvider } from '@clerk/nextjs';
import {NextUIProvider} from "@nextui-org/react";

import { useEffect, useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Render nothing on the server, render children only after client-side mounting
  if (!isMounted) {
    return null;
  }

  return (
    <ClerkProvider>
      <html lang="en">
        <NextUIProvider>
          <main className="dark text-foreground bg-background">
          <body>{children}</body>
          </main>
        </NextUIProvider>
      </html>
    </ClerkProvider>
  );
}
