import { adicionarDadosAguardando, adicionarDadosRecebido, excluirDadosAguardando, excluirDadosRecebido, excluirDadosSolicitar, adicionarAoHistorico } from "../funcoesUteis/firebase.js";

const agora = new Date();
const minutosFormatados = agora.getMinutes().toString().padStart(2, '0');
const dataFormatada = `${agora.getDate()}/${agora.getMonth() + 1}/${agora.getFullYear()} - ${agora.getHours()}:${minutosFormatados}`;
    

// Função para criar o bloco da solicitação
 export function criarBlocoSolicitacao(objeto) {
    const divContainer = document.createElement('div');
    divContainer.classList.add('script');

    const setor = document.createElement('p');
    setor.innerHTML = `<b>SETOR: </b>${objeto.SETOR}`;
    divContainer.appendChild(setor);

    const chamado = document.createElement('p');
    chamado.innerHTML = `<b>CHAMADO: </b>${objeto.CHAMADO}`;
    divContainer.appendChild(chamado);

    const cc = document.createElement('p');
    cc.innerHTML = `<b>C.C: </b>${objeto.CC}`;
    divContainer.appendChild(cc);

    const scLabel = document.createElement('label');
    scLabel.setAttribute('for', objeto.CHAMADO);
    scLabel.innerHTML = '<b>S.C: </b>';
    const scInput = document.createElement('input');
    scInput.setAttribute('type', 'text');
    scInput.setAttribute('id', objeto.CHAMADO);
    scInput.setAttribute('name', 'S.C');
    scInput.setAttribute('placeholder', 'Digite a solicitação de compra');
    const scParagraph = document.createElement('p');
    scParagraph.appendChild(scLabel);
    scParagraph.appendChild(scInput);
    divContainer.appendChild(scParagraph);

    const listaDeItens = objeto.ITENS

    for (const a in listaDeItens) {
        const objItem = listaDeItens[a]
        console.log(objItem);
    

    const item = document.createElement('p');
    item.innerHTML = `<b>ITEM: </b>${objItem.descricao}`;
    divContainer.appendChild(item);

    const qtd = document.createElement('p');
    qtd.innerHTML = `<b>QTD: </b>${objItem.quantidade}`;
    divContainer.appendChild(qtd);
    }

    const btnAdicionarSC = document.createElement('button');
    btnAdicionarSC.textContent = 'Adicionar SC';
    btnAdicionarSC.setAttribute('id', objeto.CHAMADO);
    btnAdicionarSC.addEventListener("click", function() {
        const valorSC = scInput.value
        if (valorSC != "") {
            objeto.SC = scInput.value
            console.log(objeto);
            adicionarDadosAguardando(objeto, objeto.CHAMADO)
		    adicionarAoHistorico(`${dataFormatada} | Feito a solicitação de compra no Tasy do chamado ${objeto.CHAMADO}`, objeto.CHAMADO)
            excluirDadosSolicitar(objeto.CHAMADO)
            location.reload()
        } else {
            alert("Precisa adicionar uma Solicitação de compra")
        }
        
    })
    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.setAttribute('id', objeto.CHAMADO);
    btnExcluir.addEventListener("click", function() {
        // Exiba um alerta de confirmação
        const confirmacao = window.confirm('Tem certeza que deseja excluir esse item?');
        if (confirmacao) {
            excluirDadosSolicitar(objeto.CHAMADO)
            adicionarAoHistorico(`${dataFormatada} | Excluido pedido que ainda não tinha sido solicitado no Tasy do chamado ${objeto.CHAMADO}`, objeto.CHAMADO)
            location.reload()
        } else {
            console.log('Operação cancelada.');
        }
    })
    divContainer.appendChild(btnAdicionarSC);
    divContainer.appendChild(btnExcluir);

    return divContainer;
}

// Função para criar o bloco aguardando
export function criarBlocoAguardando(objeto) {
    const divContainer = document.createElement('div');
    divContainer.classList.add('script');

    const setor = document.createElement('p');
    setor.innerHTML = `<b>SETOR: </b>${objeto.SETOR}`;
    divContainer.appendChild(setor);

    const chamado = document.createElement('p');
    chamado.innerHTML = `<b>CHAMADO: </b>${objeto.CHAMADO}`;
    divContainer.appendChild(chamado);

    const cc = document.createElement('p');
    cc.innerHTML = `<b>C.C: </b>${objeto.CC}`;
    divContainer.appendChild(cc);

    const sc = document.createElement('p');
    sc.innerHTML = `<b>S.C: </b>${objeto.SC}`;
    divContainer.appendChild(sc);

    const listaDeItens = objeto.ITENS
    
    for (const a in listaDeItens) {
        const objItem = listaDeItens[a]
        console.log(objItem);
    

    const item = document.createElement('p');
    item.innerHTML = `<b>ITEM: </b>${objItem.descricao}`;
    divContainer.appendChild(item);

    const qtd = document.createElement('p');
    qtd.innerHTML = `<b>QTD: </b>${objItem.quantidade}`;
    divContainer.appendChild(qtd);
    }

    const btnAdicionarSC = document.createElement('button');
    btnAdicionarSC.textContent = 'Item Recebido';
    btnAdicionarSC.setAttribute('id', objeto.CHAMADO);
    btnAdicionarSC.addEventListener("click", function() {
        adicionarDadosRecebido(objeto, objeto.CHAMADO)
        adicionarAoHistorico(`${dataFormatada} | Marcado como recebido os itens do chamado ${objeto.CHAMADO}`, objeto.CHAMADO)
        excluirDadosAguardando(objeto.CHAMADO)
        location.reload()
    })
    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.setAttribute('id', objeto.CHAMADO);
    btnExcluir.addEventListener("click", function() {
        // Exiba um alerta de confirmação
        const confirmacao = window.confirm('Tem certeza que deseja excluir esse item?');
        if (confirmacao) {
            excluirDadosAguardando(objeto.CHAMADO)
            adicionarAoHistorico(`${dataFormatada} | Excluido pedido que ja foi solicitado no Tasy do chamado ${objeto.CHAMADO}`, objeto.CHAMADO)
            location.reload()
        } else {
            console.log('Operação cancelada.');
        }
    })
    divContainer.appendChild(btnAdicionarSC);
    divContainer.appendChild(btnExcluir);

    return divContainer;
}

// Função para criar o bloco recebido
export function criarBlocoRecebido(objeto) {
    const divContainer = document.createElement('div');
    divContainer.classList.add('script');

    const setor = document.createElement('p');
    setor.innerHTML = `<b>SETOR: </b>${objeto.SETOR}`;
    divContainer.appendChild(setor);

    const chamado = document.createElement('p');
    chamado.innerHTML = `<b>CHAMADO: </b>${objeto.CHAMADO}`;
    divContainer.appendChild(chamado);

    const cc = document.createElement('p');
    cc.innerHTML = `<b>C.C: </b>${objeto.CC}`;
    divContainer.appendChild(cc);

    const sc = document.createElement('p');
    sc.innerHTML = `<b>S.C: </b>${objeto.SC}`;
    divContainer.appendChild(sc);

    const listaDeItens = objeto.ITENS
    
    for (const a in listaDeItens) {
        const objItem = listaDeItens[a]
        console.log(objItem);
    

    const item = document.createElement('p');
    item.innerHTML = `<b>ITEM: </b>${objItem.descricao}`;
    divContainer.appendChild(item);

    const qtd = document.createElement('p');
    qtd.innerHTML = `<b>QTD: </b>${objItem.quantidade}`;
    divContainer.appendChild(qtd);
    }

    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.setAttribute('id', objeto.CHAMADO);
    btnExcluir.addEventListener("click", function() {
        // Exiba um alerta de confirmação
        const confirmacao = window.confirm('Tem certeza que deseja excluir esse item?');
        if (confirmacao) {
            excluirDadosRecebido(objeto.CHAMADO)
            adicionarAoHistorico(`${dataFormatada} | Excluido pedido que ja foi entregue do chamado ${objeto.CHAMADO}`, objeto.CHAMADO)
            location.reload()
        } else {
            console.log('Operação cancelada.');
        }
    })
    divContainer.appendChild(btnExcluir);

    return divContainer;
}