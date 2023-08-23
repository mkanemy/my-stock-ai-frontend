describe('template spec', () => {
  it('passes', () => {
    cy.intercept('/root', {
      statusCode: 200,
      data: ["were here!"],
    }).as("root")

    cy.visit('localhost:3000');
    // cy.contains('were here!');
    cy.contains('Learn React');
  })
})