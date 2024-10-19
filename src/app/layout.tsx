import type { Metadata } from "next";

import "./globals.css";
import 'primereact/resources/themes/saga-blue/theme.css';  // Or any other PrimeReact theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        {children}
      </body>
    </html>
  );
}
