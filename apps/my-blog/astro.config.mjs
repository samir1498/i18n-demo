import { defineConfig } from 'astro/config';
import { i18n, filterSitemapByDefaultLocale } from 'astro-i18n-aut/integration';
import sitemap from '@astrojs/sitemap';

const defaultLocale = 'en';
const locales = {
  en: 'en-US', // the `defaultLocale` value must present in `locales` keys
  fr: 'fr-CA',
};

// https://astro.build/config
export default defineConfig({
  outDir: '../../dist/apps/my-blog',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    i18n({
      locales,
      defaultLocale,
    }),
    sitemap({
      i18n: {
        locales,
        defaultLocale,
      },
      filter: filterSitemapByDefaultLocale({ defaultLocale }),
    }),
  ],
});
