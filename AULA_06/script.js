function ler() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      conteudo = "<table border='1'>";
      conteudo += "<tr>";
      conteudo += "<th>ID</th>";
      conteudo += "<th>NOME</th>";
      conteudo += "<th>Preço</th>";
      conteudo += "</tr>";

      objJSON = JSON.parse(this.responseText);
      produtos = objJSON.produtos;
      produtos.forEach((prod) => {
        conteudo += "<tr>";
        conteudo += "<td>" + prod.id + "</th>";
        conteudo += "<td>" + prod.nome + "</th>";
        conteudo += "<td>" + prod.preco + "</th>";
        conteudo += "</tr>";
      });
      conteudo += "</table>";
      $("#divProdutos").html(conteudo);
    }
  };

  xhttp.open("GET", "servidor.php?listar", true);
  xhttp.send();
}
