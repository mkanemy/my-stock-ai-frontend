describe('template spec', () => {
  beforeEach(() => {
    cy.intercept('/root', {
      statusCode: 200,
      data: ["were here!"],
    }).as("root")
    
    cy.intercept({pathname: '**/+page.svelte*'}).as('svelte')
    cy.visit('localhost:3000');
    cy.wait('@svelte')
  })

  it('passes', () => {    
    cy.contains('were here!');
  })
})