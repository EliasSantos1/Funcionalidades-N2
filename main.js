const usuarioLogado = sessionStorage.getItem("usuarioLogado");

    if (!usuarioLogado) {
        // Se não estiver logado, redireciona para a página de login
        window.location.href = "Funcionalidades/login/login.html";
    }
