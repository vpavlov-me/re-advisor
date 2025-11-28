/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // GitHub Pages uses /re-advisor/ as base path
  basePath: isProd ? '/re-advisor' : '',
  assetPrefix: isProd ? '/re-advisor/' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
