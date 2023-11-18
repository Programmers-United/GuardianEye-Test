/* Arquivo para trabalhar com as informações recebidas através do formulário */
import { getMarkerLatitude, getMarkerLongitude } from "./map.js";
import { checkFields, customizedNotification } from "./formActions.js";

const form = document.getElementById("occurrence-form");

//Envio do formulário aqui:
form.addEventListener("submit", (e) => {
    e.preventDefault();
    /** Dados vindo do formulário */
    const title = document.getElementById("Title").value; 
    const description = document.getElementById("Description").value;
    const selectedType = document.querySelector('input[name="crime-type"]:checked');
    const data = document.getElementById("Data").value;  

    if (checkFields() && selectedType) { 
        const createObject = { //Criando objeto com as informações(Pode ser últil na adição do elemento ao banco de dados)
            title,
            description,
            type: selectedType.value, // Verifique se um radio button está selecionado e obtenha seu valor
            data: new Date(data),
            geometric: {
                type: "Point",
                coordinates: [getMarkerLatitude(), getMarkerLongitude()]
            }
        };
        saveDatabase(createObject);
    }
    customizedNotification(title);
});

/** Função para salvar os dados do formulário no banco de dados */
const saveDatabase = (objData) =>{
    console.log(objData);
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