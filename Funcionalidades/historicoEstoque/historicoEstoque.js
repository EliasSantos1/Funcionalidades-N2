import { lerDados } from "../funcoesUteis/firebase.js";
import { verificarLogin } from "../funcoesUteis/auth.js";

// Verifica se o usuário está logado ao carregar a página
verificarLogin();

lerDados().then((dados) => {
    if (dados != null) {
        const ListaHistoricoEstoque = dados.HistoricoEstoque;

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
                        : `${registro.data} | ${registro.usuario} retirou ${registro.quantidade} ${registro.item} do estoque para o chamado ${registro.chamado || "não informado"}`;

                registroElement.innerHTML = `<span class="descricao">${descricao}</span>`;

                // Adiciona o elemento ao container de histórico
                historicoContainer.appendChild(registroElement);
            });
        }

        renderizarHistoricoEstoque(ListaHistoricoEstoque);
    }
});
