/// <reference types="Cypress" />
//
// Please check the host in cypress.json. If runnign locally, change the string to your local development

context('Navigation', () => {
  it('should be able to navigate to all pages', () => {
    cy.visit('')
    cy.visit('about')
    cy.visit('events')
    cy.visit('teams')
    cy.visit('auth')
  })
})
