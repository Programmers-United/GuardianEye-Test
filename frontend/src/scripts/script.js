const languages = [ //Array de linguagens utilizadas
    'Guardian Eye',
    'Глаз стража',
    'Olhar Guardião',
    '守護者の目',
    'Wächterblick',
    '수호자의 눈',
  ];
  
  let currentLanguageIndex = 0; //índece atual do Array
  let displayedText = ''; //O contéudo atual do Array
  let textInterval; //Armazena o ID do intervalo
  let animationCount = 0; //Quantidade de vezes que animação
  let showAnimation = true; //Estado da animação
  const title = document.getElementById('title');
  
  function updateText() {//Função para mudar de texto
    if (displayedText === languages[currentLanguageIndex]) { //Verifica se o texto atual é igual ao texto já escrito no array
      clearInterval(textInterval); //Limpa o intervalo
      setTimeout(() => {
        if(animationCount < 6){
            currentLanguageIndex = (currentLanguageIndex + 1) % languages.length;
            startTextAnimation();
            animationCount ++;
        }else{
            showAnimation = false;
        }
      }, 2500); // Espere 2,5 segundos antes de mudar de idioma
    } else { //Adiciona a próxima letra
      displayedText += languages[currentLanguageIndex][displayedText.length];
      title.textContent = displayedText;
    }
  }
  
  function startTextAnimation() {
    displayedText = '';
    if(showAnimation === true){
        textInterval = setInterval(updateText, 200); // Adiciona uma letra a cada 0,2 segundos
    }
  }
  
  // Inicie a animação
  if(showAnimation === true){
      startTextAnimation();
  }
  