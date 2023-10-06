const confirm = document.getElementById("confirm");
const form = document.getElementById("occurrence-form");

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
    confirm.value = "Enviar";
}

export{checkFields, customizedNotification};