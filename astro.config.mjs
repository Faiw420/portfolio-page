// @ts-check
import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'

// Pages are prerendered to static assets (free, not counted as Worker requests).
// Only /stats and /api/stats/* opt out with `export const prerender = false` and run in the Worker.
export default defineConfig({
  // Public URL: canonical + og:url/og:image + sitemap. SITE_URL overrides it at build time.
  site: process.env.SITE_URL || 'https://darmstaedtert.im',
  // No image optimisation needed (static files only), so no Cloudflare Images binding
  adapter: cloudflare({ imageService: 'passthrough' }),
  // The site uses no sessions; this also stops the adapter from provisioning a KV namespace.
  session: false,
  // URLs without trailing slash (matches wrangler's html_handling and the sidebar links)
  trailingSlash: 'never',
  // Writes sitemap-index.xml at build time (only when SITE_URL is set).
  integrations: [sitemap({ filter: (page) => !page.endsWith('/404/') })],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  vite: {
    plugins: [tailwindcss()]
  }
})
