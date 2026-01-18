/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flower.elevateegy.com",
      },
    ],
  },
};

export default nextConfig;
