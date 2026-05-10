import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { 
  getDatabase, 
  ref, 
  set, 
  push, 
  onValue, 
  remove, 
  update, 
  get, 
  child,
  onDisconnect
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";


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
const auth = getAuth(app);
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
export function autenticarUsuario(email, senha) {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Usuário autenticado:", user);

        // Buscar os dados extras no Realtime Database
        const usuariosRef = ref(db, "Usuarios");
        get(child(usuariosRef, user.uid)) // Buscar os dados do usuário pelo UID
          .then((snapshot) => {
            if (snapshot.exists()) {
              const usuarioData = snapshot.val();
              resolve({ uid: user.uid, email: user.email, ...usuarioData }); // Retorna os dados do usuário
            } else {
              console.warn("Usuário autenticado, mas sem dados extras no banco.");
              resolve({ uid: user.uid, email: user.email });
            }
          })
          .catch((error) => {
            console.error("Erro ao buscar dados do usuário:", error);
            reject(error);
          });
      })
      .catch((error) => {
        console.error("Erro ao fazer login:", error);
        reject(error);
      });
  });
}

export function adicionarUsuario(email, senha, nome, matricula, isAdmin) {
  return new Promise((resolve, reject) => {
    // Criar usuário no Firebase Authentication
    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;

        // Após criar o usuário, salvar os dados extras no Realtime Database
        const usuariosRef = ref(db, 'Usuarios/' + user.uid);
        set(usuariosRef, {
          nome: nome,
          matricula: matricula,
          email: email,
          isAdmin: isAdmin
        })
        .then(() => {
          console.log("Usuário cadastrado com sucesso!");
          resolve();
        })
        .catch((error) => {
          console.error("Erro ao salvar dados no banco:", error);
          reject(error);
        });
      })
      .catch((error) => {
        console.error("Erro ao criar usuário:", error);
        reject(error);
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