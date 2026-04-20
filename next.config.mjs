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
