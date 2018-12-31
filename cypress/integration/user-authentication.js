/// <reference types="Cypress" />
//
// Please check the host in cypress.json. If runnign locally, change the string to your local development

context('User Authentication', () => {
  const MOCK_USER = {
    firstName: 'Miggy',
    lastName: 'Reyes',
    email: 'miggy.reyes@ttu.edu'
  }

  before(async () => {
    let connection_string = Cypress.env('API_CONNECTION')
    if (process.env.CI) connection_string = process.env.API_CONNECTION

    try {
      await cy.request('DELETE', `${connection_string}/api/v2/auth/seed`, MOCK_USER)
    } catch(err) {
      console.error(err)
      throw err
    }
  })

  it('should be able to register a user with proper input', () => {
    cy.visit('auth')
      .get('[data-testid=switch-to-registration]')
      .click()

    cy
      .get('[data-testid=FirstName]').type('Miggy')
      .get('[data-testid=LastName]').type('Reyes')
      .get('[data-testid=Email]').type('miggy.reyes@ttu.edu')
      .get('[data-testid=Password]').type('BadPassword')
      .get('[data-testid=ConfirmPassword]').type('P@ssw0rd')
      .get('[data-testid=GraduationDate]').type('2022-05-15')

    cy.get('button[disabled]')

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
