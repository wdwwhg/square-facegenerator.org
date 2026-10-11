import { useEffect, useRef, useState } from 'react';
import {
  ArrowDownToLine,
  Check,
  ImagePlus,
  Printer,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';

import {
  convertPixels,
  downloadCanvas,
  drawExample,
  numberedGrid,
  readLocalImage,
  scalePixels,
  type PaletteName,
  type PixelResult,
} from '@/lib/pixel-tools';
import { ResultNextSteps } from '@/components/pixel/next-steps';

export type PixelCopy = Record<string, string>;
export type WorkspaceMode = 'convert' | 'resize' | 'pattern';

export function PixelWorkspace({
  copy,
  mode = 'convert',
}: {
  copy: PixelCopy;
  mode?: WorkspaceMode;
}) {
  const [source, setSource] = useState<
    HTMLCanvasElement | HTMLImageElement | null
  >(null);
  const [filename, setFilename] = useState('landscape');
  const [resolution, setResolution] = useState(48);
  const [palette, setPalette] = useState<PaletteName>('studio');
  const [colors, setColors] = useState(16);
  const [brightness, setBrightness] = useState(0);
  const [dither, setDither] = useState(false);
  const [factor, setFactor] = useState(2);
  const [result, setResult] = useState<PixelResult | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [gridUrl, setGridUrl] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const preview = useRef<HTMLCanvasElement>(null);
  const original = useRef<HTMLCanvasElement>(null);
  const requestId = useRef(0);
  const isPattern = mode === 'pattern';
  const isResize = mode === 'resize';
  const workspaceTitle = isResize
    ? copy.resize_title
    : isPattern
      ? copy.pattern_title
      : copy.workspace_title;

  useEffect(() => {
    setSource(drawExample('landscape'));
    if (isPattern) setResolution(32);
    return () => {
      requestId.current++;
    };
  }, [isPattern]);

  useEffect(() => {
    if (!source) return;
    try {
      const next = isResize
        ? { canvas: scalePixels(source, factor), colors: [] }
        : convertPixels(source, {
            resolution,
            palette,
            colors,
            brightness,
            dither,
          });
      setResult(next);
      setGridUrl(isPattern ? numberedGrid(next).toDataURL('image/png') : '');
      if (preview.current) {
        const c = preview.current;
        c.width = next.canvas.width;
        c.height = next.canvas.height;
        c.getContext('2d')!.drawImage(next.canvas, 0, 0);
      }
      if (original.current) {
        const c = original.current,
          ratio = 320 / Math.max(source.width, source.height);
        c.width = Math.max(1, Math.round(source.width * ratio));
        c.height = Math.max(1, Math.round(source.height * ratio));
        c.getContext('2d')!.drawImage(source, 0, 0, c.width, c.height);
      }
      setError('');
    } catch (e) {
      setResult(null);
      setGridUrl('');
      if (preview.current)
        preview.current
          .getContext('2d')!
          .clearRect(0, 0, preview.current.width, preview.current.height);
      setError(
        e instanceof Error && e.message === 'dimensions'
          ? copy.error_dimensions
          : copy.error_processing
      );
    }
  }, [
    source,
    resolution,
    palette,
    colors,
    brightness,
    dither,
    factor,
    isPattern,
    isResize,
    copy.error_dimensions,
    copy.error_processing,
  ]);

  async function chooseFile(file?: File) {
    if (!file) return;
    const id = ++requestId.current;
    setBusy(true);
    setError('');
    try {
      const image = await readLocalImage(file);
      if (id !== requestId.current) return;
      setSource(image);
      setFilename(file.name.replace(/\.[^.]+$/, ''));
    } catch (e) {
      if (id !== requestId.current) return;
      const reason = e instanceof Error ? e.message : 'decode';
      setError(copy['error_' + reason] || copy.error_decode);
    } finally {
      if (id === requestId.current) setBusy(false);
      if (input.current) input.current.value = '';
    }
  }

  function useExample(kind: 'landscape' | 'flower' | 'cat') {
    requestId.current++;
    setBusy(false);
    setError('');
    setSource(drawExample(kind));
    setFilename(kind);
  }
  async function save(type: 'native' | 'large' | 'grid') {
    if (!result || busy) return;
    try {
      const c =
        type === 'grid'
          ? numberedGrid(result)
          : type === 'large'
            ? scalePixels(result.canvas, 8)
            : result.canvas;
      await downloadCanvas(c, 'pixel-' + type + '.png');
    } catch {
      setError(copy.error_export);
    }
  }

  return (
    <section
      id="workspace"
      className="pixel-workspace"
      aria-label={workspaceTitle}
    >
      <div className="workspace-bar">
        <span>
          <i className="status-dot" />
          {workspaceTitle}
        </span>
        <span className="local-tag">
          <ShieldCheck size={14} />
          {copy.local}
        </span>
      </div>
      <div className="workspace-body">
        <aside className="workspace-controls">
          <span className="step-caption">01 / {copy.source}</span>
          <input
            ref={input}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="sr-only"
            aria-label={copy.upload}
            onChange={(e) => void chooseFile(e.target.files?.[0])}
          />
          <button
            type="button"
            className={'upload-zone ' + (dragging ? 'dragging' : '')}
            disabled={busy}
            onClick={() => input.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              void chooseFile(e.dataTransfer.files[0]);
            }}
          >
            <ImagePlus size={25} />
            <strong>{busy ? copy.processing : copy.upload}</strong>
            <span>{copy.upload_hint}</span>
          </button>
          <p className="small-label">{copy.examples}</p>
          <div className="example-buttons">
            {(['landscape', 'flower', 'cat'] as const).map((kind) => (
              <button
                type="button"
                key={kind}
                onClick={() => useExample(kind)}
                aria-pressed={filename === kind}
              >
                {copy[kind]}
              </button>
            ))}
          </div>
          <div className="control-divider" />
          <span className="step-caption">02 / {copy.adjust}</span>
          {isResize ? (
            <label className="control-field">
              {copy.scale}
              <select
                value={factor}
                onChange={(e) => setFactor(Number(e.target.value))}
              >
                {[2, 3, 4, 6, 8].map((n) => (
                  <option key={n} value={n}>
                    {n}×
                  </option>
                ))}
              </select>
              <small>{copy.scale_hint}</small>
            </label>
          ) : (
            <>
              <label className="control-field">
                <span>
                  {copy.resolution}
                  <b>{resolution}px</b>
                </span>
                <input
                  aria-label={copy.resolution}
                  type="range"
                  min="16"
                  max="128"
                  step="16"
                  value={resolution}
                  onChange={(e) => setResolution(Number(e.target.value))}
                />
                <small>{copy.resolution_hint}</small>
              </label>
              <label className="control-field">
                {copy.palette}
                <select
                  value={palette}
                  onChange={(e) => setPalette(e.target.value as PaletteName)}
                >
                  {(['studio', 'auto', 'gameboy', 'mono'] as const).map((p) => (
                    <option key={p} value={p}>
                      {copy['palette_' + p]}
                    </option>
                  ))}
                </select>
              </label>
              {palette === 'auto' && (
                <label className="control-field">
                  {copy.colors}
                  <select
                    value={colors}
                    onChange={(e) => setColors(Number(e.target.value))}
                  >
                    {[8, 16, 24, 32].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <label className="control-field">
                <span>
                  {copy.brightness}
                  <b>
                    {brightness > 0 ? '+' : ''}
                    {brightness}
                  </b>
                </span>
                <input
                  aria-label={copy.brightness}
                  type="range"
                  min="-30"
                  max="30"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                />
              </label>
              <label className="check-field">
                <input
                  type="checkbox"
                  checked={dither}
                  onChange={(e) => setDither(e.target.checked)}
                />
                {copy.dither}
              </label>
            </>
          )}
          <button
            type="button"
            className="reset-control"
            onClick={() => {
              setResolution(isPattern ? 32 : 48);
              setPalette('studio');
              setBrightness(0);
              setColors(16);
              setDither(false);
              setFactor(2);
            }}
          >
            <RotateCcw size={14} />
            {copy.reset}
          </button>
        </aside>
        <div className="workspace-stage">
          <div className="preview-heading">
            <span>{copy.live_preview}</span>
            <span className="file-name" title={filename}>
              {filename}
            </span>
          </div>
          <div className="preview-pair">
            <figure>
              <div className="preview-canvas source-canvas">
                <canvas ref={original} aria-label={copy.before} />
              </div>
              <figcaption>{copy.before}</figcaption>
            </figure>
            <figure>
              <div className="preview-canvas result-canvas">
                <canvas
                  ref={preview}
                  aria-label={copy.after}
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
              <figcaption>
                {copy.after}
                <span>
                  {result
                    ? result.canvas.width + ' × ' + result.canvas.height
                    : '—'}
                </span>
              </figcaption>
            </figure>
          </div>
          {!isResize && (
            <div className="palette-strip" aria-label={copy.used_colors}>
              {result?.colors.map((color) => (
                <span
                  key={color.hex}
                  style={{ background: color.hex }}
                  title={color.hex + ' · ' + color.count}
                />
              ))}
              <small>
                {result?.colors.length || 0} {copy.used_colors}
              </small>
            </div>
          )}
          <div className="export-row">
            <div>
              <Check size={14} />
              <span>{copy.ready}</span>
            </div>
            <div className="export-buttons">
              <button
                type="button"
                className="pixel-button secondary"
                disabled={!result || busy}
                onClick={() => void save(isPattern ? 'grid' : 'native')}
              >
                <ArrowDownToLine size={16} />
                {isPattern ? copy.download_grid : copy.download}
              </button>
              {!isResize && !isPattern && (
                <button
                  type="button"
                  className="pixel-button"
                  disabled={!result || busy}
                  onClick={() => void save('large')}
                >
                  <ArrowDownToLine size={16} />
                  {copy.download_large}
                </button>
              )}
              {isPattern && (
                <button
                  type="button"
                  className="pixel-button"
                  disabled={!result || busy || !gridUrl}
                  onClick={() => window.print()}
                >
                  <Printer size={16} />
                  {copy.print}
                </button>
              )}
            </div>
          </div>
          <p className="export-note">
            {isResize
              ? copy.resize_note
              : isPattern
                ? copy.pattern_note
                : copy.export_note}
          </p>
          <p className="workspace-error" role="alert">
            {error}
          </p>
          {result && !busy && <ResultNextSteps copy={copy} mode={mode} />}
        </div>
      </div>
      {isPattern && result && (
        <div className="pattern-materials">
          <h3>{copy.materials}</h3>
          <p>{copy.materials_note}</p>
          <div className="material-list">
            {result.colors.map((color, i) => (
              <div key={color.hex}>
                <span style={{ background: color.hex }} />
                <b>{i + 1}</b>
                <code>{color.hex}</code>
                <span>
                  {color.count} {copy.cells}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {isPattern && gridUrl && (
        <div className="print-pattern">
          <h1>{copy.pattern_title}</h1>
          <p>
            {result?.canvas.width} × {result?.canvas.height} ·{' '}
            {copy.materials_note}
          </p>
          <img src={gridUrl} alt={copy.pattern_title} />
          <div className="print-legend">
            {result?.colors.map((color, i) => (
              <span key={color.hex}>
                <i style={{ background: color.hex }} />
                {i + 1} · {color.hex} · {color.count}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
