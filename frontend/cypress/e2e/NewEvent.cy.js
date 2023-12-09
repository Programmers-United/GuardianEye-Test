describe('Página NewEvent com teste de sistema', () => {
  //Caso de teste 005
  it('Deve exibir a página NewEvent corretamente', () => {
    cy.visit('http://127.0.0.1:3000/frontend/src/home.html');

    // Clicar no botão "Adicionar Ocorrência"
    cy.get('#adcFurto').click();

    // Verificar se a URL foi alterada para "newEvent.html"
    cy.url().should('include', 'newEvent.html');

    // Verificar a presença do formulário
    cy.get('#occurrence-form').should('exist');

    // Verificar a presença do mapa
    cy.get('#mapaEvent').should('exist');
  });

  //Caso de teste 006
  it('O formulário deve apresentar todos os campos corretamente', () => {
    cy.visit('http://127.0.0.1:3000/frontend/src/newEvent.html');

    // Verificar a presença do formulário
    cy.get('#occurrence-form').should('exist');

    // Verificar a presença dos campos do formulário
    cy.get('#Title').should('exist');
    cy.get('#Description').should('exist');
    cy.get('#Radios').should('exist');
    cy.get('#Data').should('exist');
    cy.get('#confirm').should('exist');
  });

  //Caso de teste 007 (Teste de comunicação com o servidor)
  it('Não deve ser possível adicionar uma nova ocorrência com dados faltando', ()=>{
    cy.visit('http://127.0.0.1:3000/frontend/src/newEvent.html');

    // Verificar a presença do formulário
    cy.get('#occurrence-form').should('exist');

    // Preencher os campos do formulário
    cy.get('#Description').type('Ocorrência de teste. Testando a criação de uma ocorrência. Testes de sistema realizado automaticamente');
    cy.get('#Data').type('2023-12-31T12:00'); // Preencha com um valor válido

    // Enviar o formulário
    cy.get('#confirm').click();

    // Verificar se a div "navigator" está visível após o envio do formulário
    cy.get('#navigator').should('be.visible');
    cy.get("#notificationTitle").should('be.visible').end('have.text', 'Ocorrência não Inserida');
  });

  //Caso de teste 008 (Teste de comunicação com o servidor)
  it('Deve ser possível inserir uma nova ocorrência no sistema', () => {
    cy.visit('http://127.0.0.1:3000/frontend/src/newEvent.html');

    // Verificar a presença do formulário
    cy.get('#occurrence-form').should('exist');

    // Preencher os campos do formulário
    cy.get('#Title').type('Ocorrência teste');
    cy.get('#Description').type('Ocorrência de teste. Testando a criação de uma ocorrência. Testes de sistema realizado automaticamente');
    cy.get('input[name="crime-type"][value="furto"]').check();
    cy.get('#Data').type('2023-12-31T12:00'); // Preencha com um valor válido

    // Enviar o formulário
    cy.get('#confirm').click();

    // Verificar se a div "navigator" está visível após o envio do formulário
    cy.get('#navigator').should('be.visible');
    cy.get("#notificationTitle").should('be.visible').end('have.text', 'Ocorrência Inserida');
  });
})