import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import Auth from './Auth.jsx'

describe('Auth.jsx', () => {
  it('Changes tabs', () => {
    const testProps = {
      authCancelled: () => null,
      handleRegister: () => null,
      handleLogin: () => null,
      regErr: '',
      logErr: '',
      waiting: false,
    }

    const authTest = shallow(
      <Auth
        {...testProps}
      />,
    )
    authTest.instance().handleTabChange(null, 'two')
    expect(authTest.state().index).to.equal('two')
  })
})
