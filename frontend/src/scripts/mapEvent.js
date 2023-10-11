const divMap = document.querySelector(".map"); //Elemento html
import { fetchData } from "./getEvents.js";

let map; //Variavel do mapa
let marker; //Variavel do marcador

async function initMap() {
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  //Iniciando o centro do mapa
  let center = { lat: -6.889531952896556, lng: -38.54527473449707 };

  //Instanciando o mapa
  map = new Map(divMap, {
    center, //Let Center
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.DROP,
  });

  //Instanciando o marcador
  fetchData().then((data) => {
    const arrayData = data;

    arrayData.forEach((element) => {
      marker = new google.maps.Marker({
        position: {
          lat: element.geometric.coordnates[0],
          lng: element.geometric.coordnates[1],
        },
        map,
        title: element.title,
        draggable: true,
        animation: google.maps.Animation.DROP,
      });
    });
  });

  //Evento para mudar o centro e a posição do marcador
  map.addListener("click", (event) => {
    console.log(`${event.latLng.lat()}, ${event.latLng.lng()}`);
    map.panTo(event.latLng);
    marker.setPosition(event.latLng);
  });
}

initMap();

// Exportando funções para obter a latitude e a longitude do marcador
