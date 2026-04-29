import * as fs from 'fs';
import * as path from 'path';

const BRANDING = {
  displayName: 'Digikala Automation Suite',
  shortName: 'Digitu',
  description: 'Digikala product and variant desktop automation suite',
};

// Use relative paths from the script location
const LIBS_BRANDING = path.resolve(__dirname, '..');
const SOURCE_DIR = path.resolve(LIBS_BRANDING, 'assets');
const ROOT = path.resolve(LIBS_BRANDING, '../..');
const FRONTEND_PUBLIC = path.resolve(ROOT, 'apps/frontend/public');
const DESKTOP_ASSETS = path.resolve(ROOT, 'apps/desktop/assets');

function generate() {
  console.log('Generating assets...');
  console.log('Source:', SOURCE_DIR);
  console.log('Frontend:', FRONTEND_PUBLIC);
  console.log('Desktop:', DESKTOP_ASSETS);

  if (!fs.existsSync(FRONTEND_PUBLIC)) fs.mkdirSync(FRONTEND_PUBLIC, { recursive: true });
  if (!fs.existsSync(DESKTOP_ASSETS)) fs.mkdirSync(DESKTOP_ASSETS, { recursive: true });

  // 1. Copy SVG logos
  const darkSvg = path.join(SOURCE_DIR, 'dark.svg');
  const lightSvg = path.join(SOURCE_DIR, 'light.svg');

  if (fs.existsSync(darkSvg)) {
    fs.copyFileSync(darkSvg, path.join(FRONTEND_PUBLIC, 'logo-dark.svg'));
    fs.copyFileSync(darkSvg, path.join(DESKTOP_ASSETS, 'icon.svg'));
    console.log('Copied dark.svg');
  }

  if (fs.existsSync(lightSvg)) {
    fs.copyFileSync(lightSvg, path.join(FRONTEND_PUBLIC, 'logo-light.svg'));
    console.log('Copied light.svg');
  }

  // 2. Generate Web Manifest
  const manifest = {
    name: BRANDING.displayName,
    short_name: BRANDING.shortName,
    description: BRANDING.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ef4056',
    icons: [
      {
        src: '/logo-dark.svg',
        sizes: 'any',
        type: 'image/svg+xml'
      }
    ]
  };

  fs.writeFileSync(
    path.join(FRONTEND_PUBLIC, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  console.log('Generated manifest.json');
  
  console.log('Branding assets generated successfully.');
}

generate();
