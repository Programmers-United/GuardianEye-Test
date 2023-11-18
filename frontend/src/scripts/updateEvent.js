//Arquivo para eventos de atualização de uma ocorrência
//Função para iniciar mapa
async function initMap(element, mapUpadte) {
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    //Iniciando o centro do mapa
    let center = { lat: element.geometric.coordinates[0], lng: element.geometric.coordinates[1] };

    //Instanciando o mapa
    let mapUp = new Map(mapUpadte, {
        center, //Let Center
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.DROP
    });

    //Instanciando o marcador
    let marker = new google.maps.Marker({
        position: center,
        map: mapUp,
        title: element.title || "Ocorrência",
        draggable: true,
        animation: google.maps.Animation.DROP
    });

    //Evento para mudar o centro e a posição do marcador
    mapUp.addListener("click", (event) => {
        console.log(`${event.latLng.lat()}, ${event.latLng.lng()}`);
        mapUp.panTo(event.latLng);
        marker.setPosition(event.latLng);
    });

    return { mapUp, marker };
};

//Função para preencher os campos do formulário
function fillFormFields(element, title, description, date) {
    title.value = element.title;
    description.value = element.description;

    // Convertendo a data do banco de dados para o formato do input datetime-local
    const dataDoBanco = new Date(element.data);
    const ano = dataDoBanco.getFullYear();
    const mes = String(dataDoBanco.getMonth() + 1).padStart(2, '0'); // Adiciona um zero à esquerda se for necessário
    const dia = String(dataDoBanco.getDate()).padStart(2, '0'); // Adiciona um zero à esquerda se for necessário
    const horas = String(dataDoBanco.getHours()).padStart(2, '0'); // Adiciona um zero à esquerda se for necessário
    const minutos = String(dataDoBanco.getMinutes()).padStart(2, '0'); // Adiciona um zero à esquerda se for necessário

    const dataFormatada = `${ano}-${mes}-${dia}T${horas}:${minutos}`;
    
    date.value = dataFormatada;
};

//Função principal para realizar evento do clique do button "Atualizar";
async function handleUpdateButtonClick(element) {
    const navigateUp = document.querySelector(".windowUpdate");

    //Confirmando que existe o elemento
    if (!navigateUp) {
        console.error("Element not found: .window-update");
        return;
    };

    navigateUp.style.display = 'flex';

    //Elementos do formulário
    const title = document.getElementById("Title");
    const description = document.getElementById("Description");
    const radios = document.querySelector(".radio-group").querySelectorAll("input[type=radio]");
    const date = document.getElementById("Data");
    const mapUpadte = document.querySelector(".mapUpdate");
    const confirmButton = document.getElementById("confirm");
    const cancelButton = document.getElementById("cancel");

    let selectedType = " ";

    // Função de callback do evento change
    const handleChange = (item) => {
        if (item.checked) {
            console.log(`Clicou em ${item.value}`);
            selectedType = item.value;
        }
    };

    //Selecioando os elementos do input radio
    radios.forEach((item) => {
        if (item.value === element.type) {
            item.checked = true;
            selectedType = item.value;
        }

        // Remove o listener de evento existente antes de adicionar um novo
        item.removeEventListener("change", handleChange);
        item.addEventListener("change", () => handleChange(item));
    });

    const { mapUp, marker } = await initMap(element, mapUpadte);
    fillFormFields(element, title, description, date);

    //Confirmando as alterações
    confirmButton.onclick = null;
    confirmButton.addEventListener("click", (e) => {
        const createObject = {
            title: title.value,
            description: description.value,
            type: selectedType,
            data: new Date(date.value),
            geometric: {
                type: "Point",
                coordinates: [marker.getPosition().lat(), marker.getPosition().lng()]
            }
        };
        navigateUp.style.display = "none";

        updateDataBase(createObject, element._id);
    });

    cancelButton.addEventListener("click", (e) => {
        e.preventDefault();
        navigateUp.style.display = "none";
    });
}

//Função para autualizar o elemento
async function updateDataBase(objData, id) {
    console.log(objData);
    fetch(`http://localhost:5000/point/${id}`,{
        method: 'PUT',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(objData)})
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
          }
          return response.text();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.error(err);
        });
}

export { handleUpdateButtonClick };