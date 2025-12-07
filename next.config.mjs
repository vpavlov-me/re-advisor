/** @type {import('next').NextConfig} */
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
  
  // Enable Next.js Image optimization on Vercel
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
};

export default nextConfig;
