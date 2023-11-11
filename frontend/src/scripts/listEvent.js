import { showConfirmationDialog } from "./deleteEvents.js";
import { fetchData } from "./getEvents.js";
import { handleUpdateButtonClick } from "./updateEvent.js";
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

        //Button para excluir
        const button = document.createElement("button");
        button.classList.add("btn-remover");
        button.textContent = "Excluir";

        //Button para editar
        const updateButton = document.createElement("button");
        updateButton.classList.add("btn-update");
        updateButton.textContent = "Atualizar";
        divButton.appendChild(updateButton);
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
          showConfirmationDialog(element);
        });

        updateButton.onclick = null;
        updateButton.addEventListener("click", ()=>{
          //Chamando função do evento;
          handleUpdateButtonClick(element);
        });
      });
    })
    .catch((ERROR) => console.log(ERROR));
});
