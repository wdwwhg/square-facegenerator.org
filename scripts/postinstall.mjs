import { existsSync, mkdirSync } from 'node:fs';

// Initialize local files on Windows, macOS, and Linux without shell commands.
mkdirSync('data', { recursive: true });

// Preserve an existing working schema when reinstalling dependencies.
if (!existsSync('src/config/db/schema.ts')) {
  await import('./db-setup.mjs');
}
