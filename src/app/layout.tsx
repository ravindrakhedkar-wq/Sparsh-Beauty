import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Sparsh Beauty Hair Salon & Academy | Best Beauty Salon in Viman Nagar Pune",
  description:
    "Experience premium hair, skin, makeup, and beauty services from certified professionals at Geetanjali's Sparsh Beauty Hair Salon & Academy in Viman Nagar, Pune. Book appointments, shop beauty products, enroll in academy courses.",
  keywords: [
    "Best Beauty Salon in Viman Nagar Pune",
    "Hair Salon in Pune",
    "Skin Care Clinic Pune",
    "Bridal Makeup Artist Pune",
    "Beauty Academy Pune",
    "Beautician Course Pune",
    "Hair Styling Course Pune",
    "Makeup Course Pune",
    "Sparsh Beauty",
    "Geetanjali Khedkar",
    "Hair Treatment Pune",
    "Facial Treatment Pune",
    "Beauty Products Pune",
  ],
  authors: [{ name: "Geetanjali's Sparsh Beauty Hair Salon & Academy" }],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✨</text></svg>",
  },
  openGraph: {
    title: "Sparsh Beauty Hair Salon & Academy | Where Beauty Meets Expertise",
    description:
      "Premium hair, skin, makeup, and beauty services from certified professionals. Viman Nagar, Pune.",
    type: "website",
    locale: "en_IN",
    siteName: "Sparsh Beauty",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BeautySalon",
              name: "Geetanjali's Sparsh Beauty Hair Salon & Academy",
              description:
                "Premium beauty salon offering hair care, skin care, makeup services, and beauty training in Viman Nagar, Pune.",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "Shop No. 5, Neco NX, Opposite Panchshil Tower",
                addressLocality: "Viman Nagar, Pune",
                addressRegion: "Maharashtra",
                addressCountry: "IN",
              },
              founder: {
                "@type": "Person",
                name: "Mrs. Geetanjali Khedkar",
              },
              telephone: "+91-7721933444",
              openingHours: "Mo-Sa 09:00-21:00",
              priceRange: "$$",
              image: "/images/salon-interior.jpg",
              sameAs: [
                "https://www.instagram.com/sparshbeautypune",
                "https://www.facebook.com/sparshbeautypune",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${playfair.variable} ${lato.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}