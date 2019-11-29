const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    port: 8080,
    open: true,
    proxy: {
      api: {
        target: "https://mock.cangdu.org/mock/5d940466d360e8289c6a8eb7/api/",
        ws: true,
        changeOrigin: true
      }
    }
  },
  chainWebpack(config) {
    config.resolve.alias
      .set("components", resolve("src/components"))
      .set("views", resolve("src/views"))
      .set("images", resolve("src/assets/images"))
      .set("api", resolve("src/api"));
  }
};
