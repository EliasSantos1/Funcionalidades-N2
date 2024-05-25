import { lerDados } from "../funcoesUteis/firebase.js";

//Variaveis
var QuantidadeDeItensDiferentes = 1;
const BotaoAdicionarItens = document.getElementById("adicionarItens");
const BotaoEnviar = document.getElementById("enviar");
const botaoCopiar = document.querySelector("#botaoCopiar");
const divItens = document.getElementById("itens");
const divResultado = document.getElementById("resultado");

lerDados().then((dados => {
  console.log(dados);
  if (dados != null) {


    
var DadosDeItens = dados.ItensTI
const ListaDeItens = []

for (const a in DadosDeItens) {
  const itemAtual = DadosDeItens[a]
  ListaDeItens.push(itemAtual)
}
var ListaDeSetor = dados.CentroDeCusto

//Chama funcoes
adicionaSetor();
AdicionaItensNaDiv();
BotaoAdicionarItens.addEventListener("click", AdicionaItensNaDiv);

BotaoEnviar.addEventListener("click", function AdicionaRespostaNaDiv(event) {
  event.preventDefault();
  const solicitante = document.getElementById("solicitante").value;
  const setor = document.getElementById("setor").value;
  const patrimonio = document.getElementById("patrimonio").value;
  const motivo = document.getElementById("motivo").value;
  const chamado = document.getElementById("chamado").value;

  const itens = {};
  const quantidadesItens = {};
  for (let a = 1; a < QuantidadeDeItensDiferentes; a++) {
    itens[`item-${a}`] = document.getElementById(`item-${a}`).value;
    quantidadesItens[`quantidade-${a}`] = document.getElementById(
      `quantidade-${a}`
    ).value;
  }

  if (document.getElementById("informacoes").checkValidity()) {
    AdicionaTextoNaDiv(
      solicitante,
      setor,
      patrimonio,
      motivo,
      chamado,
      itens,
      quantidadesItens
    );
  } else {
    alert("Por favor, preencha todos os campos obrigatórios.");
  }
})

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
    option.value = item.codigo;
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

function AdicionaTextoNaDiv(
  solicitante,
  setor,
  patrimonio,
  motivo,
  chamado,
  itensTabela,
  quantidadesItens
) {
  var texto1 = `
  <p>Eu preciso da sua <span class="destaque">aprovação</span> e <span class="destaque">centro de custo</span> para aquisição dos seguintes itens:</p>
      <br>
      `;

  var tabela1 = `
      <table>
      <thead>
        <tr>
          <td>SOLICITANTE</th>
          <td>${solicitante}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>SETOR</td>
          <td>${setor}</td>
        </tr>
        <tr>
          <td>PATRIMONIO</td>
          <td>${patrimonio}</td>
        </tr>
        <tr>
          <td>MOTIVO</td>
          <td>${motivo}</td>
        </tr>
        <tr>
          <td>CHAMADO</td>
          <td>${chamado}</td>
        </tr>
      </tbody>
      </table>

      <br><br>
      `;

  AdicionaTabelaDeItens(itensTabela, quantidadesItens);

  var texto2 = `
      <br>
      <p class="destaque">
        Obs: Todas as solicitações possuem 7 dias para que sejam aprovados, do contrário, o chamado é cancelado.
      </p>
      <p class="destaque">
        Pedimos o seu apoio para que possamos dar início a tratativa do chamado.
      </p>
      <p>
        Qualquer dúvida estou a sua disposição.
      </p>
      `;

  document.getElementById("texto1").innerHTML = texto1;
  document.getElementById("tabela1").innerHTML = tabela1;
  document.getElementById("texto2").innerHTML = texto2;
  AmostrarBotao(botaoCopiar);
}

function AdicionaTabelaDeItens(itensTabela, quantidadesItens) {
  const tabela = document.createElement("table");

  console.log(itensTabela);
  console.log(quantidadesItens);

  // Cabeçalho da tabela
  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");
  const thDescricao = document.createElement("th");
  thDescricao.textContent = "DESCRIÇÃO";
  const thValorUni = document.createElement("th");
  thValorUni.textContent = "VALOR UNITÁRIO";
  const thQuantidade = document.createElement("th");
  thQuantidade.textContent = "QUANTIDADE";
  const thValorTotal = document.createElement("th");
  thValorTotal.textContent = "VALOR TOTAL (Aproximado)";

  trHead.appendChild(thDescricao);
  trHead.appendChild(thValorUni);
  trHead.appendChild(thQuantidade);
  trHead.appendChild(thValorTotal);
  thead.appendChild(trHead);

  const tbody = document.createElement("tbody");

  //cria os elementos da tabela e coloca os itens dentro
  for (let a = 1; a < QuantidadeDeItensDiferentes; a++) {
    const linha = document.createElement("tr");
    const descricao = document.createElement("td");
    const valorUni = document.createElement("td");
    const quantidade = document.createElement("td");
    const valorTotal = document.createElement("td");

    const codigo = Object.values(itensTabela)[a - 1];

    const quantidadeItem = Object.values(quantidadesItens)[a - 1];

    const objetoItem = buscarItemPorCodigo(codigo);

    descricao.textContent = `${objetoItem.descricao}`;
    valorUni.textContent = `R$ ${objetoItem.preco.toFixed(2)}`;
    quantidade.textContent = `${quantidadeItem}`;
    valorTotal.textContent = `R$ ${(objetoItem.preco * quantidadeItem).toFixed(
      2
    )}`;

    linha.appendChild(descricao);
    linha.appendChild(valorUni);
    linha.appendChild(quantidade);
    linha.appendChild(valorTotal);

    tbody.appendChild(linha);
  }

  tabela.appendChild(thead);
  tabela.appendChild(tbody);

  document.getElementById("tabela2").innerHTML = "";
  document.getElementById("tabela2").appendChild(tabela);
}

function buscarItemPorCodigo(codigo) {
  const itemEncontrado = ListaDeItens.find((item) => item.codigo == codigo);
  if (itemEncontrado) {
    return {
      descricao: itemEncontrado.descricao,
      preco: itemEncontrado.preco,
    };
  } else {
    alert("Item não encontrado.");
  }
}

var CopiarConteudo = {
  selecionarConteudo: function (el) {
    var body = document.body;
    var range, sel;
    if (document.createRange && window.getSelection) {
      range = document.createRange();
      sel = window.getSelection();
      sel.removeAllRanges();
      try {
        range.selectNodeContents(el);
        sel.addRange(range);
      } catch (e) {
        range.selectNode(el);
        sel.addRange(range);
      }
    } else if (body.createTextRange) {
      range = body.createTextRange();
      range.moveToElementText(el);
      range.select();
    }
    try {
      document.execCommand("copy");
      range.blur();
    } catch (error) {
      // Lidar com exceção aqui, se necessário
    }
  },
};

var copiarConteudoBtn = document.querySelector("#botaoCopiar");
var minhaDiv = document.querySelector("#resultado");

// Seleciona o conteúdo no clique do botão
copiarConteudoBtn.addEventListener("click", function () {
  CopiarConteudo.selecionarConteudo(minhaDiv);
});

botaoCopiar.style.display = "none"; // Esconde o botão inicialmente
function AmostrarBotao(botao) {
  botao.style.display = "block";
}

}
}))