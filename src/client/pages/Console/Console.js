import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/ConsoleHome'

class Console extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path='/' component={Home} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default Console
