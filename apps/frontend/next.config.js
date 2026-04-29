/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== 'production';

const nextConfig = {
  output: 'export',
  // Required: each route becomes its own index.html for Electron's loadFile()
  trailingSlash: true,
  // Keep relative assets for exported production builds (Electron file://),
  // but use default absolute assets in dev so nested routes don't request /<route>/_next/*
  assetPrefix: isDev ? undefined : '',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
