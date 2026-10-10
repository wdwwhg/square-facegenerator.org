import { createFileRoute } from '@tanstack/react-router';

import { pixelMetadata } from '@/lib/pixel-seo';
import { PixelToolPage } from '@/blocks/pixel-site';

export const Route = createFileRoute('/image-to-pixel-art')({
  loader: () => pixelMetadata('convert', '/image-to-pixel-art'),
  head: ({ loaderData }: { loaderData?: ReturnType<typeof pixelMetadata> }) =>
    loaderData ?? {},
  component: () => <PixelToolPage kind="convert" />,
});
