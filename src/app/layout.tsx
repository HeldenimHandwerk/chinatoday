import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "nextjs-google-analytics";

// Importing Roboto font
const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Applying Roboto font to the body */}
      <body className={roboto.className}>
        {/* <GoogleAnalytics /> */}
        {children}
        <Analytics />
        <GoogleAnalytics trackPageViews />
      </body>
    </html>
  );
}
