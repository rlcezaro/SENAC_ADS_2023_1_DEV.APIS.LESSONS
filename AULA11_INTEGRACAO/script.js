function ler() {
  divStatus = document.getElementById("status");
  divStatus.innerHTML = "carregando...";
  tabela = document.getElementById("tblProdutos");

  xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      obj = JSON.parse(this.responseText);
      obj.forEach((prod) => {
        if (document.getElementById("p" + prod.id) == null) {
          index = tabela.rows.length;
          row = tabela.insertRow(-1);
          row.id = "p" + prod.id;
          cellID = row.insertCell(0);
          cellNOME = row.insertCell(1);
          cellPRECO = row.insertCell(2);
          cellEXCLUIR = row.insertCell(3);
          cellID.innerHTML = prod.id;
          cellNOME.innerHTML = prod.nome;
          cellPRECO.innerHTML = prod.preco;
          cellEXCLUIR.innerHTML = "<button onclick='excluir(" + prod.id + ")' >EXCLUIR</button>";
        }
      });
      divStatus.innerHTML = "";
    }

    if (this.readyState == 4 && this.status != 200) {
      divStatus.innerHTML = this.responseText;
    }
  };

  xhttp.open("GET", "http://localhost:8001/produtos", true);
  xhttp.send();
}

function Add() {
  xhttp = new XMLHttpRequest();
  var txtNome = document.getElementById("txtNome");
  var txtPreco = document.getElementById("txtPreco");

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      ler();
      txtNome.value = "";
      txtPreco.value = "";
    }
  };

  xhttp.open("POST", "http://localhost:8001/produtos", true);
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  var nome = txtNome.value;
  var preco = txtPreco.value;
  xhttp.send("&nome=" + nome + "&preco=" + preco);
}
