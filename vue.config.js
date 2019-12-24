const path = require("path");
const homeApi = require("./api/homeApi.json");
const categoryData = require("./api/homeApi/categories.json");
const categoryDetail = require("./api/homeApi/categoriesdetail/lk002.json");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    port: 8080,
    open: true,
    proxy: {
      api: {
        target:
          "http://ddbuy.7-orange.cn:7300/mock/5def6a2d448e330a1116366e/api/",
        ws: true,
        changeOrigin: true
      }
    }
    // before(app) {
    //   app.get("/api/homeApi", (req, res) => {
    //     res.json(homeApi);
    //   });
    //   app.get("/api/homeApi/categories", (req, res) => {
    //     res.json(categoryData);
    //   });
    //   app.get("/api/homeApi/categoriesdetail", (req, res) => {
    //     res.json(categoryDetail);
    //   });
    // }
  },
  chainWebpack(config) {
    config.resolve.alias
      .set("components", resolve("src/components"))
      .set("views", resolve("src/views"))
      .set("images", resolve("src/assets/images"))
      .set("api", resolve("src/api"));
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
  }
};
