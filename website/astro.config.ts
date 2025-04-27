import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';

// Remove this import:
// import image from '@astrojs/image'; // DELETE THIS LINE

import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import compress from 'astro-compress';
import type { AstroIntegration } from 'astro';

import astrowind from './vendor/integration';

import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin, lazyImagesRehypePlugin } from './src/utils/frontmatter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const hasExternalScripts = false;
const whenExternalScripts = (items: (() => AstroIntegration) | (() => AstroIntegration)[] = []) =>
  hasExternalScripts ? (Array.isArray(items) ? items.map((item) => item()) : [items()]) : [];

export default defineConfig({
  output: 'static',

  integrations: [
    // Remove the old image integration block:
    // image({ // DELETE THIS BLOCK
    //   serviceEntryPoint: '@astrojs/image/sharp',
    // }),

    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    mdx(),
    icon({
      include: {
        tabler: ['*'],
        'flat-color-icons': [ /* ... */ ],
      },
    }),
    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ['dataLayer.push'] },
      })
    ),
    compress({ /* ... */ }),
    astrowind({
      config: './src/config.yaml',
    }),
  ],

  // Remove the image config block (it was for the old integration):
  // image: { // DELETE THIS BLOCK
  //   domains: ['cdn.pixabay.com', 'images.unsplash.com'],
  // },

  markdown: { /* ... */ },
  vite: { /* ... */ },
});