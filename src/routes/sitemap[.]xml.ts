import { createFileRoute } from '@tanstack/react-router';

import { envConfigs } from '@/config';
import { baseLocale, locales, localizeUrl } from '@/paraglide/runtime.js';

const STATIC_PATHS = [
  '',
  '/pricing',
  '/image-to-pixel-art',
  '/pixel-art-resizer',
  '/pixel-art-pattern-maker',
  '/privacy-policy',
  '/terms-of-service',
];

function urlFor(path: string, locale: string): string {
  return localizeUrl(`${envConfigs.app_url}${path || '/'}`, {
    locale: locale as (typeof locales)[number],
  }).href;
}

function entryXml(path: string): string {
  const alternates = locales
    .map(
      (loc) =>
        `    <xhtml:link rel="alternate" hreflang="${loc}" href="${urlFor(path, loc)}"/>`
    )
    .join('\n');
  return [
    '  <url>',
    `    <loc>${urlFor(path, baseLocale)}</loc>`,
    alternates,
    '  </url>',
  ]
    .filter(Boolean)
    .join('\n');
}

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
          ...STATIC_PATHS.map(entryXml),
          '</urlset>',
          '',
        ].join('\n');

        return new Response(xml, {
          headers: { 'Content-Type': 'application/xml' },
        });
      },
    },
  },
});
