/* eslint no-console: 0  */
import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { spy, stub } from 'sinon'

// Unwrapped Component
import { RegisterForm } from './RegisterForm.jsx'

describe('RegisterForm.jsx', () => {
  let props
  let wrapper
  let handleRegisterSpy
  let handleLoginSpy
  let validateSpy

  beforeEach(() => {
    handleRegisterSpy = spy()
    handleLoginSpy = spy()
    validateSpy = spy()

    props = {
      handleRegister: handleRegisterSpy,
      handleLogin: handleLoginSpy,
      regErr: '',
      waiting: false,
      classes: {},
      emailErr: '',
      passErr: '',
      confirmErr: '',
      validate: validateSpy,
    }

    wrapper = shallow(<RegisterForm {...props} />)
  })

  it('should not allow the user to submit the form at render', () => {
    expect(wrapper.instance().handleSubmit()).to.equal(false)
  })

  it('should not allow the form to be submitted if there are errors or if we are waiting', () => {
    const propsWithErrors = {
      ...props,
      emailErr: 'Bad Email!',
      passErr: 'Bad Password!',
    }
    wrapper.setProps(propsWithErrors)
    expect(wrapper.instance().handleSubmit()).to.equal(false)
  })

  it('should allow the form to be submitted if errors are cleared', () => {
    const propsWithoutErrors = { ...props }

    const filledForm = {
      email: 'registration.form@ttu.edu',
      password: 'Password89067!',
      confirmPass: 'Password89067!',
      name: 'Student',
    }

    // Mock a change in input since the input components are tested seperately
    wrapper.setProps(propsWithoutErrors)
    wrapper.setState(filledForm)
    expect(wrapper.instance().handleSubmit()).to.equal(true)
  })

  it('should call validate() when input is recieved', () => {
    const testState = {
      email: 'newEmail',
      password: 'newPasswordThatSucks',
      confirmPass: 'thisWillThrowAnError',
      name: 'Nils',
      preventSubmit: false,
    }
    const changePasswordEvent = {
      target: { value: 'AnotherPassword' },
    }
    wrapper.setState(testState)
    wrapper.instance().handleInputChange('password')(changePasswordEvent)
    expect(props.validate.called).to.equal(true)
  })

  it('should call handleSubmit() when the submit button is clicked', () => {
    const handleSubmitStub = stub(wrapper.instance(), 'handleSubmit')

    // Use this so the wrapper knows we just stubbed something
    wrapper.instance().forceUpdate()
    wrapper.update()

    wrapper.find('WithStyles(Button)').simulate('click')
    expect(handleSubmitStub.callCount).to.equal(1)
  })

  it('should submit the form without any changes to the values', () => {
    const formValues = {
      email: 'student.atTech@ttu.edu',
      password: 'ProperPassword1!',
      confirmPass: 'ProperPassword1!',
      name: 'Miggy',
      preventSubmit: false,
    }

    wrapper.setState(formValues)

    wrapper.instance().handleSubmit()

    expect(handleRegisterSpy.calledWithExactly({
      email: 'student.atTech@ttu.edu',
      password: 'ProperPassword1!',
      name: 'Miggy',
    })).to.equal(true)
  })
})
