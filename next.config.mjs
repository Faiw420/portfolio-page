/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development'
    }
  },
  compiler: {
    removeConsole: {
      exclude: ['error', 'info']
    }
  },
  trailingSlash: false,
  images: {
    deviceSizes: [390, 435, 768, 1024, 1280],
    formats: ['image/avif', 'image/webp']
  },
  experimental: {
    webVitalsAttribution: ['FCP', 'LCP', 'CLS', 'FID', 'TTFB', 'INP']
  },
  output: 'standalone'
}

export default nextConfig

