/// <reference types="Cypress" />
//
// Please check the host in cypress.json. If runnign locally, change the string to your local development
import qs from 'querystring'
import { Url, parse } from 'url'

context('User Authentication', () => {
  let connection_string
  const MOCK_USER = {
    firstName: 'Miggy',
    lastName: 'Reyes',
    email: 'miggy.reyes@ttu.edu'
  }

  before(() => {
    connection_string = Cypress.env('API_CONNECTION')
    if (process.env.CI) connection_string = process.env.API_CONNECTION
    cy.request('DELETE', `${connection_string}/api/v2/auth/seed`, MOCK_USER)
  })

  it('should be able to register, verify, login and logout a user with proper input', () => {
    cy.visit('auth')
      .get('[data-testid=switch-to-registration]')
      .click()


    cy
      .get('[data-testid=FirstName]').type('Miggy')
      .get('[data-testid=LastName]').type('Reyes')
      .get('[data-testid=Email]').type('miggy.reyes@ttu.edu')
      .get('[data-testid=Password]').type('P@ssw0rd')
      .get('[data-testid=ConfirmPassword]').type('P@ssw0rd')
      .get('[data-testid=GraduationDate]').type('2022-05-15')

    cy.get('[data-testid=registration-submit-button]').click()

    cy.url({ timeout: 10000 }).should('include', 'verify')
    cy.url({ timeout: 10000 }).should('include', 'token')
    cy.url({ timeout: 10000 }).should('include', 'email')
    cy.url({ timeout: 10000 }).should('include', 'miggy.reyes%40ttu.edu')

    cy.get('[data-testid=confirm-email-button]').click()
    cy.get('[data-testid=confirm-waiting-symbol]', { timeout: 10000 })

    // Mock the email link click
    cy.url().then((location) =>{
      const currentLocation = parse(location)
      const email = qs.parse(currentLocation.query)['email']
      const token = qs.parse(currentLocation.query)['token']

      const querystring = qs.stringify({
        email,
        token,
        fallback: `${Cypress.env('baseUrl')}/error`,
        redirectUrlSuccess: `${Cypress.env('baseUrl')}/auth`,
      })

      cy.request({
        method: 'GET',
        url: `${connection_string}/api/v2/auth/confirm?${querystring}`,
      })
    })

    cy.visit('auth')

    cy.get('[data-testid=Email]').type('miggy.reyes@ttu.edu')
    cy.get('[data-testid=Password]').type('P@ssw0rd')
    cy.get('[data-testid=login-submit-button]').click()

    cy.url({ timeout: 10000 }).should('include', 'events')

    cy.get('[data-testid=login-logout]').contains('Logout')

    cy.get('[data-testid=login-logout]').click()
    cy.url({ timeout: 10000 }).should('include', 'home')
    cy.get('[data-testid=login-logout]').contains('Login')
  })

  it('should not be able to register a user with bad input', () => {
    cy.visit('auth')
      .get('[data-testid=switch-to-registration]')
      .click()

    cy.get('[data-testid=FirstName]').type('Miggy')
      .get('button[disabled]')
      .get('[data-testid=LastName]').type('Reyes')
      .get('button[disabled]')
      .get('[data-testid=Email]').type('miggy.reyes@ttu.edu')
      .get('button[disabled]')
      .get('[data-testid=Password]').type('BadPassword')
      .get('button[disabled]')
      .get('[data-testid=ConfirmPassword]').type('NotMatching')
      .get('button[disabled]')
      .get('[data-testid=GraduationDate]').type('2022-05-15')
      .get('button[disabled]')
  })
})
