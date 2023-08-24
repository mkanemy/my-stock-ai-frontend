describe('template spec', () => {
  it('passes', () => {
    cy.intercept('root', {
      statusCode: 200,
      body: ["were here!"],
    }).as("root")
    
    cy.visit('localhost:3000');
    cy.contains('Learn React')
    cy.wait("@root").then(() => {
      cy.contains('were here!');
    })
  })
})