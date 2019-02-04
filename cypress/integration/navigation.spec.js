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
      .url()
      .should('include', 'home')
      .get('[data-testid="About Us"]')
      .click()
      .url()
      .should('include', 'about')
      .get('[data-testid=Events]')
      .click()
      .url()
      .should('include', 'events')
      .get('[data-testid=Club]')
      .click()
      .url()
      .should('include', 'teams')
      .get('[data-testid=login-logout]')
      .click()
      .url()
      .should('include', 'auth')
      .get('[data-testid=Logo]')
      .click()
      .url()
      .should('include', 'home')
  })

  it('should bounce all of the protected routes', () => {
    cy.visit('verify')
      .url()
      .should('include', '/home')
  })
})
