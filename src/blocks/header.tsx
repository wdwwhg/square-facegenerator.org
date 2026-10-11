import { m } from '@/paraglide/messages.js';
import { SiteHeader } from '@/components/site-header';

export function Header() {
  return (
    <SiteHeader
      ctaHref="/#workspace"
      ctaLabel={m['face.create']()}
      navLinks={[
        { href: '/', label: m['pixel.avatar_title']() },
        { href: '/image-to-pixel-art', label: m['pixel.convert_title']() },
        { href: '/pixel-art-pattern-maker', label: m['pixel.nav_patterns']() },
        { href: '/pricing', label: m['pixel.nav_upgrade']() },
      ]}
    />
  );
}
