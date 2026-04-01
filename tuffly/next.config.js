/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['placehold.co', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/snacks/:category',
        destination: '/menu?category=:category',
      },
      {
        source: '/snack/:id',
        destination: '/menu?item=:id',
      },
    ];
  },
  output: 'standalone',
}

module.exports = nextConfig 
