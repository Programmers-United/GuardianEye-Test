const botao = document.getElementById("btn-pesq");
const input = document.getElementById("input-pesq");
botao.addEventListener("click", () => {
  console.log("CLICOU!");
});
input.addEventListener("keypress", (event) => {
  event.key === "Enter" ? console.log("ENTER!") : console.log("ERRO");
});
