/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  eslint: { ignoreDuringBuilds: true },
  async redirects() {
    return [
      // Old magic-link URL -> new Route Handler. Email links sent before the
      // route was moved must keep working.
      {
        source: '/library/login-link',
        destination: '/api/library/login-link',
        permanent: false,
      },
    ];
  },
};
