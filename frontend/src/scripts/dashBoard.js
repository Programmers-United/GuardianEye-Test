//Arquivo para tratar da página de dashboard
import { fetchData } from "./getEvents.js";

//Constante do elemento pai
const list = document.querySelector(".list");
//Constantes de acesso a janela de informação
const windowInformation = document.querySelector(".inforWindow");
const closeWindow = document.getElementById("closeWindow");
//Constantes de informação da janela de informção
const inforTitle = document.getElementById("inforTitle");
const inforProxy = document.getElementById("inforProxy");
const inforType = document.getElementById("inforType");

window.addEventListener("load", () => {
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

        div.addEventListener("click", () => {
          windowInformation.style.display = "flex";
          inforTitle.innerHTML = `${element.title} - <span> ( ${element._id} ) </span>`;
          inforProxy.innerHTML = `Ocorrências próximas a <span> ${element.title} </span>`;
          inforType.innerHTML = `Mais ocorrências do tipo: <span> ${element.type} </span>`;

          initMap(element.geometric.coordinates[1], element.geometric.coordinates[0], element.title, element._id);
          console.log(element.geometric.coordinates[1], element.geometric.coordinates[0], element.title, element._id);

          closeWindow.addEventListener("click", () => {
            windowInformation.style.display = "none";
          })
        });
      });
      //Chamando função de data
      fillSpanFields(data);
    });
});

const listNodeProxy = async (idNode) => {
  return fetch(`http://localhost:5000/point/node/${idNode}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((resp) => resp.json());
}

const listNodeType = async (idNode) => {
  return fetch(`http://localhost:5000/point/node/type/${idNode}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((resp) => resp.json());
}

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

//Mapa um mantendo a relação de proximidade
const map = L.map('mapProximy').setView([-6.889531952896556, -38.54570201052411], 16);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//Mapa dois apresentando a relação de tipos
const mapTwo = L.map('mapTypes').setView([-6.889531952896556, -38.54570201052411], 16);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapTwo);

//Função para iniciar os mapas
const initMap = (latitude, longitude, title, id) => {
  // Criando o marcador inicial
  const initialMarker = L.marker([latitude, longitude]).addTo(map)
    .bindPopup(title)
    .openPopup();

  const initialMakerTwo = L.marker([latitude, longitude]).addTo(mapTwo)
  .bindPopup(title)
  .openPopup();

  //Listando os nós de relacionamento de proximidade
  listNodeProxy(id).then((data) => {
    const arrayData = data;
    console.log(arrayData);

    arrayData.forEach((element) => {
      L.marker([element.posicao.y, element.posicao.x]).addTo(map)
      .bindPopup(element.name)
      .openPopup();
    });
  });

  //Listando os nós de relacionamento de tipos
  listNodeType(id).then((data) => {
    const arrayData = data;
    console.log(arrayData);

    arrayData.forEach((element) => {
      L.marker([element.posicao.y, element.posicao.x]).addTo(mapTwo)
      .bindPopup(element.name);
    });
  });
}

// let mapOne; //Variavel do mapa
// let mapTwo;
// let marker; //Variavel do marcador
// const mapProximy = document.querySelector(".mapProximy");
// const mapTypes = document.querySelector(".mapTypes");

// async function initMap(latitude, longitude, title, id) {
//   //@ts-ignore
//   const { Map } = await google.maps.importLibrary("maps");
//   //Iniciando o centro do mapa
//   let center = { lat: -6.889531952896556, lng: -38.54527473449707 };

//   //Instanciando o mapa
//   mapOne = new Map(mapProximy, {
//     center: {
//         lat: latitude,
//         lng: longitude
//     } || center, //Let Center
//     zoom: 15,
//     mapTypeId: google.maps.MapTypeId.DROP,
//   });

//   mapTwo = new Map(mapTypes, {
//     center: {
//         lat: latitude,
//         lng: longitude
//     } || center, //Let Center
//     zoom: 15,
//     mapTypeId: google.maps.MapTypeId.DROP,
//   });

//   // Criando marcador para coordenadas passadas como parâmetros
//   const markerParams = new google.maps.Marker({
//     position: {
//       lat: latitude,
//       lng: longitude,
//     },
//     map: mapOne,
//     title: title,
//     animation: google.maps.Animation.DROP,
//   });

//   const markerParamsTwo = new google.maps.Marker({
//     position: {
//       lat: latitude,
//       lng: longitude,
//     },
//     map: mapTwo,
//     title: title,
//     animation: google.maps.Animation.DROP,
//   });

//   //Instanciando o marcador
//   listNodeProxy(id).then((data) => {
//     const arrayData = data;
//     console.log(arrayData);

//     arrayData.forEach((element) => {
//       marker = new google.maps.Marker({
//         position: {
//           lat: element.posicao.y,
//           lng: element.posicao.x,
//         },
//         map: mapOne,
//         title: element.name,
//         animation: google.maps.Animation.DROP,
//       });
//     });
//   });

//    //Instanciando o marcador
//    listNodeType(id).then((data) => {
//     const arrayData = data;
//     console.log(arrayData);

//     arrayData.forEach((element) => {
//       marker = new google.maps.Marker({
//         position: {
//           lat: element.posicao.y,
//           lng: element.posicao.x,
//         },
//         map: mapTwo,
//         title: element.name,
//         animation: google.maps.Animation.DROP,
//       });
//     });
//   });
// }

// initMap(-6.889531952896556, -38.54527473449707, "Teste de id", "4d598086-83cf-4a82-a2ee-00fe820bb79f");