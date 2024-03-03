import { defineConfig } from 'astro/config';
import { i18n, filterSitemapByDefaultLocale } from 'astro-i18n-aut/integration';
import sitemap from '@astrojs/sitemap';

const defaultLocale = 'fr';
const locales = {
  fr: 'fr',
  en: 'en', // the `defaultLocale` value must present in `locales` keys
};

// https://astro.build/config
export default defineConfig({
  base: '/',
  site: 'http://localhost:4321',
  outDir: '../../dist/apps/my-blog',
  output: 'static',
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
