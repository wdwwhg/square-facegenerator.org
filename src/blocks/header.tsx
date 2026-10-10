import { m } from '@/paraglide/messages.js';
import { SiteHeader } from '@/components/site-header';

export function Header() {
  return (
    <SiteHeader
      ctaHref="/image-to-pixel-art"
      ctaLabel={m['pixel.start']()}
      navLinks={[
        { href: '/image-to-pixel-art', label: m['pixel.convert_title']() },
        { href: '/square-face-generator', label: m['pixel.avatar_title']() },
        { href: '/pixel-art-pattern-maker', label: m['pixel.nav_patterns']() },
        { href: '/pricing', label: m['pixel.nav_upgrade']() },
      ]}
    />
  );
}
