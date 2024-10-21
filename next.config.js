/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/:path*', // Proxy to Go backend
      },
    ];
  },
  images: {
    domains: ['itl-website-aws.s3.ap-south-1.amazonaws.com'], // Add S3 bucket domain here
  },
};

module.exports = nextConfig;
