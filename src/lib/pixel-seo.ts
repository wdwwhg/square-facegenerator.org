import { envConfigs } from '@/config';
import { m } from '@/paraglide/messages.js';
import { getLocale, locales, localizeUrl } from '@/paraglide/runtime.js';

export function pixelMetadata(
  kind: 'home' | 'convert' | 'avatar' | 'resize' | 'pattern' | 'upgrade',
  path: string
) {
  const locale = getLocale();
  const title =
    {
      home: m['pixel.home_meta'](),
      upgrade: m['pixel.upgrade_meta'](),
      convert: m['pixel.convert_title'](),
      avatar: m['pixel.avatar_title'](),
      resize: m['pixel.resize_title'](),
      pattern: m['pixel.pattern_title'](),
    }[kind] +
    ' | ' +
    envConfigs.app_name;
  const description = {
    home: m['pixel.hero_description'](),
    upgrade: m['pixel.upgrade_description'](),
    convert: m['pixel.convert_description'](),
    avatar: m['pixel.avatar_description'](),
    resize: m['pixel.resize_description'](),
    pattern: m['pixel.pattern_description'](),
  }[kind];
  const urlFor = (loc: string) =>
    localizeUrl(envConfigs.app_url.replace(/\/$/, '') + path, {
      locale: loc as 'en' | 'zh',
    }).href;
  const url = urlFor(locale);
  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: url },
      {
        property: 'og:image',
        content:
          envConfigs.app_url.replace(/\/$/, '') + '/imgs/pixel/social.png',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'canonical', href: url },
      ...locales.map((loc) => ({
        rel: 'alternate',
        hrefLang: loc,
        href: urlFor(loc),
      })),
      { rel: 'alternate', hrefLang: 'x-default', href: urlFor('en') },
    ],
  };
}
