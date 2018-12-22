import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import { spy } from 'sinon'
import { expect } from 'chai'
import RegistrationForm from './RegistrationForm'

describe('RegistrationForm', () => {
  const handleChangeValuesSpy = spy()
  const handleSubmitSpy = spy()
  const switchFormSpy = spy()
  const checkForErrorsSpy = spy()

  beforeEach(() => {
    handleChangeValuesSpy.resetHistory()
    handleSubmitSpy.resetHistory()
    switchFormSpy.resetHistory()
    checkForErrorsSpy.resetHistory()
  })

  test('should be able to record value changes', () => {
    const defaultProps = {
      handleChangeValues: handleChangeValuesSpy,
      handleSubmit: handleSubmitSpy,
      switchForm: switchFormSpy,
      checkForErrors: checkForErrorsSpy,
    }

    const { getByTestId } = render(<RegistrationForm {...defaultProps} />)

    const emailInput = getByTestId('Email')
    fireEvent.change(emailInput, { target: { value: 'Miggy' } })
    expect(handleChangeValuesSpy.calledOnce).to.equal(true)

    const passwordInput = getByTestId('Password')
    fireEvent.change(passwordInput, { target: { value: 'Reyes' } })
    expect(handleChangeValuesSpy.calledTwice).to.equal(true)

    expect(handleChangeValuesSpy.getCall(0).args[0]).to.equal('Miggy')
    expect(handleChangeValuesSpy.getCall(0).args[1]).to.equal('email')
    expect(handleChangeValuesSpy.getCall(1).args[0]).to.equal('Reyes')
    expect(handleChangeValuesSpy.getCall(1).args[1]).to.equal('password')
  })

  test('should be able to submit on button press', () => {
    const defaultProps = {
      handleChangeValues: handleChangeValuesSpy,
      handleSubmit: handleSubmitSpy,
      switchForm: switchFormSpy,
      checkForErrors: checkForErrorsSpy,
    }

    const { getByTestId } = render(<RegistrationForm {...defaultProps} />)

    const button = getByTestId('registration-submit-button')

    fireEvent.click(button)

    expect(handleSubmitSpy.calledOnce).to.equal(true)
  })

  test('should be able to call switch function on button press', () => {
    const defaultProps = {
      handleChangeValues: handleChangeValuesSpy,
      handleSubmit: handleSubmitSpy,
      switchForm: switchFormSpy,
      checkForErrors: checkForErrorsSpy,
    }

    const { getByTestId } = render(<RegistrationForm {...defaultProps} />)

    const button = getByTestId('switch-to-login')

    fireEvent.click(button)

    expect(switchFormSpy.calledOnce).to.equal(true)
  })

  test('should be able to check for errors when the user blurs', () => {
    const defaultProps = {
      handleChangeValues: handleChangeValuesSpy,
      handleSubmit: handleSubmitSpy,
      switchForm: switchFormSpy,
      checkForErrors: checkForErrorsSpy,
    }

    const { getByTestId } = render(<RegistrationForm {...defaultProps} />)
    const email = getByTestId('Email')
    const password = getByTestId('Password')
    const confirmPassword = getByTestId('ConfirmPassword')
    const graduationDate = getByTestId('GraduationDate')

    fireEvent.blur(email)
    expect(checkForErrorsSpy.callCount).to.equal(1)

    fireEvent.blur(password)
    expect(checkForErrorsSpy.callCount).to.equal(2)

    fireEvent.blur(confirmPassword)
    expect(checkForErrorsSpy.callCount).to.equal(3)

    fireEvent.blur(graduationDate)
    expect(checkForErrorsSpy.callCount).to.equal(4)
  })

  test('should be able to display some kind of loading component', () => {
    const defaultProps = {
      handleChangeValues: handleChangeValuesSpy,
      handleSubmit: handleSubmitSpy,
      switchForm: switchFormSpy,
      checkForErrors: checkForErrorsSpy,
      loading: true,
    }

    const { getByTestId } = render(<RegistrationForm {...defaultProps} />)

    expect(getByTestId('sign-up-loading-spinner')).to.exist
  })
})
