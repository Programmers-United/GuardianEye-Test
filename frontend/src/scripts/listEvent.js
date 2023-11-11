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
          //Usando as constantes
          const navigate = document.querySelector(".window-navigate");
          const titleNaviagte = document.getElementById("nav-title");

          //Modificando as constantes
          titleNaviagte.textContent = `Tem certeza que deseja exluir o item?`;
          //Elementos da div (ContentOccorrence);
          document.querySelector(".contentTitle").textContent = `${element.title}`;
          document.querySelector(".contentDescription").textContent = `${element.description}`;
          document.querySelector(".contentType").textContent = `${element.type}`;
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

        updateButton.addEventListener("click", ()=>{
          //Mosularizar esse evento
          const windowUpdate = document.querySelector(".windowUpdate");
          windowUpdate.style.display = "flex";
          const title = document.getElementById("Title");
          const description = document.getElementById("Description");
          const radios = document.querySelector(".radio-group").querySelectorAll("input[type=radio]");
          const date = document.getElementById("Data");
          const time = document.getElementById("Time");
          const mapUpadte = document.querySelector(".mapUpdate");
          const confirmButton = document.getElementById("confirm");
          const cancelButton = document.getElementById("cancel"); 
          let mapUp;
          let marker;
          let radioSelecionado;

          title.value = element.title;
          description.value = element.description;
          radios.forEach((item) => {
            if (item.value === element.type) {
              item.checked = true;
              radioSelecionado = item.value;
            }
            item.addEventListener("click", () => {
              if (item.checked) {
                radioSelecionado = item.value;
              }
            });
          })
          const dataDoBanco = new Date(element.data);
          const dataFormatada = dataDoBanco.toISOString().split('T')[0];
          date.value = dataFormatada;
          time.value = element.time;
          async function initMap() {
            //@ts-ignore
            const { Map } = await google.maps.importLibrary("maps");
            //Iniciando o centro do mapa
            let center = { lat: element.geometric.coordinates[0], lng: element.geometric.coordinates[1] };

            //Instanciando o mapa
            mapUp = new Map(mapUpadte, {
              center, //Let Center
              zoom: 16,
              mapTypeId: google.maps.MapTypeId.DROP
            });

            //Instanciando o marcador
            marker = new google.maps.Marker({
              position: center,
              map: mapUp,
              title: "Guardian Eye",
              draggable: true,
              animation: google.maps.Animation.DROP
            });

            //Evento para mudar o centro e a posição do marcador
            mapUp.addListener("click", (event) => {
              console.log(`${event.latLng.lat()}, ${event.latLng.lng()}`);
              map.panTo(event.latLng);
              marker.setPosition(event.latLng);
            });
          }
          initMap();

          confirmButton.addEventListener("click", ()=>{
            windowUpdate.style.display = "none"
          });
          cancelButton.addEventListener("click", (e)=>{
            e.preventDefault();
            windowUpdate.style.display = "none"
          })
        })
      });
    })
    .catch((ERROR) => console.log(ERROR));
});
