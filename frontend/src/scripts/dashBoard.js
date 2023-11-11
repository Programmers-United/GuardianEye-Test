//Arquivo para tratar da página de dashboard
import { fetchData } from "./getEvents.js";

//Constante do elemento pai
const list = document.querySelector(".list");

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
        });
    })
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