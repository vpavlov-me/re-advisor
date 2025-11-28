/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  // Ignore ESLint errors during build (warnings only)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ignore TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // output: 'export' is only for GitHub Pages static deployment
  // For local development and Vercel, we don't use static export
  ...(isProd && process.env.GITHUB_PAGES === 'true' ? { output: 'export' } : {}),
  // GitHub Pages uses /re-advisor/ as base path
  basePath: isProd && process.env.GITHUB_PAGES === 'true' ? '/re-advisor' : '',
  assetPrefix: isProd && process.env.GITHUB_PAGES === 'true' ? '/re-advisor/' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
