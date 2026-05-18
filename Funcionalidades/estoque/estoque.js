import { lerDados, atualizarEstoque, adicionarListenerEstoque, adicionarAoHistoricoEstoque } from "../funcoesUteis/firebase.js"; // Supondo que a função de leitura está aqui
import { verificarLogin } from '../funcoesUteis/auth.js';

// Verifica se o usuário está logado ao carregar a página
verificarLogin();

var dadosEstoque = null;

carregarSetores();

lerDados()
    .then((dados) => {
        if (dados != null) {
            dadosEstoque = dados.Estoque;
            exibirItensEstoque(dadosEstoque); // Exibe os itens de estoque
        } else {
            console.error(
                "Erro ao carregar dados do estoque: Nenhum dado encontrado."
            );
        }
    })
    .catch((error) => {
        console.error("Erro ao carregar dados do estoque:", error);
    });

adicionarListenerEstoque((dadosAtualizados) => {
    dadosEstoque = dadosAtualizados; // Atualiza a variável local
    exibirItensEstoque(dadosEstoque); // Atualiza os itens na tela
});

// Função para abrir o modal de Retirar
export function abrirTelaRetirar(item) {
    var modalRetirar = document.getElementById("modalRetirar");
    modalRetirar.style.display = "block";

    // Salve o item atual para ser usado ao enviar a retirada
    modalRetirar.dataset.item = item; // Associa o item ao modal
}

// Função para abrir o modal de Adicionar
export function abrirTelaAdicionar(item) {
    var modalAdicionar = document.getElementById("modalAdicionar");
    modalAdicionar.style.display = "block";

    // Salve o item atual para ser usado ao enviar a adição
    modalAdicionar.dataset.item = item; // Associa o item ao modal
}

// Função para fechar o modal
export function fecharModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "none"; // Oculta o modal
}

// Funções de exemplo para adicionar ou retirar do estoque
function retirarEstoque() {
    var modalRetirar = document.getElementById("modalRetirar");
    var item = modalRetirar.dataset.item; // Obtém o item atribuído ao modal
    var quantidade = parseInt(document.getElementById("quantidadeRetirada").value);

    if (quantidade > 0) {
        const novaQuantidade = dadosEstoque[item] - quantidade; // `dadosEstoque` contém o valor atual do item
        if (novaQuantidade >= 0) {
            atualizarEstoque(item, novaQuantidade); // Atualiza o item correto

            // Adiciona ao histórico
            const agora = new Date();
            const minutosFormatados = agora.getMinutes().toString().padStart(2, "0");
            const dataFormatada = `${agora.getDate()}/${agora.getMonth() + 1
                }/${agora.getFullYear()} - ${agora.getHours()}:${minutosFormatados}`;
            const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));

            const dadosParaHistorico = {
                acao: "Retirada",
                item: item,
                quantidade: quantidade,
                usuario: usuarioLogado.nome,
                data: dataFormatada,
                setorUtilizado: document.getElementById("setorUtilizado").value, // Campo de motivo no modal
                chamado: document.getElementById("chamadoRetirada").value, // Campo de chamado no modal
            };

            adicionarAoHistoricoEstoque(dadosParaHistorico, item);
            alert("Estoque atualizado e histórico registrado.");
        } else {
            alert("Quantidade insuficiente no estoque.");
        }
    } else {
        alert("Insira uma quantidade válida.");
    }

    fecharModal("modalRetirar");
}

const agora = new Date();
const minutosFormatados = agora.getMinutes().toString().padStart(2, "0");
const dataFormatada = `${agora.getDate()}/${agora.getMonth() + 1
    }/${agora.getFullYear()} - ${agora.getHours()}:${minutosFormatados}`;

function adicionarEstoque() {
    var modalAdicionar = document.getElementById("modalAdicionar");
    var item = modalAdicionar.dataset.item; // Obtém o item atribuído ao modal
    var quantidade = parseInt(document.getElementById("quantidadeAdicionada").value);

    if (quantidade > 0) {
        const novaQuantidade = (dadosEstoque[item] || 0) + quantidade; // `dadosEstoque[item]` pode ser `undefined` para novos itens
        atualizarEstoque(item, novaQuantidade); // Atualiza o item correto

        // Adiciona ao histórico
        const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));

        const dadosParaHistorico = {
            acao: "Adição",
            item: item,
            quantidade: quantidade,
            usuario: usuarioLogado.nome,
            data: dataFormatada,
            motivo: document.getElementById("motivoAdicao").value, // Campo de motivo no modal
        };

        adicionarAoHistoricoEstoque(dadosParaHistorico, item);
        alert("Estoque atualizado e histórico registrado.");
    } else {
        alert("Insira uma quantidade válida.");
    }

    fecharModal("modalAdicionar");
}

// Função para exibir os itens de estoque na tela
export function exibirItensEstoque(dadosEstoque) {
    var itensEstoque = document.getElementById("itensEstoque");

    // Limpa o conteúdo atual
    itensEstoque.innerHTML = "";

    // Para cada item no banco de dados, cria uma linha no HTML
    for (var item in dadosEstoque) {
        if (dadosEstoque.hasOwnProperty(item)) {
            var quantidade = dadosEstoque[item];

            var divItem = document.createElement("div");
            divItem.className = "estoque-item";

            // Criação do conteúdo da linha
            divItem.innerHTML = `
                <div class="descricao">${item}</div>
                <div class="quantidade">${quantidade}</div>
                <button class="botao-remover" data-item="${item}">-</button>
                <button class="botao-adicionar" data-item="${item}">+</button>
            `;

            // Adiciona a linha à lista de itens
            itensEstoque.appendChild(divItem);
        }
    }
}

// Adicionando event listeners para os botões
document.addEventListener("DOMContentLoaded", () => {
    // Adiciona event listeners para os botões de retirar e adicionar
    document.getElementById("itensEstoque").addEventListener("click", (event) => {
        const botao = event.target;
        const item = botao.dataset.item; // Obtém o valor correto do botão clicado

        if (botao.classList.contains("botao-remover")) {
            abrirTelaRetirar(item); // Passa o item ao abrir o modal
        }

        if (botao.classList.contains("botao-adicionar")) {
            abrirTelaAdicionar(item); // Passa o item ao abrir o modal
        }
    });

    // Adicionando evento para fechar os modais
    const closeModalRetirar = document.getElementById("closeModalRetirar");
    const closeModalAdicionar = document.getElementById("closeModalAdicionar");

    closeModalRetirar.addEventListener("click", () =>
        fecharModal("modalRetirar")
    );
    closeModalAdicionar.addEventListener("click", () =>
        fecharModal("modalAdicionar")
    );

    // Adicionando o evento de "Enviar" nos botões do modal
    const btnEnviarRetirar = document.getElementById("btnRetirarEstoque");
    const btnEnviarAdicionar = document.getElementById("btnAdicionarEstoque");

    btnEnviarRetirar.addEventListener("click", retirarEstoque);
    btnEnviarAdicionar.addEventListener("click", adicionarEstoque);
});

let contadorItensRetirada = 0;

function adicionarCampoRetirada() {

    contadorItensRetirada++;

    const container = document.getElementById("listaItensRetirada");

    const div = document.createElement("div");

    div.classList.add("item-retirada");

    const select = document.createElement("select");
    select.id = `itemRetirada-${contadorItensRetirada}`;

    for (const item in dadosEstoque) {

        const option = document.createElement("option");

        option.value = item;
        option.textContent = item;

        select.appendChild(option);
    }

    const inputQuantidade = document.createElement("input");

    inputQuantidade.type = "number";
    inputQuantidade.min = "1";
    inputQuantidade.value = "1";

    inputQuantidade.id = `quantidadeRetirada-${contadorItensRetirada}`;

    div.appendChild(select);
    div.appendChild(inputQuantidade);

    container.appendChild(div);
}

function abrirModalRetirarVarios() {

    document.getElementById("modalRetirarVarios").style.display = "flex";

    const container = document.getElementById("listaItensRetirada");

    container.innerHTML = "";

    contadorItensRetirada = 0;

    adicionarCampoRetirada();
}

async function retirarVariosItens() {

    const chamado = document.getElementById("chamadoRetiradaVarios").value;

    const setor = document.getElementById("setorRetiradaVarios").value;

    const options = document.querySelectorAll("#listaSetoresVarios option");

    let valido = false;

    options.forEach(opt => {
        if (opt.value === setor) {
            valido = true;
        }
    });

    if (!setor || !valido) {
        alert("Selecione um setor válido.");
        return;
    }

    const usuarioLogado = JSON.parse(
        sessionStorage.getItem("usuarioLogado")
    );

    for (let i = 1; i <= contadorItensRetirada; i++) {

        const item = document.getElementById(`itemRetirada-${i}`).value;

        const quantidade = parseInt(
            document.getElementById(`quantidadeRetirada-${i}`).value
        );

        const estoqueAtual = Number(dadosEstoque[item]) || 0;

        if (quantidade > estoqueAtual) {

            alert(`Estoque insuficiente para ${item}`);

            return;
        }
    }

    for (let i = 1; i <= contadorItensRetirada; i++) {

        const item = document.getElementById(`itemRetirada-${i}`).value;

        const quantidade = parseInt(
            document.getElementById(`quantidadeRetirada-${i}`).value
        );

        const estoqueAtual = Number(dadosEstoque[item]) || 0;

        const novaQuantidade = estoqueAtual - quantidade;

        atualizarEstoque(item, novaQuantidade);

        const agora = new Date();

        const dadosHistorico = {

            acao: "Retirada",
            item: item,
            quantidade: quantidade,
            usuario: usuarioLogado.nome,
            chamado: chamado,
            setorUtilizado: setor,
            data: dataFormatada,
        };

        adicionarAoHistoricoEstoque(
            dadosHistorico,
            item
        );
    }

    alert("Itens retirados com sucesso");

    fecharModal("modalRetirarVarios");
}

document
    .getElementById("btnRetirarVarios")
    .addEventListener(
        "click",
        abrirModalRetirarVarios
    );

document
    .getElementById("btnAdicionarItemRetirada")
    .addEventListener(
        "click",
        adicionarCampoRetirada
    );

document
    .getElementById("btnEnviarRetiradaVarios")
    .addEventListener(
        "click",
        retirarVariosItens
    );

document
    .getElementById("closeModalRetirarVarios")
    .addEventListener(
        "click",
        () => fecharModal("modalRetirarVarios")
    );

function carregarSetores() {

    lerDados().then((dados) => {

        const centroDeCusto = dados.CentroDeCusto;

        const datalist1 = document.getElementById("listaSetores");
        const datalist2 = document.getElementById("listaSetoresVarios");

        datalist1.innerHTML = "";
        datalist2.innerHTML = "";

        for (const chave in centroDeCusto) {

            const setor = centroDeCusto[chave].Setor;

            const option1 = document.createElement("option");
            option1.value = setor;

            const option2 = document.createElement("option");
            option2.value = setor;

            datalist1.appendChild(option1);
            datalist2.appendChild(option2);
        }

    }).catch((erro) => {
        console.error("Erro ao carregar setores:", erro);
    });
}

document.getElementById("setorUtilizado").addEventListener("blur", function () {

    const input = this.value;

    const options = document.querySelectorAll("#listaSetores option");

    let valido = false;

    options.forEach(option => {
        if (option.value === input) {
            valido = true;
        }
    });

    if (!valido) {
        alert("Selecione um setor válido da lista.");
        this.value = "";
    }
});