function ler(){
	var http = new XMLHttpRequest();
	http.onreadystatechange = function(){
		if( this.readyState == 4 && this.status == 200){
			var t = "<table border='1'>";
			t +=  	"	<tr> ";
			t +=  	"		<th>ID</th> ";
			t +=  	"		<th>Nome</th> ";
			t +=  	"		<th>Preço</th> ";
			t +=  	"	</tr> ";

			var dadosXML = this.responseXML;
			var produtos = dadosXML.getElementsByTagName("produto");
			for( i = 0 ; i < produtos.length; i++){
				var id = produtos[i].getElementsByTagName("id");
				var nome = produtos[i].getElementsByTagName("nome");
				var preco = produtos[i].getElementsByTagName("preco");
				
				t += "<tr>";
				t += "  <td>" + id[0].childNodes[0].nodeValue + "</td>";
				t += "  <td>" + nome[0].childNodes[0].nodeValue + "</td>";
				t += "  <td>" + preco[0].childNodes[0].nodeValue + "</td>";
				t += "</tr>";
			}
			t += "</table>";
			var divConteudo = document.getElementById("conteudo");
			divConteudo.innerHTML = t;
		}
	};
	http.open("GET", "dados.xml", true );
	http.send();
}