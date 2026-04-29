import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

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

async function generate() {
  console.log('Generating high-quality branding assets...');
  
  if (!fs.existsSync(FRONTEND_PUBLIC)) fs.mkdirSync(FRONTEND_PUBLIC, { recursive: true });
  if (!fs.existsSync(DESKTOP_ASSETS)) fs.mkdirSync(DESKTOP_ASSETS, { recursive: true });

  const darkPng = path.join(SOURCE_DIR, 'dark.png');
  const darkSvg = path.join(SOURCE_DIR, 'dark.svg');
  const lightSvg = path.join(SOURCE_DIR, 'light.svg');

  // 1. Copy SVG logos
  if (fs.existsSync(darkSvg)) {
    fs.copyFileSync(darkSvg, path.join(FRONTEND_PUBLIC, 'logo-dark.svg'));
    fs.copyFileSync(darkSvg, path.join(DESKTOP_ASSETS, 'icon.svg'));
  }
  if (fs.existsSync(lightSvg)) {
    fs.copyFileSync(lightSvg, path.join(FRONTEND_PUBLIC, 'logo-light.svg'));
  }

  // 2. Generate Favicons and PNGs
  if (fs.existsSync(darkPng)) {
    // Web Favicon (ICO)
    const buffer = await fs.promises.readFile(darkPng);
    const ico = await pngToIco(buffer);
    fs.writeFileSync(path.join(FRONTEND_PUBLIC, 'favicon.ico'), ico);
    console.log('Generated favicon.ico');

    // Various sizes for PWA/Manifest
    const sizes = [192, 512];
    for (const size of sizes) {
      await sharp(darkPng)
        .resize(size, size)
        .toFile(path.join(FRONTEND_PUBLIC, `icon-${size}x${size}.png`));
      console.log(`Generated icon-${size}x${size}.png`);
    }

    // Desktop Icon (PNG for Electron-builder fallback)
    await sharp(darkPng)
      .resize(256, 256)
      .toFile(path.join(DESKTOP_ASSETS, 'icon.png'));
    console.log('Generated desktop icon.png');
  }

  // 3. Generate Web Manifest
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
        src: '/favicon.ico',
        sizes: '64x64 32x32 24x24 16x16',
        type: 'image/x-icon'
      },
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      },
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
  
  console.log('All branding assets generated successfully.');
}

generate().catch(err => {
  console.error('Generation failed:', err);
  process.exit(1);
});
