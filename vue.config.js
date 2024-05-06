module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  filenameHashing: true,
  devServer: {
    proxy: import.meta.env.VITE_IMAGE_BASE_URL,
  },
};
