import { createFileRoute, redirect } from '@tanstack/react-router';

import { envConfigs } from '@/config';
import { getLocale, localizeUrl } from '@/paraglide/runtime.js';

export const Route = createFileRoute('/square-face-generator')({
  beforeLoad: ({ location }) => {
    const home = localizeUrl(new URL('/', envConfigs.app_url), {
      locale: getLocale(),
    }).pathname;
    throw redirect({ href: home + location.searchStr, statusCode: 301 });
  },
});
