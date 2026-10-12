import { createFileRoute } from '@tanstack/react-router';

import { envConfigs } from '@/config';
import { avatarEntries } from '@/lib/avatar-entries';

const STATIC_PAGES = [
  ...Object.values(avatarEntries).map((entry) => ({
    path: entry.path,
    title: entry.keyword,
    description:
      'Editable pixel character maker with a tailored starting preset and usage guide',
  })),
  {
    path: '/',
    title: 'Square Face Generator',
    description: 'Free square pixel avatar maker',
  },
  {
    path: '/image-to-pixel-art',
    title: 'Image to Pixel Art',
    description: 'Convert an image into pixel art',
  },
  {
    path: '/pixel-art-resizer',
    title: 'Pixel Art Resizer',
    description: 'Enlarge pixel art without blur',
  },
  {
    path: '/pixel-art-pattern-maker',
    title: 'Pixel Art Pattern Maker',
    description: 'Create craft grids and color inventories',
  },
  {
    path: '/pricing',
    title: 'Pricing',
    description: 'Current tools and planned features',
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy',
    description: 'Privacy information',
  },
  {
    path: '/terms-of-service',
    title: 'Terms of Service',
    description: 'Terms of use',
  },
];

export const Route = createFileRoute('/llms.txt')({
  server: {
    handlers: {
      GET: () => {
        const { app_url, app_name, app_description } = envConfigs;
        const lines = [
          `# ${app_name}`,
          '',
          `> ${app_description}`,
          '',
          '## Pages',
          '',
          ...STATIC_PAGES.map(
            (page) =>
              `- [${page.title}](${app_url}${page.path}): ${page.description}`
          ),
          '',
        ];
        return new Response(lines.join('\n'), {
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
      },
    },
  },
});
