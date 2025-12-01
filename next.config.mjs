/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  reactStrictMode: true,
  
  // Enable linting and type checking in production builds
  // Only ignore during development or explicit skip
  eslint: {
    ignoreDuringBuilds: process.env.SKIP_LINT === 'true',
  },
  typescript: {
    ignoreBuildErrors: process.env.SKIP_TYPE_CHECK === 'true',
  },
  
  // Static export for GitHub Pages
  ...(isProd && isGitHubPages ? { output: 'export' } : {}),
  
  // GitHub Pages base path configuration
  basePath: isProd && isGitHubPages ? '/re-advisor' : '',
  assetPrefix: isProd && isGitHubPages ? '/re-advisor/' : '',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Trailing slashes for static export compatibility
  trailingSlash: isGitHubPages,
};

export default nextConfig;
