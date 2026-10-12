import { useEffect, useRef, useState } from 'react';
import { ArrowDownToLine, Shuffle } from 'lucide-react';

import {
  avatarExpressions,
  avatarEyewear,
  avatarFacialHair,
  avatarHairstyles,
  downloadCanvas,
  drawAvatar,
  scalePixels,
  type AvatarOptions,
} from '@/lib/pixel-tools';
import { ResultNextSteps } from '@/components/pixel/next-steps';
import type { PixelCopy } from '@/components/pixel/workspace';

const defaultOptions: AvatarOptions = {
  skin: '#e4b48e',
  hair: '#253e55',
  shirt: '#dc7e53',
  background: '#dfebdf',
  hairstyle: 0,
  expression: 0,
  eyewear: 0,
  facialHair: 0,
};
const swatches: Record<'skin' | 'hair' | 'shirt' | 'background', string[]> = {
  skin: [
    '#fff0dc',
    '#f5d8bd',
    '#f0c7a5',
    '#e4b48e',
    '#d8a077',
    '#c58e64',
    '#bb7f59',
    '#9e6644',
    '#8c573d',
    '#754c38',
    '#5d3829',
    '#3d251e',
  ],
  hair: [
    '#253e55',
    '#754c38',
    '#cfa57b',
    '#b95864',
    '#7c759b',
    '#151b24',
    '#3b2925',
    '#a66c50',
    '#e0bd74',
    '#ece9dd',
    '#f2b35b',
    '#4d7d87',
    '#537f69',
    '#e4a3a1',
    '#5e8acb',
    '#9c5fc2',
  ],
  shirt: [
    '#dc7e53',
    '#31556c',
    '#537f69',
    '#7c759b',
    '#f2b35b',
    '#182b43',
    '#fff2d8',
    '#b95864',
    '#4d7d87',
    '#91b6a6',
    '#ac9fb6',
    '#e4a3a1',
    '#5e8acb',
    '#9c5fc2',
    '#d85087',
    '#754c38',
  ],
  background: [
    '#dfebdf',
    '#f4e6c6',
    '#cadfe9',
    '#ead5d9',
    '#ffffff',
    '#faf8f2',
    '#182b43',
    '#253e55',
    '#d7c9eb',
    '#cde9e1',
    '#f7d6b5',
    '#f5d583',
    '#d0d8e4',
    '#b8d1c3',
    '#e4a3a1',
    '#4d7d87',
    'transparent',
  ],
};

export function AvatarWorkspace({
  copy,
  initialOptions,
}: {
  copy: PixelCopy;
  initialOptions?: Partial<AvatarOptions>;
}) {
  const [options, setOptions] = useState(() => ({
    ...defaultOptions,
    ...initialOptions,
  }));
  const [error, setError] = useState('');
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const image = drawAvatar(options),
      canvas = ref.current;
    if (!canvas) return;
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(image, 0, 0, 256, 256);
  }, [options]);
  function randomize() {
    const pick = (values: string[]) =>
      values[Math.floor(Math.random() * values.length)];
    setOptions({
      skin: pick(swatches.skin),
      hair: pick(swatches.hair),
      shirt: pick(swatches.shirt),
      background: pick(swatches.background),
      hairstyle: Math.floor(Math.random() * avatarHairstyles.length),
      expression: Math.floor(Math.random() * avatarExpressions.length),
      eyewear: Math.floor(Math.random() * avatarEyewear.length),
      facialHair: Math.floor(Math.random() * avatarFacialHair.length),
    });
  }
  async function save() {
    try {
      await downloadCanvas(
        scalePixels(drawAvatar(options), 8),
        'square-face.png'
      );
    } catch {
      setError(copy.error_export);
    }
  }
  return (
    <section
      id="workspace"
      className="pixel-workspace avatar-workspace"
      aria-label={copy.avatar_title}
    >
      <div className="workspace-bar">
        <span>
          <i className="status-dot" />
          {copy.avatar_title}
        </span>
        <span className="local-tag">{copy.local}</span>
      </div>
      <div className="workspace-body">
        <aside
          className="workspace-controls"
          aria-label={copy.customize_avatar}
          tabIndex={0}
        >
          {(['skin', 'hair', 'shirt', 'background'] as const).map((key) => (
            <fieldset className="avatar-field" key={key}>
              <legend>{copy[key]}</legend>
              <div className="color-swatches">
                {swatches[key].map((color, i) => (
                  <button
                    type="button"
                    key={color}
                    style={{
                      background:
                        color === 'transparent'
                          ? 'repeating-conic-gradient(#ddd 0% 25%,white 0% 50%) 0 / 12px 12px'
                          : color,
                    }}
                    aria-label={
                      copy[key] +
                      ' ' +
                      (color === 'transparent' ? copy.transparent : color)
                    }
                    aria-pressed={options[key] === color}
                    onClick={() => setOptions((o) => ({ ...o, [key]: color }))}
                  >
                    <span className="sr-only">{i + 1}</span>
                  </button>
                ))}
              </div>
              <label className="avatar-custom-color">
                <span>{copy.custom_color}</span>
                <input
                  type="color"
                  aria-label={copy.custom_color + ' · ' + copy[key]}
                  value={
                    options[key] === 'transparent' ? '#dfebdf' : options[key]
                  }
                  onChange={(e) =>
                    setOptions((o) => ({ ...o, [key]: e.target.value }))
                  }
                />
                <code>
                  {options[key] === 'transparent'
                    ? copy.transparent
                    : options[key]}
                </code>
              </label>
            </fieldset>
          ))}
          {(
            [
              ['hairstyle', avatarHairstyles],
              ['expression', avatarExpressions],
              ['eyewear', avatarEyewear],
              ['facialHair', avatarFacialHair],
            ] as const
          ).map(([field, choices]) => (
            <label className="control-field" key={field}>
              {copy[field]}
              <select
                value={options[field]}
                onChange={(e) =>
                  setOptions((o) => ({ ...o, [field]: Number(e.target.value) }))
                }
              >
                {choices.map((key, i) => (
                  <option key={key} value={i}>
                    {copy[key]}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </aside>
        <div className="workspace-stage avatar-stage">
          <div className="avatar-previews">
            <div className="avatar-main">
              <canvas
                ref={ref}
                width={256}
                height={256}
                role="img"
                aria-label={copy.avatar_preview}
              />
            </div>
            <div
              className="circle-preview"
              aria-hidden="true"
              style={{
                background:
                  options.background === 'transparent'
                    ? '#fff'
                    : options.background,
              }}
            >
              <AvatarCircle options={options} />
            </div>
          </div>
          <p>{copy.avatar_crop}</p>
          <div className="avatar-actions">
            <button
              type="button"
              className="pixel-button secondary"
              onClick={randomize}
            >
              <Shuffle size={16} />
              {copy.random}
            </button>
            <button
              type="button"
              className="pixel-button"
              onClick={() => void save()}
            >
              <ArrowDownToLine size={16} />
              {copy.download_avatar}
            </button>
          </div>
          <p className="export-note">{copy.avatar_note}</p>
          <p role="alert" className="workspace-error">
            {error}
          </p>
          <ResultNextSteps copy={copy} mode="avatar" />
        </div>
      </div>
    </section>
  );
}

function AvatarCircle({ options }: { options: AvatarOptions }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const c = ref.current;
    c.width = 96;
    c.height = 96;
    const ctx = c.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(drawAvatar(options), 0, 0, 96, 96);
  }, [options]);
  return <canvas ref={ref} width={96} height={96} />;
}
