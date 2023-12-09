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
const inforTit = document.getElementById("inforTit");
const inforType = document.getElementById("inforType");
const inforDescr = document.getElementById("inforDescr");
const inforData = document.getElementById("inforData");

window.addEventListener("load", () => {
  //Criando o item da lista
  fetchData()
    .then((data) => {
      const arrayData = data;
      arrayData.forEach(element => {
        const div = document.createElement("div");
        div.classList.add("itemList");
        div.id= "itemList";

        const title = document.createElement("h4");
        title.id= "titleList";
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

          inforTitle.innerHTML= `${element.title} - <span> ( ${element._id} ) </span>`;
          inforTit.innerHTML = `Título: <span>${element.title} </span>`;
          inforType.innerHTML = `Tipo: <span>${element.type} </span>`;
          inforDescr.innerHTML = `Descrição: <span>${element.description} </span>`;
          inforData.innerHTML = `Date: <span>${element.date} </span>`;
          closeWindow.addEventListener("click", () => {
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

const map = L.map('mapProximy').setView([-6.889531952896556, -38.54570201052411], 16);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
L.marker([-6.889531952896556, -38.54570201052411]).addTo(map)
.bindPopup("Ponto")
.openPopup();
