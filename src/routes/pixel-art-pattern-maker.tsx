import { createFileRoute } from '@tanstack/react-router';

import { pixelMetadata } from '@/lib/pixel-seo';
import { PixelToolPage } from '@/blocks/pixel-site';

export const Route = createFileRoute('/pixel-art-pattern-maker')({
  loader: () => pixelMetadata('pattern', '/pixel-art-pattern-maker'),
  head: ({ loaderData }: { loaderData?: ReturnType<typeof pixelMetadata> }) =>
    loaderData ?? {},
  component: () => <PixelToolPage kind="pattern" />,
});
