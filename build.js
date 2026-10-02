const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'dist');

// Only files that belong on the live site. Everything else in the repo
// (server.js, package.json, *.bat, *.ps1, node_modules) stays unpublished.
const SITE_FILES = [
  'index.html',
  'cv.html',
  'cover.html',
  'cover_letter.html',
  '404.html',
  'thanks.html',
  'og-image.png',
  'style.css',
  'script.js',
  'Alex.jpg',
  'Alex_Olajide_CV.pdf',
  'Hiring_Team_Letter.pdf',
];

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const missing = SITE_FILES.filter((file) => !fs.existsSync(path.join(ROOT, file)));
if (missing.length) {
  console.error('Missing site files: ' + missing.join(', '));
  process.exit(1);
}

for (const file of SITE_FILES) {
  fs.copyFileSync(path.join(ROOT, file), path.join(OUT, file));
}

console.log(`Built ${SITE_FILES.length} files -> ${path.relative(ROOT, OUT)}/`);