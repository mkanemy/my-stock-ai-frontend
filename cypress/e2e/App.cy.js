describe('template spec', () => {
  it('passes', () => {
    cy.visit(Cypress.config().baseUrl());
    cy.contains('We made it :D');
    cy.get('.App-link').click();
    cy.contains('React');
  })
})