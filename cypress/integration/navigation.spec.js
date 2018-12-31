/// <reference types="Cypress" />

context('Navigation', () => {
  it('should be able to navigate to all pages', () => {
    cy.visit('')
    cy.visit('about')
    cy.visit('events')
    cy.visit('teams')
    cy.visit('auth')
  })
})
