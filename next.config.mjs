/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString().slice(0, 10),
  },
  images: {
    // Allow next/image to handle local and remote sources as needed
    remotePatterns: [],
  },
};

export default nextConfig;
