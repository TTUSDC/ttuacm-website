import React from 'react'
import { Route, Switch, Redirect } from 'react-router'

import {
  AuthenticationPage,
  AboutUsPage,
  LandingPage,
  TeamsPage,
  ContactUsPage,
  EventsPage,
  NotFoundPage,
  VerifyEmailPage,
} from 'pages'

export default function Routes() {
  return (
    <Switch>
      <Route exact path='/' render={() => <Redirect to='/home' />} />
      <Route path='/home' component={LandingPage} />
      <Route path='/auth' component={AuthenticationPage} />
      <Route path='/about' component={AboutUsPage} />
      <Route path='/contact' component={ContactUsPage} />
      <Route path='/teams' component={TeamsPage} />
      <Route path='/events' component={EventsPage} />
      <Route path='/verify' component={VerifyEmailPage} />
      <Route component={NotFoundPage} />
    </Switch>
  )
}
