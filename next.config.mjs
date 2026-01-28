/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  i18n: {
    locales: ['fr', 'ar'],
    defaultLocale: 'fr',
    localeDetection: true
  }
};

export default nextConfig;

