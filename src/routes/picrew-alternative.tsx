import { createFileRoute } from '@tanstack/react-router';

import { pixelMetadata } from '@/lib/pixel-seo';
import { PicrewAlternativePage } from '@/blocks/picrew-alternative-page';

export const Route = createFileRoute('/picrew-alternative')({
  loader: () => pixelMetadata('alternative', '/picrew-alternative'),
  head: ({ loaderData }: { loaderData?: ReturnType<typeof pixelMetadata> }) =>
    loaderData ?? {},
  component: PicrewAlternativePage,
});
