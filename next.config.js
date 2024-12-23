// const { tree } = require('next/dist/build/templates/app-page');

/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/',
        destination: 'http://localhost:3000/:path*', // Proxy to Go backend
      },
    ];
  },
  images: {
    domains: ['itl-website-aws.s3.ap-south-1.amazonaws.com'], // Add S3 bucket domain here
  },
};

module.exports = nextConfig;

