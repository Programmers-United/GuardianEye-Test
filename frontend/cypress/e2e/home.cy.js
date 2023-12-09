describe('Página Home com teste de sistema', () => {
  //Caso de teste 001
  it('Deve exibir a página Home corretamente', () => {
    cy.visit('http://127.0.0.1:3000/frontend/src/home.html');

    // Verificar se o título está correto
    cy.get('#title').should('contain', 'Guardian Eye');

    // Verificar se os botões estão presentes
    cy.get('#adcFurto').should('exist');
    cy.get('#lisFurto').should('exist');
  });

  //Caso de teste 002
  it('Deve redirecionar para a página "Adicionar Ocorrência"', ()=>{
    cy.visit('http://127.0.0.1:3000/frontend/src/home.html');

    // Clicar no botão "Adicionar Ocorrência"
    cy.get('#adcFurto').click();

    // Verificar se a URL foi alterada para "newEvent.html"
    cy.url().should('include', 'newEvent.html');
  });

  //Caso de teste 003
  it('Deve redirecionar para a página "Listar Ocorrências"', ()=>{
    cy.visit('http://127.0.0.1:3000/frontend/src/home.html');

    // Clicar no botão "Listar Ocorrências"
    cy.get('#lisFurto').click();

    // Verificar se a URL foi alterada para "listEvent.html"
    cy.url().should('include', 'listEvent.html');
  });

  //Caso de teste 004
  it('Deve redirecionar para a página de "Dashboard"', ()=>{
    cy.visit('http://127.0.0.1:3000/frontend/src/home.html');

    // Clicar no botão "Dashboard"
    cy.get('#linkDashboard').click();

    // Verificar se a URL foi alterada para "dashboard.html"
    cy.url().should('include', 'dashboard.html');
  });
});