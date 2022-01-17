### Termos e acordos

Ao iniciar este projeto, você concorda com as diretrizes do Código de Ética e Conduta e do Manual da Pessoa Estudante da Trybe.

---

# Boas vindas ao repositório do TFC - Trybe Futebol Clube!

Você já usa o GitHub diariamente para desenvolver os exercícios, certo? Agora, para desenvolver os projetos, você deverá seguir as instruções a seguir. Fique atento a cada passo, e se tiver qualquer dúvida, nos envie por Slack! #vqv 🚀

Aqui você vai encontrar os detalhes de como estruturar o desenvolvimento do seu projeto a partir deste repositório, utilizando uma branch específica e um Pull Request para colocar seus códigos.

---

# Sumário

- [Boas vindas ao repositório do TFC - Trybe Futebol Clube!](#boas-vindas-ao-repositório-do-tfc---trybe-futebol-clube)
- [Sumário](#sumário)
- [Habilidades](#habilidades)
- [Entregáveis](#entregáveis)
  - [O que deverá ser desenvolvido](#o-que-deverá-ser-desenvolvido)
  - [Desenvolvimento](#desenvolvimento)
    - [Data de Entrega](#data-de-entrega)
- [Instruções para entregar seu projeto:](#instruções-para-entregar-seu-projeto)
    - [Antes de começar a desenvolver](#antes-de-começar-a-desenvolver)
    - [Durante o desenvolvimento](#durante-o-desenvolvimento)
    - [Execução de testes unitários](#execução-de-testes-unitários)
- [Como desenvolver](#como-desenvolver)
  - [Linter](#linter)
- [Requisitos do projeto:](#requisitos-do-projeto)
  - [Antes de começar:](#antes-de-começar)
    - [⚠️ Leia-os atentamente e siga à risca o que for pedido. ⚠️](#️-leia-os-atentamente-e-siga-à-risca-o-que-for-pedido-️)
    - [👀 Observações importantes:](#-observações-importantes)
      - [Variáveis:](#variáveis)
      - [Variável JWT (opcional):](#variável-jwt-opcional)
    - [Dicas](#dicas)
      - [Status HTTP](#status-http)
  - [Lista Pré-Requisitos:](#lista-pré-requisitos)
    - [Docker e Docker-compose](#docker-e-docker-compose)
      - [Crie os arquivos dockerfile e docker-compose](#crie-os-arquivos-dockerfile-e-docker-compose)
    - [Sequelize](#sequelize)
      - [Faça a estrutura do sequelize corretamente e adicione os valores iniciais nas seeders.](#faça-a-estrutura-do-sequelize-corretamente-e-adicione-os-valores-iniciais-nas-seeders)
  - [Lista de Requisitos:](#lista-de-requisitos)
    - [Header](#header)
      - [1 - O header deve possuir um titulo indicando em qual página estamos](#1---o-header-deve-possuir-um-titulo-indicando-em-qual-página-estamos)
    - [2 - Implemente o botão que redireciona para página de `Login`](#2---implemente-o-botão-que-redireciona-para-página-de-login)
    - [3 - Implemente o botão que redireciona para página de `Classificação`](#3---implemente-o-botão-que-redireciona-para-página-de-classificação)
    - [4 - Crie um botão que redireciona para página de `Jogos`.](#4---crie-um-botão-que-redireciona-para-página-de-jogos)
    - [5 - Crie um botão que redireciona para página de `Adicionar Partida`](#5---crie-um-botão-que-redireciona-para-página-de-adicionar-partida)
  - [Leaderboard](#leaderboard)
    - [6 - Crie um endpoint para retornar a tabela do campeonato](#6---crie-um-endpoint-para-retornar-a-tabela-do-campeonato)
    - [7 - Faça uma requisição para o endpoint `/leaderboard` e preencha uma tabela com os dados retornados](#7---faça-uma-requisição-para-o-endpoint-leaderboard-e-preencha-uma-tabela-com-os-dados-retornados)
  - [Login](#login)
    - [8 - Crie um endpoint para o login de usuários](#8---crie-um-endpoint-para-o-login-de-usuários)
    - [9 - Implemente a página de login com a rota `/login`](#9---implemente-a-página-de-login-com-a-rota-login)
  - [Jogos](#jogos)
    - [10 - Implemente o botão que redireciona para a página de `Adicionar Partida`](#10---implemente-o-botão-que-redireciona-para-a-página-de-adicionar-partida)
    - [11 - O botão de `Adicionar Partida` deve somente estar visivel quando o administrador estiver logado.](#11---o-botão-de-adicionar-partida-deve-somente-estar-visivel-quando-o-administrador-estiver-logado)
    - [12 - Crie um endpoint para listar todas as partidas](#12---crie-um-endpoint-para-listar-todas-as-partidas)
    - [13 - Implemente a página de Partidas com a rota `/matchs`](#13---implemente-a-página-de-partidas-com-a-rota-matchs)
  - [Adicionar](#adicionar)
    - [14 - Crie um endpoint para listar todos os clubes cadastrados](#14---crie-um-endpoint-para-listar-todos-os-clubes-cadastrados)
    - [15 - Crie um endpoint para o cadastro de novas partidas](#15---crie-um-endpoint-para-o-cadastro-de-novas-partidas)
      - [16 - Crie uma página para adicionar e editar partidas](#16---crie-uma-página-para-adicionar-e-editar-partidas)
    - [Editar Partidas](#editar-partidas)
      - [17 - Crie uma página para adicionar e editar partidas](#17---crie-uma-página-para-adicionar-e-editar-partidas)
  - [Depois de terminar o desenvolvimento](#depois-de-terminar-o-desenvolvimento)
    - [Revisando um pull request](#revisando-um-pull-request)
- [Avisos Finais](#avisos-finais)

# Habilidades 

Nesse projeto, você vai construir um back-end dockerizado utilizando modelagem de dados através do Sequelize. Deverão ser criadas  regras de negócio e também conectar o back-end ao front-end. Você será capaz de:
 - Realizar a dockerização dos apps, network, volume e compose;
 - Modelar dados com **MySQL** através do **Sequelize**;
 - Criar e associar tabelas usando `models` do `sequelize`;
 - Construir uma **API REST** com endpoints para consumir os models criados;
 - Fazer um `CRUD` utilizando `ORM`;

# Entregáveis

Para entregar o seu projeto você deverá criar um Pull Request neste repositório.

Lembre-se que você pode consultar nosso conteúdo sobre [Git & GitHub](https://course.betrybe.com/intro/git/) sempre que precisar!

---

## O que deverá ser desenvolvido

Você vai arquitetar e desenvolver uma aplicação responsável pela serie A do campeonato __TFC - Trybe Futebol Clube__. Começando pela API, você vai desenvolver alguns endpoints (seguindo os princípios **REST**) que estarão conectados ao seu banco de dados. Lembre-se de aplicar os princípios **SOLID**!

O seu back-end deverá implementar regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.

---

## Desenvolvimento

Você deve desenvolver uma aplicação dockerizada em `Node.js` usando o pacote `sequelize`.

Para adicionar uma partida é necessário usuário e senha, portanto a pessoa deverá estar logada para fazer as alterações. Teremos um relacionamento entre as tabelas `clubs` e `matchs` para fazermos as atualizações das partidas.

### Data de Entrega

  - Projeto individual.

  - Serão `X` dias de projeto.

  - Data de entrega para avaliação final do projeto: `DD/MM/YYYY - 14:00h`.

---

# Instruções para entregar seu projeto:

### Antes de começar a desenvolver

1. Clone o repositório
  * `git clone https://github.com/tryber/sd-0x-trybe-futebol-clube.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd sd-0x-trybe-futebol-clube`

2. Instale as dependências [**Caso existam**]
  * `npm install`

3. Crie uma branch a partir da branch `master`
  * Verifique que você está na branch `master`
    * Exemplo: `git branch`
  * Se não estiver, mude para a branch `master`
    * Exemplo: `git checkout master`
  * Agora crie uma branch à qual você vai submeter os `commits` do seu projeto
    * Você deve criar uma branch no seguinte formato: `nome-de-usuario-nome-do-projeto`
    * Exemplo: `git checkout -b joaozinho-sd-0x-trybe-futebol-clube`

4. Adicione as mudanças ao _stage_ do Git e faça um `commit`
  * Verifique que as mudanças ainda não estão no _stage_
    * Exemplo: `git status` (deve aparecer listada a pasta _joaozinho_ em vermelho)
  * Adicione o novo arquivo ao _stage_ do Git
      * Exemplo:
        * `git add .` (adicionando todas as mudanças - _que estavam em vermelho_ - ao stage do Git)
        * `git status` (deve aparecer listado o arquivo _joaozinho/README.md_ em verde)
  * Faça o `commit` inicial
      * Exemplo:
        * `git commit -m 'iniciando o projeto x'` (fazendo o primeiro commit)
        * `git status` (deve aparecer uma mensagem tipo _nothing to commit_ )

5. Adicione a sua branch com o novo `commit` ao repositório remoto
  * Usando o exemplo anterior: `git push -u origin joaozinho-sd-0x-trybe-futebol-clube`

6. Crie um novo `Pull Request` _(PR)_
  * Vá até a página de _Pull Requests_ do [repositório no GitHub](https://github.com/tryber/sd-0x-project-[nome-do-projeto]/pulls)
  * Clique no botão verde _"New pull request"_
  * Clique na caixa de seleção _"Compare"_ e escolha a sua branch **com atenção**
  * Clique no botão verde _"Create pull request"_
  * Adicione uma descrição para o _Pull Request_ e clique no botão verde _"Create pull request"_
  * **Não se preocupe em preencher mais nada por enquanto!**
  * Volte até a [página de _Pull Requests_ do repositório](https://github.com/tryber/sd-0x-trybe-futebol-clube/pulls) e confira que o seu _Pull Request_ está criado

---

### Durante o desenvolvimento

* Faça `commits` das alterações que você fizer no código regularmente

* Lembre-se de sempre após um (ou alguns) `commits` atualizar o repositório remoto

* Os comandos que você utilizará com mais frequência são:
  1. `git status` _(para verificar o que está em vermelho - fora do stage - e o que está em verde - no stage)_
  2. `git add` _(para adicionar arquivos ao stage do Git)_
  3. `git commit` _(para criar um commit com os arquivos que estão no stage do Git)_
  4. `git push -u nome-da-branch` _(para enviar o commit para o repositório remoto na primeira vez que fizer o `push` de uma nova branch)_
  5. `git push` _(para enviar o commit para o repositório remoto após o passo anterior)_

---

### Execução de testes unitários


```
Preencher aqui as instruções para realizar os testes localmente
```

---

# Como desenvolver

## Linter

Para garantir a qualidade do código, usaremos o [ESLint](https://eslint.org/) para fazer a sua análise estática.

Este projeto já vem com as dependências relacionadas ao _linter_ configuradas nos arquivos `package.json` nos seguintes caminhos:

- `sd-0x-trybe-futebol-clube/package.json`

Para poder rodar os `ESLint` em um projeto basta executar o comando `npm install` dentro do projeto e depois `npm run lint`. Se a análise do `ESLint` encontrar problemas no seu código, tais problemas serão mostrados no seu terminal. Se não houver problema no seu código, nada será impresso no seu terminal.

Você também pode instalar o plugin do `ESLint` no `VSCode`, bastar ir em extensions e baixar o [plugin `ESLint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

⚠ PULL REQUESTS COM ISSUES DE LINTER NÃO SERÃO AVALIADAS. ATENTE-SE PARA RESOLVÊ-LAS ANTES DE FINALIZAR O DESENVOLVIMENTO! ⚠

---
# Requisitos do projeto:

## Antes de começar:

### ⚠️ Leia-os atentamente e siga à risca o que for pedido. ⚠️

### 👀 Observações importantes:

O não cumprimento de um requisito, total ou parcialmente, impactará em sua avaliação.

**Você irá precisar configurar as variáveis globais do MySQL.** Você pode usar esse [Conteúdo de variáveis de ambiente com NodeJS](https://blog.rocketseat.com.br/variaveis-ambiente-nodejs/) como referência.

**Faça essas configurações também para as variáveis de ambiente usadas nesses arquivo:**

`sd-0x-trybe-futebol-clube/app/backend/src/database/config/database.ts`

```
module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: women_soccer,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
};

```

**(Neste arquivo e obrigatório deixar o nome do database como `"database": 'women_soccer'`)**

**É essencial usar essas 3 variávies no arquivo acima:**

#### Variáveis:

`host: process.env.DB_HOST`

`user: process.env.DB_USER`

`password: process.env.DB_PASS`

**Com elas que iremos conseguir conectar ao banco do avaliador automático**

#### Variável JWT (opcional):

`JWT_SECRET`

**Também poderá ser utilizada esta variável de ambiente para o SECRET do JWT**

### Dicas

#### Status HTTP

Tenha em mente que todas as "respostas" devem respeitar os [status do protocolo HTTP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status) com base no que o REST prega.

Alguns exemplos:

  - Requisições que precisam de token mas não o receberam devem retornar um código de `status 401`;

  - Requisições que não seguem o formato pedido pelo servidor devem retornar um código de `status 400`;

  - Um problema inesperado no servidor deve retornar um código de `status 500`;

  - Um acesso ao criar um recurso, no nosso caso usuário ou partida, deve retornar um código de `status 201`.

---

## Lista Pré-Requisitos:

### Docker e Docker-compose

#### Crie os arquivos dockerfile e docker-compose
  - As pastas `frontend/` e `backend/` devem possuir um arquivo dockerfile.
  - A pasta `app/` deve possuir um arquivo docker-compose
  - Os arquivos dockerfile e docker-compose devem estar configurados corretamente

  **Observação**
    Em seu projeto vai conter um arquivo docker-compose.example.yml.
    Seu service do backend no docker-compose deve ter o `depends_on` exatamente igual ao do arquivo docker-compose.example.yml.
    Use o modelo de serviço do banco de dados que está no arquivo docker-compose.example.yml que está igual ao formato abaixo.

``` yml
  db:
    image: mysql:8.0.21
    container_name: db
    ports:
      - 3002:3306
    environment:
      - MYSQL_ROOT_PASSWORD=123456
    restart: 'always'
    healthcheck: # Espera a resposta do db dizendo que está 100%
          test: ["CMD", "mysqladmin" ,"ping", "-h", "localhost"]
          timeout: 20s
          retries: 10
```

### Sequelize

#### Faça a estrutura do sequelize corretamente e adicione os valores iniciais nas seeders.

  - Será avaliado que o sequelize foi construído corretamente e se os valores iniciais que foram salvos no banco de dados estão corretos.

## Lista de Requisitos:

### Header

#### 1 - O header deve possuir um titulo indicando em qual página estamos

  EXEMPLO: 
  - Se estamos na página de Classificação o header deve possuir o título `CLASSIFICAÇÃO`
  - Se estamos na página de Login o header deve possuir o titulo `LOGIN`
  - Se estamos na página de Jogos o header deve possuir o titulo `JOGOS`
  - Se estamos na página de Adicionar partida o header deve possuir o titulo `ADICIONAR PARTIDA`
  - Se estamos na página de Editar partida o header deve possuir o titulo `EDITAR PARTIDA`

  **OBS:**
    O titulo deve ser passado para o componente `/components/Header.jsx` pela props `page`

  **A seguinte verificação será feita:**
    - Sera avaliado que ao mudar de página o seu título corresponde a página atual

### 2 - Implemente o botão que redireciona para página de `Login`

  - O botão com o data-testid `header__login_btn` deve redirecionar para a rota `/login`, 

  **OBS:**
    - O botão está no arquivo `/components/LoginBtn.jsx`
    - O botão deve ser passado para o componente `/components/Header.jsx` pela props `SecondNavegationLink`

  **Dica:**
    - Alterar a tag `button` para [Link do React Router](https://app.betrybe.com/course/front-end/ciclo-de-vida-de-componentes-e-react-router/react-router/22d8da78-d744-421e-b669-d72ff189e506/conteudos/3ed42e41-9878-475e-8d23-21445cbe71d4/componente-link/6905c0a1-bd25-4f7b-b01d-4efb58138fb6?use_case=side_bar)

  **A seguinte verificação será feita:**
    - Sera avaliado que ao clicar no botão, a página será redirecionada para a rota `/login`

### 3 - Implemente o botão que redireciona para página de `Classificação`

  - O botão com o data-testid `header__show_classification_btn` deve redirecionar para a rota `/leaderboard`, 
  
  **OBS:**
    - O botão está no arquivo `/components/LeaderboardBtn.jsx`
    - O botão deve ser passado para o componente `/components/Header.jsx` pela props `FirstNavigationLink`
    
  **A seguinte verificação será feita:**
    - Sera avaliado que ao clicar no botão, a página será redirecionada para a rota `/leaderboard`

### 4 - Implemente um botão que redireciona para página de `Jogos`.

  - Esse botão deve conter o data-testid `header__show_matchs_btn`

  **OBS:**
    - O botão está no arquivo `/components/MatchsBtn.jsx`
    - O botão deve ser passado para o componente `/components/Header.jsx` pela props `SecondNavegationLink`

  **A seguinte verificação será feita:**
    - Sera avaliado que ao clicar no botão, a página será redirecionada para a rota `/matchs` 

## Leaderboard

### 5 - Crie um endpoint para retornar a tabela do campeonato

- Sua rota deve ser (`/leaderboard`);

- A rota pode ser acessada por usuários logados ou não;

**Além disso, as seguintes verificações serão feitas:**

- Esse endpoint irá alimentar no front-end uma tabela idêntica ao exemplo abaixo:

  | Classificação |   Time    | P  | J  | V  | E | D | GP | GC | SG | %    |
  |---------------|-----------|----|----|----|---|---|----|----|----|------|
  |      1        |Corinthians| 38 | 15 | 12 | 2 | 1 | 44 | 13 | 31 | 84.4 |
  
  Onde:
   - `Classificação`: Posição na classificação;
   - `Time`: Nome do time;
   - `P`: Total de Pontos;
   - `J`: Total de Jogos;
   - `V`: Total de Vitórias;
   - `E`: Total de Empates;
   - `D`: Total de Derrotas;
   - `GP`: Gols marcados a favor;
   - `GC`: Gols marcados contra;
   - `SG`: Saldo total de gols;
   - `%`: Aproveitamento do time.

- Toda a regra de negócio e cálculos necessários deverão ser realizados no seu back-end. A aplicação front-end apenas renderizará essas informações;

- Para calcular o `Total de Pontos` você deve levar em consideração que:

  - O time `vitorioso`: marcará +3 pontos;
  - O time `perdedor`: marcará 0 pontos;
  - Em caso de `empate`: ambos os times marcam +1 ponto.

- Para o campo `Aproveitamento do time (%)` que é a porcentagem de jogos ganhos, use a seguinte fórmula: `P/(Jx3)*100`, onde:
  
  - `P`: Total de Pontos;
  - `J`: Total de Jogos.

  Obs.: O seu resultado deverá ser limitado a `uma casa decimal`.
  
- O resultado deverá ser ordenado sempre de forma decrescente, levando em consideração a quantidade de pontos que o time acumulou. Em caso de empate no `Total de Pontos`, você deve levar em consieração os seguintes critérios para desempate:

  **Ordem para desempate**

  1º Total de Vitórias;
  2º Saldo de gols;
  3º Gols a favor;
  4º Gols contra.

- A resposta desse endpoint deve listar a tabela de classificação constando todos os times já ordenados:

  ```json
  [
    {
      "name": "Corinthians",
      "TotalPoints": 38,
      "TotalGames": 15,
      "TotalVictories": 12,
      "TotalDraws": 2,
      "TotalLooses": 1,
      "GoalsFavor": 44,
      "GoalsOwn": 13,
      "GoalsBalance": 31,
      "Efficiency": 84.4
    },
    {
      "name": "Palmeiras",
      "TotalPoints": 37,
      "TotalGames": 15,
      "TotalVictories": 11,
      "TotalDraws": 4,
      "TotalLooses": 0,
      "GoalsFavor": 45,
      "GoalsOwn": 13,
      "GoalsBalance": 32,
      "Efficiency": 82.2,
    },
    ...
  ]
  ```
  ⚠️ **Atenção:** ⚠️
  
  Por padrão a resposta de todos os seus endpoints deverão estar em inglês, mesmo a renderização no front-end estando em português.

### 6 - Faça uma requisição para o endpoint `/leaderboard` e preencha uma tabela com os dados retornados

  - O valor retornado pela requisição deve ser adicionado ao state `leaderboard`, no arquivo `/components/LeaderboardTable.jsx`

**Os seguintes pontos serão avaliados:**

```
- Se a lista de classificação está correta;
- Se a regra de classificação se mantem mesmo com mudanças na classificação
- Se a tabela de classificação tem 10 colunas;
- Se a tabela tem uma linha para cada time;
```

## Login

### 7 - Crie um endpoint para o login de usuários

- A rota deve ser (`/auth`).

- A rota deve receber os campos `email` e `password` e esses campos devem ser validados no banco de dados.
  - O campo `email` deve receber um email valido.
  - O Campo `password` deve ter mais de 6 characters

- Na validação do `JWT` você pode optar por usar uma variavel de ambiente que deve se chamar `SECRET_JWT`.

- Um token `JWT` deve ser gerado e retornado caso haja sucesso no login. No seu payload deve estar presente o name, email e role do usuário. **Não informe no payload do JWT o password do usuário**.

- O body da requisição deve conter o seguinte formato:

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

**Os seguintes pontos serão avaliados:**

- Será validado que o campo "email" é obrigatório:

  Se o login não tiver o campo "email" o resultado retornado deverá retornar a mensagem abaixo, com um status http `401`:
  ```json
    "message": "All fields must be filled"
  ```
  
- Será validado que o campo "password" é obrigatório:

  Se o login não tiver o campo "password" o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
  ```json
    "message": "All fields must be filled"
  ```

- Será validado que não é possível fazer login com um email inválido:

  Se o login tiver o "email" **inválido** o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
  ```json
    "message": "Incorrect email or password"
  ```

- Será validado que não é possível fazer login com uma senha inválida:

  Se o login tiver a "senha" **inválida** o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
  ```json
    "message": "Incorrect email or password"
  ```
  
- Será validado que é possível fazer login com sucesso:

  Se o login foi feito com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
  ```json
    "role": "role",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InRyeWJlciIsImVtYWlsIjoidHJ5YmVAYmV0cnliZS5jb20iLCJyb2xlIjoiYWRtaW4ifQ.ij_4bxgTexCRu23RRDGkkhDcNRO2aRrqypupczjyUDo"
  ```

  **Os seguintes pontos serão avaliados:**
    - Será avaliado que não é possível acessar com email inválido
    - Será avaliado que não é possível acessar com senha uma contendo menos de 6 caracteres
    - Será avaliado que não é possível acessar com um email não cadastrado
    - Será avaliado que não é possível acessar com senha incorreta


### 8 - Implemente a página de login com a rota `/login`

  - Faça uma requisição ao endpoint `/auth`, enviando pelo body o `email` e `password` do usuário
  - Salve os dados de login retornados no localstorage com a chave `user`
  - Caso o login não seja bem sucedido o state `failedTryLogin` deve receber o valor `true`, para retornar uma mensagem de falha ao logar.
  - Caso o login seja bem sucedido o state `failedTryLogin` deve receber o valor de `false`

  **Os seguintes pontos serão avaliados:**
    - Será avaliado que existe uma chave `user` no localstorage
    - Será avaliado que existe um objeto com `role` e `token` na chave `user` do localstorage. 

## Jogos

### 9 - Implemente o botão que redireciona para a página de `Adicionar Partida`

  - O botão de adicionar partidas deve direcionar para a rota `/matchs/settings`

  **OBS:**
    - O botão está no arquivo `/components/AddNewMatchBtn.jsx`

  **A seguinte verificação será feita:**
    - Sera avaliado que ao clicar no botão, a página será redirecionada para a rota `/matches/settings` 


### 10 - O botão de `Adicionar Partida` deve somente estar visivel quando o administrador estiver logado.

  **A seguinte verificação será feita:**
    - Sera avaliado que o botão de adicionar partida estará visivel somente com o administrador logado
    - Será validado que o botão adicionar partida não está visivel quando não houver um usuário logado.
    - Será validado que ao clicar no botão de adicionar partida, será redirecionado para tela de `matchs/settings`

### 11 - Crie um endpoint para listar todas as partidas

  - O endpoint deve ter a rota `/matchs`
  - Deve retornar todos os jogos, que estejam em andamento ou finalizados

  **Dica:**
    - retorne o nomes dos `clubs` associados a partida para facilitar a renderização no frontend.

    exemplo de retorno:
    ```json
    [
      {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeClub": {
          "clubName": "São Paulo"
        },
        "awayClub": {
          "clubName": "Grêmio"
        }
      },
      {
        "id": 2,
        "homeTeam": 9,
        "homeTeamGoals": 1,
        "awayTeam": 14,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeClub": {
          "clubName": "Internacional"
        },
        "awayClub": {
          "clubName": "Santos"
        }
      },
    ]
    ```

  **Os seguintes pontos serão avaliados:**
  - Será avaliado que ao fazer uma requisição a rota `/matchs`, retorna todos os jogos em andamento e finalizados.


  
### 12 - Implemente a página de Partidas com a rota `/matchs`

  - Faça uma requisição ao endpoint `/matchs` poara retorna todas as partidas e adicione seu retorno no state `games`

  **Implemente o filtro das partidas:**
    - Se nenhum filtro for selecionado, deve retornar todas as partidas em andamento e finalizadas,
    - Se for selecionado o filtro de partidas `Em Andamento` deve retorna somente as partidas em andamento
    - Se for selecionado o filtro de partidas `Finalizadas` deve retorna somente as partidas finalizadas
      - A logica de cada filtro deve ser feito no switch/case que está no `useEffect`, no arquivo `/components/GamesTable.jsx` 
      - Os filtros feitos devem ser armazenados no state `gamesFiltered`

  - As partidas devem ser renderizadas corretamente como no exemplo abaixo

      | Time Mandante | Gols | Gols | Time Visitante | Status     |
      |---------------|------|------|----------------|------------|
      | São Paulo     | 1    | 1    | Grêmio         | Finalizado |


  - O valor do escolhido no filtro deve ser armazenado no state `currentFilter`, que está no arquivo `/components/GameFilter.jsx`
    - Essa logica deve ser implementada na função `handleCurrentFilter`

  **Os seguintes pontos serão avaliados:**
    - Será avaliado que os filtros funcionam corretamente
    - Será avaliado que ao fazer o filtro de partidas `Em Andamento` retorna somente partidas com status `1`
    - Será avaliado que ao fazer o filtro de partidas `Finalizadas` retorna somente partidas com status `false`

## Adicionar

### 13 - Crie um endpoint para listar todos os clubes cadastrados

- Sua rota deve ser (`/clubs`);

- A rota pode ser acessada por usuário logados ou não;

**Além disso, as seguintes verificações serão feitas:**

- Retorna todos os times cadastrados no banco de dados.

```json
{
  "clubs": [
    {
      "id" : 1,
      "name" : "Avaí/Kindermann"
    },
    {
      "id" : 2,
      "name" : "Bahia"
    },
    ...
    {
      "id" : 15,
      "name" : "São José-SP"
    },
    {
      "id" : 16,
      "name" : "São Paulo"
    }
  ]
}
```

### 14 - Implemente a página de Adicionar Partida

  - Faça uma requisição ao endpoint `/clubs` para retorna todos os times e armazena-o no state `clubs`, no arquivo `/components/MatchSettings.jsx`


### 15 - Crie um endpoint para o cadastro de novas partidas

- Sua rota deve ser (`/match`);

- A partida só pode ser criada caso o usuário esteja logado e o token JWT validado;

- O usuário logado precisa ter, necessariamente, a role `admin`;

***Além disso, as seguintes verificações serão feitas:**

- O endpoint deve ser capaz de adicionar uma nova partida a sua tabela no banco de dados;

- O corpo da requisição deverá ter o seguinte formato:

```json
{
  "homeTeam": 16, // O valor deve ser o id do time
  "awayTeam": 8, // O valor deve ser o id do time
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
  "inProgress": true or false, // O mysql converte true para 1 e false para 0 
}
```
- o campo `homeTeam` e `visitingTeam` deve ser o `id` do timee precisa ser um número. Esse campo é obrigatório;

- caso algum dos times não esteja cadastrado no banco de dados, deve-se retornar o seguinte erro:

```json
{ "message": "Team not found" }
```

- Não deve ser possivel criar uma partida com o mesmo time, exemplo: Barcelona x Barcelona, caso contrário, deve-se retornar o seguinte erro:

```json
{ "message": "It is not possible to create a match with two equal teams" }
```

- caso a partida seja inserida com sucesso, deve-se retornar os dados da partida:

```json
{
  "id": 1,
  "homeTeam": 16,
  "homeTeamGoals": 1,
  "awayTeam": 8,
  "awayTeamGoals": 1,
  "inProgress": false,
}
```

#### 16 - Implemente a página para adicionar partidas

  - Deve conter um select para o time mandante com todos os times.
  - Deve conter um select para o time visitante com todos os times.
  - Deve conter um input para a inserção de gols do time mandante
  - Deve conter um input para a inserção de gols do time visitante
  - O botão de `Salvar` deve salvar a partida no banco de dados com o status `true`
  - O botão de `Salvar` deve exibir uma mensagem `Partida salva com sucesso` na tela quando salva com sucesso.
  - O botão de `Finalizar` deve Finalizar a partida no banco de dados com o status `false`,
  - O botão de `Finalizar` deve estar desabilitado caso a partida não esteja salva.
  - O botão de `Finalizar` deve exibir uma menssagem `Partida finalizada com sucesso` na tela quando finalizada com sucesso.

  **Os seguintes pontos serão avaliados:**
    - Será avaliado que ao `Salvar` uma partida, os dados da partida serão salvas no banco de dados e seu status vai estar `true`
    - Será avaliado que ao `Salvar` uma partida, aparece a mensagem na tela com o texto `Partida salva com sucesso`
    - Será avaliado que ao `Finalizar` uma partida, os dados da partida serão salvas no banco de dados e seu status vai estar `false`
    - Será avaliado que o botão `Finalizar` só está habilitado quando um partida estiver salva com o status `true`
    - Será avaliado que ao `Finalizar` uma partida, aparece a mensagem na tela com o texto `Partida finalizada com sucesso`

### Editar Partidas

#### 17 - Implemente a página para editar partidas

  - Ao clicar no botão `Editar` uma partida na tela de `/matchs`, os dados desta partida deve ser exibido na tela de `Editar Partida` no `/matchs/settings`
  - Ao alterar o resultado de uma partida, o novo resultado deve ser salvo no banco de dados com o status de `true` ao clicar no botão de `Editar` na tela `/matchs/settings`
  - Ao alterar o resultado de uma partida, o novo resultado deve ser salvo no banco de dados com o status de `false` ao clicar no botão de `Finalizar` na tela `/matchs/settings`

  **Os seguintes pontos serão avaliados:**
    - Será avaliado que ao clicar no botão `Editar` uma partida na tela de `/matchs`, os dados desta partida serão exibidos na tela de `Editar Partida` no `/matchs/settings`
    - Será avaliado que ao alterar o resultado de uma partida, o novo resultado será salvo no banco de dados com o status de `true` ao clicar no botão de `Editar` na tela `/matchs/settings`
    - Será avaliado que ao alterar o resultado de uma partida, o novo resultado deve ser salvo no banco de dados com o status de `false` ao clicar no botão de `Finalizar` na tela `/matchs/settings`
## Testes

## Backend
### 18 - Crie testes de integração para o `Backend` que cubram no mínimo 20 porcento dos arquivos em src com um mínimo de 40 linhas cobertas

### 19 - Crie testes de integração para o `Backend` que cubram no mínimo 40 porcento dos arquivos em src com um mínimo de 80 linhas cobertas

## Bonus
### 20 - Crie testes de integração para o `Backend` que cubram no mínimo 60 porcento dos arquivos em src com um mínimo de 120 linhas cobertas

## FrontEnd
### 21 - Crie testes com RTL para o `Frontend` que cubram no mínimo 20 porcento dos arquivos em src com um mínimo de 40 linhas cobertas

### 22 - Crie testes com RTL para o `Frontend` que cubram no mínimo 40 porcento dos arquivos em src com um mínimo de 80 linhas cobertas

## Bonus 

### 23 - Crie testes com RTL para o `Frontend` que cubram no mínimo 60 porcento dos arquivos em src com um mínimo de 120 linhas cobertas
## Depois de terminar o desenvolvimento

Para **"entregar"** seu projeto, siga os passos a seguir:

* Vá até a página **DO SEU** _Pull Request_, adicione a label de _"code-review"_ e marque seus colegas
  * No menu à direita, clique no _link_ **"Labels"** e escolha a _label_ **code-review**
  * No menu à direita, clique no _link_ **"Assignees"** e escolha **o seu usuário**
  * No menu à direita, clique no _link_ **"Reviewers"** e digite `students`, selecione o time `tryber/students-sd-0x`

Se ainda houver alguma dúvida sobre como entregar seu projeto, [aqui tem um video explicativo](https://vimeo.com/362189205).

⚠ Lembre-se que garantir que todas as _issues_ comentadas pelo **Lint** estão resolvidas! ⚠

---

### Revisando um pull request

À medida que você e as outras pessoas que estudam na Trybe forem entregando os projetos, vocês receberão um alerta via Slack para também fazer a revisão dos Pull Requests dos seus colegas. Fiquem atentos às mensagens do "Pull Reminders" no Slack!

Use o material que você já viu sobre [Code Review](https://app.betrybe.com/course/real-life-engineer/code-review) para te ajudar a revisar os projetos que chegaram para você.

# Avisos Finais

Ao finalizar e submeter o projeto, não se esqueça de avaliar sua experiência preenchendo o formulário. Leva menos de 3 minutos!

Link: [FORMULÁRIO DE AVALIAÇÃO DE PROJETO](https://be-trybe.typeform.com/to/ZTeR4IbH)

O avaliador automático não necessariamente avalia seu projeto na ordem em que os requisitos aparecem no readme. Isso acontece para deixar o processo de avaliação mais rápido. Então, não se assuste se isso acontecer, ok?

---
