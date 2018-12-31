/// <reference types="Cypress" />
//
// Please check the host in cypress.json. If runnign locally, change the string to your local development

context('User Authentication', () => {
  before(async () => {
    let connection_string = Cypress.env('DB_CONNECTION')
    if (process.env.CI) connection_string = process.env.DB_CONNECTION

    console.log(process.env)
    console.log(mongoose)

    try {
      await mongoose.connect(connection_string, {
        useNewUrlParser: true,
      })
      await mongoose.connection.dropDatabase()
    } catch(err) {
      console.error(err)
      throw err
    }
  })

  it('should be able to register a user', () => {
    cy.visit('auth')
  })
})
