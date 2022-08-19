/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'cdn.discordapp.com',
      'platform-lookaside.fbsbx.com',
      'avatars.githubusercontent.com',
    ],
  },
};

module.exports = nextConfig;
