# **GuardianEye**

## **Projeto da Disciplina de Banco de Dados 2**

O objetivo deste projeto é explorar as funcionalidades do Node.js para integração com bancos de dados relacionais. Utilizamos o PostgreSQL em conjunto com o PostGIS para armazenar dados geográficos.

### **Tecnologias e Ferramentas Utilizadas**

- **Express:** Utilizamos o Express para criar as rotas de solicitação de dados para o banco.

- **Sequelize, pg e pg-hstore:** Essas ferramentas foram essenciais para estabelecer a conexão com o banco de dados.

- **Variáveis de Ambiente:** Implementamos o uso de variáveis de ambiente para garantir a segurança do banco e de seus dados.

- **Fetch:** Para a comunicação entre o back-end e o front-end, empregamos o recurso nativo do JavaScript, o fetch.

- **CORS (Cross-Origin Resource Sharing):** Utilizamos o CORS para prevenir problemas de modularização no código do back-end, assegurando a correta interação entre diferentes domínios.

Este projeto representa um estudo aprofundado das tecnologias e abordagens utilizadas na integração de bancos de dados relacionais com aplicações Node.js, demonstrando a capacidade de armazenar e recuperar dados geográficos de forma eficiente.

## **GuardianEye**

O projeto proposto é um site simples para o registro de furtos em uma região específica. O site contém três principais páginas:

### **Página Inicial/Home**

Na página inicial, os visitantes encontram uma breve descrição do projeto, a logo identificadora e o título do projeto. Esta página serve como ponto de entrada e apresentação do propósito do site.

### **Adicionar Ocorrência**

Na página "Adicionar Ocorrência", as vítimas de furtos têm a capacidade de registrar um incidente. A página inclui um formulário que coleta as seguintes informações:

- **Data e Hora:** A vítima fornece a data e hora em que o furto ocorreu.

- **Localização:** A vítima pode definir a localização do furto, especificando o endereço ou local.

- **Título:** A vítima dá um título à ocorrência, descrevendo brevemente o que aconteceu.

- **Mapa:** Um mapa interativo está disponível para que a vítima possa selecionar a localização exata onde o furto ocorreu. Isso é feito por meio de um recurso de seleção no mapa.

Após preencher o formulário e selecionar a localização no mapa, a vítima pode enviar a ocorrência para o sistema.

### **Listar Ocorrências**

Na página "Listar Ocorrências", os usuários podem visualizar uma lista de furtos já registrados. Cada registro inclui:

- **Título:** O título atribuído à ocorrência.

- **Descrição:** Uma breve descrição do furto.

Além disso, um mapa interativo exibe os pontos onde os furtos ocorreram, permitindo que os visitantes visualizem a distribuição geográfica das ocorrências registradas na região.

Este projeto visa fornecer um meio simples e eficaz para o registro de furtos em uma região, ao mesmo tempo em que fornece informações visuais sobre a concentração de ocorrências em um mapa.
