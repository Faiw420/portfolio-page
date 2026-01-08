import "@/globals.css"
import Script from "next/script"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

import { TailwindIndicator } from "@/components/tailwind-indicator"
import { SideMenu } from "@/components/side-menu"
import { MenuContent } from "@/components/menu-content"
import { PROFILES } from "@/lib/constants"
import { sharedMetadata } from "@/app/shared-metadata"

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            try {
              const stored = localStorage.getItem('theme');
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const isDark = stored === 'dark' || (!stored && prefersDark);
              if (isDark) document.documentElement.classList.add('dark');
            } catch (_) {}
          `}
        </Script>
        <main className="min-h-screen bg-white dark:bg-gray-950">
          <div className="lg:flex">
            <SideMenu className="relative hidden lg:flex">
              <MenuContent />
            </SideMenu>
            <div className="flex flex-1">{children}</div>
          </div>
        </main>
        <TailwindIndicator />
        <SpeedInsights />
        <Analytics />
        <Script
          src="https://umami.darmstaedtert.im/script.js"
          data-website-id="89ef0e9b-c913-426f-a9c1-ecaa43773d6a"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}

const baseTitle = sharedMetadata.title
const baseDescription = sharedMetadata.description

export const metadata = {
  metadataBase: new URL(sharedMetadata.siteUrl),
  title: {
  default: baseTitle,
  template: `%s - ${baseTitle}`
  },
  description: baseDescription,
  keywords: ["Tim Darmstaedter", "Data Analyst", "Business Intelligence"],
  openGraph: {
    title: baseTitle,
    description: baseDescription,
    type: "website",
    url: sharedMetadata.siteUrl,
    siteName: baseTitle,
    images: [
      {
        url: sharedMetadata.ogImage.src,
        width: sharedMetadata.ogImage.width,
        height: sharedMetadata.ogImage.height,
        alt: baseTitle,
        type: sharedMetadata.ogImage.type
      }
    ]
  },
  alternates: {
    canonical: "/"
  },
  twitter: {
    card: "summary_large_image",
    site: `@${PROFILES.twitter.username}`,
    creator: `@${PROFILES.twitter.username}`
  }
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" }
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1
}

