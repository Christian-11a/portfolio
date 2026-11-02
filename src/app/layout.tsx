import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import { links, profile } from "@/content/site";
import { siteUrl } from "@/lib/siteUrl";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const title = `${profile.name} | ${profile.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title,
  description: profile.pitch,
  authors: [{ name: profile.fullName }],
  alternates: { canonical: "/" },
  openGraph: { title, description: profile.pitch, type: "profile", url: "/" },
  twitter: { card: "summary_large_image", title, description: profile.pitch },
};

// Structured data so search engines understand who this site is about.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  alternateName: profile.name,
  jobTitle: profile.role,
  url: siteUrl(),
  image: `${siteUrl()}${profile.photo}`,
  sameAs: links.filter((l) => l.href?.startsWith("http")).map((l) => l.href),
  alumniOf: { "@type": "CollegeOrUniversity", name: "De La Salle Lipa" },
};

// Applies the saved theme and motion choice before paint, so nothing flashes.
const prefsScript = `try{var d=document.documentElement;d.dataset.theme=localStorage.getItem("theme")==="light"?"light":"dark";d.dataset.motion=localStorage.getItem("motion")==="reduced"?"reduced":"full"}catch(e){document.documentElement.dataset.theme="dark"}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-motion="full"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: prefsScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body className="min-h-dvh font-sans text-[15px] leading-relaxed">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-fg px-4 py-2 text-sm text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
