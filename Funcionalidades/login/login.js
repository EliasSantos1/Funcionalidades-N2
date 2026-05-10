import { autenticarUsuario, adicionarUsuario  } from "../funcoesUteis/firebase.js";

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM totalmente carregado e analisado.");
  
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const btnLogin = document.getElementById("btn-login");
    const btnRegister = document.getElementById("btn-register");
  
    // Mostra o formulário de login
    btnLogin.addEventListener("click", function() {
      loginForm.style.display = "block";
      registerForm.style.display = "none";
      document.getElementById("acao").style.display = "none"; // Oculta a escolha
      console.log("Formulário de login exibido.");
    });
  
    // Mostra o formulário de registro
    btnRegister.addEventListener("click", function() {
      registerForm.style.display = "block";
      loginForm.style.display = "none";
      document.getElementById("acao").style.display = "none"; // Oculta a escolha
      console.log("Formulário de registro exibido.");
    });
  
    // Formulário de Login
    loginForm.addEventListener("submit", function(event) {
      event.preventDefault();
      console.log("Evento de submit do login disparado e comportamento padrão prevenido.");
  
      const matricula = document.getElementById("matricula").value;
      const password = document.getElementById("password").value;
      const feedback = document.getElementById("feedback");
  
      console.log("Dados do login:", { matricula, password });
      feedback.textContent = ""; // Limpa o feedback
  
      autenticarUsuario(matricula, password)
        .then((usuarioAutenticado) => {
          console.log("Resultado da autenticação:", usuarioAutenticado);
  
          if (usuarioAutenticado) {
            const { password, ...usuarioSemSenha } = usuarioAutenticado; 
            sessionStorage.setItem("usuarioLogado", JSON.stringify(usuarioSemSenha));
            alert("Login realizado com sucesso!");
            console.log("Redirecionando para a página inicial.");
            window.location.href = "../../index.html"; // Redireciona para a página inicial
          } else {
            feedback.textContent = "Matrícula ou senha incorretos.";
            feedback.style.color = "red";
            console.log("Autenticação falhou: matrícula ou senha incorretos.");
          }
        })
        .catch((error) => {
          console.error("Erro ao autenticar:", error);
          feedback.textContent = "Erro ao tentar fazer login. Tente novamente.";
          feedback.style.color = "red";
        });
    });
  
    // Formulário de Registro
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();
      console.log("Evento de submit do registro disparado e comportamento padrão prevenido.");
    
      const nome = document.getElementById("nome").value;
      const email = document.getElementById("email").value;
      const matricula = document.getElementById("matricula-register").value;
      const password = document.getElementById("password-register").value;
      const registerFeedback = document.getElementById("register-feedback");
      const isAdmin = false;
    
      console.log("Dados do registro:", { nome, email, matricula, password });
      registerFeedback.textContent = ""; // Limpa o feedback
    
      // Chama a função para adicionar o usuário ao Firebase Authentication e salvar os dados extras
      adicionarUsuario(email, password, nome, matricula, isAdmin)
        .then(() => {
          registerFeedback.textContent = "Usuário cadastrado com sucesso!";
          registerFeedback.style.color = "green";
          console.log("Usuário cadastrado com sucesso.");
          
          // Recarrega a página após um curto período para refletir as mudanças
          setTimeout(() => {
            location.reload();
          }, 1000);
        })
        .catch((error) => {
          console.error("Erro ao cadastrar usuário:", error);
          registerFeedback.textContent = "Erro ao cadastrar. Tente novamente.";
          registerFeedback.style.color = "red";
        });
    });
  });