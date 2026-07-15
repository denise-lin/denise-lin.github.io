import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// NOTE: `site` is used only to generate absolute URLs in the sitemap.
// Update it to the final domain before deploying. No infra is configured here.
export default defineConfig({
  site: 'https://deniselin.com',
  integrations: [
    sitemap({
      // Company-specific application pages are unlisted: keep them out of the sitemap.
      filter: (page) => !page.includes('/anduril') && !page.includes('/chipotle'),
    }),
  ],
});
