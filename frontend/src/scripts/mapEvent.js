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

  //Selecionando a localização do navegador
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map.setCenter(pos);
      },
      (error) => {
        //Tratando erro do navagador não permitir a localização
        map.setCenter(center);
        console.error('Erro ao obter a geolocalização:', error);
      }
    );
  }

  //Instanciando o marcador
  fetchData().then((data) => {
    const arrayData = data;

    arrayData.forEach((element) => {
      marker = new google.maps.Marker({
        position: {
          lat: element.geometric.coordinates[1],
          lng: element.geometric.coordinates[0],
        },
        map,
        title: element.title,
        animation: google.maps.Animation.DROP,
      });
    });
  });
}

initMap();