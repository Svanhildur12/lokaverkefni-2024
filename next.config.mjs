// @ts-check

export default (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    reactStrictMode: false,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "www.themealdb.com",
          port: "",
          pathname: "/images/media/meals/**",
        },
        {
          protocol: "https",
          hostname: "www.thecocktaildb.com",
          port: "",
          pathname: "/images/media/drink/**",
        },
      ],
    },
  };
  return nextConfig;
};
