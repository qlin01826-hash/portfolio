import { copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const htmlPath = resolve('dist/index.html');
const html = readFileSync(htmlPath, 'utf8');
writeFileSync(htmlPath, html.replace('<script type="module" crossorigin src="./assets/app.js"></script>', '<link rel="stylesheet" href="./assets/style.css"><script defer src="./assets/app.js"></script>'));
copyFileSync(resolve('src/style.css'), resolve('dist/assets/style.css'));
writeFileSync(resolve('dist/.nojekyll'), '');
