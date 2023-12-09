describe('Página lisEvent com teste de sistema', () => {
  //Caso de teste 012
  it('Deve exibir a página NewEvent corretamente', () => {
    cy.visit('http://127.0.0.1:3000/frontend/src/home.html');

    // Clicar no botão "Listar Ocorrências"
    cy.get('#lisFurto').click();

    // Verificar se a URL foi alterada para "listEvent.html"
    cy.url().should('include', 'listEvent.html');

    // Verificar a presença do mapa
    cy.get('#listMapa').should('exist');

    // Verificar a presença da lista de ocorrencias
    cy.get('#lista').should('exist');

    //Verificando a existência do button de remover e de editar
    cy.get('#btn-remover').should('exist');
    cy.get('#btn-update').should('exist');
  });

  //Caso de teste 013 (Teste de comunicação com o servidor)
  it('Deve confirmar a presença do evento individual', () => {
    cy.visit('http://127.0.0.1:3000/frontend/src/listEvent.html');

    //Verificar a presença de um evento
    cy.get('#titlEvent').should('exist').end('have.text', 'Ocorrência teste');
  });

  //Caso de teste 014 (Teste de comunicação com o servidor)
  it('Deve ser possível atualizar uma ocorrência', () => {
    cy.visit('http://127.0.0.1:3000/frontend/src/listEvent.html');

    //Verificar a presença de um evento
    cy.get('#titlEvent').should('exist').end('have.text', 'Ocorrência teste');

    //Clicar no button para editar
    cy.get('#btn-update').should('exist').click();

    // Verificar se o formulário de atualização está visível
    cy.get('#windowUpdate').should('be.visible');

    // Preencher o formulário de atualização
    cy.get('#Title').clear().type('Ocorrência update2');
    cy.get('#Description').clear().type('Nova Descrição');
    cy.get('input[name="crime-type"][value="assalto"]').check();
    cy.get('#Data').clear().type('2023-12-31T12:00');

    // Submeter o formulário de atualização
    cy.get('#confirm').click();
  });
  
  //Caso Teste 015
  it('Deve ser possível cancelar um edição de ocorrência', ()=>{
    cy.visit('http://127.0.0.1:3000/frontend/src/listEvent.html');

    //Verificar a presença de um evento
    cy.get('#titlEvent').should('exist').end('have.text', 'Ocorrência update2');

    //Clicar no button para editar
    cy.get('#btn-update').should('exist').click();

    // Verificar se o formulário de atualização está visível
    cy.get('#windowUpdate').should('be.visible');

    // Cancelar o formulário de atualização
    cy.get('#cancel').click();
  });

  //Caso de teste 016 
  it('Deve ser possível abrir o popout de remoção de uma ocorrência e cancelar', ()=>{
    cy.visit('http://127.0.0.1:3000/frontend/src/listEvent.html');

    //Verificar a presença de um evento
    cy.get('#titlEvent').should('exist').end('have.text', 'Ocorrência update2');

    //Clicar no button para remover
    cy.get('#btn-remover').should('exist').click();

    // Verificar se o formulário de remoção está visível
    cy.get('#deleteWindow').should('be.visible');

    // Cancelar o formulário de remoção
    cy.get('#close').click();
  });

  //Caso de teste 017 (Teste de comunicação com o servidor)
  it('Deve ser possível remover uma ocorrência', ()=>{
    cy.visit('http://127.0.0.1:3000/frontend/src/listEvent.html');

    //Verificar a presença de um evento
    cy.get('#titlEvent').should('exist').end('have.text', 'Ocorrência update2');

    //Clicar no button para remover
    cy.get('#btn-remover').should('exist').click();

    // Verificar se o formulário de remoção está visível
    cy.get('#deleteWindow').should('be.visible');

    // Cancelar o formulário de remoção
    cy.get('#remove').click();
  });
})