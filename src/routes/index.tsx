import { createFileRoute } from '@tanstack/react-router';

import { pixelMetadata } from '@/lib/pixel-seo';
import { SquareFaceHome } from '@/blocks/square-face-home';

export const Route = createFileRoute('/')({
  loader: () => pixelMetadata('home', '/'),
  head: ({ loaderData }: { loaderData?: ReturnType<typeof pixelMetadata> }) =>
    loaderData ?? {},
  component: SquareFaceHome,
});
