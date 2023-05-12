# Projeto BackEnd I

Este é o repositório do projeto Trabalho Final Back-End CRUD, que implementa um sistema de gerenciamento de usuários e recados com operações de CRUD (Create, Read, Update, Delete). O projeto utiliza o framework Express.js para criar uma API RESTful.

- :hammer_and_wrench: Tecnologias usadas:
  - JS
  - Node.js
  - VS Code
  - Insomnia

### :rocket: Exemplo de execução

![Insomnia](https://github.com/EmanoelSaraiva/node.server/assets/6977032/a04e778f-92e8-4d21-821c-0a9437e92728)

## :notebook_with_decorative_cover: Pré-Requesitos

- [VS Code](https://code.visualstudio.com/) - Editor de Código<br>
- [Insomnia](https://insomnia.rest/download) - O Insomina é uma plataforma de API para criar e usar APIs.<br>

## :rocket: Incinando!

Essas instruções permitirão que você possa rodar o codigo. <br>
Certifique-se de que o projeto esteja sendo executado corretamente.
Para utilizar o projeto com o Insomnia, você pode seguir os seguintes passos: <br>
No Insomnia, você pode fazer requisições para o projeto utilizando o link: https://backend1-server.onrender.com

## A API fornece os seguintes rotas:

<h3>POST /cadastro: </h3> 
Cria um novo usuário no sistema. Você deve fornecer o nome, email e senha no corpo da requisição. <br>
<h3>GET /pessoas: </h3> 
Lista todos os usuários com suas notas <br>
<h3>POST /login: </h3> 
Realiza o login de um usuário. Você deve fornecer o email e a senha no corpo da requisição. <br>
<h3>POST /cadastro/:id: </h3>
Cria um novo recado para o usuário com o ID específico. Você deve fornecer o título e a descrição do recado no corpo da requisição. <br>
<h3>GET /pessoas/:id: </h3>
Lista todas as notas do usuário com o ID específico. <br>
<h3>PUT /pessoas/:id/recados/:idRecado: </h3> 
Atualiza uma nota com ID específico para um usuário com ID específico. Você deve fornecer o título e a descrição para atualizar o recado no corpo da requisição. <br>
<h3>DELETE /pessoas/:id/recados/:idRecado:</h3> 
Excluir uma nota com ID específico para um usuário com ID específico <br>

## Estruturas das rotas

### POST

/cadastro <br> Cria um novo usuário verificando se o endereço de e-mail fornecido é exclusivo, validando o formato da senha, fazendo o hash da senha usando bcrypt e adicionando o novo objeto de usuário à matriz pessoas. <br>

### GET

/pessoas retorna <br> Uma matriz de objetos de usuário com suas matrizes de notas. <br>

### POST

/login <br> Autentica um usuário verificando se o endereço de e-mail existe na matriz pessoas e se a senha fornecida corresponde à senha hash do usuário.<br>

### POST

/cadastro/:id <br> Adiciona uma nova nota a um usuário específico encontrando o objeto de usuário na matriz pessoas, gerando um novo objeto de nota e adicionando-o à matriz de notas do usuário.<br>

### GET

/pessoas/:id <br> Retorna uma matriz de objetos de nota para um usuário específico encontrando o objeto de usuário na matriz pessoas e retornando sua matriz de notas.<br>

### PUT

/pessoas/:id/recados/:idRecado <br> Atualiza uma nota específica para um usuário específico encontrando o objeto de usuário e o objeto de nota na matriz pessoas e atualizando as propriedades do título e descrição do objeto de nota.<br>

### DELETE

/pessoas/:id/recados/:idRecado <br> Exclui uma nota específica para um usuário específico encontrando o objeto de usuário e o objeto de nota na matriz pessoas e removendo o objeto de nota da matriz de notas do usuário.<br>
