import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import { spy } from 'sinon'
import { expect } from 'chai'
import LoginForm from './LoginForm'

describe('LoginForm', () => {
  const handleChangeValuesSpy = spy()
  const handleSubmitSpy = spy()
  const switchFormSpy = spy()

  beforeEach(() => {
    handleChangeValuesSpy.resetHistory()
    handleSubmitSpy.resetHistory()
    switchFormSpy.resetHistory()
  })

  test('should be able to record value changes', () => {
    const defaultProps = {
      handleChangeValues: handleChangeValuesSpy,
      handleSubmit: handleSubmitSpy,
      switchForm: switchFormSpy,
    }

    const { getByTestId } = render(<LoginForm {...defaultProps} />)

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
    }

    const { getByTestId } = render(<LoginForm {...defaultProps} />)

    const button = getByTestId('login-submit-button')

    fireEvent.click(button)

    expect(handleSubmitSpy.calledOnce).to.equal(true)
  })

  test('should be able to call switch function on button press', () => {
    const defaultProps = {
      handleChangeValues: handleChangeValuesSpy,
      handleSubmit: handleSubmitSpy,
      switchForm: switchFormSpy,
    }

    const { getByTestId } = render(<LoginForm {...defaultProps} />)

    const button = getByTestId('switch-to-registration')

    fireEvent.click(button)

    expect(switchFormSpy.calledOnce).to.equal(true)
  })

  test('should be able to display some kind of loading component', () => {
    const defaultProps = {
      handleChangeValues: handleChangeValuesSpy,
      handleSubmit: handleSubmitSpy,
      switchForm: switchFormSpy,
      loading: true,
    }

    const { getByTestId } = render(<LoginForm {...defaultProps} />)

    expect(getByTestId('login-loading-spinner')).to.exist
  })
})
