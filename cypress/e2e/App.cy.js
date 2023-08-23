describe('template spec', () => {
  Cypress.config('defaultCommandTimeout', 20000);

  it('passes', () => {
    cy.visit('localhost:3000');
    cy.intercept('GET', '*root*', {
      statusCode: 201,
      data: ["hi"],
    })
    cy.contains('We made it! :D');
    cy.get('.App-link').click();
    cy.contains('React');
  })
})