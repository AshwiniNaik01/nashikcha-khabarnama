import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
      },
      {
        protocol: "http",
        hostname: "192.168.1.13",
        port: "5000",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "5000",
      },
      {
        protocol: "https",
        hostname: "d1gc9sakfbovdk.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "form-filling-bucket-1.s3.eu-north-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
