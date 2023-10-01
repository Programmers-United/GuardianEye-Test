const divMap = document.querySelector(".map"); //Elemento html
let map; //Variavel do mapa
let marker; //Variavel do marcador

async function initMap() {
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    //Iniciando o centro do mapa
    let center  =  { lat: -6.889531952896556, lng: -38.54527473449707 }; 

    //Instanciando o mapa
    map = new Map(divMap, {
        center, //Let Center
        zoom: 16,
        mapTypeId:google.maps.MapTypeId.DROP
    });
    
    //Instanciando o marcador
    marker = new google.maps.Marker({
        position: center,
        map,
        title: "Guardian Eye",
        draggable: true,
        animation: google.maps.Animation.DROP
    });
    
    //Evento para mudar o centro e a posição do marcador
    map.addListener('click', (event)=>{
        console.log(`${event.latLng.lat()}, ${event.latLng.lng()}`)
        map.panTo(event.latLng);
        marker.setPosition(event.latLng);
    });
}

initMap();