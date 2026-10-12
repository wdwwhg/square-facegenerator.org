import { ArrowRight, Check, ScanFace, ShieldCheck } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { m } from '@/paraglide/messages.js';
import { Footer } from '@/blocks/footer';
import { Header } from '@/blocks/header';
import { pixelCopy, ToolCards } from '@/blocks/pixel-site';
import { AvatarWorkspace } from '@/components/pixel/avatar';

export function SquareFaceHome() {
  const copy = pixelCopy();
  const features = [
    {
      title: m['face.feature1_title'](),
      description: m['face.feature1_description'](),
    },
    {
      title: m['face.feature2_title'](),
      description: m['face.feature2_description'](),
    },
    {
      title: m['face.feature3_title'](),
      description: m['face.feature3_description'](),
    },
    {
      title: m['face.feature4_title'](),
      description: m['face.feature4_description'](),
    },
  ];
  const useCases = [
    {
      title: m['face.case1_title'](),
      description: m['face.case1_description'](),
      tip: m['face.case1_tip'](),
      href: '#workspace',
      link: m['face.case1_link'](),
    },
    {
      title: m['face.case2_title'](),
      description: m['face.case2_description'](),
      tip: m['face.case2_tip'](),
      href: '/pixel-art-resizer',
      link: m['face.case2_link'](),
    },
    {
      title: m['face.case3_title'](),
      description: m['face.case3_description'](),
      tip: m['face.case3_tip'](),
      href: '#workspace',
      link: m['face.case3_link'](),
    },
    {
      title: m['face.case4_title'](),
      description: m['face.case4_description'](),
      tip: m['face.case4_tip'](),
      href: '/pixel-art-pattern-maker',
      link: m['face.case4_link'](),
    },
  ];
  const steps = [
    {
      title: m['face.step1_title'](),
      description: m['face.step1_description'](),
    },
    {
      title: m['face.step2_title'](),
      description: m['face.step2_description'](),
    },
    {
      title: m['face.step3_title'](),
      description: m['face.step3_description'](),
    },
  ];
  const ideas = [
    {
      title: m['face.idea1_title'](),
      description: m['face.idea1_description'](),
    },
    {
      title: m['face.idea2_title'](),
      description: m['face.idea2_description'](),
    },
    {
      title: m['face.idea3_title'](),
      description: m['face.idea3_description'](),
    },
  ];
  const questions = [
    { question: m['face.faq1_q'](), answer: m['face.faq1_a']() },
    { question: m['face.faq2_q'](), answer: m['face.faq2_a']() },
    { question: m['face.faq3_q'](), answer: m['face.faq3_a']() },
    { question: m['face.faq4_q'](), answer: m['face.faq4_a']() },
    { question: m['face.faq5_q'](), answer: m['face.faq5_a']() },
    { question: m['face.faq6_q'](), answer: m['face.faq6_a']() },
    { question: m['face.faq7_q'](), answer: m['face.faq7_a']() },
    { question: m['face.faq8_q'](), answer: m['face.faq8_a']() },
    { question: m['face.faq9_q'](), answer: m['face.faq9_a']() },
    { question: m['face.faq10_q'](), answer: m['face.faq10_a']() },
    { question: m['face.faq11_q'](), answer: m['face.faq11_a']() },
  ];

  return (
    <div className="pixel-site face-home">
      <Header />
      <main>
        <section className="face-home-intro">
          <div>
            <span className="eyebrow">
              <ScanFace size={14} />
              {m['face.eyebrow']()}
            </span>
            <h1>{copy.hero_title}</h1>
            <p>{copy.hero_description}</p>
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
          <AvatarWorkspace copy={copy} />
        </div>
        <div className="privacy-ribbon">
          <ShieldCheck size={16} />
          {m['face.local_note']()}
        </div>
        <nav className="face-page-nav" aria-label={m['face.contents_label']()}>
          <a href="#features">{m['face.features_nav']()}</a>
          <a href="#how-to-use">{m['face.how_nav']()}</a>
          <a href="#use-cases">{m['face.cases_nav']()}</a>
          <a href="#faq">{m['face.faq_nav']()}</a>
        </nav>
        <section className="pixel-section face-introduction">
          <div>
            <span className="eyebrow">{m['face.about_eyebrow']()}</span>
            <h2>
              <Link href="/square-face-icon-generator">
                {m['face.about_title']()}
              </Link>
            </h2>
          </div>
          <div>
            <p>{m['face.about_description']()}</p>
            <p>{m['face.about_use']()}</p>
            <p>
              {m['entry.square_before']()}
              <Link className="text-link" href="/square-pfp">
                square PFP
              </Link>
              {m['entry.square_after']()}
            </p>
          </div>
        </section>
        <section id="features" className="pixel-section face-content-section">
          <h2>{m['face.features_title']()}</h2>
          <div className="face-content-grid">
            {features.map(({ title, description }) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="how-to-use" className="pixel-section how-section">
          <h2>{m['face.how_title']()}</h2>
          <div className="how-grid">
            {steps.map(({ title, description }, i) => (
              <div key={title}>
                <span className="step-number">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="pixel-section face-ideas">
          <div className="section-heading">
            <div>
              <span className="eyebrow">{m['face.ideas_eyebrow']()}</span>
              <h2>{m['face.ideas_title']()}</h2>
            </div>
            <a href="#workspace" className="text-link">
              {m['face.try_idea']()}
              <ArrowRight size={14} />
            </a>
          </div>
          <p className="face-section-intro">
            {m['entry.ideas_before']()}
            <Link className="text-link" href="/square-pfp-generator">
              square PFP generator
            </Link>
            {m['entry.ideas_after']()}
          </p>
          <div className="how-grid">
            {ideas.map(({ title, description }, i) => (
              <article key={title}>
                <span
                  className={'face-idea-colors face-idea-colors-' + i}
                  aria-hidden="true"
                >
                  <i />
                  <i />
                  <i />
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="use-cases" className="pixel-section face-content-section">
          <h2>{m['face.cases_title']()}</h2>
          <p className="face-section-intro">{m['face.cases_description']()}</p>
          <div className="face-content-grid face-use-cases">
            {useCases.map(({ title, description, tip, href, link }, i) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
                <p>{tip}</p>
                {i === 1 && (
                  <p>
                    {m['entry.pixel_before']()}
                    <Link className="text-link" href="/pixel-art-generator">
                      pixel art generator
                    </Link>
                    {m['entry.pixel_after']()}
                  </p>
                )}
                {i === 2 && (
                  <p>
                    {m['entry.pfp_before']()}
                    <Link className="text-link" href="/pfp-maker">
                      square PFP maker
                    </Link>
                    {m['entry.pfp_after']()}
                  </p>
                )}
                <Link href={href} className="text-link">
                  {link}
                  <ArrowRight size={14} />
                </Link>
              </article>
            ))}
          </div>
        </section>
        <ToolCards
          includeAvatar={false}
          copy={{
            ...copy,
            tools: m['face.related_title'](),
            tools_description: m['face.related_description'](),
          }}
        />
        <section id="faq" className="pixel-section faq-section">
          <h2>{m['face.faq_title']()}</h2>
          <div>
            {questions.map(({ question, answer }, i) => (
              <details key={question}>
                <summary>
                  {question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{answer}</p>
                {i === 4 && (
                  <a
                    className="text-link face-archive-link"
                    href="https://flashmuseum.net/game/square-face-icon-generator-g0x/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {m['face.classic_link']()}
                    <ArrowRight size={14} />
                  </a>
                )}
              </details>
            ))}
          </div>
        </section>
        <section className="pixel-section face-final-cta">
          <h2>{m['face.cta_title']()}</h2>
          <p>{m['face.cta_description']()}</p>
          <Link href="/#workspace" className="pixel-button">
            {m['face.create']()}
            <ArrowRight size={16} />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
