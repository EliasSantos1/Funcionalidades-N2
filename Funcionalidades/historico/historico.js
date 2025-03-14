import { lerDados } from "../funcoesUteis/firebase.js";
import { verificarLogin } from '../funcoesUteis/auth.js';

// Verifica se o usuário está logado ao carregar a página
verificarLogin();

lerDados().then((dados) => {
	if (dados != null) {
		var ListaHistorico = dados.Historico;

		// Função para converter string de data e hora para objeto Date
		function stringParaDataHora(descricao) {
            
            // Verifica se a descrição tem o formato esperado (data e hora antes do " | ")
            if (descricao && descricao.includes(" - ") && descricao.includes(" | ")) {
                const [dataHoraParte] = descricao.split(" | ")
                const [data, hora] = dataHoraParte.split(" - ");
                const [dia, mes, ano] = data.split("/");
                const [horas, minutos] = hora.split(":");
        
                return new Date(ano, mes - 1, dia, horas, minutos);
            }
        
            // Retorne `null` se não for possível converter
            return null;
        }

		// Função para renderizar o histórico ordenado
		function renderizarHistorico(dados) {
			const historicoContainer = document.getElementById("historico");

			// Limpa o conteúdo atual antes de renderizar
			historicoContainer.innerHTML = "";

			// Array para armazenar todos os pedidos com data para ordenação
			let todosPedidos = [];

			// Percorre os dados retornados do Firebase
			for (let idChamado in dados) {
				const pedidos = dados[idChamado];

				for (let key in pedidos) {
					const descricao = pedidos[key];

					// Armazena o pedido e a data para ordenação
					todosPedidos.push({
						descricao: descricao,
						dataHora: stringParaDataHora(descricao),
					});
				}
			}

			// Ordena os pedidos pela data e hora, do mais recente para o mais antigo
			todosPedidos.sort((a, b) => b.dataHora - a.dataHora);

			// Renderiza os pedidos na ordem desejada
			todosPedidos.forEach((pedido) => {
				const pedidoElement = document.createElement("div");
				pedidoElement.classList.add("pedido");

				// Formata o conteúdo para exibir no histórico
				pedidoElement.innerHTML = `
            <span class="descricao">${pedido.descricao}</span>
        `;

				// Adiciona o elemento ao container de histórico
				historicoContainer.appendChild(pedidoElement);
			});
		}

		renderizarHistorico(ListaHistorico);
	}
});

// Função para exportar os dados para Excel
function exportarParaExcel() {
    const historicoContainer = document.getElementById("historico");
    const pedidos = historicoContainer.querySelectorAll(".pedido");

    // Dados para exportação
    const dadosExportar = [["Descrição"]]; // Cabeçalho

    // Itera pelos pedidos no histórico
    pedidos.forEach((pedido) => {
        const descricao = pedido.querySelector(".descricao").innerText;
        dadosExportar.push([descricao]);
    });

    // Cria a planilha
    const ws = XLSX.utils.aoa_to_sheet(dadosExportar);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Histórico de Pedidos");

    // Baixa o arquivo
    XLSX.writeFile(wb, "HistoricoPedidos.xlsx");
}

// Adiciona evento ao botão de exportação
const botaoExportar = document.getElementById("botaoExportar");
botaoExportar.addEventListener("click", exportarParaExcel);
