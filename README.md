# **GuardianEye**
O GuardianEye é um projeto que permite aos usuários denunciar e visualizar ocorrências de roubos e outros crimes. O projeto é dividido em dois diretórios: "backend" e "frontend". O backend é desenvolvido em Node.js, JavaScript e Sequelize, com conexão a um banco de dados PostgreSQL. O frontend é desenvolvido com HTML, CSS e JavaScript puro.

## **Projeto da Disciplina de Banco de Dados II**

O objetivo deste projeto é explorar as funcionalidades do Node.js para integração com bancos de dados relacionais. Utilizamos o PostgreSQL em conjunto com o PostGIS para armazenar dados geográficos.

### Tecnologias e Ferramentas Utilizadas

- **Express:** Utilizamos o Express para criar as rotas de solicitação de dados para o banco.

- **Sequelize, pg e pg-hstore:** Essas ferramentas foram essenciais para estabelecer a conexão com o banco de dados.

- **Variáveis de Ambiente:** Implementamos o uso de variáveis de ambiente para garantir a segurança do banco e de seus dados.

- **Fetch:** Para a comunicação entre o back-end e o front-end, empregamos o recurso nativo do JavaScript, o fetch.

- **CORS (Cross-Origin Resource Sharing):** Utilizamos o CORS para prevenir problemas de modularização no código do back-end, assegurando a correta interação entre diferentes domínios.

Este projeto representa um estudo aprofundado das tecnologias e abordagens utilizadas na integração de bancos de dados relacionais com aplicações Node.js, demonstrando a capacidade de armazenar e recuperar dados geográficos de forma eficiente.

## **Backend**

### Tecnologias Utilizadas:

- [Node.js](https://nodejs.org/en)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Sequelize](https://sequelize.org/)
- [Express](https://expressjs.com/pt-br/)
- [PostgreSQL](https://www.postgresql.org/download/)
- [PostGIS](https://postgis.net/documentation/)

### Funcionalidades:

O backend do projeto oferece uma API com os seguintes métodos:

1. **GET (/point)**: Para listar as ocorrências existentes.
2. **POST (/point)**: Para adicionar uma nova ocorrência.
3. **DELETE (/point/id)**: Para deletar ocorrências existentes.

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
4. Configure o banco de dados PostgreSQL e adicione um arquivo **.env** à raiz do diretório "backend":
```bash
PG_HOST = localhost
PG_USER = postgres
PG_PASSWORD = yourPassword
PG_DATABASE = yourDatabase
API_PORT= yourPort
```
5. Execute o servidor:
```bash
npm start
```
O servidor estara disponível em http://localhost:API_PORT

## **Frontend**

### Tecnologias Utilizadas:

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

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

### Configuração e Uso:
1. Navegue até o diretórios "frontend"
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
