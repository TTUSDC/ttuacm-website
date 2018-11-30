import React from 'react'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import PropTypes from 'prop-types'

import { RegisterForm } from './RegisterForm.jsx'
import { LoginForm } from './LoginForm.jsx'

// The complete Auth Form including Login and Register
class Auth extends React.Component {
  static propTypes = {
    handleRegister: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
    regErr: PropTypes.string,
    logErr: PropTypes.string,
    waiting: PropTypes.bool,
  }

  static defaultProps = {
    regErr: '',
    logErr: '',
    waiting: false,
  }

  state = {
    index: 'one',
  }

  handleTabChange = (_, newIndex) => {
    this.setState({
      index: newIndex,
    })
  }

  render() {
    const {
      handleLogin,
      handleRegister,
      regErr,
      waiting,
      logErr,
    } = this.props

    const {
      index,
    } = this.state

    return (
      <div>
        <Tabs
          value={index}
          onChange={this.handleTabChange}
          indicatorColor='primary'
          textColor='primary'
          centered
          fullWidth
        >
          <Tab value='one' label='Register' />
          <Tab value='two' label='Login' />
        </Tabs>

        {/* Content for the Tabs */}
        {
          index === 'one'
            && <RegisterForm
              handleRegister={handleRegister}
              regErr={regErr}
              waiting={waiting}
            />
        }
        {
          index === 'two'
            && <LoginForm
              handleLogin={handleLogin}
              logErr={logErr}
              waiting={waiting}
            />
        }
      </div>
    )
  }
}

export default Auth
