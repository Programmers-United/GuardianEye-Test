import { fetchData } from "./getEvents.js";
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
          //Usando as constantes
          const navigate = document.querySelector(".window-navigate");
          const titleNaviagte = document.getElementById("nav-title");

          //Modificando as constantes
          titleNaviagte.textContent = `Tem certeza que deseja exluir o item ${element.title}?`;
          navigate.style.display = 'flex';

          //Função para deletar o item ao confirmar
          document.querySelector(".confirm").addEventListener("click", ()=>{
            fetch(`http://localhost:5000/point/${element.id}`, {
                method: "DELETE",
            }).then(response => {
              if (response.ok) {
                console.log('Item removido com sucesso');
                navigate.style.display = "none";
                location.reload();
              } else {
                console.error('Erro ao remover o item');
              }
            })
            .catch(error => {
              console.error('Erro na solicitação:', error);
            });
          });
          
          //Função para cancelar a exclusão
          document.querySelector(".close").addEventListener("click", ()=>{
            navigate.style.display = "none";
          });
        });
      });
    })
    .catch((ERROR) => console.log(ERROR));
});
