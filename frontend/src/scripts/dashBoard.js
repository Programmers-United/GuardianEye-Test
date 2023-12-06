//Arquivo para tratar da página de dashboard
import { fetchData } from "./getEvents.js";

//Constante do elemento pai
const list = document.querySelector(".list");
//Constantes de acesso a janela de informação
const windowInformation = document.querySelector(".inforWindow");
const closeWindow = document.getElementById("closeWindow");

window.addEventListener("load", ()=>{
    //Criando o item da lista
    fetchData()
    .then((data) => {
        const arrayData = data;
        arrayData.forEach(element => {
            const div = document.createElement("div");
            div.classList.add("itemList");

            const title = document.createElement("h4");
            title.textContent = element.title;
            div.appendChild(title);

            const text = document.createElement("p");
            text.textContent = element.description;
            div.appendChild(text);

            const divSpan = document.createElement("div");
            divSpan.classList.add("typeSpan");
            const circle = document.createElement("div");
            circle.classList.add("circle");
            const type = document.createElement("span");
            type.textContent = element.type;
            divSpan.appendChild(circle);
            divSpan.appendChild(type);

            colorTypes(element.type, circle);
            
            div.appendChild(divSpan);
            list.appendChild(div);

            div.addEventListener("click", ()=>{
                windowInformation.style.display = "flex";

                closeWindow.addEventListener("click", ()=>{
                    windowInformation.style.display = "none";
                })
            });
        });
        //Chamando função de data
        fillSpanFields(data);
    });
});

const colorTypes = (type, element) => {
    switch (type) {
        case "furto":
            element.style.backgroundColor = "var(--rosee)";    
        break;
        case "assalto":
            element.style.backgroundColor = "var(--fireOrange)";    
        break;
        case "roubo":
            element.style.backgroundColor = "var(--red)";    
        break;
        case "outros":
            element.style.backgroundColor = "var(--aquaGreen)";    
        break;
        default:
            element.style.backgroundColor = "var(--blueOcean)";    
        break;
    }
}

const fillSpanFields = (data) => {
    const currentDate = new Date();

    const sevenDaysAgo = new Date(currentDate);
    sevenDaysAgo.setDate(currentDate.getDate() - 7);

    const fifteenDaysAgo = new Date(currentDate);
    fifteenDaysAgo.setDate(currentDate.getDate() - 15);

    const thirtyDaysAgo = new Date(currentDate);
    thirtyDaysAgo.setDate(currentDate.getDate() - 30);

    const dataLastSevenDays = data.filter(item => new Date(item.data) >= sevenDaysAgo);
    const dataLastFifteenDays = data.filter(item => new Date(item.data) >= fifteenDaysAgo);
    const dataLastThirtyDays = data.filter(item => new Date(item.data) >= thirtyDaysAgo);

    console.log(dataLastSevenDays);
    document.querySelector('.DaySeven').textContent = dataLastSevenDays.length || 0;
    document.querySelector('.DayFifteen').textContent = dataLastFifteenDays.length || 0;
    document.querySelector('.DayMonth').textContent = dataLastThirtyDays.length || 0;
}

let mapOne; //Variavel do mapa
let mapTwo;
let marker; //Variavel do marcador
const mapProximy = document.querySelector(".mapProximy");
const mapTypes = document.querySelector(".mapTypes");

async function initMap() {
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  //Iniciando o centro do mapa
  let center = { lat: -6.889531952896556, lng: -38.54527473449707 };

  //Instanciando o mapa
  mapOne = new Map(mapProximy, {
    center: center, //Let Center
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.DROP,
  });

  mapTwo = new Map(mapTypes, {
    center: center, //Let Center
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.DROP,
  });
}

initMap();