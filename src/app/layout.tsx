import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Notifications} from '@mantine/notifications';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {""}
        <MantineProvider>
        <Notifications />
        {children}
        <ModalsProvider>{/* Your app here */}</ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
