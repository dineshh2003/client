

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // Existing rewrites
//   async rewrites() {
//     return [
//       {
//         source: '/api/',
//         destination: 'http://localhost:3000/:path*',
//       },
//     ];
//   },

//   // Enhanced image optimization
//   images: {
//     domains: ['itl-website-aws.s3.ap-south-1.amazonaws.com'],
//     minimumCacheTTL: 60,
//     formats: ['image/webp'],
//     deviceSizes: [640, 750, 828, 1080, 1200, 1920],
//     imageSizes: [16, 32, 48, 64, 96, 128, 256],
//   },

//   // Performance optimizations
//   compress: true,
//   swcMinify: true,
//   reactStrictMode: true,
//   poweredByHeader: false,

//   // Production optimizations
//   experimental: {
//     optimizeCss: true,
//     scrollRestoration: true,
//   },

//   // Cache and security headers
//   async headers() {
//     return [
//       {
//         source: '/:path*',
//         headers: [
//           {
//             key: 'Cache-Control',
//             value: 'public, max-age=31536000, immutable',
//           },
//         ],
//       },
//     ];
//   },

//   // Webpack optimization
//   webpack: (config, { dev, isServer }) => {
//     if (!dev && !isServer) {
//       Object.assign(config.optimization, {
//         splitChunks: {
//           chunks: 'all',
//           minSize: 20000,
//           maxSize: 244000,
//         },
//         minimize: true,
//       });
//     }
//     return config;
//   },
// };

// module.exports = nextConfig;



/** @type {import('next').NextConfig} */
const nextConfig = {
  // Existing rewrites
  async rewrites() {
    return [
      {
        source: '/api/',
        destination: 'http://localhost:3000/:path*',
      },
    ];
  },

  // Enhanced image optimization with faster dev loading
  images: {
    domains: ['itl-website-aws.s3.ap-south-1.amazonaws.com'],
    minimumCacheTTL: 60,
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    disableStaticImages: true, // Faster dev builds
  },

  // Development performance optimizations
  swcMinify: true,
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true, // Faster development
    tsconfigPath: './tsconfig.json'
  },

  // Development specific experimental features
  experimental: {
    optimizeCss: true,
    turbo: {
      loaders: {
        '.js': ['swc-loader']
      }
    },
    lazyCompilation: true, // Faster initial load
    optimizeServerReact: true,
    forceSwcTransforms: true // Faster compilation
  },

  // Development webpack configuration
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.cache = true;
      config.optimization = {
        ...config.optimization,
        runtimeChunk: true,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false
      };
    }
    return config;
  },
};

module.exports = nextConfig;