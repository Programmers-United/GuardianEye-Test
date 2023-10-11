const botao = document.getElementById("btn-pesq");
const input = document.getElementById("input-pesq");
botao.addEventListener("click", () => {
  console.log("CLICOU!" + input.value); //Somente testando a validade do input
});
input.addEventListener("keypress", (event) => {
  event.key === "Enter" ? console.log("ENTER!" + input.value) : console.log("ERRO");
});

/**Código para validar página de details*/
//Para recuperar usamos o método GET (Recuperando todos os dados do Banco de Dados);
//Criar um objeto para cada informação vinda do Banco de Dados:
const dataItem = [
  {
    id: "1",
    titulo: "Test 1",
    descr: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
  },
  {
    id: "2",
    titulo: "Test 2",
    descr: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
  },
  {
    id: "3",
    titulo: "Test 3",
    descr: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
  }
] //Dados vindos do banco de dados
const contentListData = document.getElementById("lista");
window.addEventListener("load", ()=>{
  dataItem.forEach(element => {
    // Criar a div de apresentação:
    const div = document.createElement("div");
    div.classList.add("conteudo");

    // Criando a div do titulo:
    const contTitulo = document.createElement("div");
    contTitulo.classList.add("cont-titulo");

    //Titulo
    const divTitle = document.createElement("div");
    const titulo = document.createElement('h3');
    titulo.classList.add('titulo');
    titulo.textContent = element.titulo;
    divTitle.appendChild(titulo);

    //Button
    const divButton = document.createElement("div");
    const button = document.createElement('button');
    button.classList.add('btn-abrir');
    button.textContent = 'Excluir';
    divButton.appendChild(button);

    contTitulo.appendChild(divTitle);
    contTitulo.appendChild(divButton);

    //Descrição
    const descricao = document.createElement('p');
    descricao.classList.add('descricao');
    descricao.textContent = element.descr;

    div.appendChild(contTitulo);
    div.appendChild(descricao);
    contentListData.appendChild(div);

    // Adicionar o evento de clique ao botão individualmente
    button.addEventListener("click", () => {
      alert("Tentativa de remoção do " + element.titulo);
    });
  });
});