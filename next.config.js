/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Handle trailing slashes consistently
  trailingSlash: true,
  // Ensure we can use client-side navigation
  distDir: '.next',
  // Disable image optimization during development
  webpack: (config) => {
    return config;
  }
}

module.exports = nextConfig 