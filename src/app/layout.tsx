"use client";

import React from 'react';
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from "@/styles/theme";
import { useTheme as useNextTheme } from 'next-themes';
import { ApolloWrapper } from "@/lib/apollo-wrapper";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import { Toaster } from "sonner";
import "./globals.css";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useNextTheme();
  const currentTheme = resolvedTheme === 'dark' ? darkTheme : lightTheme;

  return (
    <MUIThemeProvider theme={currentTheme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <ApolloWrapper>
            <NextUIProvider>
              <ThemeWrapper>
                <main className="text-foreground bg-background">
                  <AuthenticatedLayout>
                    {children}
                  </AuthenticatedLayout>
                  <Toaster richColors position="top-right" />
                </main>
              </ThemeWrapper>
            </NextUIProvider>
          </ApolloWrapper>
        </NextThemesProvider>
      </body>
    </html>
  );
}

