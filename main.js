const usuarioLogado = sessionStorage.getItem("usuarioLogado");

if (!usuarioLogado) {
    // Se não estiver logado, redireciona para a página de login
    window.location.href = "Funcionalidades/login/login.html";
} else {
    const usuario = JSON.parse(usuarioLogado); // Converte para objeto

    if (!usuario.isAdmin) {
        // Remove os botões restritos para admin
        document.querySelectorAll(".admin-only").forEach((botao) => {
            botao.remove();
        });

        // Agora realinhamos os botões para evitar espaços vazios
        const secoes = document.querySelectorAll(".botoes");
        const todosBotoes = [];

        // Pegamos todos os botões restantes
        secoes.forEach((section) => {
            section.querySelectorAll(".botao").forEach((botao) => {
                todosBotoes.push(botao);
            });
            section.innerHTML = ""; // Esvaziamos as seções
        });

        // Redistribuímos os botões entre as seções
        let index = 0;
        secoes.forEach((section) => {
            for (let i = 0; i < 3 && index < todosBotoes.length; i++) {
                section.appendChild(todosBotoes[index]);
                index++;
            }
        });

        // Se sobrar uma seção vazia no final, removemos
        secoes.forEach((section) => {
            if (section.children.length === 0) {
                section.remove();
            }
        });
    }
}
