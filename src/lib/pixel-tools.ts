export type PaletteName = 'auto' | 'studio' | 'gameboy' | 'mono';
export type PixelResult = {
  canvas: HTMLCanvasElement;
  colors: { hex: string; count: number }[];
};

const palettes: Record<Exclude<PaletteName, 'auto'>, string[]> = {
  studio: [
    '#182b43',
    '#31556c',
    '#4d7d87',
    '#91b6a6',
    '#dedec1',
    '#fff2d8',
    '#cfa57b',
    '#a66c50',
    '#75464a',
    '#dc7e53',
    '#f2b35b',
    '#f5d583',
    '#7c759b',
    '#ac9fb6',
    '#b95864',
    '#e4a3a1',
  ],
  gameboy: ['#0f380f', '#306230', '#8bac0f', '#9bbc0f'],
  mono: ['#192737', '#536273', '#94a1ab', '#d2d8dc', '#ffffff'],
};
const rgb = (hex: string) =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const hexOf = (values: number[]) =>
  '#' +
  values
    .map((v) =>
      Math.max(0, Math.min(255, Math.round(v)))
        .toString(16)
        .padStart(2, '0')
    )
    .join('');

export function makeCanvas(width: number, height: number) {
  if (
    !Number.isInteger(width) ||
    !Number.isInteger(height) ||
    width < 1 ||
    height < 1 ||
    width > 4096 ||
    height > 4096 ||
    width * height > 16_000_000
  )
    throw new Error('dimensions');
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

export async function readLocalImage(file: File): Promise<HTMLImageElement> {
  if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type))
    throw new Error('format');
  if (file.size > 10 * 1024 * 1024) throw new Error('size');
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = url;
    await image.decode();
    if (image.naturalWidth * image.naturalHeight > 16_000_000)
      throw new Error('dimensions');
    return image;
  } catch (error) {
    if (error instanceof Error && error.message === 'dimensions') throw error;
    throw new Error('decode');
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function convertPixels(
  source: CanvasImageSource & { width: number; height: number },
  options: {
    resolution: number;
    palette: PaletteName;
    colors: number;
    brightness: number;
    dither: boolean;
  }
): PixelResult {
  const ratio = options.resolution / Math.max(source.width, source.height);
  const canvas = makeCanvas(
    Math.max(1, Math.round(source.width * ratio)),
    Math.max(1, Math.round(source.height * ratio))
  );
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
  const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = new Float32Array(image.data);
  const histogram = new Map<string, number>();
  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] < 128) {
      pixels[i + 3] = 0;
      continue;
    }
    for (let c = 0; c < 3; c++)
      pixels[i + c] = Math.max(
        0,
        Math.min(255, pixels[i + c] + options.brightness * 2.55)
      );
    const key = hexOf(
      [0, 1, 2].map((c) => Math.min(255, Math.round(pixels[i + c] / 32) * 32))
    );
    histogram.set(key, (histogram.get(key) || 0) + 1);
  }
  const palette =
    options.palette === 'auto'
      ? [...histogram.entries()]
          .sort((a, b) => b[1] - a[1])
          .slice(0, options.colors)
          .map(([h]) => h)
      : palettes[options.palette];
  const colors = palette.map(rgb);
  const counts = new Map<string, number>();
  for (let y = 0; y < canvas.height; y++)
    for (let x = 0; x < canvas.width; x++) {
      const i = (y * canvas.width + x) * 4;
      if (!pixels[i + 3]) {
        image.data[i + 3] = 0;
        continue;
      }
      let best = 0,
        distance = Infinity;
      colors.forEach((color, p) => {
        const d = color.reduce(
          (sum, value, c) => sum + (pixels[i + c] - value) ** 2,
          0
        );
        if (d < distance) {
          distance = d;
          best = p;
        }
      });
      const chosen = colors[best];
      if (!chosen) continue;
      counts.set(palette[best], (counts.get(palette[best]) || 0) + 1);
      chosen.forEach((value, c) => {
        const error = pixels[i + c] - value;
        image.data[i + c] = value;
        if (options.dither)
          for (const [dx, dy, weight] of [
            [1, 0, 7 / 16],
            [-1, 1, 3 / 16],
            [0, 1, 5 / 16],
            [1, 1, 1 / 16],
          ]) {
            const nx = x + dx,
              ny = y + dy;
            if (nx >= 0 && nx < canvas.width && ny < canvas.height) {
              const ni = (ny * canvas.width + nx) * 4;
              if (pixels[ni + 3]) pixels[ni + c] += error * weight;
            }
          }
      });
      image.data[i + 3] = 255;
    }
  ctx.putImageData(image, 0, 0);
  return {
    canvas,
    colors: [...counts.entries()]
      .map(([hex, count]) => ({ hex, count }))
      .sort((a, b) => b.count - a.count),
  };
}

export function scalePixels(
  source: HTMLCanvasElement | HTMLImageElement,
  factor: number
) {
  const canvas = makeCanvas(source.width * factor, source.height * factor);
  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
  return canvas;
}

export function numberedGrid(result: PixelResult) {
  const { canvas: source, colors } = result;
  const cell = 24;
  const output = makeCanvas(source.width * cell + 1, source.height * cell + 1);
  const ctx = output.getContext('2d')!;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, output.width, output.height);
  const data = source
    .getContext('2d')!
    .getImageData(0, 0, source.width, source.height).data;
  const numbers = new Map(colors.map((c, i) => [c.hex.toLowerCase(), i + 1]));
  ctx.font = '9px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (let y = 0; y < source.height; y++)
    for (let x = 0; x < source.width; x++) {
      const i = (y * source.width + x) * 4;
      if (!data[i + 3]) continue;
      const color = hexOf([data[i], data[i + 1], data[i + 2]]);
      ctx.fillStyle = color;
      ctx.fillRect(x * cell, y * cell, cell, cell);
      ctx.fillStyle =
        data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114 > 145
          ? '#172b43'
          : '#ffffff';
      ctx.fillText(
        String(numbers.get(color) || ''),
        x * cell + cell / 2,
        y * cell + cell / 2
      );
    }
  for (let x = 0; x <= source.width; x++) {
    ctx.strokeStyle = x % 5 === 0 ? '#172b43' : '#6b7c8b';
    ctx.lineWidth = x % 5 === 0 ? 1 : 0.35;
    ctx.beginPath();
    ctx.moveTo(x * cell + 0.5, 0);
    ctx.lineTo(x * cell + 0.5, output.height);
    ctx.stroke();
  }
  for (let y = 0; y <= source.height; y++) {
    ctx.strokeStyle = y % 5 === 0 ? '#172b43' : '#6b7c8b';
    ctx.lineWidth = y % 5 === 0 ? 1 : 0.35;
    ctx.beginPath();
    ctx.moveTo(0, y * cell + 0.5);
    ctx.lineTo(output.width, y * cell + 0.5);
    ctx.stroke();
  }
  return output;
}

export async function downloadCanvas(canvas: HTMLCanvasElement, name: string) {
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, 'image/png')
  );
  if (!blob) throw new Error('export');
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export function drawExample(kind: 'landscape' | 'flower' | 'cat') {
  const c = makeCanvas(256, 256),
    ctx = c.getContext('2d')!;
  ctx.fillStyle = '#f4e6c6';
  ctx.fillRect(0, 0, 256, 256);
  if (kind === 'landscape') {
    ctx.fillStyle = '#a8c6ce';
    ctx.fillRect(0, 0, 256, 155);
    ctx.fillStyle = '#f5d583';
    ctx.fillRect(168, 34, 42, 42);
    for (const [color, top] of [
      ['#749e97', 92],
      ['#426b72', 131],
      ['#253e55', 174],
    ] as const) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, 256);
      ctx.lineTo(0, top + 35);
      ctx.lineTo(60, top);
      ctx.lineTo(125, top + 40);
      ctx.lineTo(188, top + 8);
      ctx.lineTo(256, top + 50);
      ctx.lineTo(256, 256);
      ctx.fill();
    }
    ctx.fillStyle = '#d5e5d5';
    ctx.fillRect(0, 196, 256, 11);
    ctx.fillRect(30, 217, 128, 9);
  } else if (kind === 'flower') {
    ctx.fillStyle = '#537f69';
    ctx.fillRect(119, 100, 18, 156);
    ctx.fillRect(73, 171, 46, 20);
    ctx.fillRect(137, 194, 45, 20);
    ctx.fillStyle = '#dc7e53';
    for (const [x, y] of [
      [128, 48],
      [87, 72],
      [169, 72],
      [89, 113],
      [168, 113],
    ]) {
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = '#f5d583';
    ctx.beginPath();
    ctx.arc(128, 92, 26, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillStyle = '#de9e60';
    ctx.fillRect(48, 82, 160, 120);
    ctx.fillRect(48, 43, 45, 50);
    ctx.fillRect(163, 43, 45, 50);
    ctx.fillStyle = '#182b43';
    ctx.fillRect(77, 116, 16, 20);
    ctx.fillRect(163, 116, 16, 20);
    ctx.fillRect(112, 148, 32, 12);
    ctx.fillStyle = '#dc7e53';
    ctx.fillRect(59, 145, 26, 16);
    ctx.fillRect(174, 145, 26, 16);
    ctx.fillStyle = '#fff2d8';
    ctx.fillRect(93, 175, 69, 26);
  }
  return c;
}

export const avatarHairstyles = [
  'short',
  'long',
  'spiky',
  'bob',
  'pixie',
  'curly',
  'ponytail',
  'pigtails',
  'bun',
  'mohawk',
  'buzz',
  'bald',
] as const;
export const avatarExpressions = [
  'smile',
  'happy',
  'surprised',
  'neutral',
  'wink',
  'laugh',
  'sleepy',
  'angry',
  'sad',
  'shy',
] as const;
export const avatarEyewear = [
  'none',
  'square_glasses',
  'round_glasses',
  'sunglasses',
  'visor',
] as const;
export const avatarFacialHair = [
  'none',
  'moustache',
  'goatee',
  'beard',
] as const;

export type AvatarOptions = {
  skin: string;
  hair: string;
  shirt: string;
  background: string;
  hairstyle: number;
  expression: number;
  eyewear: number;
  facialHair: number;
};
export function drawAvatar(options: AvatarOptions) {
  const canvas = makeCanvas(32, 32),
    ctx = canvas.getContext('2d')!;
  if (options.background !== 'transparent') {
    ctx.fillStyle = options.background;
    ctx.fillRect(0, 0, 32, 32);
  }
  ctx.fillStyle = options.shirt;
  ctx.fillRect(5, 25, 22, 7);
  // Long hair behind the face, so ears and facial features stay visible.
  ctx.fillStyle = options.hair;
  if (options.hairstyle === 1) {
    ctx.fillRect(5, 6, 4, 21);
    ctx.fillRect(23, 6, 4, 21);
  } else if (options.hairstyle === 6) {
    ctx.fillRect(25, 7, 5, 5);
    ctx.fillRect(27, 11, 4, 11);
    ctx.fillRect(26, 21, 4, 3);
  } else if (options.hairstyle === 7) {
    ctx.fillRect(2, 10, 5, 12);
    ctx.fillRect(25, 10, 5, 12);
    ctx.fillRect(3, 21, 3, 4);
    ctx.fillRect(26, 21, 3, 4);
  }
  ctx.fillStyle = options.skin;
  ctx.fillRect(13, 23, 6, 5);
  ctx.fillRect(6, 8, 20, 16);
  ctx.fillRect(4, 14, 2, 5);
  ctx.fillRect(26, 14, 2, 5);
  ctx.fillStyle = options.hair;
  if (options.hairstyle < 9) {
    ctx.fillRect(5, 5, 22, 6);
    ctx.fillRect(5, 9, 2, 7);
    ctx.fillRect(25, 9, 2, 7);
  }
  switch (options.hairstyle) {
    case 0:
      ctx.fillRect(7, 9, 9, 4);
      ctx.fillRect(20, 9, 5, 3);
      break;
    case 1:
      ctx.fillRect(5, 9, 3, 14);
      ctx.fillRect(24, 9, 3, 14);
      ctx.fillRect(9, 9, 14, 2);
      break;
    case 2:
      ctx.fillRect(8, 2, 4, 4);
      ctx.fillRect(15, 1, 4, 5);
      ctx.fillRect(22, 3, 3, 3);
      break;
    case 3:
      ctx.fillRect(5, 11, 3, 10);
      ctx.fillRect(24, 11, 3, 10);
      ctx.fillRect(7, 9, 18, 3);
      break;
    case 4:
      ctx.fillRect(6, 4, 15, 2);
      ctx.fillRect(7, 10, 6, 3);
      ctx.fillRect(13, 10, 5, 2);
      break;
    case 5:
      ctx.fillRect(4, 5, 24, 4);
      for (const x of [5, 11, 17, 23]) {
        ctx.fillRect(x, 3, 4, 3);
        ctx.fillRect(x, 9, 4, 3);
      }
      ctx.fillRect(4, 9, 3, 8);
      ctx.fillRect(25, 9, 3, 8);
      break;
    case 6:
      ctx.fillRect(7, 9, 8, 2);
      ctx.fillRect(20, 9, 5, 2);
      break;
    case 7:
      ctx.fillRect(8, 9, 16, 2);
      ctx.fillStyle = options.shirt;
      ctx.fillRect(2, 11, 4, 2);
      ctx.fillRect(26, 11, 4, 2);
      break;
    case 8:
      ctx.fillRect(12, 1, 8, 5);
      ctx.fillRect(11, 2, 10, 3);
      ctx.fillRect(7, 9, 4, 3);
      ctx.fillRect(21, 9, 4, 3);
      break;
    case 9:
      ctx.fillRect(14, 2, 4, 10);
      ctx.fillRect(13, 4, 6, 6);
      break;
    case 10:
      ctx.fillRect(6, 7, 20, 3);
      ctx.fillRect(6, 9, 2, 3);
      ctx.fillRect(24, 9, 2, 3);
      break;
    // Bald leaves the head free of hair.
  }
  ctx.fillStyle = options.hair;
  if (options.facialHair === 1) {
    ctx.fillRect(12, 19, 9, 1);
    ctx.fillRect(13, 18, 3, 1);
    ctx.fillRect(17, 18, 3, 1);
  } else if (options.facialHair === 2) {
    ctx.fillRect(14, 22, 5, 3);
    ctx.fillRect(15, 25, 3, 1);
  } else if (options.facialHair === 3) {
    ctx.fillRect(7, 19, 4, 4);
    ctx.fillRect(22, 19, 3, 4);
    ctx.fillRect(10, 22, 13, 3);
    ctx.fillRect(12, 25, 9, 1);
  }

  ctx.fillStyle = '#182b43';
  const closedEyes = [1, 5, 6].includes(options.expression);
  if (closedEyes) {
    ctx.fillRect(10, 15, 4, 1);
    ctx.fillRect(18, 15, 4, 1);
    if (options.expression !== 6) {
      ctx.fillRect(11, 14, 2, 1);
      ctx.fillRect(19, 14, 2, 1);
    }
  } else if (options.expression === 4) {
    ctx.fillRect(11, 14, 2, 3);
    ctx.fillRect(18, 15, 4, 1);
  } else {
    ctx.fillRect(11, 14, 2, 3);
    ctx.fillRect(19, 14, 2, 3);
  }
  if (options.expression === 7) {
    ctx.fillRect(10, 11, 2, 1);
    ctx.fillRect(12, 12, 2, 1);
    ctx.fillRect(18, 12, 2, 1);
    ctx.fillRect(20, 11, 2, 1);
  } else if (options.expression === 8) {
    ctx.fillRect(10, 12, 2, 1);
    ctx.fillRect(12, 11, 2, 1);
    ctx.fillRect(18, 11, 2, 1);
    ctx.fillRect(20, 12, 2, 1);
  }
  switch (options.expression) {
    case 2:
      ctx.fillRect(15, 19, 3, 3);
      ctx.fillStyle = options.skin;
      ctx.fillRect(16, 20, 1, 1);
      break;
    case 3:
    case 6:
      ctx.fillRect(14, 20, 5, 1);
      break;
    case 5:
      ctx.fillRect(13, 19, 7, 3);
      ctx.fillRect(14, 22, 5, 1);
      ctx.fillStyle = '#fff2d8';
      ctx.fillRect(14, 19, 5, 1);
      break;
    case 7:
    case 8:
      ctx.fillRect(14, 20, 5, 1);
      ctx.fillRect(13, 21, 1, 1);
      ctx.fillRect(19, 21, 1, 1);
      break;
    default:
      ctx.fillRect(14, 20, 5, 1);
      ctx.fillRect(15, 21, 3, 1);
  }
  if (options.expression === 9) {
    ctx.fillStyle = '#e4a3a1';
    ctx.fillRect(8, 18, 3, 2);
    ctx.fillRect(22, 18, 3, 2);
  }
  ctx.fillStyle = '#182b43';
  if (options.eyewear === 1) {
    ctx.strokeStyle = '#182b43';
    ctx.lineWidth = 1;
    ctx.strokeRect(8.5, 12.5, 6, 5);
    ctx.strokeRect(17.5, 12.5, 6, 5);
    ctx.fillRect(15, 14, 2, 1);
  } else if (options.eyewear === 2) {
    for (const x of [8, 18]) {
      ctx.fillRect(x + 1, 12, 4, 1);
      ctx.fillRect(x + 1, 17, 4, 1);
      ctx.fillRect(x, 13, 1, 4);
      ctx.fillRect(x + 5, 13, 1, 4);
    }
    ctx.fillRect(14, 14, 4, 1);
  } else if (options.eyewear === 3) {
    ctx.fillRect(8, 13, 7, 4);
    ctx.fillRect(18, 13, 7, 4);
    ctx.fillRect(15, 14, 3, 1);
    ctx.fillStyle = '#69767c';
    ctx.fillRect(9, 13, 2, 1);
    ctx.fillRect(19, 13, 2, 1);
  } else if (options.eyewear === 4) {
    ctx.fillRect(7, 12, 19, 6);
    ctx.fillStyle = '#4d7d87';
    ctx.fillRect(8, 13, 17, 4);
    ctx.fillStyle = '#cadfe9';
    ctx.fillRect(9, 13, 6, 1);
  }
  return canvas;
}
