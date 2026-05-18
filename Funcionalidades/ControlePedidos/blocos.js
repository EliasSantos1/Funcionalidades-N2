import { adicionarDadosAguardando, adicionarDadosRecebido, excluirDadosAguardando, excluirDadosRecebido, excluirDadosSolicitar, adicionarAoHistorico } from "../funcoesUteis/firebase.js";

const agora = new Date();
const minutosFormatados = agora.getMinutes().toString().padStart(2, '0');
const dataFormatada = `${agora.getDate()}/${agora.getMonth() + 1}/${agora.getFullYear()} - ${agora.getHours()}:${minutosFormatados}`;
    
// Recupera os dados do usuário logado do sessionStorage
const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado")); // Nomeie "usuarioLogado" conforme o que você está usando para armazenar


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

            // CHECKBOX ADIANTADO
            const divCheck = document.createElement('div');
            divCheck.classList.add('checkAdiantado');
        
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = objeto.ADIANTADO || false;
        
            const label = document.createElement('label');
            label.innerHTML = ' Item adiantado do estoque';
        
            divCheck.appendChild(checkbox);
            divCheck.appendChild(label);
        
            divContainer.appendChild(divCheck);
        
            const selo = document.createElement('div');
            selo.classList.add('seloAdiantado');
            selo.innerHTML = '✅ ADIANTADO DO ESTOQUE';
            
            if(objeto.ADIANTADO){
                divContainer.classList.add('adiantado');
                divContainer.prepend(selo);
            }
        
            checkbox.addEventListener('change', function(){
        
                const confirmar = checkbox.checked
                    ? window.confirm('Deseja marcar este item como adiantado?')
                    : window.confirm('Deseja remover o status de adiantado?');
            
                if(!confirmar){
                    checkbox.checked = !checkbox.checked;
                    return;
                }
            
                objeto.ADIANTADO = checkbox.checked;
            
                if(checkbox.checked){
            
                    divContainer.classList.add('adiantado');
            
                    if(!divContainer.contains(selo)){
                        divContainer.prepend(selo);
                    }
            
                    adicionarAoHistorico(
                        `${dataFormatada} | ${usuarioLogado.nome} Marcou o pedido do chamado ${objeto.CHAMADO} como adiantado`,
                        objeto.CHAMADO
                    )
            
                } else {
            
                    divContainer.classList.remove('adiantado');
            
                    if(divContainer.contains(selo)){
                        divContainer.removeChild(selo);
                    }
            
                    adicionarAoHistorico(
                        `${dataFormatada} | ${usuarioLogado.nome} Removeu o status de adiantado do pedido do chamado ${objeto.CHAMADO}`,
                        objeto.CHAMADO
                    )
                }
            
                adicionarDadosAguardando(objeto, objeto.CHAMADO);
            
            });
        

    const btnAdicionarSC = document.createElement('button');
    btnAdicionarSC.textContent = 'Adicionar SC';
    btnAdicionarSC.setAttribute('id', objeto.CHAMADO);
    btnAdicionarSC.addEventListener("click", function() {
        const valorSC = scInput.value
        if (valorSC != "") {
            objeto.SC = scInput.value
            console.log(objeto);
            adicionarDadosAguardando(objeto, objeto.CHAMADO)
		    adicionarAoHistorico(`${dataFormatada} | ${usuarioLogado.nome} Fez a solicitação de compra no Tasy do chamado ${objeto.CHAMADO}`, objeto.CHAMADO)
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
            adicionarAoHistorico(`${dataFormatada} | ${usuarioLogado.nome} Excluiu o pedido que ainda não tinha sido solicitado no Tasy do chamado ${objeto.CHAMADO}`, objeto.CHAMADO)
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

        // CHECKBOX ADIANTADO
    const divCheck = document.createElement('div');
    divCheck.classList.add('checkAdiantado');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = objeto.ADIANTADO || false;

    const label = document.createElement('label');
    label.innerHTML = ' Item adiantado do estoque';

    divCheck.appendChild(checkbox);
    divCheck.appendChild(label);

    divContainer.appendChild(divCheck);

    const selo = document.createElement('div');
    selo.classList.add('seloAdiantado');
    selo.innerHTML = '✅ ADIANTADO DO ESTOQUE';
    
    if(objeto.ADIANTADO){
        divContainer.classList.add('adiantado');
        divContainer.prepend(selo);
    }

    checkbox.addEventListener('change', function(){

        const confirmar = checkbox.checked
            ? window.confirm('Deseja marcar este item como adiantado?')
            : window.confirm('Deseja remover o status de adiantado?');
    
        if(!confirmar){
            checkbox.checked = !checkbox.checked;
            return;
        }
    
        objeto.ADIANTADO = checkbox.checked;
    
        if(checkbox.checked){
    
            divContainer.classList.add('adiantado');
    
            if(!divContainer.contains(selo)){
                divContainer.prepend(selo);
            }
    
            adicionarAoHistorico(
                `${dataFormatada} | ${usuarioLogado.nome} Marcou o pedido do chamado ${objeto.CHAMADO} como adiantado`,
                objeto.CHAMADO
            )
    
        } else {
    
            divContainer.classList.remove('adiantado');
    
            if(divContainer.contains(selo)){
                divContainer.removeChild(selo);
            }
    
            adicionarAoHistorico(
                `${dataFormatada} | ${usuarioLogado.nome} Removeu o status de adiantado do pedido do chamado ${objeto.CHAMADO}`,
                objeto.CHAMADO
            )
        }
    
        adicionarDadosAguardando(objeto, objeto.CHAMADO);
    
    });

    const btnAdicionarSC = document.createElement('button');
    btnAdicionarSC.textContent = 'Item Recebido';
    btnAdicionarSC.setAttribute('id', objeto.CHAMADO);
    btnAdicionarSC.addEventListener("click", function() {
        adicionarDadosRecebido(objeto, objeto.CHAMADO)
        adicionarAoHistorico(`${dataFormatada} | ${usuarioLogado.nome} Marcou como recebido os itens do chamado ${objeto.CHAMADO}`, objeto.CHAMADO)
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
            adicionarAoHistorico(`${dataFormatada} | ${usuarioLogado.nome} Excluiu o pedido que ja foi solicitado no Tasy do chamado ${objeto.CHAMADO}`, objeto.CHAMADO)
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

            // CHECKBOX ADIANTADO
            const divCheck = document.createElement('div');
            divCheck.classList.add('checkAdiantado');
        
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = objeto.ADIANTADO || false;
        
            const label = document.createElement('label');
            label.innerHTML = ' Item entregue';
        
            divCheck.appendChild(checkbox);
            divCheck.appendChild(label);
        
            divContainer.appendChild(divCheck);
        
            const selo = document.createElement('div');
            selo.classList.add('seloAdiantado');
            selo.innerHTML = '✅ ENTREGUE';
            
            if(objeto.ADIANTADO){
                divContainer.classList.add('adiantado');
                divContainer.prepend(selo);
            }
        
            checkbox.addEventListener('change', function(){
        
                const confirmar = checkbox.checked
                    ? window.confirm('Deseja marcar este item como entregue?')
                    : window.confirm('Deseja remover o status de entregue?');
            
                if(!confirmar){
                    checkbox.checked = !checkbox.checked;
                    return;
                }
            
                objeto.ADIANTADO = checkbox.checked;
            
                if(checkbox.checked){
            
                    divContainer.classList.add('adiantado');
            
                    if(!divContainer.contains(selo)){
                        divContainer.prepend(selo);
                    }
            
                    adicionarAoHistorico(
                        `${dataFormatada} | ${usuarioLogado.nome} Marcou o pedido do chamado ${objeto.CHAMADO} como entregue`,
                        objeto.CHAMADO
                    )
            
                } else {
            
                    divContainer.classList.remove('adiantado');
            
                    if(divContainer.contains(selo)){
                        divContainer.removeChild(selo);
                    }
            
                    adicionarAoHistorico(
                        `${dataFormatada} | ${usuarioLogado.nome} Removeu o status de entregue do pedido do chamado ${objeto.CHAMADO}`,
                        objeto.CHAMADO
                    )
                }
            
                adicionarDadosAguardando(objeto, objeto.CHAMADO);
            
            });
        

    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.setAttribute('id', objeto.CHAMADO);
    btnExcluir.addEventListener("click", function() {
        // Exiba um alerta de confirmação
        const confirmacao = window.confirm('Tem certeza que deseja excluir esse item?');
        if (confirmacao) {
            excluirDadosRecebido(objeto.CHAMADO)
            adicionarAoHistorico(`${dataFormatada} | ${usuarioLogado.nome} Excluiu o pedido que ja foi entregue do chamado ${objeto.CHAMADO}`, objeto.CHAMADO)
            location.reload()
        } else {
            console.log('Operação cancelada.');
        }
    })
    divContainer.appendChild(btnExcluir);

    return divContainer;
}