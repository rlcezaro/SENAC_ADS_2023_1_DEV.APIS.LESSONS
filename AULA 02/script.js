function validar() {
  var valor = document.getElementById("txtValor").value;
  var pinfo = document.getElementById("info");
  if (valor == "") {
    pinfo.innerHTML = "O campo valor deve ser preenchido!";
    return false;
  } else {
    if (isNaN(valor)) {
      pinfo.innerHTML = "O valor deve ser numero!";
      return false;
    } else {
      if (valor > 0 && valor < 11) {
        return true;
      } else {
        pinfo.innerHTML = "Valor não permitido!";
        return false;
      }
    }
  }
}

function lerObjeto() {
  var carro = { modelo: "Doblo", ano: 2000 };
  var pessoa = {
    nome: "Maria",
    idade: 25,
    altura: 1.8,
    temFilhos: true,
    endereco: null,
    veiculo: carro,
    filhos: [
      { nome: "Carlos", idade: 19 },
      { nome: "Julia", idade: 8 },
    ],
    formacao: [2006, 2013, 2017],
    imprimir: function () {
      texto = this.nome + " - idade: " + this.idade + " - Carro: " + this.veiculo.modelo;
      return texto;
    },
  };
  // document.getElementById("divObjeto").innerHTML = pessoa.imprimir();
  divObjeto = document.getElementById("divObjeto");
  divObjeto.innerHTML = pessoa.imprimir();
}

//construir o objeto retangulo que possui os atributos largura e altura
//este objeto deverá conter um metodo que calcula a área do retangulo
//criar no html dois campos para que o usuario preencha com os valores
//criar o botao que ira mostrar o resultado para o usuario

function calcular() {
  var retangulo = {
    largura: document.getElementById("txtLargura").value,
    altura: document.getElementById("txtAltura").value,
    calcularArea: function () {
      return (this.largura = this.altura);
    },
  };
  var pResultado = document.getElementById("pResultado");
  pResultado.innerHTML = "Area: " + retangulo.calcularArea();
}
