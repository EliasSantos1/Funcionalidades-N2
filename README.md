# Sistema de Suporte para Service Desk N2

## Descrição do Projeto

Este projeto foi desenvolvido para a matéria de Projeto Integrador: Desenvolvimento de Sistemas. O objetivo é criar um sistema com funções úteis para a equipe do Service Desk N2, onde atuo como estagiário. O sistema foi projetado para melhorar a eficiência e a organização das atividades do Service Desk, proporcionando ferramentas e funcionalidades que facilitam a resolução de problemas e o atendimento aos usuários.

## Funcionalidades

1. **Geração de Corpo de E-mail**:
   - Gera o corpo de um e-mail com formatação específica, incluindo tabelas e somas de valores automaticamente.
   - Possui um botão para copiar o corpo do e-mail mantendo a formatação.
   - Os dados, como setores, itens, valores e códigos dos itens, são obtidos a partir de um banco de dados.
   - Garante um padrão em todos os e-mails de aprovações de compras enviados pelos analistas N2.

2. **Formulário de Pedido de Item**:
   - Formulário onde os analistas N2 podem fazer o pedido de itens.
   - Conectado ao banco de dados para obter informações como setor, item, valor e código.
   - Após preencher todas as informações e clicar em enviar, os dados são salvos no banco de dados.

3. **Gerenciamento de Itens**:
   - Sistema para gerenciar os itens que precisam ser pedidos, os que estão aguardando chegada e os que já chegaram.
   - Conecta-se ao banco de dados para obter os pedidos realizados pelo sistema de formulário de pedidos.
   - Permite acompanhar o status dos itens de forma eficiente.

## Tecnologias Utilizadas

- **Frontend**: HTML, CSS, JavaScript
- **Banco de Dados**: Firebase (Realtime Database)
- **Hospedagem**: GitHub Pages

## Como Executar o Projeto

Para executar o projeto corretamente, é necessário hospedá-lo em um servidor local devido às políticas de segurança do navegador que impedem a execução de determinadas funcionalidades de JavaScript ao abrir o arquivo diretamente no navegador.

Você pode seguir os seguintes passos para configurar um servidor local:

1. **Instale um servidor local**: Se você não tiver um servidor local instalado, pode utilizar ferramentas como o [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) para o Visual Studio Code ou o [http-server](https://www.npmjs.com/package/http-server) via npm.

2. **Clone o repositório**:
    ```bash
    git clone https://github.com/EliasSantos1/Projeto-Desenvolvimento-de-sistemas.git
    ```

3. **Navegue até o diretório do projeto**:
    ```bash
    cd seu-projeto
    ```

4. **Inicie o servidor local**:
    - Se estiver usando o Live Server, abra o Visual Studio Code, clique com o botão direito no arquivo `index.html` e selecione "Open with Live Server".
    - Se estiver usando o http-server, execute o seguinte comando no terminal dentro do diretório do projeto:
        ```bash
        http-server
        ```

5. **Acesse o projeto**:
   Abra o navegador e acesse o endereço fornecido pelo servidor local. Geralmente é algo como `http://localhost:3000`.

Dessa forma, você poderá testar e utilizar o projeto sem encontrar erros de políticas de segurança do navegador.

## Como Testar o Projeto

Você pode testar o projeto acessando o link abaixo:

[Link para Testar o Sistema](https://eliassantos1.github.io/Projeto-Desenvolvimento-de-sistemas/)
