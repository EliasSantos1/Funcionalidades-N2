import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
  update,
  onDisconnect
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCccAshc6okqYmtxvg9Iggz4FDMpGZeSgA",
  authDomain: "estoqueti-5645c.firebaseapp.com",
  databaseURL: "https://estoqueti-5645c-default-rtdb.firebaseio.com",
  projectId: "estoqueti-5645c",
  storageBucket: "estoqueti-5645c.appspot.com",
  messagingSenderId: "912081478892",
  appId: "1:912081478892:web:da4dafca68f83992af71c9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
const dbRef = ref(db);

const usersRef = ref(db, "users/online");

window.addEventListener("beforeunload", () => {
  goOffline();
});

window.addEventListener("beforereload", () => {
  goOffline();
});

// Função para ler dados do banco de dados e retorná-los como uma Promise
export function lerDados() {
  return new Promise((resolve, reject) => {
    try {
      // Ouça mudanças nos dados do banco de dados em tempo real
      onValue(dbRef, (snapshot) => {
        const dados = snapshot.val();
        resolve(dados); // Resolvemos a Promise com os dados
      });
    } catch (error) {
      reject(error); // Rejeitamos a Promise em caso de erro
    }
  });
}


// Função para adicionar dados ao banco de dados
export function adicionarDadosSolicitar(dadosParaAdicionar, ID_Dados) {
  try {
    // Referência para o local onde você deseja adicionar os dados
    const dadosRef = ref(db, `ItensParaSolicitar/${ID_Dados}`);

    // Adicione os dados ao banco de dados
    set(dadosRef, dadosParaAdicionar)
      .then(() => {
        console.log("Dados adicionados com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao adicionar dados:", error);
      });
  } catch (error) {
    console.error("Erro ao adicionar dados:", error);
  }
}

export function adicionarDadosRecebido(dadosParaAdicionar, ID_Dados) {
  try {
    // Referência para o local onde você deseja adicionar os dados
    const dadosRef = ref(db, `ItensRecebidos/${ID_Dados}`);

    // Adicione os dados ao banco de dados
    set(dadosRef, dadosParaAdicionar)
      .then(() => {
        console.log("Dados adicionados com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao adicionar dados:", error);
      });
  } catch (error) {
    console.error("Erro ao adicionar dados:", error);
  }
}

export function adicionarDadosAguardando(dadosParaAdicionar, ID_Dados) {
  try {
    // Referência para o local onde você deseja adicionar os dados
    const dadosRef = ref(db, `ItensAguardandoChegada/${ID_Dados}`);

    // Adicione os dados ao banco de dados
    set(dadosRef, dadosParaAdicionar)
      .then(() => {
        console.log("Dados adicionados com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao adicionar dados:", error);
      });
  } catch (error) {
    console.error("Erro ao adicionar dados:", error);
  }
}


// Função para excluir dados do banco de dados
export function excluirDadosSolicitar(ID_Dados) {
  try {
    // Referência para o local onde você deseja excluir os dados
    const dadosRef = ref(db, `ItensParaSolicitar/${ID_Dados}`);

    // Exclua os dados do banco de dados
    remove(dadosRef)
      .then(() => {
        console.log("Dados excluídos com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao excluir dados:", error);
      });
  } catch (error) {
    console.error("Erro ao excluir dados:", error);
  }
}

export function excluirDadosRecebido(ID_Dados) {
  try {
    // Referência para o local onde você deseja excluir os dados
    const dadosRef = ref(db, `ItensRecebidos/${ID_Dados}`);

    // Exclua os dados do banco de dados
    remove(dadosRef)
      .then(() => {
        console.log("Dados excluídos com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao excluir dados:", error);
      });
  } catch (error) {
    console.error("Erro ao excluir dados:", error);
  }
}

export function excluirDadosAguardando(ID_Dados) {
  try {
    // Referência para o local onde você deseja excluir os dados
    const dadosRef = ref(db, `ItensAguardandoChegada/${ID_Dados}`);

    // Exclua os dados do banco de dados
    remove(dadosRef)
      .then(() => {
        console.log("Dados excluídos com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao excluir dados:", error);
      });
  } catch (error) {
    console.error("Erro ao excluir dados:", error);
  }
}

export function adicionarAoHistorico(dadosParaAdicionar, ID_Dados) {
  try {
    // Referência para o local onde você deseja adicionar os dados
    const dadosRef = ref(db, `Historico/${ID_Dados}`);

    // Adicione os dados ao banco de dados
    push(dadosRef, dadosParaAdicionar)
      .then(() => {
        console.log("Dados adicionados com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao adicionar dados:", error);
      });
  } catch (error) {
    console.error("Erro ao adicionar dados:", error);
  }
}

// Função para autenticar o usuário
export function autenticarUsuario(matricula, password) {
  return new Promise((resolve, reject) => {
      const usuariosRef = ref(db, 'Usuarios'); // Referência ao nó "Usuarios"

      onValue(usuariosRef, (snapshot) => {
          const dados = snapshot.val();
          if (dados) {
              // Aqui, estamos usando Object.values para obter todos os usuários
              const usuarios = Object.values(dados); // Converte os dados em um array

              // Verifica se há um usuário correspondente
              const usuarioEncontrado = usuarios.find(usuario => 
                  usuario.matricula === matricula && usuario.password === password
              );

              if (usuarioEncontrado) {
                  resolve(usuarioEncontrado); // Retorna o usuário autenticado
              } else {
                  resolve(null); // Retorna null se não encontrar
              }
          } else {
              resolve(null); // Retorna null se não houver dados
          }
      }, (error) => {
          reject(error); // Rejeita a Promise em caso de erro
      });
  });
}

export function adicionarUsuario(dadosUsuario) {
  return new Promise((resolve, reject) => {
    const usuariosRef = ref(db, 'Usuarios/' + dadosUsuario.matricula); // Usando a matrícula como chave
    set(usuariosRef, dadosUsuario)
      .then(() => {
        console.log("Usuário adicionado com sucesso!");
        resolve(); // Resolve a Promise
      })
      .catch((error) => {
        console.error("Erro ao adicionar usuário:", error);
        reject(error); // Rejeita a Promise em caso de erro
      });
  });
}

export function atualizarEstoque(item, novaQuantidade) {
  try {
    // Referência para o local onde você deseja adicionar os dados
    const dadosRef = ref(db, `Estoque`);

    const atualizacao = {};
    atualizacao[item] = novaQuantidade; // Define o valor do item com a nova quantidade

    // Adicione os dados ao banco de dados
    update(dadosRef, atualizacao)
      .then(() => {
        console.log(`Estoque do item "${item}" atualizado para ${novaQuantidade}.`);
      })
      .catch((error) => {
        console.error("Erro ao atualizar o estoque:", error);
      });
  } catch (error) {
    console.error("Erro ao atualizar o estoque:", error);
  }
}

/**
 * Adiciona um listener para atualizações em tempo real no nó `Estoque`.
 * @param {Function} callback - Função a ser chamada quando os dados mudarem.
 */
export function adicionarListenerEstoque(callback) {
  const estoqueRef = ref(db, "Estoque");

  onValue(estoqueRef, (snapshot) => {
      const dadosAtualizados = snapshot.val();
      if (dadosAtualizados) {
          callback(dadosAtualizados); // Executa a função passada com os dados atualizados
      } else {
          console.error("Nenhum dado encontrado no estoque.");
      }
  });
}

export function adicionarAoHistoricoEstoque(dadosParaAdicionar, ID_Dados) {
  try {
    // Referência para o local onde você deseja adicionar os dados
    const dadosRef = ref(db, `HistoricoEstoque/${ID_Dados}`);

    // Adicione os dados ao banco de dados
    push(dadosRef, dadosParaAdicionar)
      .then(() => {
        console.log("Dados adicionados com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao adicionar dados:", error);
      });
  } catch (error) {
    console.error("Erro ao adicionar dados:", error);
  }
}

// Criando um identificador único para cada conexão
const myConnection = push(usersRef); 

// Definindo que o usuário está online
set(myConnection, { online: true });

// Configurando onDisconnect para remover o usuário ao sair
onDisconnect(myConnection).remove();