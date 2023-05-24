const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
app.use(bodyParser.json());

// Configuração do banco de dados MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "loja_dsapi",
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  } else {
    console.log("Conectado ao banco de dados!");
  }
});

// Consulta de produtos disponíveis
app.get("/produtos", (req, res) => {
  const query = "SELECT * FROM produtos";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao consultar produtos:", err);
      res.status(500).json({ error: "Erro ao consultar produtos" });
    } else {
      res.json(results);
    }
  });
});

// Realização de um pedido
app.post("/pedidos", (req, res) => {
  const { endereco, cliente_id, produtos } = req.body;

  // Verificar se todos os campos obrigatórios estão presentes
  if (!endereco || !cliente_id || !produtos) {
    return res.status(400).json({ error: "Dados inválidos para realizar o pedido" });
  }

  // Inserir o pedido na tabela de pedidos
  const queryPedido = "INSERT INTO pedidos (endereco, cliente_id) VALUES (?, ?)";
  connection.query(queryPedido, [endereco, cliente_id], (err, result) => {
    if (err) {
      console.error("Erro ao realizar o pedido:", err);
      return res.status(500).json({ error: "Erro ao realizar o pedido" });
    }

    const pedidoId = result.insertId;

    // Inserir os itens do pedido na tabela de itens_pedido
    const queryItensPedido = "INSERT INTO itens_pedido (pedido_id, produto_id, preco, quantidade) VALUES ?";
    const values = produtos.map((produto) => [pedidoId, produto.produto_id, produto.preco, produto.quantidade]);
    connection.query(queryItensPedido, [values], (err) => {
      if (err) {
        console.error("Erro ao realizar o pedido:", err);
        return res.status(500).json({ error: "Erro ao realizar o pedido" });
      }

      return res.json({ message: "Pedido realizado com sucesso!" });
    });
  });
});

// Consulta de pedidos realizados
app.get("/pedidos", (req, res) => {
  const query = "SELECT * FROM pedidos";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao consultar pedidos:", err);
      res.status(500).json({ error: "Erro ao consultar pedidos" });
    } else {
      res.json(results);
    }
  });
});

// Gerenciamento de clientes (para administradores)
// Cadastrar novo cliente
app.post("/admin/clientes", (req, res) => {
  const { nome, altura, nascimento, cidade_id } = req.body;

  const query = "INSERT INTO clientes (nome, altura, nascimento, cidade_id) VALUES (?, ?, ?, ?)";

  connection.query(query, [nome, altura, nascimento, cidade_id], (err) => {
    if (err) {
      console.error("Erro ao cadastrar cliente:", err);
      res.status(500).json({ error: "Erro ao cadastrar cliente" });
    } else {
      res.json({ message: "Cliente cadastrado com sucesso!" });
    }
  });
});

// Atualizar cliente
app.put("/admin/clientes/:id", (req, res) => {
  const { id } = req.params;
  const { nome, altura, nascimento, cidade_id } = req.body;

  const query = "UPDATE clientes SET nome = ?, altura = ?, nascimento = ?, cidade_id = ? WHERE id = ?";

  connection.query(query, [nome, altura, nascimento, cidade_id, id], (err) => {
    if (err) {
      console.error("Erro ao atualizar cliente:", err);
      res.status(500).json({ error: "Erro ao atualizar cliente" });
    } else {
      res.json({ message: "Cliente atualizado com sucesso!" });
    }
  });
});

// Remover cliente
app.delete("/admin/clientes/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM clientes WHERE id = ?";

  connection.query(query, [id], (err) => {
    if (err) {
      console.error("Erro ao excluir cliente:", err);
      res.status(500).json({ error: "Erro ao excluir cliente" });
    } else {
      res.json({ message: "Cliente excluído com sucesso!" });
    }
  });
});

// Consultar clientes
app.get("/admin/clientes", (req, res) => {
  const query = "SELECT * FROM clientes";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao consultar clientes:", err);
      res.status(500).json({ error: "Erro ao consultar clientes" });
    } else {
      res.json(results);
    }
  });
});

// Gerenciamento de produtos (para administradores)
// Criação de um produto
app.post("/admin/produtos", (req, res) => {
  const { nome, preco } = req.body;

  // Verificar se todos os campos obrigatórios estão presentes
  if (!nome || !preco) {
    return res.status(400).json({ error: "Dados inválidos para criar um produto" });
  }

  // Inserir o produto na tabela de produtos
  const query = "INSERT INTO produtos (nome, preco) VALUES (?, ?)";
  connection.query(query, [nome, preco], (err) => {
    if (err) {
      console.error("Erro ao criar o produto:", err);
      return res.status(500).json({ error: "Erro ao criar o produto" });
    }

    return res.json({ message: "Produto criado com sucesso!" });
  });
});

// Atualização de um produto
app.put("/admin/produtos/:id", (req, res) => {
  const { id } = req.params;
  const { nome, preco } = req.body;

  // Verificar se todos os campos obrigatórios estão presentes
  if (!nome || !preco) {
    return res.status(400).json({ error: "Dados inválidos para atualizar o produto" });
  }

  // Atualizar o produto na tabela de produtos
  const query = "UPDATE produtos SET nome = ?, preco = ? WHERE id = ?";
  connection.query(query, [nome, preco, id], (err) => {
    if (err) {
      console.error("Erro ao atualizar o produto:", err);
      return res.status(500).json({ error: "Erro ao atualizar o produto" });
    }

    return res.json({ message: "Produto atualizado com sucesso!" });
  });
});

// Exclusão de um produto
app.delete("/admin/produtos/:id", (req, res) => {
  const { id } = req.params;

  // Excluir o produto da tabela de produtos
  const query = "DELETE FROM produtos WHERE id = ?";
  connection.query(query, [id], (err) => {
    if (err) {
      console.error("Erro ao excluir o produto:", err);
      return res.status(500).json({ error: "Erro ao excluir o produto" });
    }

    return res.json({ message: "Produto excluído com sucesso!" });
  });
});

// Inicie o servidor na porta desejada
app.listen(3000, () => {
  console.log("API iniciada na porta 3000");
});
