import { fetchData } from "./getEvents.js";

const divMap = document.querySelector(".map");
let map;
let marker;

async function initMap() {
  // Iniciando o centro do mapa
  const center = { lat: -6.889531952896556, lng: -38.54527473449707 };

  // Instanciando o mapa
  map = L.map(divMap).setView(center, 16);

  // Adicionando a camada de mapa do OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Selecionando a localização do navegador
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map.setView(pos);
      },
      (error) => {
        // Tratando erro do navegador não permitir a localização
        map.setView(center);
        console.error('Erro ao obter a geolocalização:', error);
      }
    );
  }

  // Instanciando o marcador
  const data = await fetchData();
  const arrayData = data;

  arrayData.forEach((element) => {
    marker = L.marker([element.geometric.coordinates[1], element.geometric.coordinates[0]])
      .addTo(map)
      .bindPopup(element.title)
      .openPopup();
  });
}

initMap();