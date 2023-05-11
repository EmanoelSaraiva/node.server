# Projeto BackEnd I

Este é o repositório do projeto Trabalho Final Back-End CRUD, que implementa um sistema de gerenciamento de usuários e recados com operações de CRUD (Create, Read, Update, Delete). O projeto utiliza o framework Express.js para criar uma API RESTful.

- :hammer_and_wrench: Tecnologias usadas:
  - JS
  - Node.js
  - VS Code

<img src="https://giphy.com/embed/FkyeYygYJd1YDuXsSz" width="480" height="204" frameBorder="0" class="giphy-embed" allowFullScreen></img>

## A API fornece os seguintes endpoints:

POST /cadastro - criar um novo usuário <br>
GET /pessoas - listar todos os usuários com suas notas <br>
POST /login - autenticar um usuário <br>
POST /cadastro/:id - adicionar uma nova nota a um usuário <br>
GET /pessoas/:id - listar todas as notas para um usuário específico <br>
PUT /pessoas/:id/recados/:idRecado - atualizar uma nota específica para um usuário específico <br>
DELETE /pessoas/:id/recados/:idRecado - excluir uma nota específica para um usuário específico <br>

O aplicativo começa criando uma instância do aplicativo Express e configurando middleware para analisar as solicitações JSON recebidas. Em seguida, define duas funções de middleware para validar os parâmetros de ID de usuário e ID de nota usados nos endpoints subsequentes. As funções de middleware verificam se os parâmetros de ID correspondem a usuários ou notas existentes, respectivamente.

Os manipuladores de endpoints da API implementam as operações CRUD interagindo com uma estrutura de dados em memória chamada pessoas. A estrutura de dados é uma matriz de objetos de usuário, onde cada usuário tem um ID, email, nome, senha hash e uma matriz de objetos de nota. Cada objeto de nota tem um ID, título e descrição.

## Estruturas dos Endpoint's

O endpoint POST /cadastro cria um novo usuário verificando se o endereço de e-mail fornecido é exclusivo, validando o formato da senha, fazendo o hash da senha usando bcrypt e adicionando o novo objeto de usuário à matriz pessoas.

O endpoint GET /pessoas retorna uma matriz de objetos de usuário com suas matrizes de notas.

O endpoint POST /login autentica um usuário verificando se o endereço de e-mail existe na matriz pessoas e se a senha fornecida corresponde à senha hash do usuário.

O endpoint POST /cadastro/:id adiciona uma nova nota a um usuário específico encontrando o objeto de usuário na matriz pessoas, gerando um novo objeto de nota e adicionando-o à matriz de notas do usuário.

O endpoint GET /pessoas/:id retorna uma matriz de objetos de nota para um usuário específico encontrando o objeto de usuário na matriz pessoas e retornando sua matriz de notas.

O endpoint PUT /pessoas/:id/recados/:idRecado atualiza uma nota específica para um usuário específico encontrando o objeto de usuário e o objeto de nota na matriz pessoas e atualizando as propriedades do título e descrição do objeto de nota.

O endpoint DELETE /pessoas/:id/recados/:idRecado exclui uma nota específica para um usuário específico encontrando o objeto de usuário e o objeto de nota na matriz pessoas e removendo o objeto de nota da matriz de notas do usuário.
