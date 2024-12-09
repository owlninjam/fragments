import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { cn } from "@/utils";
import IslamicLayout from "@/components/islamic/IslamicLayout";

export const metadata: Metadata = {
  title: "Fragments - Islamic Voice Interface",
  description: "An Islamic-themed voice interface application combining modern technology with Islamic values",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;500;600;700&family=Noto+Kufi+Arabic:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          "font-sans antialiased"
        )}
      >
        <IslamicLayout>{children}</IslamicLayout>
      </body>
    </html>
  );
}
