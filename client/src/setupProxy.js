const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/auth",
    createProxyMiddleware({
      target: "http://localhost:8000",
      secure: false,
      logLevel: "debug",

      changeOrigin: true,
    })
  );
};
