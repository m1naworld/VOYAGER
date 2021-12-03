const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/register",
    createProxyMiddleware({
      target: process.env.REACT_APP_SERVER_URL,
      changeOrigin: true,
    })
  );
  app.use(
    "/auth",
    createProxyMiddleware({
      target: process.env.REACT_APP_SERVER_URL,
      changeOrigin: true,
    })
  );
  app.use(
    "/login",
    createProxyMiddleware({
      target: process.env.REACT_APP_SERVER_URL,
      changeOrigin: true,
    })
  );
  app.use(
    "/send",
    createProxyMiddleware({
      target: process.env.REACT_APP_SERVER_URL,
      changeOrigin: true,
    })
  );
  app.use(
    "/token",
    createProxyMiddleware({
      target: "https://nid.naver.com/oauth2.0/",
      changeOrigin: false,
    })
  );
  // app.use(
  //   "/auth",
  //   createProxyMiddleware({
  //     target: "http://192.168.0.149:3000",
  //     changeOrigin: true,
  //   })
  // );
};
