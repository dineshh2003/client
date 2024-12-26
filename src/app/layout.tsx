"use client";

import "./globals.css";
import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { NextUIProvider } from "@nextui-org/react";
import { ApolloWrapper } from "@/lib/apollo-wrapper";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ApolloWrapper>
            <NextUIProvider>
              <main className="text-foreground bg-background">
                <AuthenticatedLayout>
                  {children}
                </AuthenticatedLayout>
                <Toaster richColors position="top-right" />
              </main>
            </NextUIProvider>
          </ApolloWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
