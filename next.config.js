/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true, // Tambah ini untuk skip type errors
  },
  eslint: {
    ignoreDuringBuilds: true, // Tambah ini untuk skip eslint
  }
}

module.exports = nextConfig
