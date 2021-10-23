module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["lastfm.freetls.fastly.net"],
  },

  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
