describe('template spec', () => {
  it('passes', () => {
    cy.intercept('root', {
      statusCode: 200,
      body: ["were here!"],
    }).as("root")
    
    cy.visit('localhost:3000');
    cy.wait("@root").then(() => {
      cy.contains('were here!');
    })
  })
})