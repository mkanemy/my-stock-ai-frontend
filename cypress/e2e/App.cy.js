describe('template spec', () => {
  it('passes', () => {
    cy.wait(1000)
    cy.intercept('/dummy').as('dummy')
    cy.intercept('root', {
      statusCode: 200,
      body: ["were here!"],
    }).as("root")
    cy.wait(1000)

    cy.visit('localhost:3000');
    cy.contains('were here!');
  })
})