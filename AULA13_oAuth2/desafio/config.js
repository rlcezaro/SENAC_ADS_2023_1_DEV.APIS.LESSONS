// Carregar as variáveis de ambiente do arquivo .env
require("dotenv").config();

// Exportar as configurações do aplicativo
module.exports = {
  // Obter o client ID do Github do arquivo .env ou usar um valor padrão
  client_id: process.env.GITHUB_CLIENT_ID || "your_client_id",
  // Obter o client secret do Github do arquivo .env ou usar um valor padrão
  client_secret: process.env.GITHUB_CLIENT_SECRET || "your_client_secret",
  // Definir o callback URL do Github como http://localhost:3000/github/callback
  redirect_uri: "http://localhost:3000/github/callback",
};
