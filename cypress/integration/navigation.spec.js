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
      .url().should('include', 'home')
      .visit('about')
      .url().should('include', 'about')
      .visit('events')
      .url().should('include', 'events')
      .visit('teams')
      .url().should('include', 'teams')
      .visit('auth')
      .url().should('include', 'auth')
  })

  it('should bounce all of the protected routes', () => {
    cy.visit('verify')
      .url().should('include', '/home')
  })
})
