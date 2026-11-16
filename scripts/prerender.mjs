import { readFile, rm, writeFile } from 'node:fs/promises';

const indexPath = new URL('../dist/index.html', import.meta.url);
const serverDir = new URL('../dist-ssr/', import.meta.url);
const marker = '<!--app-html-->';

try {
  const template = await readFile(indexPath, 'utf8');
  if (template.split(marker).length !== 2) {
    throw new Error('Se esperaba un único marcador de prerenderizado en dist/index.html.');
  }
  const { render } = await import(new URL('entry-server.js', serverDir).href);
  const html = render();
  // Usar una función conserva literalmente los signos $ del HTML.
  await writeFile(indexPath, template.replace(marker, () => html));
  console.log('Prerenderizado: contenido de la página insertado en dist/index.html.');
} finally {
  await rm(serverDir, { recursive: true, force: true });
}
