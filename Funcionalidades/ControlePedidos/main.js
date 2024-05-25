import { criarBlocoAguardando, criarBlocoRecebido, criarBlocoSolicitacao } from "./blocos.js";
import { lerDados, adicionarDadosSolicitar, excluirDadosSolicitar } from "../funcoesUteis/firebase.js";

lerDados().then((dados => {
    console.log(dados);
    if (dados != null) {
    var dadosSolictacao = dados.ItensParaSolicitar
    var dadosAguardando = dados.ItensAguardandoChegada
    var dadosRecebidos = dados.ItensRecebidos

    const containerSolicitacoes = document.getElementById("Container_Solicitacoes")
    const containerAguardando = document.getElementById("Container_Aguardando")
    const containerRecebido = document.getElementById("Container_Recebido")

    for (const a in dadosSolictacao) {
        const pedido = dadosSolictacao[a];
        const bloco = criarBlocoSolicitacao(pedido)
        containerSolicitacoes.appendChild(bloco)
    }

    for (const a in dadosAguardando) {
        const pedido = dadosAguardando[a];
        const bloco = criarBlocoAguardando(pedido)
        containerAguardando.appendChild(bloco)
    }

    for (const a in dadosRecebidos) {
        const pedido = dadosRecebidos[a];
        const bloco = criarBlocoRecebido(pedido)
        containerRecebido.appendChild(bloco)
    }
}
}))