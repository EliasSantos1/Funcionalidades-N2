import { lerDados } from "../funcoesUteis/firebase.js";
import { verificarLogin } from "../funcoesUteis/auth.js";

// Verifica se o usuário está logado ao carregar a página
verificarLogin();

// Função para converter string de data e hora para objeto Date
function stringParaDataHora(dataHora) {
    if (dataHora && dataHora.includes(" - ")) {
        const [data, hora] = dataHora.split(" - ");
        const [dia, mes, ano] = data.split("/");
        const [horas, minutos] = hora.split(":");

        return new Date(ano, mes - 1, dia, horas, minutos);
    }
    return null;
}

// Função para renderizar o histórico do estoque ordenado
function renderizarHistoricoEstoque(dados) {
    const historicoContainer = document.getElementById("historicoEstoque");

    // Limpa o conteúdo atual antes de renderizar
    historicoContainer.innerHTML = "";

    // Array para armazenar todos os registros com data para ordenação
    let todosRegistros = [];

    // Percorre os dados retornados do Firebase
    for (let item in dados) {
        const registros = dados[item];

        for (let key in registros) {
            const registro = registros[key];

            // Armazena o registro e a data para ordenação
            todosRegistros.push({
                ...registro, // Inclui todos os campos do registro
                dataHora: stringParaDataHora(registro.data), // Converte a data para Date
            });
        }
    }

    // Ordena os registros pela data e hora, do mais recente para o mais antigo
    todosRegistros.sort((a, b) => b.dataHora - a.dataHora);

    // Renderiza os registros na ordem desejada
    todosRegistros.forEach((registro) => {
        const registroElement = document.createElement("div");
        registroElement.classList.add("pedido");

        // Formata o conteúdo para exibir no histórico
        const descricao =
            registro.acao === "Adição"
                ? `${registro.data} | ${registro.usuario} adicionou ${registro.quantidade} ${registro.item} ao estoque`
                : `${registro.chamado} | ${registro.data} | ${registro.usuario} retirou ${registro.quantidade} ${registro.item} do estoque para o setor ${registro.setorUtilizado} `;

        registroElement.innerHTML = `<span class="descricao">${descricao}</span>`;

        // Adiciona o elemento ao container de histórico
        historicoContainer.appendChild(registroElement);
    });
}

// Função para exportar o histórico em formato Excel
function exportarHistoricoParaExcel(dadosHistorico) {
    if (!dadosHistorico || Object.keys(dadosHistorico).length === 0) {
        alert("Não há dados para exportar.");
        return;
    }

    const registros = [];

    // Percorre os dados e organiza em um array para o Excel
    for (let item in dadosHistorico) {
        const registrosItem = dadosHistorico[item];
        for (let key in registrosItem) {
            const registro = registrosItem[key];
            registros.push({
                Ação: registro.acao,
                Data: registro.data,
                Item: registro.item,
                Quantidade: registro.quantidade,
                Usuário: registro.usuario,
                Motivo: registro.motivo || "N/A",
                Chamado: registro.chamado || "N/A",
            });
        }
    }

    // Cria a planilha usando SheetJS
    const ws = XLSX.utils.json_to_sheet(registros);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Histórico Estoque");

    // Gera o arquivo Excel e baixa no navegador
    XLSX.writeFile(wb, "historico_estoque.xlsx");
}

// Lê os dados e inicializa a interface
lerDados().then((dados) => {
    if (dados && dados.HistoricoEstoque) {
        renderizarHistoricoEstoque(dados.HistoricoEstoque);

        // Adicionar evento ao botão de exportar
        const botaoExportar = document.getElementById("botaoExportar");
        botaoExportar.addEventListener("click", () => {
            exportarHistoricoParaExcel(dados.HistoricoEstoque);
        });
    } else {
        alert("Não foi possível carregar os dados do histórico.");
    }
});
