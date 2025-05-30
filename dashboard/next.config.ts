import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api',
        destination: `${process.env.API_URL}/graphql`,
      },
      {
        source: '/ws',
        destination: `${process.env.API_URL}/graphql`,
      },
    ];
  },
};

export default nextConfig;
