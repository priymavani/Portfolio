import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-medium",
  display: "swap",
});

const siteUrl = "https://www.priymavani.in";

export const metadata = {
  // ── Core Meta ──
  title: {
    default: "Priy Mavani | Full Stack Engineer — React, Node.js, Next.js",
    template: "%s | Priy Mavani",
  },
  description:
    "Full Stack Engineer specializing in scalable React architectures, secure Node.js environments, and pixel-perfect design systems. Open to work.",
  keywords: [
    "Priy Mavani",
    "Full Stack Developer",
    "Full Stack Engineer",
    "React Developer",
    "Node.js Developer",
    "Next.js Developer",
    "MERN Stack Developer",
    "Web Developer Portfolio",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript Developer",
    "Portfolio",
    "Software Engineer India",
  ],
  authors: [{ name: "Priy Mavani", url: siteUrl }],
  creator: "Priy Mavani",
  publisher: "Priy Mavani",

  // ── Canonical & Alternates ──
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },

  // ── Open Graph (Facebook, LinkedIn, Discord) ──
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Priy Mavani — Portfolio",
    title: "Priy Mavani | Full Stack Engineer — React, Node.js, Next.js",
    description:
      "Building digital architecture. Full Stack Engineer focused on high-performance React apps, secure Node.js backends, and pixel-perfect design systems.",
    images: [
      {
        url: "/profile-cutout.png",
        width: 1200,
        height: 630,
        alt: "Priy Mavani — Full Stack Engineer",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X Card ──
  twitter: {
    card: "summary_large_image",
    title: "Priy Mavani | Full Stack Engineer",
    description:
      "Building digital architecture. Specializing in React, Node.js, Next.js, and MongoDB.",
    images: ["/profile-cutout.png"],
    creator: "@priymavani",
  },

  // ── Favicons & Icons ──
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },

  // ── PWA Manifest ──
  manifest: "/manifest.json",

  // ── Robots ──
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Verification ──
  verification: {
    google: "f8248598f7259801",
  },

  // ── Other ──
  category: "technology",
};

// ── JSON-LD Structured Data ──
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Priy Mavani",
  url: siteUrl,
  image: `${siteUrl}/profile-cutout.png`,
  jobTitle: "Full Stack Engineer",
  description:
    "Full Stack Engineer specializing in scalable React architectures, secure Node.js environments, and pixel-perfect design systems.",
  knowsAbout: [
    "React", "Next.js", "Node.js", "MongoDB", "JavaScript", "TypeScript",
    "Express.js", "Tailwind CSS", "Full Stack Development", "Web Development",
  ],
  sameAs: [
    "https://github.com/priymavani",
    "https://linkedin.com/in/priymavani",
  ],
};

export const viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Tag Manager - Script */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PH2BV6B4');
          `}
        </Script>
        
        {/* JSON-LD Structured Data for Google Rich Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Service Worker Registration */}
        <Script id="sw-register" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(
                  function(registration) { console.log('SW registered:', registration.scope); },
                  function(err) { console.log('SW registration failed:', err); }
                );
              });
            }
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-[#050505] text-white antialiased selection:bg-[#3B82F6] selection:text-white`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-PH2BV6B4"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        {children}
      </body>
    </html>
  );
}