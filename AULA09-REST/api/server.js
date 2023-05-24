var express = require("express");
var http = require("http");
var app = express();
var produtos = ["Coca-cola", "Fanta", "Pepsi"];

app.get("/", function (req, res) {
  res.status(200).send("Bem-vindo a API REST");
});

app.get("/produtos", function (req, res) {
  res.status(200).send(produtos);
});

app.get("/produtos/:posicao", function (req, res) {
  const linha = parseInt(req.params.posicao);
  res.status(200).send(produtos[linha]);
});

app.post("/produtos", function (req, res) {
  var nome = "Nome " + produtos.length;
  produtos.push(nome);
  res.status(200).send("Produto adicionado");
});

http.createServer(app).listen(8001, () => {
  console.log("Servidor iniciado em http://localhost:8001");
});
