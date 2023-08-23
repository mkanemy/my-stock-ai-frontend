describe('template spec', () => {
  it('passes', () => {
    cy.visit('localhost:3000');
    cy.contains('We made it! :D');
    cy.get('.App-link').click();
    cy.contains('React');
  })
})