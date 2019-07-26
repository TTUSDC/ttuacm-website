import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/ConsoleHome'
import Members from './pages/ConsoleMembers'
import Officers from './pages/ConsoleOfficers'
import Events from './pages/ConsoleEvents'
import Committees from './pages/ConsoleCommittees'

class Console extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' component={Home} />
          <Route exact path='/members' component={Members} />
          <Route path='/officers' component={Officers} />
          <Route path='/events' component={Events} />
          <Route path='/committees' component={Committees} />
        </Switch>
      </Router>
    )
  }
}

export default Console
