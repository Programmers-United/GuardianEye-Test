const divMap = document.querySelector(".map"); //Elemento html
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
        mapTypeId: google.maps.MapTypeId.DROP
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
                marker.setPosition(pos);
            },
            (error) => {
                //Tratando erro do navagador não permitir a localização
                map.setCenter(center);
                marker.setPosition(center);
                console.error('Erro ao obter a geolocalização:', error);
            }
        );
    }

    //Instanciando o marcador
    marker = new google.maps.Marker({
        position: center,
        map,
        title: "Guardian Eye",
        draggable: true,
        animation: google.maps.Animation.DROP
    });

    //Evento para mudar o centro e a posição do marcador
    map.addListener('click', (event) => {
        console.log(`${event.latLng.lat()}, ${event.latLng.lng()}`)
        map.panTo(event.latLng);
        marker.setPosition(event.latLng);
    });
}

initMap();

// Exportando funções para obter a latitude e a longitude do marcador
export function getMarkerLatitude() {
    return marker.getPosition().lat();
}

export function getMarkerLongitude() {
    return marker.getPosition().lng();
}