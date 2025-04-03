# Sistema de Suporte para Service Desk N2

## Descrição do Projeto

Este projeto foi desenvolvido para otimizar e organizar as atividades da equipe do Service Desk N2, facilitando o gerenciamento de pedidos, controle de estoque e acompanhamento das operações do setor. Ele foi criado para melhorar o fluxo de trabalho e padronizar processos, tornando as tarefas mais ágeis e eficientes.

## Funcionalidades

1. **Geração de Corpo de E-mail**:
   - Cria automaticamente o corpo de um e-mail com formatação específica, incluindo tabelas e somas de valores.
   - Botão para copiar o conteúdo mantendo a formatação.
   - Os dados são obtidos diretamente de um banco de dados.
   - Garante um padrão em todos os e-mails de aprovação de compras enviados pelos analistas N2.

2. **Formulário de Pedido de Item**:
   - Formulário interativo onde os analistas N2 podem solicitar itens.
   - Conexão com o banco de dados para preencher informações como setor, item, valor e código.
   - Os dados enviados são salvos automaticamente no banco de dados para consulta e acompanhamento.

3. **Gerenciamento de Itens**:
   - Sistema para acompanhar os itens solicitados, em trânsito e recebidos.
   - Conexão com o banco de dados para obter informações em tempo real.
   - Permite gerenciar o status dos itens de forma eficiente.

4. **Sistema de Login**:
   - Permite identificar os usuários que realizam pedidos ou alterações no sistema.
   - Os dados de login são armazenados de forma segura no banco de dados.

5. **Histórico de Alterações nos Pedidos**:
   - Registra todas as alterações feitas nos pedidos, como solicitações, exclusões e atualizações.
   - Histórico ordenado cronologicamente para facilitar a consulta.

6. **Sistema de Estoque**:
   - Controle detalhado de itens em estoque, com a possibilidade de adicionar ou retirar itens.
   - Interface intuitiva com botões para gerenciar a quantidade de cada item.
   - Solicitação de justificativa para cada movimentação no estoque.

7. **Histórico do Estoque**:
   - Registro completo das movimentações do estoque, incluindo motivos e detalhes das alterações.
   - Histórico ordenado cronologicamente para auditoria e análise.

8. **Exportação de Dados para Excel**:
   - Permite exportar os dados de pedidos e do estoque para arquivos Excel.
   - Facilita a análise e o compartilhamento das informações.

## Tecnologias Utilizadas

- **Frontend**: HTML, CSS, JavaScript
- **Banco de Dados**: Firebase (Realtime Database)
- **Hospedagem**: GitHub Pages

## Como Executar o Projeto

Para executar o projeto corretamente, é necessário hospedá-lo em um servidor local devido às políticas de segurança do navegador que impedem a execução de determinadas funcionalidades de JavaScript ao abrir o arquivo diretamente no navegador.

### Passos para Configuração

1. **Instale um servidor local**: Caso não tenha um servidor local instalado, utilize ferramentas como o [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) para o Visual Studio Code ou o [http-server](https://www.npmjs.com/package/http-server) via npm.

2. **Clone o repositório**:
    ```bash
    git clone https://github.com/EliasSantos1/Funcionalidades-N2.git
    ```

3. **Navegue até o diretório do projeto**:
    ```bash
    cd Funcionalidades-N2
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

[Link para Testar o Sistema](https://eliassantos1.github.io/Funcionalidades-N2/)
