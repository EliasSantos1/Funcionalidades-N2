import { adicionarDadosSolicitar, lerDados } from "../funcoesUteis/firebase.js";

//Variaveis
var QuantidadeDeItensDiferentes = 1;
const BotaoAdicionarItens = document.getElementById("adicionarItens");
const BotaoEnviar = document.getElementById("enviar");



lerDados().then((dados => {
    if (dados != null) {

	var ListaDeItens = dados.ItensTI
	var ListaDeSetor = dados.CentroDeCusto
    

//Chama funcoes
adicionaSetor();
AdicionaItensNaDiv();
BotaoAdicionarItens.addEventListener("click", AdicionaItensNaDiv);

BotaoEnviar.addEventListener("click", function EnviaFormulario(event) {
	event.preventDefault();
	const setor = document.getElementById("setor").value;
	const chamado = document.getElementById("chamado").value;
	const cc = document.getElementById("cc").value;

	const itens = {};
	const quantidadesItens = {};
	for (let a = 1; a < QuantidadeDeItensDiferentes; a++) {
		itens[`item-${a}`] = document.getElementById(`item-${a}`).value;
		quantidadesItens[`quantidade-${a}`] = document.getElementById(
			`quantidade-${a}`
		).value;
	}

	if (document.getElementById("informacoes").checkValidity()) {
		console.log("formulario enviado");
		const objFormulario = CriaObjetoFormulario(
			setor,
			chamado,
			cc,
			itens,
			quantidadesItens
		);
		adicionarDadosSolicitar(objFormulario, objFormulario.CHAMADO)
		alert("Pedido enviado!")
	} else {
		alert("Por favor, preencha todos os campos obrigatórios.");
	}
});

//Utiliza o Select2 para pesquisar nas options do select Setor
$(document).ready(function () {
	$("#setor").select2();
});

//funcoes
function AdicionaItensNaDiv() {
	// Cria o elemento <select>
	const QuantidadeDeItensDiferentesTexto =
		QuantidadeDeItensDiferentes.toString();
	const idItem = `item-${QuantidadeDeItensDiferentesTexto}`;
	const idQuantidade = `quantidade-${QuantidadeDeItensDiferentesTexto}`;

	const labelItem = document.createElement("label");
	labelItem.textContent = "*Item:";
	labelItem.setAttribute("for", idItem);
	const select = document.createElement("select");
	select.setAttribute("required", true);
	select.id = idItem;

	// Cria as opções do <select>
	const opcaoSelecione = document.createElement("option");
	opcaoSelecione.value = "";
	opcaoSelecione.disabled = true;
	opcaoSelecione.selected = true;
	opcaoSelecione.textContent = "Selecione...";
	select.appendChild(opcaoSelecione);

	for (const a in ListaDeItens) {
		const item = ListaDeItens[a];
		const option = document.createElement("option");
		option.value = item.descricao;
		option.textContent = item.descricao;
		select.appendChild(option);
	}

	// Cria o elemento <input>
	const labelQuantidade = document.createElement("label");
	labelQuantidade.textContent = "*Quantidade:";
	labelQuantidade.setAttribute("for", idQuantidade);
	const inputQuantidade = document.createElement("input");
	inputQuantidade.type = "number";
	inputQuantidade.id = idQuantidade;
	inputQuantidade.name = "quantidade";
	inputQuantidade.value = "1";

	// Adiciona os elementos à div com o id "itens"
	const divItens = document.getElementById("itens");
	divItens.appendChild(document.createElement("br"));
	divItens.appendChild(labelItem);
	divItens.appendChild(select);
	divItens.appendChild(document.createElement("br"));
	divItens.appendChild(labelQuantidade);
	divItens.appendChild(inputQuantidade);
	divItens.appendChild(document.createElement("br"));

	$(document).ready(function () {
		$(`#${idItem}`).select2();
	});

	QuantidadeDeItensDiferentes += 1;
}

function adicionaSetor() {
	// Cria o elemento <label> para "Setor"
	const labelSetor = document.createElement("label");
	labelSetor.textContent = "*Setor:";
  
	// Cria o elemento <select> para as opções de setor
	const selectSetor = document.createElement("select");
	selectSetor.id = "setor";
	selectSetor.required = true;
  
	// Cria a opção padrão desabilitada e selecionada
	const optionPadrao = document.createElement("option");
	optionPadrao.value = "";
	optionPadrao.disabled = true;
	optionPadrao.selected = true;
	optionPadrao.textContent = "Selecione...";
	selectSetor.appendChild(optionPadrao)
  
	
	// Cria as opções de setor
	var opcoesSetor = [
	];

	for ( const setor in ListaDeSetor) {
		opcoesSetor.push(setor)
	}

  
	// Adiciona as opções ao <select>
	opcoesSetor.forEach((opcao) => {
	  const option = document.createElement("option");
	  option.value = opcao;
	  option.textContent = opcao;
	  selectSetor.appendChild(option);
	});
  
	// Obtém a div onde o formulário será adicionado
	const divFormulario = document.getElementById("div_setor");
  
	// Adiciona os elementos criados à div
	divFormulario.appendChild(labelSetor);
	divFormulario.appendChild(document.createElement("br"));
	divFormulario.appendChild(selectSetor);
  }

function CriaObjetoFormulario(setor, chamado, cc, itens, quantidadesItens) {

  var objSolicitacao = {
    SETOR: setor,
    CHAMADO: chamado,
    CC: cc,
	ITENS: []
  }

  var vez = 1
  for (const [chave, descricao] of Object.entries(itens)) {
    const item = {
      descricao,
      quantidade: quantidadesItens[`quantidade-${vez}`]
    };
    objSolicitacao.ITENS.push(item); // Adiciona o item ao array "itens"
	vez = vez + 1
  }

  return objSolicitacao

}

}
}))
