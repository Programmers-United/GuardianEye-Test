describe('Página dashboard com teste de sistema', () => {
  //Caso de teste 009
  it('Deve exibir a página dasbord corretamente', () => {
    cy.visit('http://127.0.0.1:3000/frontend/src/home.html');

    // Clicar no botão "dashboard"
    cy.get('#linkDashboard').click();

    // Verificar se a URL foi alterada para "dashboard.html"
    cy.url().should('include', 'dashboard.html');

    // Verificar a presença da lista de ocorrências
    cy.get('#listOccorrences').should('exist');

    // Verificar a presença do dasboard
    cy.get('#dashBoard').should('exist');
  });

  //Caso de teste 010
  it('Deve ser possível abrir o popout de informações da ocorrência presente na lista de informações', ()=>{
    cy.visit('http://127.0.0.1:3000/frontend/src/dashboard.html');

    //Validando a existência da lista
    cy.get("#itemList").should('exist').click();

    //Procurando a existência de uma ocorrência
    cy.get('#titleList').should('exist').end('have.text', 'Ocorrência teste');
    cy.get('#closeWindow').should('exist').click();
  });

  //Caso de teste 011
  it('Deve ser possível retorna a Home', ()=>{
    cy.visit('http://127.0.0.1:3000/frontend/src/dashboard.html');

    //Procurando a existência de uma ocorrência
    cy.get('#logo').should('exist').click();
  });
})