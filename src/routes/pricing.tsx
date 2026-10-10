import { createFileRoute } from '@tanstack/react-router';

import { pixelMetadata } from '@/lib/pixel-seo';
import { PixelUpgradePage } from '@/blocks/pixel-site';

export const Route = createFileRoute('/pricing')({
  loader: () => pixelMetadata('upgrade', '/pricing'),
  head: ({ loaderData }: { loaderData?: ReturnType<typeof pixelMetadata> }) =>
    loaderData ?? {},
  component: PixelUpgradePage,
});
