const express = require("express");
const routes = require("./routes");
let i = 0;
class App {
  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.server.use(express.json());
    this.server.use(this.contarRequisicoes);
  }
  routes() {
    this.server.use(routes);
  }

  contarRequisicoes(req, res, next) {
    i++;
    console.log(`Quantidade de requisições: ${i}`);
    next();
  }
}

module.exports = new App().server;
