const divMap = document.querySelector(".map");
let map;
let marker;

function initMap() {
    // Iniciando o centro do mapa
    let center = { lat: -6.889531952896556, lng: -38.54527473449707 };

    // Instanciando o mapa
    map = L.map(divMap).setView(center, 16);

    // Adicionando a camada de mapa do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Instanciando o marcador
    marker = L.marker(center, {
        title: "Guardian Eye",
        draggable: true
    }).addTo(map);

    // Evento para mudar o centro e a posição do marcador
    map.on('click', (event) => {
        console.log(`${event.latlng.lat}, ${event.latlng.lng}`)
        map.panTo(event.latlng);
        marker.setLatLng(event.latlng);
    });

    // Selecionando a localização do navegador
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                map.setView(pos, 16);
                marker.setLatLng(pos);
            },
            (error) => {
                console.error('Erro ao obter a geolocalização:', error);
            }
        );
    }
}

initMap();

// Exportando funções para obter a latitude e a longitude do marcador
export function getMarkerLatitude() {
    return marker.getLatLng().lat;
}

export function getMarkerLongitude() {
    return marker.getLatLng().lng;
}