import { useEffect, useRef, useState } from 'react';
import { ArrowDownToLine, Shuffle } from 'lucide-react';

import {
  downloadCanvas,
  drawAvatar,
  scalePixels,
  type AvatarOptions,
} from '@/lib/pixel-tools';
import type { PixelCopy } from '@/components/pixel/workspace';

const defaultOptions: AvatarOptions = {
  skin: '#e4b48e',
  hair: '#253e55',
  shirt: '#dc7e53',
  background: '#dfebdf',
  hairstyle: 0,
  expression: 0,
  glasses: false,
};
const swatches: Record<'skin' | 'hair' | 'shirt' | 'background', string[]> = {
  skin: ['#f5d8bd', '#e4b48e', '#c58e64', '#9e6644', '#754c38'],
  hair: ['#253e55', '#754c38', '#cfa57b', '#b95864', '#7c759b'],
  shirt: ['#dc7e53', '#31556c', '#537f69', '#7c759b', '#f2b35b'],
  background: ['#dfebdf', '#f4e6c6', '#cadfe9', '#ead5d9', 'transparent'],
};

export function AvatarWorkspace({ copy }: { copy: PixelCopy }) {
  const [options, setOptions] = useState(defaultOptions);
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
      hairstyle: Math.floor(Math.random() * 3),
      expression: Math.floor(Math.random() * 3),
      glasses: Math.random() > 0.5,
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
        <aside className="workspace-controls">
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
            </fieldset>
          ))}
          <label className="control-field">
            {copy.hairstyle}
            <select
              value={options.hairstyle}
              onChange={(e) =>
                setOptions((o) => ({ ...o, hairstyle: Number(e.target.value) }))
              }
            >
              {['short', 'long', 'spiky'].map((key, i) => (
                <option key={key} value={i}>
                  {copy[key]}
                </option>
              ))}
            </select>
          </label>
          <label className="control-field">
            {copy.expression}
            <select
              value={options.expression}
              onChange={(e) =>
                setOptions((o) => ({
                  ...o,
                  expression: Number(e.target.value),
                }))
              }
            >
              {['smile', 'happy', 'surprised'].map((key, i) => (
                <option key={key} value={i}>
                  {copy[key]}
                </option>
              ))}
            </select>
          </label>
          <label className="check-field">
            <input
              type="checkbox"
              checked={options.glasses}
              onChange={(e) =>
                setOptions((o) => ({ ...o, glasses: e.target.checked }))
              }
            />
            {copy.glasses}
          </label>
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
