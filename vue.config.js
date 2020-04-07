module.exports = {
  transpileDependencies: ["vuetify"],
  publicPath: "/",
  outputDir: "dist",
  lintOnSave: true,
  runtimeCompiler: false,
  productionSourceMap: process.env.NODE_ENV !== "production",
};
