/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.ctfassets.net'],
  },
  experimental: { serverActions: { allowedOrigins: [ "localhost:3000", "https://refactored-chainsaw-wrpj9qv5x62g755-3000.app.github.dev/", ], }, }
}

module.exports = nextConfig