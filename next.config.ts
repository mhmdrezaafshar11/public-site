/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_USER_PANEL_URL: process.env.NEXT_PUBLIC_USER_PANEL_URL || 'http://localhost:3001',
    NEXT_PUBLIC_ADMIN_PANEL_URL: process.env.NEXT_PUBLIC_ADMIN_PANEL_URL || 'http://localhost:3002',
  },
}

module.exports = nextConfig