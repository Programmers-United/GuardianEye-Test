# **GuardianEye**

O GuardianEye é um projeto que permite aos usuários denunciar e visualizar ocorrências de roubos e outros crimes. O projeto é dividido em dois diretórios: "backend" e "frontend". O backend é desenvolvido em Node.js, JavaScript e Mongoose, com conexão a um banco de dados MongoDB (Atlas) e Neo4j (Aura DB). O frontend é desenvolvido com HTML, CSS e JavaScript puro.

## **Projeto da Disciplina de Banco de Dados II**

O objetivo deste projeto é explorar as funcionalidades do Node.js para integração com bancos de dados NoSQL. Utilizamos o MongoDB em conjunto com o Neo4j para armazenar dados geográficos e promover o relacionamento entre ocorrências do mesmo tipo, (assalto, furto...), e ocorrências próximas, geograficamente falando.

### Tecnologias e Ferramentas Utilizadas

- **Express:** Utilizamos o Express para criar as rotas de solicitação de dados para o banco.

- **Aura DB:** Serivdor online do banco relacional de grafos, Neo4j, onde é armazenados os dados que compõem os nós dos relacionamentos (Id, Título, Tipo e Localização).

- **MongoDB Atlas:** Servidor online do MongoDB, onde é armazenados os dados das ocorrências, (Id, Título, Descrição, Tipo e Localização). 

- **Mongoose:** Essa ferramenta foi essencial para estabelecer a conexão com o banco de dados MongoDB.

- **Variáveis de Ambiente:** Implementamos o uso de variáveis de ambiente para garantir a segurança do banco e de seus dados.

- **Fetch:** Para a comunicação entre o back-end e o front-end, empregamos o recurso nativo do JavaScript, o fetch.

- **CORS (Cross-Origin Resource Sharing):** Utilizamos o CORS para prevenir problemas de modularização no código do back-end, assegurando a correta interação entre diferentes domínios.

Este projeto representa um estudo aprofundado das tecnologias e abordagens utilizadas na integração de bancos de dados NoSQL com aplicações Node.js, demonstrando a capacidade de armazenar e recuperar dados geográficos, além de gerar um sistema de localização de forma eficiente.

## **Backend**

### Tecnologias Utilizadas:

- [Node.js](https://nodejs.org/en)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Mongoose](https://mongoosejs.com/)
- [Express](https://expressjs.com/pt-br/)
- [MongoDB](https://www.mongodb.com/)
- [MongoDB Atlas](https://www.mongodb.com/docs/atlas/)
- [Neo4j](https://neo4j.com/docs/)
- [AuraDB](https://neo4j.com/docs/aura/auradb/?utm_source=google&utm_medium=PaidSearch&utm_campaign=GDB&utm_content=AMS-X-Awareness-GDB-Text&utm_term=&gad_source=1&gclid=CjwKCAiA98WrBhAYEiwA2WvhOqI1ZGxlVqS8H05k9U_8cCwUuNgDMAnggf0xu5Z04ymwYNrvFQWYFxoCN1MQAvD_BwE)

### Funcionalidades:

O backend do projeto oferece uma API com os seguintes métodos:

- _Rotas de Ocorrências:_

   1. _GET (/point)_: Para listar as ocorrências existentes.
   2. _POST (/point)_: Para adicionar uma nova ocorrência.
   3. _PUT (/point)_: Para atualizar as informações das ocorrências.
   4. _DELETE (/point/id)_: Para deletar ocorrências existentes.
#
* _Rotas de relacionamento entre nós (Neo4j):_

   1. _GET(/node/id)_: Para listar os relacionamentos de proximidade.
   2. _GET(/node/type/id)_: Pra lista os relacionamentos de tipo.

### Configuração e Uso

1. Clone o repositório:

```bash
git clone https://github.com/Programmers-United/GuardianEye.git
```

2. Navegue até o diretório "backend":

```bash
cd backend
```

3. Instale as dependências:

```bash
npm install
#ou
yarn
```

4. Configure o banco de dados MongoDB e adicione um arquivo **.env** à raiz do diretório "backend":

```bash
MONGODB_URI = yourMongoDBConnectionUri
NEO4J_URL = yourNeo4jConnectionUri
NEO4J_PASSWORD = yourNeo4jpassaword
NEO4J_USER = yourUser
API_PORT= yourPort
```

5. Execute o servidor:

```bash
npm start
```

O servidor estará disponível em http://localhost:API_PORT

## **Frontend**

### Tecnologias Utilizadas:

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Leaflet](https://leafletjs.com/)
- [Mongo Charts](https://www.mongodb.com/docs/charts/)

### Páginas

#### Home

Na página inicial, os visitantes encontram uma breve descrição do projeto, a logo identificadora e o título do projeto. Esta página serve como ponto de entrada e apresentação do propósito do site.

#### Adicionar Ocorrência

Na página "Adicionar Ocorrência", as vítimas de furtos têm a capacidade de registrar um incidente. A página inclui um formulário que coleta as seguintes informações:

- **Data e Hora:** A vítima fornece a data e hora em que o furto ocorreu.

- **Localização:** A vítima pode definir a localização do furto, especificando o endereço ou local.

- **Título:** A vítima dá um título à ocorrência, descrevendo brevemente o que aconteceu.

- **Mapa:** Um mapa interativo está disponível para que a vítima possa selecionar a localização exata onde o furto ocorreu. Isso é feito por meio de um recurso de seleção no mapa.

Após preencher o formulário e selecionar a localização no mapa, a vítima pode enviar a ocorrência para o sistema.

#### Listar Ocorrências

Na página "Listar Ocorrências", os usuários podem visualizar uma lista de furtos já registrados. Cada registro inclui:

- **Título:** O título atribuído à ocorrência.

- **Descrição:** Uma breve descrição do furto.

Além disso, um mapa interativo exibe os pontos onde os furtos ocorreram, permitindo que os visitantes visualizem a distribuição geográfica das ocorrências registradas na região.

#### Dashboard

Página onde é apresentado gráfico e estudos sobre os dados armazenados no bando de dados, (Mongodb Atlas), gráfico responsáveis por apresentar a disponibilidade das ocorrências durante o mês, bem como a sua localização no mapa, além de apresentar outras informaçãoes sobre as ocorrências.

### Configuração e Uso:

1. Navegue até o diretório "frontend"

```bash
cd frontend
```

2. Abra a página "**home.html**" em um navegador web.

## **Contribuição**:

Se você deseja contribuir para o projeto, siga as etapas:

1. Fork do repositório.
2. Crie uma branch para sua funcionalidade: git checkout -b minha-funcionalidade
3. Faça as alterações necessárias e faça o commit: git commit -m 'Adicionando nova funcionalidade'
4. Envie suas alterações: git push origin minha-funcionalidade
   Abra um Pull Request no repositório original.
