import { createFileRoute } from '@tanstack/react-router';

import { avatarEntryMetadata } from '@/lib/pixel-seo';
import { AvatarEntryPage } from '@/blocks/avatar-entry-page';

export const Route = createFileRoute('/square-pfp-generator')({
  loader: () => avatarEntryMetadata('random'),
  head: ({
    loaderData,
  }: {
    loaderData?: ReturnType<typeof avatarEntryMetadata>;
  }) => loaderData ?? {},
  component: () => <AvatarEntryPage kind="random" />,
});
