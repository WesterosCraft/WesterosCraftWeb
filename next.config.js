module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'],
  },
  async rewrites() {
    return [
      {
        source: '/studio/(.*)',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:3333/studio/(.*)'
            : '/studio/index.html',
      },
      {
        source: '/modpack',
        destination: '/join',
      },
    ];
  },
};
