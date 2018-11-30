/* eslint no-console: 0  */
import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { LoginForm } from './LoginForm.jsx'

describe('LoginForm.jsx', () => {
  let props
  let wrapper

  beforeEach(() => {
    props = {
      handleLogin: () => {},
      logErr: '',
      waiting: false,
      classes: {},
    }

    wrapper = shallow(<LoginForm {...props} />)
  })

  it('Handles input changes', () => {
    const email = 'test@ttu.edu'
    const event = {
      target: {
        value: email,
      },
    }

    wrapper.instance().handleInputChange('email')(event)
    expect(wrapper.state().email).to.equal(email)
  })

  it('button should be disabled when waiting prop is true', () => {
    wrapper.setProps({
      ...props,
      waiting: true,
    })

    const button = wrapper.find('#login-button')
    expect(button.props().disabled).to.equal(true)
  })

  it('button should be not disabled when waiting prop is false', () => {
    wrapper.setProps({
      ...props,
      waiting: false,
    })

    const button = wrapper.find('#login-button')
    expect(button.props().disabled).to.equal(false)
  })
})
