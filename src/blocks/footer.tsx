import { m } from '@/paraglide/messages.js';
import { SiteFooter } from '@/components/site-footer';

export function Footer() {
  return (
    <SiteFooter
      tagline={m['pixel.footer_tagline']()}
      columns={[
        {
          title: m['pixel.footer_tools'](),
          links: [
            { href: '/image-to-pixel-art', label: m['pixel.convert_title']() },
            {
              href: '/',
              label: m['pixel.avatar_title'](),
            },
            { href: '/pixel-art-resizer', label: m['pixel.resize_title']() },
            {
              href: '/pixel-art-pattern-maker',
              label: m['pixel.pattern_title'](),
            },
          ],
        },
        {
          title: m['pixel.footer_project'](),
          links: [{ href: '/pricing', label: m['pixel.nav_upgrade']() }],
        },
        {
          title: m['pixel.footer_legal'](),
          links: [
            { href: '/privacy-policy', label: m['pixel.footer_privacy']() },
            { href: '/terms-of-service', label: m['pixel.footer_terms']() },
          ],
        },
      ]}
    />
  );
}
