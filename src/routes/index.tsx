import { createFileRoute } from '@tanstack/react-router';

import { pixelMetadata } from '@/lib/pixel-seo';
import { PixelHome } from '@/blocks/pixel-site';

export const Route = createFileRoute('/')({
  loader: () => pixelMetadata('home', '/'),
  head: ({ loaderData }: { loaderData?: ReturnType<typeof pixelMetadata> }) =>
    loaderData ?? {},
  component: PixelHome,
});
