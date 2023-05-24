const restify = require("restify");
const errors = require("restify-errors");

const servidor = restify.createServer({
  name: "loja2",
  version: "1.0.0",
});

servidor.use(restify.plugins.acceptParser(servidor.acceptable));
servidor.use(restify.plugins.queryParser());
servidor.use(restify.plugins.bodyParser());

servidor.listen(8001, function () {
  console.log("%s executando em &s", servidor.name, servidor.url);
});

var knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "loja2", //corrigir o nome do banco
  },
});

servidor.get("/", (req, res, next) => {
  res.send(" Bem vindo(a) a API loja");
});

servidor.get("/produtos", (req, res, next) => {
  knex("produto").then((dados) => {
    res.send(dados);
  }, next);
});

servidor.get("/produtos/:idProd", (req, res, next) => {
  const idProduto = req.params.idProd;
  knex("produto")
    .where("id", idProduto)
    .first()
    .then((dados) => {
      if (!dados) {
        return res.send(new errors.BadRequestError("Produto não encontrado"));
      }
      res.send(dados);
    }, next);
});

servidor.post("/produtos", (req, res, next) => {
  knex("produto")
    .insert(req.body)
    .then((dados) => {
      res.send(dados);
    }, next);
});

servidor.put("/produtos/:idProd", (req, res, next) => {
  const idProduto = req.params.idProd;
  knex("produto")
    .where("id", idProduto)
    .update(req.body)
    .then((dados) => {
      if (!dados) {
        return res.send(new errors.BadRequestError("Produto não encontrado"));
      }
      res.send("produto atualizado");
    }, next);
});

servidor.del("/produtos/:idProd", (req, res, next) => {
  const idProduto = req.params.idProd;
  knex("produto")
    .where("id", idProduto)
    .delete()
    .then((dados) => {
      if (!dados) {
        return res.send(new errors.BadRequestError("Produto não encontrado"));
      }
      res.send("produto deletado");
    }, next);
});

//ctrl + c para encerrar o servidor
