import { ArrowRight, Check, ScanFace } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { avatarEntries, type AvatarEntryKind } from '@/lib/avatar-entries';
import { avatarEntryCopy } from '@/lib/avatar-entry-copy';
import { m } from '@/paraglide/messages.js';
import { Footer } from '@/blocks/footer';
import { Header } from '@/blocks/header';
import { pixelCopy } from '@/blocks/pixel-site';
import { AvatarWorkspace } from '@/components/pixel/avatar';

export function AvatarEntryPage({ kind }: { kind: AvatarEntryKind }) {
  const entry = avatarEntries[kind];
  const content = avatarEntryCopy(kind);
  const copy = pixelCopy();
  return (
    <div className="pixel-site face-home">
      <Header />
      <main>
        <section className="face-home-intro">
          <div>
            <span className="eyebrow">
              <ScanFace size={14} />
              {m['entry.eyebrow']()}
            </span>
            <h1>{entry.keyword}</h1>
            <p>{content.intro}</p>
            <div className="hero-promises">
              {[copy.free, copy.no_signup, m['face.no_flash']()].map(
                (label) => (
                  <span key={label}>
                    <Check size={14} />
                    {label}
                  </span>
                )
              )}
            </div>
          </div>
          <a href="#workspace" className="pixel-button secondary">
            {m['face.create']()}
            <ArrowRight size={16} />
          </a>
        </section>
        <div className="home-workspace">
          <AvatarWorkspace
            key={entry.path}
            copy={{ ...copy, avatar_title: entry.keyword }}
            initialOptions={entry.preset}
          />
        </div>
        <section className="pixel-section face-introduction">
          <h2>{content.about_title}</h2>
          <div>
            <p>{content.about1}</p>
            <p>{content.about2}</p>
            {kind === 'pixel' && (
              <p>
                {m['entry.converter_note']()}{' '}
                <Link className="text-link" href="/image-to-pixel-art">
                  {m['entry.converter']()}
                  <ArrowRight size={14} />
                </Link>
              </p>
            )}
          </div>
        </section>
        <section className="pixel-section how-section">
          <h2>{m['entry.steps']()}</h2>
          <div className="how-grid">
            {content.steps.map((step, i) => (
              <article key={step.title}>
                <span className="step-number">0{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="pixel-section face-content-section">
          <h2>{m['entry.cases']()}</h2>
          <div className="face-content-grid">
            {content.cases.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="pixel-section faq-section">
          <h2>{m['entry.faq']()}</h2>
          <div>
            {content.faqs.map((item) => (
              <details key={item.title}>
                <summary>
                  {item.title}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{item.body}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="pixel-section face-content-section">
          <h2>{m['entry.related']()}</h2>
          <p className="face-section-intro">
            {m['entry.related_description']()}
          </p>
          <div className="face-content-grid">
            <Link href="/" className="text-link">
              {m['entry.home']()}
              <ArrowRight size={14} />
            </Link>
            {Object.entries(avatarEntries)
              .filter(([other]) => other !== kind)
              .map(([other, item]) => (
                <Link key={other} href={item.path} className="text-link">
                  {item.keyword}
                  <ArrowRight size={14} />
                </Link>
              ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
