import { createFileRoute } from '@tanstack/react-router';

import { pixelMetadata } from '@/lib/pixel-seo';
import { PixelToolPage } from '@/blocks/pixel-site';

export const Route = createFileRoute('/square-face-generator')({
  loader: () => pixelMetadata('avatar', '/square-face-generator'),
  head: ({ loaderData }: { loaderData?: ReturnType<typeof pixelMetadata> }) =>
    loaderData ?? {},
  component: () => <PixelToolPage kind="avatar" />,
});
