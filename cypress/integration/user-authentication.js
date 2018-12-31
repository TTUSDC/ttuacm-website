/// <reference types="Cypress" />
//
// Please check the host in cypress.json. If runnign locally, change the string to your local development

context('User Authentication', () => {
  it('should be able to register a user', () => {
    cy.visit('auth')
  })
})
