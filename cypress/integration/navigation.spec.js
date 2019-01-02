/// <reference types="Cypress" />
//
// Please check the host in cypress.json. If runnign locally, change the string to your local development

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

context('Navigation', () => {
  it('should be able to navigate to all pages', () => {
    cy.visit('')
      .visit('about')
      .visit('events')
      .visit('teams')
      .visit('auth')
  })
})
