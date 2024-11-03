"use client";

import type { Metadata } from "next";
import "./globals.css";
import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { NextUIProvider } from "@nextui-org/react";

import { SessionProvider } from 'next-auth/react';



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NextUIProvider>
          <main className="dark text-foreground bg-background">
            <SessionProvider>
            {children}
            </SessionProvider>
          </main>
        </NextUIProvider>
      </body>
    </html>
  );
}
