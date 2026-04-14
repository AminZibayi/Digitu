/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Required: each route becomes its own index.html for Electron's loadFile()
  trailingSlash: true,
  // Required: makes _next/* asset paths relative so they resolve under file:// protocol
  assetPrefix: './',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
