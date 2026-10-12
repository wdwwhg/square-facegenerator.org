import { ArrowRight, Check, ScanFace } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { avatarEntries } from '@/lib/avatar-entries';
import { picrewSources } from '@/lib/picrew-sources';
import { m } from '@/paraglide/messages.js';
import { Footer } from '@/blocks/footer';
import { Header } from '@/blocks/header';
import { pixelCopy } from '@/blocks/pixel-site';
import { AvatarWorkspace } from '@/components/pixel/avatar';

export function PicrewAlternativePage() {
  const copy = pixelCopy();
  const benefits = [
    {
      title: m['alternative.benefit1_title'](),
      body: m['alternative.benefit1_body'](),
    },
    {
      title: m['alternative.benefit2_title'](),
      body: m['alternative.benefit2_body'](),
    },
    {
      title: m['alternative.benefit3_title'](),
      body: m['alternative.benefit3_body'](),
    },
    {
      title: m['alternative.benefit4_title'](),
      body: m['alternative.benefit4_body'](),
    },
  ];
  const steps = [
    {
      title: m['alternative.step1_title'](),
      body: m['alternative.step1_body'](),
    },
    {
      title: m['alternative.step2_title'](),
      body: m['alternative.step2_body'](),
    },
    {
      title: m['alternative.step3_title'](),
      body: m['alternative.step3_body'](),
    },
  ];
  const cases = [
    {
      title: m['alternative.case1_title'](),
      body: m['alternative.case1_body'](),
    },
    {
      title: m['alternative.case2_title'](),
      body: m['alternative.case2_body'](),
    },
    {
      title: m['alternative.case3_title'](),
      body: m['alternative.case3_body'](),
    },
  ];
  const rows = [
    {
      label: m['alternative.row1_label'](),
      ours: m['alternative.row1_ours'](),
      theirs: m['alternative.row1_picrew'](),
      sources: [picrewSources.play],
    },
    {
      label: m['alternative.row2_label'](),
      ours: m['alternative.row2_ours'](),
      theirs: m['alternative.row2_picrew'](),
      sources: [picrewSources.edit],
    },
    {
      label: m['alternative.row3_label'](),
      ours: m['alternative.row3_ours'](),
      theirs: m['alternative.row3_picrew'](),
      sources: [picrewSources.edit],
    },
    {
      label: m['alternative.row4_label'](),
      ours: m['alternative.row4_ours'](),
      theirs: m['alternative.row4_picrew'](),
      sources: [picrewSources.edit],
    },
    {
      label: m['alternative.row5_label'](),
      ours: m['alternative.row5_ours'](),
      theirs: m['alternative.row5_picrew'](),
      sources: [
        picrewSources.accounts,
        picrewSources.favorites,
        picrewSources.premium,
      ],
    },
  ];
  const faqs = [
    {
      question: m['alternative.faq1_q'](),
      answer: m['alternative.faq1_a'](),
      source: undefined,
    },
    {
      question: m['alternative.faq2_q'](),
      answer: m['alternative.faq2_a'](),
      source: picrewSources.accounts,
    },
    {
      question: m['alternative.faq3_q'](),
      answer: m['alternative.faq3_a'](),
      source: undefined,
    },
    {
      question: m['alternative.faq4_q'](),
      answer: m['alternative.faq4_a'](),
      source: picrewSources.edit,
    },
    {
      question: m['alternative.faq5_q'](),
      answer: m['alternative.faq5_a'](),
      source: undefined,
    },
    {
      question: m['alternative.faq6_q'](),
      answer: m['alternative.faq6_a'](),
      source: undefined,
    },
    {
      question: m['alternative.faq7_q'](),
      answer: m['alternative.faq7_a'](),
      source: undefined,
    },
  ];
  const sources = [
    { label: m['alternative.source_play'](), href: picrewSources.play },
    { label: m['alternative.source_edit'](), href: picrewSources.edit },
    { label: m['alternative.source_accounts'](), href: picrewSources.accounts },
    {
      label: m['alternative.source_favorites'](),
      href: picrewSources.favorites,
    },
    { label: m['alternative.source_save'](), href: picrewSources.save },
    { label: m['alternative.source_premium'](), href: picrewSources.premium },
    { label: m['alternative.source_rules'](), href: picrewSources.rules },
  ];
  const related = [
    { label: m['entry.home'](), href: '/' },
    { label: m['alternative.related_square'](), href: '/square-pfp' },
    { label: m['alternative.related_pfp'](), href: '/pfp-maker' },
    { label: m['alternative.related_convert'](), href: '/image-to-pixel-art' },
    { label: m['alternative.related_resize'](), href: '/pixel-art-resizer' },
    {
      label: m['alternative.related_pattern'](),
      href: '/pixel-art-pattern-maker',
    },
  ];
  return (
    <div className="pixel-site face-home">
      <Header />
      <main>
        <section className="face-home-intro">
          <div>
            <span className="eyebrow">
              <ScanFace size={14} />
              {m['alternative.eyebrow']()}
            </span>
            <h1>{m['alternative.h1']()}</h1>
            <p>{m['alternative.intro']()}</p>
            <div className="hero-promises">
              {[
                m['alternative.promise1'](),
                m['alternative.promise2'](),
                m['alternative.promise3'](),
                m['alternative.promise4'](),
              ].map((label) => (
                <span key={label}>
                  <Check size={14} />
                  {label}
                </span>
              ))}
            </div>
          </div>
          <a href="#workspace" className="pixel-button secondary">
            {m['alternative.try']()}
            <ArrowRight size={16} />
          </a>
        </section>
        <div className="home-workspace">
          <AvatarWorkspace
            copy={copy}
            initialOptions={avatarEntries.pfp.preset}
          />
        </div>
        <section className="pixel-section face-introduction">
          <h2>{m['alternative.position_title']()}</h2>
          <div>
            <p>{m['alternative.position1']()}</p>
            <p>
              {m['alternative.position2']()}{' '}
              <a href={picrewSources.play} className="alternative-source">
                {m['alternative.source']()}
              </a>
            </p>
            <p>{m['alternative.disclosure']()}</p>
          </div>
        </section>
        <section className="pixel-section face-content-section">
          <h2>{m['alternative.benefits_title']()}</h2>
          <div className="face-content-grid">
            {benefits.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="pixel-section face-content-section">
          <h2>{m['alternative.compare_title']()}</h2>
          <p className="face-section-intro">
            {m['alternative.compare_intro']()}
          </p>
          <div
            className="alternative-comparison-wrapper"
            role="region"
            aria-label={m['alternative.table_caption']()}
            tabIndex={0}
          >
            <table className="alternative-table">
              <caption className="sr-only">
                {m['alternative.table_caption']()}
              </caption>
              <thead>
                <tr>
                  <th scope="col">{m['alternative.table_step']()}</th>
                  <th scope="col">{m['alternative.table_ours']()}</th>
                  <th scope="col">{m['alternative.table_picrew']()}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{row.ours}</td>
                    <td>
                      {row.theirs}
                      <div className="alternative-row-sources">
                        {row.sources.map((source, i) => (
                          <a
                            href={source}
                            key={source}
                            className="alternative-source"
                          >
                            {m['alternative.source']()}
                            {row.sources.length > 1 ? ` ${i + 1}` : ''}
                          </a>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <a href="#workspace" className="pixel-button secondary">
            {m['alternative.compare_cta']()}
            <ArrowRight size={16} />
          </a>
        </section>
        <section className="pixel-section how-section">
          <h2>{m['alternative.steps_title']()}</h2>
          <div className="how-grid">
            {steps.map((step, i) => (
              <article key={step.title}>
                <span className="step-number">0{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="pixel-section face-content-section">
          <h2>{m['alternative.cases_title']()}</h2>
          <div className="face-content-grid">
            {cases.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="pixel-section face-introduction">
          <h2>{m['alternative.choose_title']()}</h2>
          <div>
            <p>{m['alternative.choose1']()}</p>
            <p>
              {m['alternative.choose2']()}{' '}
              <a href={picrewSources.rules} className="alternative-source">
                {m['alternative.source']()}
              </a>
            </p>
          </div>
        </section>
        <section className="pixel-section face-introduction">
          <h2>{m['alternative.limits_title']()}</h2>
          <div>
            <p>
              {m['alternative.limits1']()}{' '}
              <Link className="text-link" href="/image-to-pixel-art">
                {m['alternative.related_convert']()}
              </Link>
            </p>
            <p>
              {m['alternative.limits2']()}{' '}
              <a href={picrewSources.save} className="alternative-source">
                {m['alternative.source']()}
              </a>
            </p>
          </div>
        </section>
        <section className="pixel-section faq-section">
          <h2>{m['alternative.faq_title']()}</h2>
          <div>
            {faqs.map((item) => (
              <details key={item.question}>
                <summary>
                  {item.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>
                  {item.answer}
                  {item.source && (
                    <>
                      {' '}
                      <a href={item.source} className="alternative-source">
                        {m['alternative.source']()}
                      </a>
                    </>
                  )}
                </p>
              </details>
            ))}
          </div>
        </section>
        <section className="pixel-section face-content-section">
          <h2>{m['alternative.related_title']()}</h2>
          <p className="face-section-intro">
            {m['alternative.related_description']()}
          </p>
          <div className="face-content-grid">
            {related.map((item) => (
              <Link href={item.href} key={item.href} className="text-link">
                {item.label}
                <ArrowRight size={14} />
              </Link>
            ))}
          </div>
        </section>
        <section className="pixel-section face-content-section">
          <h2>{m['alternative.sources_title']()}</h2>
          <p className="face-section-intro">
            {m['alternative.sources_note']()}
          </p>
          <div className="face-content-grid">
            {sources.map((item) => (
              <a href={item.href} key={item.href} className="text-link">
                {item.label}
                <ArrowRight size={14} />
              </a>
            ))}
          </div>
        </section>
        <section className="pixel-section face-final-cta">
          <h2>{m['alternative.final_title']()}</h2>
          <p>{m['alternative.final_description']()}</p>
          <a href="#workspace" className="pixel-button">
            {m['alternative.try']()}
            <ArrowRight size={16} />
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
