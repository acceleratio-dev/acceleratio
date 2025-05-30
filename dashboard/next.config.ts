import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
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
