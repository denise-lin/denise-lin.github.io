import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// NOTE: `site` is used only to generate absolute URLs in the sitemap.
// Update it to the final domain before deploying. No infra is configured here.
export default defineConfig({
  site: 'https://deniselin.com',
  integrations: [
    sitemap({
      // Company-specific application pages are unlisted: keep them out of the sitemap.
      filter: (page) =>
        !page.includes('/anduril') &&
        !page.includes('/chipotle') &&
        !page.includes('/rocketlab') &&
        !page.includes('/spacex') &&
        !page.includes('/neros') &&
        !page.includes('/harbinger') &&
        !page.includes('/hermeus') &&
        !page.includes('/apex') &&
        !page.includes('/compa') &&
        !page.includes('/revelyst') &&
        !page.includes('/trueanomaly') &&
        !page.includes('/emblamedical') &&
        !page.includes('/servicetitan') &&
        !page.includes('/singularity') &&
        !page.includes('/hireuc') &&
        !page.includes('/EdwardsLifesciences') &&
        !page.includes('/cubicdefense') &&
        !page.includes('/hadrian') &&
        !page.includes('/steg.ai') &&
        !page.includes('/smithrx'),
    }),
  ],
});
