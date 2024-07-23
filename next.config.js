/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['192.168.192.76'],  
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "**/*",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "**/*",
      },
      {
        protocol: "http",
        hostname: "192.168.192.76",
        port: "",
        pathname: "**/*",
      },

    ],
  },
};

module.exports = nextConfig;
