import { ArrowRight } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import type { PixelCopy, WorkspaceMode } from '@/components/pixel/workspace';

type Tool = WorkspaceMode | 'avatar';

const paths: Record<Tool, string> = {
  avatar: '/',
  convert: '/image-to-pixel-art',
  resize: '/pixel-art-resizer',
  pattern: '/pixel-art-pattern-maker',
};

const nextTools: Record<Tool, readonly [Tool, Tool, Tool]> = {
  avatar: ['resize', 'pattern', 'convert'],
  convert: ['pattern', 'resize', 'avatar'],
  resize: ['pattern', 'convert', 'avatar'],
  pattern: ['convert', 'avatar', 'resize'],
};

export function ResultNextSteps({
  copy,
  mode,
}: {
  copy: PixelCopy;
  mode: Tool;
}) {
  const [first, second, more] = nextTools[mode];
  return (
    <section className="result-next-steps" aria-label={copy.next_title}>
      <h3>{copy.next_title}</h3>
      <p className="result-next-hint">
        {mode === 'pattern' ? copy.next_pattern_hint : copy.next_save_hint}
      </p>
      <div className="result-next-grid">
        {[first, second].map((tool) => (
          <Link href={paths[tool]} className="result-next-card" key={tool}>
            <strong>
              {copy[tool + '_title']}
              <ArrowRight size={15} aria-hidden="true" />
            </strong>
            <span>{copy['next_' + mode + '_' + tool]}</span>
          </Link>
        ))}
      </div>
      <Link href={paths[more]} className="result-next-more">
        <strong>{copy[more + '_title']}</strong>
        <span>{copy['next_' + mode + '_' + more]}</span>
        <ArrowRight size={15} aria-hidden="true" />
      </Link>
      <p className="result-next-tip">
        <strong>{copy.next_tip_title}</strong> {copy['next_tip_' + mode]}
      </p>
    </section>
  );
}
