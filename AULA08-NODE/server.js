const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

//montar o servidor
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Ola mundo!");
});
server.listen(port, hostname, () => {
  console.log("servidor executando em: http://" + hostname + ":" + port + "/");
});
