import { expect } from 'chai'
import { checkForErrors } from './RegistrationContainer'

describe('Registration Container - Error Checking', () => {
  test('should be able to identify unmatched/matched password errors', () => {
    const formWithBadMatch = {
      password: 'Foo',
      confirmPassword: 'Bar',
    }

    const formWithMatch = {
      password: 'Foo',
      confirmPassword: 'Foo',
    }

    const { confirmPasswordError: error } = checkForErrors(formWithBadMatch)
    expect(error).not.to.equal(null)

    const { confirmPasswordError: noError } = checkForErrors(formWithMatch)
    expect(noError).to.equal(null)
  })

  test('should be able to identify (non)ttu email addresses', () => {
    const formWithTTU = {
      email: 'hello@ttu.edu',
    }

    const formWithoutTTU = {
      email: 'hello@gmail.com',
    }

    const { emailError: noError } = checkForErrors(formWithTTU)
    expect(noError).to.equal(null)

    const { emailError: error } = checkForErrors(formWithoutTTU)
    expect(error).not.to.equal(null)
  })

  test('should handle all password errors', () => {
    const nonAsciiPassword = {
      password: '©',
    }

    const shortPassword = {
      password: 'H',
    }

    const lowercasePassword = {
      password: 'helloworld',
    }

    const uppercasePassword = {
      password: 'HELLOWORLD',
    }

    const letterOnlyPassword = {
      password: 'HelloWorld',
    }

    const plainPassword = {
      password: 'HelloWorld123',
    }

    const properPassword = {
      password: 'HelloWorld123!',
    }

    const { passwordError: nonASCII } = checkForErrors(nonAsciiPassword)
    expect(nonASCII).not.to.equal(null)

    const { passwordError: short } = checkForErrors(shortPassword)
    expect(short).not.to.equal(null)

    const { passwordError: lower } = checkForErrors(lowercasePassword)
    expect(lower).not.to.equal(null)

    const { passwordError: upper } = checkForErrors(uppercasePassword)
    expect(upper).not.to.equal(null)

    const { passwordError: letter } = checkForErrors(letterOnlyPassword)
    expect(letter).not.to.equal(null)

    const { passwordError: plain } = checkForErrors(plainPassword)
    expect(plain).not.to.equal(null)

    const { passwordError: proper } = checkForErrors(properPassword)
    expect(proper).to.equal(null)
  })
})
