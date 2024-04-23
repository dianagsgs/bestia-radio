/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "vvqskzptir4l8fs6.public.blob.vercel-storage.com",
      "images.ctfassets.net",
    ],
  },
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:5000/api/:path*"
            : "/api/",
      },
    ];
  },
};

module.exports = nextConfig;
