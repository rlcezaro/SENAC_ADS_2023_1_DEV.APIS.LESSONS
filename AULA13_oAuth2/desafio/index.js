// Importar as dependências
const express = require("express");
const axios = require("axios");
const { client_id, client_secret, redirect_uri } = require("./config");

// Criar uma instância do express
const app = express();

// Configurar o motor de template para usar ejs
app.set("view engine", "ejs");

// Configurar uma rota GET para a página inicial
app.get("/", (req, res) => {
  // Renderizar a view index.ejs com o client_id e o redirect_uri do Github
  res.render("index", { client_id, redirect_uri });
});

// Configurar uma rota GET para o callback do Github
app.get("/github/callback", async (req, res) => {
  try {
    // Obter o código de autorização da query string
    const code = req.query.code;

    // Enviar uma requisição POST para o endpoint de token do Github com o código, o client_id, o client_secret e o redirect_uri
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        code,
        client_id,
        client_secret,
        redirect_uri,
      },
      {
        headers: {
          // Definir o cabeçalho Accept para application/json para receber a resposta em JSON
          Accept: "application/json",
        },
      }
    );

    // Obter o token de acesso da resposta
    const accessToken = tokenResponse.data.access_token;

    // Enviar uma requisição GET para o endpoint de usuário do Github com o token de acesso no cabeçalho Authorization
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: {
        // Definir o cabeçalho Authorization para Bearer <token>
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Obter o nome do usuário da resposta
    const username = userResponse.data.name;

    // Renderizar a view profile.ejs com o nome do usuário
    res.render("profile", { username });
  } catch (error) {
    // Em caso de erro, enviar uma resposta com status 500 e a mensagem do erro
    res.status(500).send(error.message);
  }
});

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
