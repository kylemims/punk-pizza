// server.js
const jsonServer = require("json-server");
const corsMiddleware = require("./cors-middleware");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(corsMiddleware); // custom CORS fix
server.use(middlewares); // logger, static, etc.
server.use(router);

server.listen(8080, "0.0.0.0", () => {
  console.log("JSON Server is running on port 8080");
});
