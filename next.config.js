/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    emotion: true,
  },
  outputFileTracingRoot: __dirname,
  typescript: {
    ignoreBuildErrors: true,
  },
  // Prevent static generation of pages that use auth
  experimental: {
    
  },
}

module.exports = nextConfig
