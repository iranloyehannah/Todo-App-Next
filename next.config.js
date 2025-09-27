/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    emotion: true,
  },
  outputFileTracingRoot: __dirname,
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
