/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*\\.(png|jpg|jpeg|gif|webp|svg|ico|woff|woff2|json|pdf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'priymavani.in',
          },
        ],
        destination: 'https://www.priymavani.in/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
