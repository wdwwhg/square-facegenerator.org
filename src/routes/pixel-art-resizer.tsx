import { createFileRoute } from '@tanstack/react-router';

import { pixelMetadata } from '@/lib/pixel-seo';
import { PixelToolPage } from '@/blocks/pixel-site';

export const Route = createFileRoute('/pixel-art-resizer')({
  loader: () => pixelMetadata('resize', '/pixel-art-resizer'),
  head: ({ loaderData }: { loaderData?: ReturnType<typeof pixelMetadata> }) =>
    loaderData ?? {},
  component: () => <PixelToolPage kind="resize" />,
});
