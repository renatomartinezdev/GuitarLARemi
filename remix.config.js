// /** @type {import('@remix-run/dev').AppConfig} */
// module.exports = {
//   ignoredRouteFiles: ["**/.*"],
//   // appDirectory: "app",
//   // assetsBuildDirectory: "public/build",
//   // serverBuildPath: "build/index.js",
//   // publicPath: "/build/",
//   future: {
//     v2_errorBoundary: true,
//     v2_meta: true,
//     v2_normalizeFormMethod: true,
//     v2_routeConvention: false,
//   },
// };

 /** @type {import('@remix-run/dev').AppConfig} */
 module.exports = {
  serverBuildTarget: "vercel",
  // When running locally in development mode, we use the built in remix
  // server. This does not understand the vercel lambda module format,
  // so we default back to the standard build output.
  server: process.env.NODE_ENV === "development" ? undefined : "./server.js",
  ignoredRouteFiles: ["**/.*"],
  future: {},
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "api/index.js",
  // publicPath: "/build/",
};
