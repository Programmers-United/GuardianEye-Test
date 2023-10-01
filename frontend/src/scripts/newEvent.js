/* Arquivo para trabalhar com as informações recebidas através do formulário */
const form = document.getElementById("occurrence-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("Title").value; 
    const descr = document.getElementById("Description").value;
    const inputRadio = document.querySelector('input[name="crime-type"]:checked');
    const date = document.getElementById("Data").value; 
    const time = document.getElementById("Time").value; 

    if (title.length > 0) { //Verificação de informação verdadeira mais rígida (Melhorar)
        const createObject = { //Criando objeto com as informações(Pode ser últil na adição do elemento ao banco de dados)
            title,
            descr,
            inputRadio: inputRadio ? inputRadio.value : "", // Verifique se um radio button está selecionado e obtenha seu valor
            date,
            time
        };

        console.log(createObject);
    }

    alert("Tentativa de adicionar"); //Criar um elemento e uma função para notificar a adição
});
