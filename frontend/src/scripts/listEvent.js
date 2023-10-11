const botao = document.getElementById("btn-pesq");
const input = document.getElementById("input-pesq");
import { fetchData } from "./getEvents.js";

botao.addEventListener("click", () => {
  console.log("CLICOU!" + input.value); //Somente testando a validade do input
});
input.addEventListener("keypress", (event) => {
  event.key === "Enter"
    ? console.log("ENTER!" + input.value)
    : console.log("ERRO");
});

//Dados vindos do banco de dados
const contentListData = document.getElementById("lista");
window.addEventListener("load", () => {
  fetchData()
    .then((data) => {
      const arrayData = data;
      arrayData.forEach((element) => {
        // Criar a div de apresentação:
        const div = document.createElement("div");
        div.classList.add("conteudo");

        // Criando a div do titulo:
        const contTitulo = document.createElement("div");
        contTitulo.classList.add("cont-titulo");

        //Titulo
        const divTitle = document.createElement("div");
        const titulo = document.createElement("h3");
        titulo.classList.add("titulo");
        titulo.textContent = element.title;
        divTitle.appendChild(titulo);

        //Button
        const divButton = document.createElement("div");
        const button = document.createElement("button");
        button.classList.add("btn-remover");
        button.textContent = "Excluir";
        divButton.appendChild(button);

        contTitulo.appendChild(divTitle);
        contTitulo.appendChild(divButton);

        //Descrição
        const descricao = document.createElement("p");
        descricao.classList.add("descricao");
        descricao.textContent = element.description;

        div.appendChild(contTitulo);
        div.appendChild(descricao);
        contentListData.appendChild(div);

        // Adicionar o evento de clique ao botão individualmente
        button.addEventListener("click", () => {
          alert("Tentativa de remoção do " + element.titulo);
        });
      });
    })
    .catch((ERROR) => console.log(ERROR));
});
