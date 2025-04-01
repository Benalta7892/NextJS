/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "axoriablog-media.b-cdn.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
