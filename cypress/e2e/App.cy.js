describe('template spec', () => {
  it('passes', () => {
    cy.intercept('root', {
      statusCode: 200,
      body: ["were here!"],
    }).as("root")
    .then(() => {
      cy.visit('localhost:3000');
      cy.contains('were here!');
    })
  })
})