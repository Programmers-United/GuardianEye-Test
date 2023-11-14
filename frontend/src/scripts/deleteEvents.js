//Arquivo para tratar dos eventos de deleção de ocorrências

//Constante da janela de deleção
const navigate = document.querySelector(".window-navigate");

//Função para deletar item do banco de dados
function deleteItem (element){
    fetch(`http://localhost:5000/point/${element._id}`, {
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
};

//Função principal
function showConfirmationDialog(element){
    //Constantes 
    const titleNavigate = document.getElementById("nav-title");
    const titleContent = document.querySelector(".contentTitle");
    const descriptionContent = document.querySelector(".contentDescription");
    const typeContent = document.querySelector(".contentType");
    const dellButton = document.querySelector(".confirm");
    const cancelButton = document.querySelector(".close");

    //Carregando textos
    titleNavigate.textContent = "Tem certeza que deseja exluir o item?"
    titleContent.textContent = `${element.title}`;
    descriptionContent.textContent = `${element.description}`;
    typeContent.textContent = `${element.type}`;

    //Exibindo a janela de deleção
    navigate.style.display = "flex";

    //Função para excluir ocorrência
    dellButton.addEventListener("click", ()=>{
        deleteItem(element);       
    });

    cancelButton.addEventListener("click", ()=>{
        navigate.style.display = "none";
    });
}

export { showConfirmationDialog };