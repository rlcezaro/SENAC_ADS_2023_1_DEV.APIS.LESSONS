function ler() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 1) {
      $("divResposta").html("Solicitaçao enviada");
    }
    if (this.readyState == 4) {
      if (this.status == 200) {
        $("divResposta").html(this.responseText);
      }
      if (this.status == 404) {
        $("divResposta").html("Pagina nao encontrada");
      }
    }
  };

  xhttp.open("GET", "informacao.txt", true);
  xhttp.send();
}
