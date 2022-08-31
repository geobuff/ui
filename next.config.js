// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMDX = require("@next/mdx")();

module.exports = withMDX({
  pageExtensions: ["tsx", "mdx"],
  images: {
    domains: [
      "geobuff.sgp1.digitaloceanspaces.com",
      "twemoji.maxcdn.com",
      "upload.wikimedia.org",
      "images.unsplash.com",
      "www.worldatlas.com",
      "static1.thetravelimages.com",
      "www.indiewire.com",
      "m.media-amazon.com",
      "static.wikia.nocookie.net",
    ],
  },
});
