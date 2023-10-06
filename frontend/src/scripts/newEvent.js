/* Arquivo para trabalhar com as informações recebidas através do formulário */
import { getMarkerLatitude, getMarkerLongitude } from "./map.js";

const form = document.getElementById("occurrence-form");

const confirm = document.getElementById("confirm");

//Envio do formulário aqui:
form.addEventListener("submit", (e) => {
    e.preventDefault();
    /** Dados vindo do formulário */
    const title = document.getElementById("Title").value; 
    const description = document.getElementById("Description").value;
    const selectedType = document.querySelector('input[name="crime-type"]:checked');
    const data = document.getElementById("Data").value; 
    const time = document.getElementById("Time").value; 

    if (checkFields() && selectedType) { 
        const createObject = { //Criando objeto com as informações(Pode ser últil na adição do elemento ao banco de dados)
            title,
            description,
            type: selectedType.value, // Verifique se um radio button está selecionado e obtenha seu valor
            data,
            time,
            geometric: {
                type: "point",
                coordinates: [getMarkerLatitude(), getMarkerLongitude()]
            }
        };
        saveDatabase(createObject);
    }
    customizedNotification(title);
});

//Função para validar o formulário
const checkFields = () =>{
    // Selecionar todos os campos do formulário
    const campos = document.querySelectorAll('.input-details');
    // Verificar se algum campo está vazio
    for (const campo of campos) {
        if (campo.value.trim() === '') {
            // Se algum campo estiver vazio, retorne false
            return false;
        }
    }
    // Verificar se um dos radio buttons foi selecionado
    const radioButtons = document.querySelectorAll('input[name="crime-type"]');
    let radioButtonSelecionado = false;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            radioButtonSelecionado = true;
            break;
        }
    }
    // Verificar se pelo menos um radio button foi selecionado
    if (!radioButtonSelecionado) {
        return false;
    }
    // Se todos os campos estiverem preenchidos, retorne true
    return true;
}

/** Função para customizar a notificação */
const customizedNotification = (title) =>{
    //Dados da notificação:
    const navTitle = document.querySelector(".nav-title");
    const navName = document.querySelector(".nav-name");
    const navMenssage = document.querySelector(".nav-message");
    const percursor = document.querySelector(".percursor");
    const notification = document.querySelector(".notification");

    // Mostrar a notificação
    notification.style.display = 'block';
    confirm.disabled = true;

    if(checkFields()){
        navTitle.textContent = "Ocorrência Inserida";
        navName.textContent = `Título: ${title}`;
        navMenssage.textContent = "Ocorrência adicionada com sucesso!";
        percursor.style.backgroundColor = "var(--aquaGreen)";
        notification.style.backgroundColor = "var(--white)";
        clearFields();
    }else{
        navTitle.textContent = "Ocorrência não Inserida";
        navName.textContent = "Erro na inserção";
        navMenssage.textContent = "Verifique os campos do formulário.";
        percursor.style.backgroundColor = "var(--red)";
        notification.style.backgroundColor = "var(--rosee)";
    }
     // Aguarde 10 segundos e oculte completamente a notificação
     setTimeout(() => {
        notification.style.display = 'none';
        confirm.disabled = false;
     }, 6000); // Tempo em milissegundos (6 segundos)
}

/** Limpar os campos caso tenha acertado */
const clearFields = () =>{
    // Selecione todos os campos de entrada dentro do formulário
    const inputFields = form.querySelectorAll('input');

    // Verifique se todos os campos estão preenchidos
    for (const inputField of inputFields) {
        inputField.value = "";
    }
}

/** Função para salvar os dados do formulário no banco de dados */
const saveDatabase = (objData) =>{
    fetch("http://localhost:5000/point",{
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objData)}
        ).then((data)=> console.log(data.text()))
        .catch((err)=>console.log(err));
}