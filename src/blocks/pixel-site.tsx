import {
  ArrowRight,
  Check,
  Grid2X2,
  Image,
  MoveUpRight,
  ScanFace,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { envConfigs } from '@/config';
import { m } from '@/paraglide/messages.js';
import { Footer } from '@/blocks/footer';
import { Header } from '@/blocks/header';
import { AvatarWorkspace } from '@/components/pixel/avatar';
import {
  PixelWorkspace,
  type PixelCopy,
  type WorkspaceMode,
} from '@/components/pixel/workspace';

export const pixelCopy = (): PixelCopy => ({
  hero_title: m['pixel.hero_title'](),
  hero_description: m['pixel.hero_description'](),
  eyebrow: m['pixel.eyebrow'](),
  start: m['pixel.start'](),
  explore: m['pixel.explore'](),
  free: m['pixel.free'](),
  no_signup: m['pixel.no_signup'](),
  private: m['pixel.private'](),
  tools: m['pixel.tools'](),
  tools_description: m['pixel.tools_description'](),
  convert_title: m['pixel.convert_title'](),
  convert_description: m['pixel.convert_description'](),
  avatar_title: m['pixel.avatar_title'](),
  avatar_description: m['pixel.avatar_description'](),
  resize_title: m['pixel.resize_title'](),
  resize_description: m['pixel.resize_description'](),
  pattern_title: m['pixel.pattern_title'](),
  pattern_description: m['pixel.pattern_description'](),
  convert_short: m['pixel.convert_short'](),
  avatar_short: m['pixel.avatar_short'](),
  resize_short: m['pixel.resize_short'](),
  pattern_short: m['pixel.pattern_short'](),
  open_tool: m['pixel.open_tool'](),
  available: m['pixel.available'](),
  workspace_title: m['pixel.workspace_title'](),
  local: m['pixel.local'](),
  source: m['pixel.source'](),
  adjust: m['pixel.adjust'](),
  upload: m['pixel.upload'](),
  upload_hint: m['pixel.upload_hint'](),
  processing: m['pixel.processing'](),
  examples: m['pixel.examples'](),
  landscape: m['pixel.landscape'](),
  flower: m['pixel.flower'](),
  cat: m['pixel.cat'](),
  resolution: m['pixel.resolution'](),
  resolution_hint: m['pixel.resolution_hint'](),
  palette: m['pixel.palette'](),
  palette_studio: m['pixel.palette_studio'](),
  palette_auto: m['pixel.palette_auto'](),
  palette_gameboy: m['pixel.palette_gameboy'](),
  palette_mono: m['pixel.palette_mono'](),
  colors: m['pixel.colors'](),
  brightness: m['pixel.brightness'](),
  dither: m['pixel.dither'](),
  reset: m['pixel.reset'](),
  live_preview: m['pixel.live_preview'](),
  before: m['pixel.before'](),
  after: m['pixel.after'](),
  used_colors: m['pixel.used_colors'](),
  ready: m['pixel.ready'](),
  download: m['pixel.download'](),
  download_large: m['pixel.download_large'](),
  download_grid: m['pixel.download_grid'](),
  export_note: m['pixel.export_note'](),
  scale: m['pixel.scale'](),
  scale_hint: m['pixel.scale_hint'](),
  resize_note: m['pixel.resize_note'](),
  print: m['pixel.print'](),
  pattern_note: m['pixel.pattern_note'](),
  materials: m['pixel.materials'](),
  materials_note: m['pixel.materials_note'](),
  cells: m['pixel.cells'](),
  error_format: m['pixel.error_format'](),
  error_size: m['pixel.error_size'](),
  error_dimensions: m['pixel.error_dimensions'](),
  error_decode: m['pixel.error_decode'](),
  error_processing: m['pixel.error_processing'](),
  error_export: m['pixel.error_export'](),
  skin: m['pixel.skin'](),
  hair: m['pixel.hair'](),
  shirt: m['pixel.shirt'](),
  background: m['pixel.background'](),
  transparent: m['pixel.transparent'](),
  hairstyle: m['pixel.hairstyle'](),
  short: m['pixel.short'](),
  long: m['pixel.long'](),
  spiky: m['pixel.spiky'](),
  expression: m['pixel.expression'](),
  smile: m['pixel.smile'](),
  happy: m['pixel.happy'](),
  surprised: m['pixel.surprised'](),
  glasses: m['pixel.glasses'](),
  random: m['pixel.random'](),
  download_avatar: m['pixel.download_avatar'](),
  avatar_preview: m['pixel.avatar_preview'](),
  avatar_crop: m['pixel.avatar_crop'](),
  avatar_note: m['pixel.avatar_note'](),
  how_title: m['pixel.how_title'](),
  step1_title: m['pixel.step1_title'](),
  step1_description: m['pixel.step1_description'](),
  step2_title: m['pixel.step2_title'](),
  step2_description: m['pixel.step2_description'](),
  step3_title: m['pixel.step3_title'](),
  step3_description: m['pixel.step3_description'](),
  craft_title: m['pixel.craft_title'](),
  craft_description: m['pixel.craft_description'](),
  craft_cta: m['pixel.craft_cta'](),
  craft_kicker: m['pixel.craft_kicker'](),
  upgrade_title: m['pixel.upgrade_title'](),
  upgrade_description: m['pixel.upgrade_description'](),
  free_label: m['pixel.free_label'](),
  free_description: m['pixel.free_description'](),
  free_feature1: m['pixel.free_feature1'](),
  free_feature2: m['pixel.free_feature2'](),
  free_feature3: m['pixel.free_feature3'](),
  free_cta: m['pixel.free_cta'](),
  planned_label: m['pixel.planned_label'](),
  planned_description: m['pixel.planned_description'](),
  planned_feature1: m['pixel.planned_feature1'](),
  planned_feature2: m['pixel.planned_feature2'](),
  planned_feature3: m['pixel.planned_feature3'](),
  planned_status: m['pixel.planned_status'](),
  faq_title: m['pixel.faq_title'](),
  faq1_q: m['pixel.faq1_q'](),
  faq1_a: m['pixel.faq1_a'](),
  faq2_q: m['pixel.faq2_q'](),
  faq2_a: m['pixel.faq2_a'](),
  faq3_q: m['pixel.faq3_q'](),
  faq3_a: m['pixel.faq3_a'](),
  faq4_q: m['pixel.faq4_q'](),
  faq4_a: m['pixel.faq4_a'](),
  faq5_q: m['pixel.faq5_q'](),
  faq5_a: m['pixel.faq5_a'](),
  footer_tagline: m['pixel.footer_tagline'](),
  footer_tools: m['pixel.footer_tools'](),
  footer_project: m['pixel.footer_project'](),
  footer_legal: m['pixel.footer_legal'](),
  nav_tools: m['pixel.nav_tools'](),
  nav_patterns: m['pixel.nav_patterns'](),
  nav_upgrade: m['pixel.nav_upgrade'](),
  nav_menu: m['pixel.nav_menu'](),
  footer_privacy: m['pixel.footer_privacy'](),
  footer_terms: m['pixel.footer_terms'](),
  convert_guide: m['pixel.convert_guide'](),
  resize_guide: m['pixel.resize_guide'](),
  avatar_guide: m['pixel.avatar_guide'](),
  pattern_guide: m['pixel.pattern_guide'](),
  guide_title: m['pixel.guide_title'](),
  related: m['pixel.related'](),
  preview_label: m['pixel.preview_label'](),
  home_meta: m['pixel.home_meta'](),
  upgrade_meta: m['pixel.upgrade_meta'](),
});
const toolPaths = {
  convert: '/image-to-pixel-art',
  avatar: '/',
  resize: '/pixel-art-resizer',
  pattern: '/pixel-art-pattern-maker',
};

export function ToolCards({
  copy,
  includeAvatar = true,
}: {
  copy: PixelCopy;
  includeAvatar?: boolean;
}) {
  const cards = [
    { key: 'convert', icon: Image, art: 'landscape' },
    { key: 'avatar', icon: ScanFace, art: 'avatar' },
    { key: 'resize', icon: Grid2X2, art: 'cat' },
    { key: 'pattern', icon: Sparkles, art: 'flower' },
  ] as const;
  return (
    <section id="tools" className="pixel-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">{copy.available}</span>
          <h2>{copy.tools}</h2>
        </div>
        <p>{copy.tools_description}</p>
      </div>
      <div className="tool-card-grid">
        {cards
          .filter(({ key }) => includeAvatar || key !== 'avatar')
          .map(({ key, icon: Icon, art }, i) => (
            <Link
              href={toolPaths[key]}
              className={'tool-card tool-card-' + i}
              key={key}
            >
              <div className="tool-card-art">
                <img
                  src={'/imgs/pixel/' + art + '.svg'}
                  alt={copy[key + '_title']}
                  width="256"
                  height="256"
                  loading="lazy"
                />
                <span className="card-arrow">
                  <MoveUpRight size={18} />
                </span>
              </div>
              <div className="tool-card-copy">
                <span className="small-label">
                  <Icon size={14} />0{i + 1}
                </span>
                <h3>{copy[key + '_title']}</h3>
                <p>{copy[key + '_short']}</p>
                <span className="card-link">
                  {copy.open_tool}
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}

function FAQ({ copy }: { copy: PixelCopy }) {
  return (
    <section className="pixel-section faq-section">
      <h2>{copy.faq_title}</h2>
      <div>
        {[1, 2, 3, 4, 5].map((i) => (
          <details key={i}>
            <summary>
              {copy['faq' + i + '_q']}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{copy['faq' + i + '_a']}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Upgrade({
  copy,
  standalone = false,
}: {
  copy: PixelCopy;
  standalone?: boolean;
}) {
  const Heading = standalone ? 'h1' : 'h2';
  return (
    <section id="upgrade" className="pixel-section upgrade-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">{envConfigs.app_name}</span>
          <Heading>{copy.upgrade_title}</Heading>
        </div>
        <p>{copy.upgrade_description}</p>
      </div>
      <div className="upgrade-grid">
        <div className="upgrade-card">
          <span className="plan-label">{copy.free_label}</span>
          <h3>{copy.free}</h3>
          <p>{copy.free_description}</p>
          <ul>
            {[1, 2, 3].map((i) => (
              <li key={i}>
                <Check size={16} />
                {copy['free_feature' + i]}
              </li>
            ))}
          </ul>
          <Link href="/image-to-pixel-art" className="pixel-button">
            {copy.free_cta}
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="upgrade-card planned">
          <span className="plan-label">{copy.planned_label}</span>
          <h3>{copy.planned_description}</h3>
          <ul>
            {[1, 2, 3].map((i) => (
              <li key={i}>
                <span className="tiny-dot" />
                {copy['planned_feature' + i]}
              </li>
            ))}
          </ul>
          <span className="planned-status">{copy.planned_status}</span>
        </div>
      </div>
    </section>
  );
}

export function PixelHome() {
  const copy = pixelCopy();
  return (
    <div className="pixel-site">
      <Header />
      <main>
        <section className="pixel-hero">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="tiny-dot" />
              {copy.eyebrow}
            </span>
            <h1>
              {copy.hero_title.split('\n').map((line, i) => (
                <span key={line} className={i === 1 ? 'hero-accent' : ''}>
                  {line}
                </span>
              ))}
            </h1>
            <p>{copy.hero_description}</p>
            <div className="hero-actions">
              <a className="pixel-button" href="#workspace">
                {copy.start}
                <ArrowRight size={16} />
              </a>
              <a href="#tools" className="text-link">
                {copy.explore}
                <ArrowRight size={14} />
              </a>
            </div>
            <div className="hero-promises">
              <span>
                <Check size={13} />
                {copy.free}
              </span>
              <span>
                <Check size={13} />
                {copy.no_signup}
              </span>
            </div>
          </div>
          <div className="hero-art">
            <div className="art-paper">
              <img
                src="/imgs/pixel/landscape.svg"
                width="256"
                height="256"
                alt={copy.preview_label}
              />
              <div className="art-caption">
                <span>{envConfigs.app_name}</span>
                <span>32 × 32</span>
              </div>
            </div>
            <div className="floating-palette">
              {[
                '#253e55',
                '#426b72',
                '#749e97',
                '#a8c6ce',
                '#f5d583',
                '#dc7e53',
              ].map((c) => (
                <i key={c} style={{ background: c }} />
              ))}
            </div>
            <span className="art-note">
              {copy.convert_short}
              <Sparkles size={16} />
            </span>
          </div>
        </section>
        <div className="home-workspace">
          <PixelWorkspace copy={copy} />
        </div>
        <div className="privacy-ribbon">
          <ShieldCheck size={16} />
          {copy.private}
          <span>·</span>
          {copy.no_signup}
        </div>
        <ToolCards copy={copy} />
        <section className="pixel-section how-section">
          <h2>{copy.how_title}</h2>
          <div className="how-grid">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <span className="step-number">0{i}</span>
                <h3>{copy['step' + i + '_title']}</h3>
                <p>{copy['step' + i + '_description']}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="craft-section">
          <div className="craft-art">
            <img
              src="/imgs/pixel/flower.svg"
              alt={copy.pattern_title}
              width="256"
              height="256"
              loading="lazy"
            />
          </div>
          <div>
            <span className="eyebrow">{copy.craft_kicker}</span>
            <h2>{copy.craft_title}</h2>
            <p>{copy.craft_description}</p>
            <Link href="/pixel-art-pattern-maker" className="pixel-button">
              {copy.craft_cta}
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
        <Upgrade copy={copy} />
        <FAQ copy={copy} />
      </main>
      <Footer />
    </div>
  );
}

export function PixelToolPage({ kind }: { kind: WorkspaceMode | 'avatar' }) {
  const copy = pixelCopy();
  return (
    <div className="pixel-site">
      <Header />
      <main>
        <section className="tool-page-heading">
          <span className="eyebrow">
            {copy.free} / {envConfigs.app_name}
          </span>
          <h1>{copy[kind + '_title']}</h1>
          <p>{copy[kind + '_description']}</p>
          <div className="hero-promises">
            <span>
              <ShieldCheck size={14} />
              {copy.private}
            </span>
            <span>
              <Check size={14} />
              {copy.no_signup}
            </span>
          </div>
        </section>
        <div className="home-workspace">
          {kind === 'avatar' ? (
            <AvatarWorkspace copy={copy} />
          ) : (
            <PixelWorkspace mode={kind} copy={copy} />
          )}
        </div>
        <section className="pixel-section tool-guide">
          <h2>{copy.guide_title}</h2>
          <p>{copy[kind + '_guide']}</p>
        </section>
        <ToolCards copy={copy} />
        <FAQ copy={copy} />
      </main>
      <Footer />
    </div>
  );
}

export function PixelUpgradePage() {
  const copy = pixelCopy();
  return (
    <div className="pixel-site">
      <Header />
      <main>
        <Upgrade copy={copy} standalone />
        <FAQ copy={copy} />
      </main>
      <Footer />
    </div>
  );
}
